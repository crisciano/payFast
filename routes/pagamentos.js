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
        pagamento.id = res; 
    });
    console.log(pagamento);

    res.location(`/pagamentos/pagamento/${pagamento.id}`);

    return res.status(201).send(pagamento);
})

// router.put('/pagamento', ())

module.exports = router;