const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');

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