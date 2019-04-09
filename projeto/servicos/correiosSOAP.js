const soap = require('soap');

class Soap{

    constructor(){
        this._serverSoapCorreio = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
    }
    
    calculaPrazo(info, callback){
        
        soap.createClient(this._serverSoapCorreio, (err, cliente)=> {
            if(err) console.log(err);
            console.log('query soap');
            cliente.CalcPrazo(info, callback)
        });
    }
}

module.exports = Soap