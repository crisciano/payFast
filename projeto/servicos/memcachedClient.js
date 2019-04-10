const Memcached = require('memcached');

const server = "localhost:11211";
const options = {
    retries: 10,
    retry: 10000,
    remove: true
};

const cliente = new Memcached(server, options);

cliente.get('', (err, res)=> {
    if(err || !res){
        if(err) console.log(err);
        if(!res) console.log("res not found");
    }
    console.log(res);
})