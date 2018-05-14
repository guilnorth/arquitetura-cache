import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable()
export class LogProcessamentoService {

  public logMessages = '';
  public logMessagesImportant = '';

  constructor() { }

  public addLog(log,skipTime = false ,logImportant = false){
    let message = (skipTime)?`${log}`:`[${moment().format('h:mm:ss:SSS')}]  >>>  ${log}\n`;
    this.logMessages += (`${message} `);
    if(logImportant)
      this.addLogImportant(message)
  }
  public printLog():string{
    return this.logMessages.toString();
  }

  public printLogImportant():string{
    return this.logMessagesImportant.toString();
  }

  private addLogImportant(log){
    this.logMessagesImportant += (`${log} `);
  }

  public resetLog(){
    this.logMessages = '';
  }

}
