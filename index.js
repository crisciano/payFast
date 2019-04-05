const express = require('express'); 
const app = express();

app.listen(3000, ()=>{
    console.log('Server start');
});


app.get('/teste', (req, res) =>{
    console.log('Resever request');
    res.send('Tudo ok.')

})