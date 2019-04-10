const Memcached = require('memcached');

const server = "localhost:11211";
const options = {
    retries: 10,
    retry: 10000,
    remove: true
};
const data = {
    "id": 20
};

class MencachedClient{
    constructor(){
        this.cliente = new Memcached(server, options);
    }

    memcachedSet(url, data, callback){
        this.cliente.set('pagamento-20', data, 60000, callback);
    }
    memcachedGet(url, callback){
        this.cliente.get('pagamento-20', (err, res)=> {
            if(err || !res){
                if(err) console.log(err);
                if(!res) console.log("res not found");
            }
            console.log(res);
        })
    }
}

module.exports = MencachedClient