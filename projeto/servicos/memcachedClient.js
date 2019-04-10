const Memcached = require('memcached');

const server = "http://localhost:3000";

memcached = new Memcached(server, options);