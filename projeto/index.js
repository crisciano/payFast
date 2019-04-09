const express = require('express'); 
const app = express();
const pagamentosRoutes = require('./routes/pagamentos');
const indexRoutes = require('./routes/index');

app.listen(3000, ()=>{
    console.log('Server start');
});

app.get('/teste', (req, res) =>{
    console.log('Resever request');
    res.send('Tudo ok.')
})