import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

import {ProcessorService} from "../../services/processor.service";
import {LogProcessamentoService} from "../../services/log-processamento.service";
import {MemoriaModel} from "../../models/memoria.model";
import Utils from "../../utils/utils";
import {CacheMapAssociativoService} from "../../services/cache-map-associativo.service";


@Component({
  selector: 'app-map-associativo',
  templateUrl: './map-associativo.component.html',
  styleUrls: ['./map-associativo.component.scss']
})
export class MapAssociativoComponent implements OnInit {

  public messageLog;
  public sub;
  public details = {
    id: 0,
    description: '',
    politica:''
  };
  private configs:any = {
    urlMemory:'',
    programFiles:{
      'file1':'',
      'file2':'',
      'file3':'',
      'file4':'',
      'file5':''
    },
    linesCache: '',
    sizeIndex: 0,
    numVias: 0,
    politica:''
  };
  public mostrarGrafico = false;
  public registerMiss = [];
  public registerHits = [];
  constructor(private route: ActivatedRoute,
              private cacheMapAssoc: CacheMapAssociativoService,
              private processor: ProcessorService,
              private logProcess:LogProcessamentoService) {


  }

  initMapAssociativo(grupo:any,lines:any,sizeInd:any,politica:any){
    this.logProcess.resetLog();
    this.messageLog = false;
    this.mostrarGrafico = false;
    this.configs = {
      urlMemory:`Grupo${grupo}/m${grupo}.txt`,
      programFiles:{
        file1:`Grupo${grupo}/prog${grupo}_1.txt`,
        file2:`Grupo${grupo}/prog${grupo}_2.txt`,
        file3:`Grupo${grupo}/prog${grupo}_3.txt`,
        file4:`Grupo${grupo}/prog${grupo}_4.txt`,
        file5:`Grupo${grupo}/prog${grupo}_5.txt`,
      },
      linesCache: lines,
      sizeIndex: sizeInd,
      politica:politica
    };

    this.processCacheAssoc(this.configs.programFiles.file1).subscribe(() => {
      this.processCacheAssoc(this.configs.programFiles.file2).subscribe(() => {
        this.processCacheAssoc(this.configs.programFiles.file3).subscribe(() => {
          this.processCacheAssoc(this.configs.programFiles.file4).subscribe(() => {
            this.processCacheAssoc(this.configs.programFiles.file5).subscribe(() => {

              this.messageLog += '\n\n--------------Resumo Geral do Processo--------------\n';
              this.messageLog += this.logProcess.printLogImportant();
              this.mostrarGrafico = true;
            })
          })
        })
      })
    })
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.details.id = +params['grupo'];
      this.details.politica = params['politica'];
      let dConfig = Utils.getConfigsGroup(+params['grupo']);
      if(dConfig){
        this.details.description = dConfig.desc;
        this.initMapAssociativo(+params['grupo'],dConfig.lines,dConfig.sizeIndice,params['politica']);
      }
    });

  }



  outputFormat(tipo,obj,file){
    //this.logProcess.resetLog();
    this.logProcess.addLog(`Mapeamento ${tipo} \n`,true,true);
    if(tipo === 'Associativo Por Conjunto')
      this.logProcess.addLog(`Cache com Mapeamento de ${this.configs.numVias} vias\n`,true,true);

    this.logProcess.addLog(`Cache com ${this.configs.linesCache} linhas\n`,true,true);
    this.logProcess.addLog(`Arquivo de Memória: ${this.configs.urlMemory} \n`,true,true);
    this.logProcess.addLog(`Arquivo de Programa: ${file} \n`,true,true);
    this.logProcess.addLog(`Política de Escrita na Cache: ${this.configs.politica} \n`,true,true);
    this.logProcess.addLog('Nº Hits: '+obj.hit+'\n',true,true);
    this.logProcess.addLog('Nº Miss: '+obj.miss+'\n\n\n',true,true);

    this.messageLog = this.logProcess.printLog();


  }

  processCacheAssoc(file):Observable<any>{

    let dadosMemoriaPrincipal, dataProgram;
    this.cacheMapAssoc.initCache(this.configs.sizeIndex,this.configs.linesCache,this.configs.politica);
    return this.processor.getMemoryFile(this.configs.urlMemory).flatMap(dataMemory => {

      return this.processor.getProgramFile(file).flatMap(program =>{

        dadosMemoriaPrincipal = dataMemory.match(/.+/g);

        dadosMemoriaPrincipal = new MemoriaModel(dadosMemoriaPrincipal);
        this.processor.setMemoryPrinc(dadosMemoriaPrincipal.cache);
        /** Uso do .match necessário pois split padrão incluia a quebra de linha **/
        dataProgram = program.match(/.+/g);
        this.processor.setFileProgram(dataProgram.cache);

        /** Referencia da memoria e do programa passadas para a cache **/

        this.cacheMapAssoc.setProcessor(this.processor);
        this.cacheMapAssoc.setLogProcess(this.logProcess);

        this.logProcess.addLog(`Mapeamento Totalmente Associativo  \n`,true);
        this.logProcess.addLog(`Cache com ${this.configs.linesCache} linhas\n`,true);
        this.logProcess.addLog(`Arquivo de Memória: ${this.configs.urlMemory} \n`,true);
        this.logProcess.addLog(`Arquivo de Programa: ${file} \n\n`,true);

        let indice, tag;
        /** Percorrendo programa **/
        for (let i = 0; i< dataProgram.length; i++){
          this.logProcess.addLog('Execução da linha: '+(i+1));

          indice =  dataProgram[i].substr(-1 *(parseInt(this.configs.sizeIndex)));
          tag = dataProgram[i].slice(0,(-1 * (parseInt(this.configs.sizeIndex))));

          this.cacheMapAssoc.operacaoCache(indice,tag);
          this.logProcess.addLog('\n \n',true);
        }

        /*this.logProcess.addLog('Nº Hits: '+this.cacheMapAssoc.hit)
         this.logProcess.addLog('Nº Miss: '+this.cacheMapAssoc.miss)*/
         this.logProcess.addLog('Cache Final',true);
         this.logProcess.addLog(Utils.objectToString(this.cacheMapAssoc.cache),true);

        this.outputFormat('Totalmente Associativo',this.cacheMapAssoc,file);
        /** Registrando miss e hit para grafico **/
        this.registerMiss.push(this.cacheMapAssoc.miss);
        this.registerHits.push(this.cacheMapAssoc.hit);
        //console.log(this.logProcess.printLog());
        return Observable.of(true);

      })
    })
  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}

