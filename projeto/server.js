const express = require('express'); 
const app = express();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');

/** routes */
const indexRoutes = require('./routes/index');
const pagamentosRoutes = require('./routes/pagamentos');
const correiosRoutes = require('./routes/correios');

/** express use */
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