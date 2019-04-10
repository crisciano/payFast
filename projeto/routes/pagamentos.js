const express = require('express'); 
const router = express.Router();

const AppDAO = require('../dao');
const ClientRest = require('../servicos/clienteCartoes');
const ClientMemcached = require('../servicos/memcachedClient');
const Logger = require('../servicos/loggers');

const ClienteCartao = new ClientRest();
const ClientCache = new ClientMemcached(); 
// const Logger = new LoggerFile();

const dbPath = './db/database.sqlite3.db';
const dao = new AppDAO(dbPath);


const table = "pagamentos";

dao.CreateTable(table);
// dao.InsertTable(table, pagamento);
// dao.DeletePagamento(table, 47);
// dao.PutPagamento(table, 1, pagamento);
// dao.ListTable(table);

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

    ClientCache.memcachedGet(`pagamento-${id}`, (error, response)=> {
        if(error || !response){
            if(error) console.log(error);
            if(!response) console.log('Response cache not found');
            // return;
            dao.ListPagamento(table, id)
                .then((response) =>{
                    console.log('return sgbd');
                    console.log(response);
                    return res.json(response)
                });  
            return;  
        } 
        console.log('return cache');
        
        console.log(response);
        return res.json(response);
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
        ClienteCartao.autoriza(cartao, (res)=>{  
            console.log('callback cartao');

            pagamento.cartao = res;
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
            console.log('Insert sgbd');
            console.log(response);
            ClientCache.memcachedSet(`pagamento-${response.pagamento.id}`, response, (err, res)=>{
                if(err) console.log(err);
                console.log('pagamento insert in cache');
            })
            return res.status(201).json(response);
        })
        .catch( (err) => console.log(err) )
})

// route all pagamentos
router.get('/', (req, res) =>{
    dao.ListTable(table)
        .then((response)=>{
            Logger.info('Requeste all paypers.');
            console.log(response);
            return res.json(response);
        })
        .catch((err) => console.log(err))
})

module.exports = router;