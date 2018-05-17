import { Component, OnInit } from '@angular/core';
import Utils from "../../utils/utils";

@Component({
  selector: 'app-configura-processo',
  templateUrl: './configura-processo.component.html',
  styleUrls: ['./configura-processo.component.scss']
})
export class ConfiguraProcessoComponent implements OnInit {

  public mapeamentos;
  public grupos;
  public configProc = {
    tipo:'',
    grupo:'',
    cacheTitle:'',
    numVias:'',
    politica:''
  };
  constructor() { }

  public configMaps(){
    this.mapeamentos = [{
      title:'Direto',
      description: 'Assume posições definidas dentro da cache',
      tipo:'direto'
    },{
      title:'Totalmente Associativo',
      description: 'Assume qualquer posição dentro da cache',
      tipo:'associativo',
      politica:'fifo'
    },{
      title:'Associativo Por Conjunto de 2 vias',
      description: 'Assume uma posição qualquer dentro de um dos dois blocos na cache',
      tipo:'associativo-conjunto',
      numVias:'2',
      politica:'fifo'
    },{
      title:'Associativo Por Conjunto de 4 vias',
      description: 'Assume uma posição qualquer dentro de um dos quatro blocos na cache',
      tipo:'associativo-conjunto',
      numVias:'4',
      politica:'fifo'
    }];

    this.grupos = [{
      num:1,
      title:'Grupo 1',
      description: 'Cache de 2 linhas com endereços de 6bits (5 para TAG e 1 para índice)',
    },{
      num:2,
      title:'Grupo 2',
      description: 'Cache de 4 linhas com endereços de 6bits (4 para TAG e 2 para índice)',
    },{
      num:3,
      title:'Grupo 3',
      description: 'Cache de 8 linhas com endereços de 6bits (3 para TAG e 3 para índice)',
    },{
      num:4,
      title:'Grupo 4',
      description: 'Cache de 16 linhas com endereços de 6bits (2 para TAG e 4 para índice)',
    },{
      num:5,
      title:'Grupo 5',
      description: 'Cache de 32 linhas com endereços de 6bits (1 para TAG e 5 para índice)',
    }]
  }



  selectTypeCache(map){
    this.configProc.tipo = map.tipo;
    this.configProc.numVias = (map.numVias)?map.numVias:'';
    this.configProc.cacheTitle = map.title;
    this.configProc.politica = Utils.validatePolitc(map.politica)
  }

  selectGroup(group){
    this.configProc.grupo = group;
  }

  typeCacheBack(){
    this.configProc.tipo = '';
  }
  groupBack(){
    this.configProc.grupo = '';
  }

  ngOnInit() {
    this.configMaps()
  }

}
