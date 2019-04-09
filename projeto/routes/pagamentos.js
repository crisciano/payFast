const express = require('express'); 
const router = express.Router();

const AppDAO = require('../dao');

const dbPath = './db/database.sqlite3.db';
const dao = new AppDAO(dbPath);

const table = "pagamentos";

// router delete pagamento
router.delete('/:id', (req, res)=> {
    var id = req.params.id;
    dao.DeletePagamento(table, id)
        .then((response)=>{
            console.log(response);
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
        })
        .catch((err)=> console.log(err))    
})

// route create
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

    dao.InsertTable(table, pagamento)
        .then((response)=>{
            return res.status(201).json(response);
        })
        .catch( (err) => console.log(err) )
})

// route all pagamentos
router.get('/', (req, res) =>{
    dao.ListTable(table)
        .then((response)=>{
            console.log(response);
            return res.json(response);
        })
        .catch((err) => console.log(err))
})

module.exports = router;