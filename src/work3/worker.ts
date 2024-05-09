import { expose } from 'threads/worker';

// Funkcja, która będzie wykonywana w osobnym wątku
function wykonajObliczenia(a: number, b: number): number {
    return a + b;
}

// Udostępnienie funkcji do wykonywania w osobnym wątku
expose(wykonajObliczenia);
