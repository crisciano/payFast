const cluster = require('cluster');
const os = require('os');

const cpus = os.cpus();
// console.log(cpus);

if(cluster.isMaster){
    console.log('cluster master');
    
    cpus.map((res)=> {
        console.log(res);
        console.log('cluster fork');
        cluster.fork();

    })
    cluster.on('listening', (Worker) => console.log(`New thread -> ${Worker.process.pid}`))
    cluster.on('exit', (Worker)=> {
        cluster.fork();
        console.log(`Thread finish -> ${Worker.process.pid}`);
    })
}else require('./server');

