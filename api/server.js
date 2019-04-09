const express = require('express'); 
const app = express();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

const cartoesRoutes = require('./routes/cartoes');

app.listen(3001, ()=>{
    console.log('Server cartao start');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/cartoes', cartoesRoutes);

module.exports = app;