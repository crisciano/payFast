const restify = require('restify-clients');
var serverCartaoUrl = "http://localhost:3001";
var cartao = {
	"numero": 1234123412341234,
	"bandeira": "mltp",
	"ano_de_expiracao": 2020,
	"mes_de_expiracao": 12,
	"cvv": 123
};

class ClientRest{

    constructor(){
        this.cliente = restify.createJsonClient({
            url: serverCartaoUrl
        })
    }

    autoriza(cartao, fn){
        this.cliente.post('/cartoes/autoriza', cartao ,(err, req, res, retorno)=> {
            console.log('consumindo api');
            console.log(retorno);
            fn(retorno);
        })
    }

}

module.exports = ClientRest;