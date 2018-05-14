import { Injectable } from '@angular/core';
import {ProcessorService} from "./processor.service";
import {CacheMapDireto} from "../models/cacheMapDireto";
import Utils from "../utils/utils";
import {LogProcessamentoService} from "./log-processamento.service";

@Injectable()
export class CacheMapAssociativoConjuntoService {

  public sizeIndice:any;
  public linesCache:any;
  /** Num de linhas por vias **/
  public linesVias:any;
  public cache = {};
  public miss = 0;
  public hit = 0;
  public policeWrite = 'lifo';
  private processor: ProcessorService;
  private logProcess: LogProcessamentoService;

  constructor() { }


  /**
   * @linesCache : numero de linhas total da cache
   * **/
  public initCache (linesCache,numVias,politica){

    this.hit = 0;
    this.miss = 0;
    /** Como o numero de vias sempre sera ou 2 ou 4,
     *  o tamanho do indice sempre será ou 1 ou 2
     *  **/
    this.linesCache = linesCache;
    this.sizeIndice = Math.log2(numVias);
    this.linesVias = linesCache/numVias;
    /** Construct Blocos **/
    this.cache = new CacheMapDireto(numVias,this.sizeIndice).cache;
    this.policeWrite = Utils.validatePolitc(politica)
  }

  private findCacheInBlock(indxBloco,indice, tag){
    return this.cache[indxBloco].find(x => x.tag == `${tag}${indice}`)
  }

  /**
   * Encontra o Bloco da Cache
   * **/
  public getBlockCache(indice,tag){
    let indComplete = Utils.indxComplete(indice.toString(2),this.sizeIndice);
    if(this.validateIndice(indComplete))
      if(this.cache[indComplete])
        return indComplete;
    else
        this.logProcess.addLog(`Invalido : ${tag}${indice}`)
  }

  public operacaoCache(indice, tag) {
    let indxBloco = this.getBlockCache(indice,tag);
    let findInCache = (indxBloco)?this.findCacheInBlock(indxBloco,indice,tag):false;
    if (findInCache) {
      /** Hit **/
      this.hit++;
      this.logProcess.addLog(` ** Hit ** :: ${tag}${indice}`);
    } else {
      /** Miss **/
      this.miss++;
      this.logProcess.addLog(` ** Miss ** :: ${tag}${indice}`);
      this.writeCache(indice, tag, indxBloco)
    }

  }

  public writeCache(indice, tag, indxBloco) {
    let address = this.processor.findByAdressMemoryPrinc(`${tag}${indice}`);
    this.logProcess.addLog(`Buscando Memoria: ${tag}${indice} no bloco ${indxBloco}`)
    if(address){
      this.logProcess.addLog("Dado na memoria :: "+ JSON.stringify(address));
      address = address.address;

      if (this.cache[indxBloco].length < this.linesVias)
        this.cache[indxBloco].push({tag: address});
      else
        this.replaceWithPolice(address, indxBloco);

    }else{
      this.logProcess.addLog(`Falha na política de escrita: Não deve haver inconsistência entre memória principal e memória cache :: ${tag}${indice}`)
      return false
    }

  }

  private replaceWithPolice(tag, indxBloco) {
    if (this.policeWrite === 'lifo'){
      this.cache[indxBloco][this.linesVias-1] = {
        tag: tag
      };
      this.logProcess.addLog(`Escrita na cache  :: ${tag} no indice ${this.linesVias-1} no bloco ${indxBloco}`);
    }
    else if(this.policeWrite === 'fifo'){
      this.cache[indxBloco].shift();
      this.cache[indxBloco].push({tag: tag});
      this.logProcess.addLog(`Escrita na cache  :: ${tag} no indice ${this.linesVias-1} no bloco ${indxBloco}`);
    }

  }


  private validateIndice (indice){
    return (indice >=0 && indice.length <= this.sizeIndice)
  }

  public setProcessor(processor: ProcessorService) {
    this.processor = processor;
  }

  public setLogProcess(logProcess:LogProcessamentoService){
    this.logProcess = logProcess;
  }

}
