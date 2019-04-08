const express = require('express'); 
const router = express.Router();

const AppDAO = require('../dao');

const dbPath = './db/database.sqlite3.db';
const dao = new AppDAO(dbPath);

const table = "pagamentos";

// route all pagamentos
router.get('/', (req, res) =>{
    dao.ListTable(table)
        .then((response)=>{
            console.log(response);
            // return res.send(response);
            return res.json(response);
    })
})

// route list pagamento
router.get('/:id', (req,res) =>{
    var id = req.params.id;
    dao.ListPagamento(table, id)
        .then((response) =>{
            return res.json(response)
        });    
})

// route alter status
router.put('/:id', (req,res) =>{
    var id = req.params.id;
    dao.PutStatus(table, id)
        .then((response) =>{
            return res.json(response)
        });    
})

// route create
router.post('/pagamento', (req, res) =>{
    var id;

    req.assert("forma_de_pagamento", "Forma de pagamento e obrigatório.")
        .notEmpty();
    req.assert('valor', "valor obrigatorio e decimal")
        .notEmpty().isFloat();

    var err = req.validationErrors();
    if(err){
        console.log(err);
        res.status(400).send(err);
        return;
    }

    let pagamento = req.body;

    pagamento.status = "criado";
    pagamento.data = new Date;

    pagamento = Object.values(pagamento);

    // console.log(pagamento);
    dao.InsertTable(table, pagamento, (res)=>{
        if(err) console.log(err);
        console.log(res);
        // pagamento.id = res; 
        this.id = res;
        // return res;
    });
    pagamento.id = this.id; 
    console.log(pagamento);

    res.location(`/pagamentos/pagamento/${pagamento.id}`);

    return res.status(201).send(pagamento);
})

module.exports = router;