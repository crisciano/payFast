const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');

const AppDAO = require('./dao');

const dbPath = './db/database.sqlite3.db';
const dao = new AppDAO(dbPath);

const table = "pagamentos";
const pagamento = ["payfast","10.95","BRL", "update 2 um pagamento"];

dao.CreateTable(table);
// dao.InsertTable(table, pagamento)
// dao.DeletePagamento(table, 6);
dao.PutPagamento(table, 1, pagamento);
dao.ListTable(table);

/** routes */
const indexRoutes = require('./routes/index');
const pagamentosRoutes = require('./routes/pagamentos');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', indexRoutes);
app.use('/pagamentos', pagamentosRoutes);

app.listen(3000, ()=>{
    console.log('Server start');
});

module.exports = app;