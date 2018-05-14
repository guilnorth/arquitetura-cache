import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import Utils from "../utils/utils";
@Injectable()
export class ProcessorService {

  private memoryPrinc;
  private fileProgram;

  constructor(private http: HttpClient,) { }

  public getMemoryFile(urlMemoryFile):Observable<any>{
    return this.http.get('assets/Instancias/'+urlMemoryFile,{responseType: 'text'})
  }
  public getProgramFile(urlProgramFile):Observable<any>{
    return this.http.get('assets/Instancias/'+urlProgramFile,{responseType: 'text'})
  }
  public findByAdressMemoryPrinc(address){
    return this.memoryPrinc[(Utils.indxComplete(address))];
  }

  /** getter/setters **/
  public setMemoryPrinc(memory){
    this.memoryPrinc = memory
  }
  public setFileProgram(fileProgram){
    this.fileProgram = fileProgram
  }

  public getMemoryPrinc(){
    return this.memoryPrinc
  }
  public getFileProgram(){
    return this.fileProgram
  }

}
