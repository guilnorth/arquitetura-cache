import {Injectable} from '@angular/core';
import {ProcessorService} from "./processor.service";
import {LogProcessamentoService} from "./log-processamento.service";
import Utils from "../utils/utils";

@Injectable()
export class CacheMapAssociativoService {

    public sizeIndice: any;
    public linesCache: any;
    public cache = [];
    public miss = 0;
    public hit = 0;
    public policeWrite = 'LIFO'
    private processor: ProcessorService;
    private logProcess: LogProcessamentoService;

    constructor() {
    }

    public initCache (sizeIndice,linesCache,politica){
        this.hit = 0;
        this.miss = 0;
        this.cache = [];
        this.sizeIndice = sizeIndice;
        this.linesCache = linesCache;
        this.policeWrite = Utils.validatePolitc(politica)
    }

    public operacaoCache(indice, tag) {
        let findInCache = this.cache.find(x => x.tag == `${tag}${indice}`)
        if (findInCache) {
            /** Hit **/
            this.hit++;
            this.logProcess.addLog(` ** Hit ** :: ${tag}${indice}`)

        } else {
            /** Miss **/
            this.miss++;
            this.logProcess.addLog(` ** Miss ** :: ${tag}${indice}`)
            this.writeCache(indice, tag)
        }
    }

    public writeCache(indice, tag) {
        this.logProcess.addLog(`Buscando Memoria: ${tag}${indice}`);
        let address = this.processor.findByAdressMemoryPrinc(`${tag}${indice}`);

        if(address){
            this.logProcess.addLog("Dado na memoria :: "+ JSON.stringify(address));
            address = address.address;
            if (this.cache.length < this.linesCache)
                this.cache.push({tag: address});
            else
                this.replaceWithPolice(address);
        }else{
            this.logProcess.addLog(`Falha na política de escrita: Não deve haver inconsistência entre memória principal e memória cache :: ${tag}${indice}`);
            return false
        }

    }

    replaceWithPolice(tag) {
        if (this.policeWrite === 'LIFO')
            this.cache[this.cache.length-1] = {
                tag: tag
            };
        else if(this.policeWrite === 'fifo'){
            this.cache.shift();
            this.cache.push({tag: tag});
        }
        this.logProcess.addLog(`Escrita na cache  :: [${this.cache.length-1}]:${tag}`);
    }


    public setProcessor(processor: ProcessorService) {
        this.processor = processor;
    }

    public setLogProcess(logProcess:LogProcessamentoService){
        this.logProcess = logProcess;
    }


}
