const express = require('express'); 
const router = express.Router();

const Soap = require('../servicos/correiosSOAP');
const soap = new Soap();

router.post('/calculo-prazo', (req, res)=>{
    let info = req.body;

    soap.calculaPrazo(info, (err, response)=> {
        if(err) res.status(500).send(err);
        console.log(JSON.stringify(response));
        res.json(response);
    });
})

module.exports = router;