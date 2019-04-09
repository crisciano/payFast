const soap = require('soap');

const serverSoapCorreio = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";

class SOAP{
    constructor(info){
        soap.createClient(serverSoapCorreio, (err, cliente)=> {
            if(err) console.log(err);
            console.log('client soap created');
        
            cliente.CalcPrazo(info, (err, res)=> { 
                    if(err) console.log(err);        
                    console.log( JSON.stringify(res)); 
                })
        });
    }
}

module.exports = SOAP