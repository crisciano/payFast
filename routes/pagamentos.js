const express = require('express'); 
const router = express.Router();

router.get('/', (req, res) =>{
    console.log('Resever pagamentos');
    return res.send('Tudo ok, pagamentos')
})

router.post('/pagamento', (req, res) =>{
    let pagamento = req.body;

    pagamento.status = "criado1";
    pagamento.data = new Date;
    
    console.log(pagamento);

    return res.send(`Resever pagamento`)
    

})

module.exports = router;