// app.js

const { Worker, isMainThread, parentPort } = require('worker_threads');

// Main thread logic
if (isMainThread) {
  // Array to store worker instances
  const workers = [];
  // Path to the worker file
  const workerPath = __filename; //path.join(__dirname, "myworker.js");

  // Function to start workers
  async function startWorkers(prompts) {
    try {
      prompts.forEach(async (prompt) => {
        // Create a new worker instance
        const worker = new Worker(workerPath, { workerData: { prompt } });

        // Listen for messages from worker
        worker.on("message", async (message) => {
          // Process message received from worker
          console.log("Received message from worker:", message);
        });

        // Listen for errors from worker
        worker.on("error", (error) => {
          console.error("Worker error:", error);
        });

        // Store the worker instance
        workers.push(worker);
      });

      // Wait for all workers to finish processing
      await Promise.all(workers.map(worker => new Promise(resolve => worker.once('exit', resolve))));
    } catch (error) {
      console.error("Error starting workers:", error);
    }
  }

  // Start workers with provided prompts
  startWorkers([
    { prompt: "Prompt 1" },
    { prompt: "Prompt 2" },
    // Add more prompts as needed
  ]);
} else {
  // Worker thread logic
  // Process the prompt received from the main thread
  console.log("Worker thread processing prompt:", workerData.prompt);
  // Simulate processing and send message back to main thread
  parentPort.postMessage("Processed prompt: " + workerData.prompt);
}