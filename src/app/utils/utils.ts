export default class Utils {
    static indxComplete(val: any, size: number = 6 ,valModel : string = '0') {

        return (this.generateModelSlice(valModel,size) + (parseInt(val))).slice(-(size));
    }

    static generateModelSlice(val: string,size:number):string{
        let model: string = '';
        for(let i = 0; i< size; i++){
            model += val;
        }
        return model;
    }

    static objectToString(object){
        let str = '';
        Object.keys(object).map(function(objectKey) {
            str += `\n\t[${objectKey}]:${object[objectKey].tag}`;
        });
        str += '\n\n';
        return str;
    }

    static getConfigsGroup(idGroup):any{
        let config:any = '';
        if(idGroup === 1)
            config = {desc:'Cache de 2 linhas com endereços de 6bits (5 para TAG e 1 para índice)',lines:2,sizeIndice:1};
        else if(idGroup === 2)
            config = {desc:'Cache de 4 linhas com endereços de 6bits (4 para TAG e 2 para índice)',lines:4,sizeIndice:2};
        else if(idGroup === 3)
            config = {desc:'Cache de 8 linhas com endereços de 6bits (3 para TAG e 3 para índice)',lines:8,sizeIndice:3};
        else if(idGroup === 4)
            config = {desc:'Cache de 16 linhas com endereços de 6bits (2 para TAG e 4 para índice)',lines:16,sizeIndice:4};
        else if(idGroup === 5)
            config = {desc:'Cache de 32 linhas com endereços de 6bits (1 para TAG e 5 para índice)',lines:32,sizeIndice:5};
        else
            config = false;
        return config;
    }

    static validatePolitc(politic){
        if(!politic)
            return '';
        else if(politic === 'lifo' || politic == 'fifo')
            return politic;
        else
            return 'fifo'
    }

}