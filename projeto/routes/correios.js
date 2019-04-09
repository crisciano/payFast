const express = require('express'); 
const router = express.Router();

const soap = require('../servicos/correiosSOAP');

const info = {
    'nCdServico': '40010',
    'sCepOrigem': '96075810',
    'sCepDestino': '04101300'
}

router.post('/prazo-entrega', (req, res)=>{
    this.soap = new SOAP(info);

    console.log(res);
    
})

module.exports = router;