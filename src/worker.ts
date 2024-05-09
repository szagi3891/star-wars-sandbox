// const workerpool = require('workerpool');
// const pool = workerpool.pool();

// let counter = 0;

// function add(a: number, b: number): number {
//     let counter = 0;
//     console.info(`wątek-1 ${counter}`);
//     counter++;
//     console.info(`wątek-2 ${counter}`);

//     return a + b;
// }

// const timeout = (timeoutMs: number): Promise<void> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//         }, timeoutMs);
//     });
// };

// const main = async (): Promise<void> => {
//     for (let i = 0; i < 100; i++) {
//         pool.exec(add, [3, 4])
//             .then(function (result: any) {
//                 console.log('result', result); // outputs 7
//             })
//             .catch(function (err: any) {
//                 console.error('error', err);
//             })
//             .then(function () {
//                 pool.terminate(); // terminate all workers when done
//             });
//     }

//     await timeout(4_000);
// };

// main()
//     .then(() => {
//         console.info('end ...');
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// app.js

//TODO - npx tsx ./src/worker.ts
//TODO - spróbować przetranspilować ten plik. moze dopiero wtedy uda sie uruchomic tego workera ...

const { Worker, isMainThread, parentPort } = require('worker_threads');

interface PromptType {
    prompt: string;
}

// Main thread logic
if (isMainThread) {
    // Array to store worker instances
    const workers = [];
    // Path to the worker file
    const workerPath = __filename; //path.join(__dirname, "myworker.js");

    console.info('workerPath', workerPath);

    console.info('process.argv', process.argv);

    // Function to start workers
    async function startWorkers(prompts: PromptType[]) {
        try {
            prompts.forEach(async (prompt) => {
                // Create a new worker instance

                const worker = new Worker(new URL('worker.ts', import.meta.url), { workerData: { prompt } });

                // const worker = new Worker(workerPath, { workerData: { prompt } });

                // Listen for messages from worker
                worker.on('message', async (message) => {
                    // Process message received from worker
                    console.log('Received message from worker:', message);
                });

                // Listen for errors from worker
                worker.on('error', (error) => {
                    console.error('Worker error:', error);
                });

                // Store the worker instance
                workers.push(worker);
            });

            // Wait for all workers to finish processing
            await Promise.all(workers.map((worker) => new Promise((resolve) => worker.once('exit', resolve))));
        } catch (error) {
            console.error('Error starting workers:', error);
        }
    }

    // Start workers with provided prompts
    startWorkers([
        { prompt: 'Prompt 1' },
        { prompt: 'Prompt 2' },
        // Add more prompts as needed
    ]);
} else {
    // Worker thread logic
    // Process the prompt received from the main thread
    console.log('Worker thread processing prompt:', workerData.prompt);
    // Simulate processing and send message back to main thread
    parentPort.postMessage('Processed prompt: ' + workerData.prompt);
}
