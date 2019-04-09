const express = require('express'); 
const app = express();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const AppDAO = require('./dao');

const dbPath = './db/database.sqlite3.db';
const dao = new AppDAO(dbPath);

const table = "pagamentos";
const pagamento = ["payfast","10.95","BRL", "update 2 um pagamento", "criado", "2019-04-08T14:34:46.092Z"];

dao.CreateTable(table);
// dao.InsertTable(table, pagamento);
// dao.DeletePagamento(table, 32);
// dao.DeletePagamento(table, 33);
// dao.DeletePagamento(table, 34);
// dao.DeletePagamento(table, 35);
// dao.DeletePagamento(table, 26);
// dao.DeletePagamento(table, 27);
// dao.DeletePagamento(table, 28);
// dao.DeletePagamento(table, 29);
// dao.DeletePagamento(table, 30);
// dao.DeletePagamento(table, 31);

// dao.PutPagamento(table, 1, pagamento);
// dao.ListTable(table);

/** routes */
const indexRoutes = require('./routes/index');
const pagamentosRoutes = require('./routes/pagamentos');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', indexRoutes);
app.use('/pagamentos', pagamentosRoutes);

app.listen(3000, ()=>{
    console.log('Server start');
});

module.exports = app;