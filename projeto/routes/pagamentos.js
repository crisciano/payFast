const express = require('express'); 
const router = express.Router();

const AppDAO = require('../dao');
const ClientRest = require('../servicos/clienteCartoes');

const cliente = new ClientRest();

const dbPath = './db/database.sqlite3.db';
const dao = new AppDAO(dbPath);

const table = "pagamentos";

dao.CreateTable(table);

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

    console.log('pagamento recebido');
    
    let pagamento = req.body["pagamento"];
    console.log(pagamento);
    
    req.assert("pagamento.forma_de_pagamento", "Forma de pagamento e obrigatório.")
        .notEmpty();
    req.assert('pagamento.valor', "valor obrigatorio e decimal")
        .notEmpty().isFloat();

        
    if(pagamento.forma_de_pagamento == "cartao"){
        req.assert('cartao', 'Campo Cartão é obrigatório.')
            .notEmpty();

        let cartao = req.body["cartao"];
        cliente.autoriza(cartao, (res)=>{  
            console.log('callback cartao');

            pagamento.cartao = res;
            
            // console.log(res)
        });
    }

    var err = req.validationErrors();
    if(err){
        console.log(err);
        res.status(400).send(err);
        return;
    }

    pagamento.status = "criado";
    pagamento.data = new Date;

    pagamento = Object.values(pagamento);

    dao.InsertTable(table, pagamento)
        .then((response)=>{
            console.log(response);
            
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

// function ValidaPagamento(req){
//     req.assert("forma_de_pagamento", "Forma de pagamento e obrigatório.")
//         .notEmpty();
//     req.assert('valor', "valor obrigatorio e decimal")
//         .notEmpty().isFloat();

//     var err = req.validationErrors();
//     if(err){
//         console.log(err);
//         res.status(400).send(err);
//         return;
//     }
// }

module.exports = router;