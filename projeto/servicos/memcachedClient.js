const Memcached = require('memcached');

const server = "localhost:11211";
const options = {
    retries: 10,
    retry: 10000,
    remove: true
};
// const data = {
//     "id": 20
// };

class MencachedClient{
    constructor(){
        console.log('Memcache created');
        this.cliente = new Memcached(server, options);
    }

    memcachedSet(url, data, callback){
        this.cliente.set(url, data, 60000, callback);
    }

    memcachedGet(url, callback){
        this.cliente.get(url, callback);
    }
}

module.exports = MencachedClient