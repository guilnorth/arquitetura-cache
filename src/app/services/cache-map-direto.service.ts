import { Injectable } from '@angular/core';
import {CacheMapDireto} from '../models/cacheMapDireto'
import {ProcessorService} from "./processor.service";
import Utils from "../utils/utils";
import {LogProcessamentoService} from "./log-processamento.service";

@Injectable()
/*@Injectable({
    providedIn: 'root',
})*/
export class CacheMapDiretoService  {

    public sizeIndice:any;
    public cache = {};
    public miss = 0;
    public hit = 0;
    private processor: ProcessorService;
    private logProcess: LogProcessamentoService;

    constructor() {
    }

    public initCache (sizeCache,sizeIndice){
        this.miss = 0;
        this.hit = 0;
        this.sizeIndice = sizeIndice;
        this.cache = new CacheMapDireto(sizeCache,this.sizeIndice).cache
    }

    public operacaoCache(indice,tag){
        let indComplete = Utils.indxComplete(indice.toString(2),this.sizeIndice);

        if(this.validateIndice(indComplete)){

            if(this.cache[indComplete] && this.cache[indComplete].tag == tag){
                /** Hit **/
                this.hit++;
                this.logProcess.addLog(` ** Hit ** :: ${tag}${indice}`)

            }else {
                /** Miss **/
                this.miss++;
                this.logProcess.addLog(` ** Miss ** :: ${tag}${indice}`)
                this.writeCache(indice,tag)


            }
        }else{
            this.logProcess.addLog(`Invalido : ${tag}${indice}`)
        }
        this.logProcess.addLog('Cache Atual',true)
        this.logProcess.addLog(Utils.objectToString(this.cache),true)


    }
    private validateIndice (indice){
        return (indice >=0 && indice.length <= this.sizeIndice)
    }

    private writeCache(indice,tag){
        /** Processador busca na memória principal pelo endereço **/
        this.logProcess.addLog(`Buscando Memoria: ${tag}${indice}`);
        let address = this.processor.findByAdressMemoryPrinc(`${tag}${indice}`);


        if(address){
            this.logProcess.addLog("Dado na memoria :: "+ JSON.stringify(address));
            address = address.address;

            let indiceNew =  address.substr(address.length - (this.sizeIndice+1));
            let tagNew = address.slice(0,- (this.sizeIndice+1));
            let indCompleteNew = Utils.indxComplete(indiceNew.toString(2),this.sizeIndice);

            this.cache[indCompleteNew].tag = tagNew;
            this.logProcess.addLog(`Escrita na cache  :: ${tagNew}${indiceNew}`);
            return true;
        }else {
            this.logProcess.addLog(`Falha na política de escrita: Não deve haver inconsistência entre memória principal e memória cache :: ${tag}${indice}`)
            return false
        }



    }

    public setProcessor(processor:ProcessorService){
        this.processor = processor;
    }

    public setLogProcess(logProcess:LogProcessamentoService){
        this.logProcess = logProcess;
    }

}
