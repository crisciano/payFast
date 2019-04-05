const express = require('express'); 
const router = express.Router();

router.get('/', (req, res) =>{
    console.log('Resever pagamentos');
    return res.send('Tudo ok, pagamentos')
})

router.post('/pagamento', (req, res) =>{
    let obj = req.body;
    console.log(obj);

    return res.send(`Resever pagamento`)
    

})

module.exports = router;