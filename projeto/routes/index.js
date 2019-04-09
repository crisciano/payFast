const express = require('express'); 
const router = express.Router();

router.get('/', (req, res) =>{
    console.log('Resever index');
    return res.send('Tudo ok.')
})

module.exports = router;