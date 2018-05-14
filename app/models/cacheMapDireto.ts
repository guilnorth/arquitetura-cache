import Utils from "../utils/utils";
export class CacheMapDireto {

    cache:{} = [];

    /**
     * Para calcular length utilizar
     * Object.keys(myArray).length
     * **/

    constructor(sizeCache,sizeIndice) {
        for (let i = 0; i< sizeCache; i++){
            //("000000" + (parseInt((i.toString(2))))).slice(-6)
            this.cache[Utils.indxComplete(i.toString(2),sizeIndice)] = []
        }
    }
}


