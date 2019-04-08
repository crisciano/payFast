const express = require('express'); 
const router = express.Router();

const AppDAO = require('../dao');

const dbPath = './db/database.sqlite3.db';
const dao = new AppDAO(dbPath);

const table = "pagamentos";

router.get('/', (req, res) =>{
    dao.ListTable(table)
        .then((response)=>{
            console.log(response);
            // return res.send(response);
            return res.json(response);
    })
})

router.get('/$id', (req,res) =>{
    dao.ListPagamento(table,`${id}`)
        .then((res) =>{
            return res.json(res)
        });
})

router.post('/pagamento', (req, res) =>{
    let pagamento = req.body;

    pagamento.status = "criado";
    pagamento.data = new Date;

    pagamento = Object.values(pagamento);

    console.log(pagamento);
    dao.InsertTable(table, pagamento);

    return res.send(`Resever pagamento`);
})

// router.put('/pagamento', ())

module.exports = router;