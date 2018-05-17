import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import Utils from "../../utils/utils";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

import {CacheMapDiretoService} from "../../services/cache-map-direto.service";
import {ProcessorService} from "../../services/processor.service";
import {LogProcessamentoService} from "../../services/log-processamento.service";
import {MemoriaModel} from "../../models/memoria.model";



@Component({
  selector: 'app-map-direto',
  templateUrl: './map-direto.component.html',
  styleUrls: ['./map-direto.component.scss']
})
export class MapDiretoComponent implements OnInit {

  public messageLog;
  public sub;
  public details = {
    id: 0,
    description: ''
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
    numVias: 0
  };
  public mostrarGrafico = false;
  public registerMiss = [];
  public registerHits = [];
  constructor(private route: ActivatedRoute,
              private cacheMapDireto: CacheMapDiretoService,
              private processor: ProcessorService,
              private logProcess:LogProcessamentoService) {


  }

  initMapDireto(grupo:any,lines:any,sizeInd:any){
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
      sizeIndex: sizeInd
    };
    this.processCacheDireto(this.configs.programFiles.file1).subscribe(() => {
      this.processCacheDireto(this.configs.programFiles.file2).subscribe(() => {
        this.processCacheDireto(this.configs.programFiles.file3).subscribe(() => {
          this.processCacheDireto(this.configs.programFiles.file4).subscribe(() => {
            this.processCacheDireto(this.configs.programFiles.file5).subscribe(() => {


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
      let dConfig = Utils.getConfigsGroup(+params['grupo']);
      if(dConfig){
        this.details.description = dConfig.desc;
        this.initMapDireto(+params['grupo'],dConfig.lines,dConfig.sizeIndice);
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
    this.logProcess.addLog('Nº Hits: '+obj.hit+'\n',true,true);
    this.logProcess.addLog('Nº Miss: '+obj.miss+'\n\n\n',true,true);

    this.messageLog = this.logProcess.printLog();


  }
  processCacheDireto(file):Observable<any>{
    let dadosMemoriaPrincipal, dataProgram;
     this.cacheMapDireto.initCache(this.configs.linesCache,this.configs.sizeIndex);

    return this.processor.getMemoryFile(this.configs.urlMemory).flatMap(dataMemory => {

      return this.processor.getProgramFile(file).flatMap(program =>{

        /** Uso do .match necessário pois split padrão incluia a quebra de linha **/
        dadosMemoriaPrincipal = dataMemory.match(/.+/g);
        dadosMemoriaPrincipal = new MemoriaModel(dadosMemoriaPrincipal);

        this.processor.setMemoryPrinc(dadosMemoriaPrincipal.cache);
        /** Uso do .match necessário pois split padrão incluia a quebra de linha **/
        dataProgram = program.match(/.+/g);
        this.processor.setFileProgram(dataProgram.cache);

        /** Referencia da memoria e do programa passadas para a cache **/

        this.cacheMapDireto.setProcessor(this.processor);
        this.cacheMapDireto.setLogProcess(this.logProcess);

        this.logProcess.addLog(`Mapeamento Direto \n`,true);
        this.logProcess.addLog(`Cache com ${this.configs.linesCache} linhas\n`,true);
        this.logProcess.addLog(`Arquivo de Memória: ${this.configs.urlMemory} \n`,true);
        this.logProcess.addLog(`Arquivo de Programa: ${file} \n\n`,true);

        let indice, tag;
        /** Percorrendo programa **/
        for (let i = 0; i< dataProgram.length; i++){
          this.logProcess.addLog('Execução da linha: '+(i+1));

          indice =  dataProgram[i].substr(-1 *(parseInt(this.configs.sizeIndex)));
          tag = dataProgram[i].slice(0,(-1 * (parseInt(this.configs.sizeIndex))));

          this.cacheMapDireto.operacaoCache(indice,tag);
          this.logProcess.addLog('\n \n',true);
        }

         this.logProcess.addLog('Cache Final',true);
         this.logProcess.addLog(Utils.objectToString(this.cacheMapDireto.cache),true);


        this.outputFormat('Direto',this.cacheMapDireto,file);
        //console.log(this.logProcess.printLog());
        /** Registrando miss e hit para grafico **/
        this.registerMiss.push(this.cacheMapDireto.miss);
        this.registerHits.push(this.cacheMapDireto.hit);
        return Observable.of(true);


      })
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }



}
