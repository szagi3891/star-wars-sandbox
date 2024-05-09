import cluster from 'cluster';
import express from 'express';
// import { cpus } from 'os';

// const numCPUs = cpus().length;
const numCPUs = 2;
console.info('numCPUs = ', numCPUs);

let counter = 1;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died -> code=${code} signal=${signal}`);
  });
} else {
  const app = express();

  // Dodaj tutaj swoje ścieżki routingu i obsługę middleware'u dla aplikacji Express

  app.get('/', (req, res) => {
    const aaa = counter;
    counter++;

    res.send(`Hello World from Worker ${cluster.worker.id}, counter=${aaa}`);
  });

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}