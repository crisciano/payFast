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
// dao.DeletePagamento(table, 47);
// dao.DeletePagamento(table, 48);
// dao.DeletePagamento(table, 49);
// dao.DeletePagamento(table, 50);
// dao.DeletePagamento(table, 51);
// dao.DeletePagamento(table, 52);
// dao.DeletePagamento(table, 43);
// dao.DeletePagamento(table, 44);
// dao.DeletePagamento(table, 45);
// dao.DeletePagamento(table, 46);

// dao.PutPagamento(table, 1, pagamento);
// dao.ListTable(table);

/** routes */
const indexRoutes = require('./routes/index');
const pagamentosRoutes = require('./routes/pagamentos');
const correiosRoutes = require('./routes/correios');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/', indexRoutes);
app.use('/pagamentos', pagamentosRoutes);
app.use('/correios', correiosRoutes);

app.listen(3000, ()=>{
    console.log('Server start');
});

module.exports = app;