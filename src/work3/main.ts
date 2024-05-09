import { spawn, Thread, Worker } from 'threads';

async function main() {
    // Utwórz nowy wątek
    const worker = await spawn(new Worker('./worker'));

    // Wywołaj funkcję zdefiniowaną w wątku
    const wynik = await worker.wykonajObliczenia(5, 3);
    console.log('Wynik obliczeń:', wynik);

    // Zakończ pracę z wątkiem
    await Thread.terminate(worker);
}

main().catch(console.error);
