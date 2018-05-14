import Utils from "../utils/utils";

export class MemoriaModel {

    cache:{} = {};

    constructor(memoriaData) {

        for (let i = 0; i< memoriaData.length; i++){
            //parseInt((memoriaData[i]).toString(2))
            if(memoriaData[i])
                this.cache[Utils.indxComplete(memoriaData[i])] = {'address':memoriaData[i]}

        }


    }
}


