# Plusy

-   brak centralnego miejsca na modele. Statyczny konstruktór / getter mozna wykonać z dowolnego miejsca w kodzie dzięki temu
    ze instancje są przechowywane w zmiennej statycznej

-   statyczny konstruktor, moze sprawdzić czy string / number, przychodzący z zewnątrz, jest poprawnym id.
    Mode.get(string) -> Model | null

-   Statyczna analiza jest bardzo uszczelniona. Zalezności pomiędzy funkcjonalnościami przełączają się na typowanie nominalne.

# minusy

-   brak kontroli nad cyklicznościami. Potencjalnie będzie moliwe stworzenie zaleności, ze moduł A zaciaga moduł B a modół B próbuje zaciągnąć moduł A,
    ale niekoiecznie to moze występować podczas tworzenia definicji z modułami.
    Ten przypadek moze być w praktyce ultra rzadki, jak zrobienie nieskończonej pętli.

---

<!-- >> https://medium.com/@Trott/using-worker-threads-in-node-js-80494136dbb6
>> https://web.logicspark.io/how-to-boost-node-js-performance-with-worker-threads/
https://medium.com/@gautamappu0/maximizing-node-js-performance-exploring-the-potential-of-worker-threads-79941c1aa258


Potencjalne rozwiązanie.
Request który ma wygenerować html-a
odpalamy ten request w nowym wątku. Potencjalnie moze to zapewnic izolacje pamięci pomiędzy requestami. (Lepsze bezpieczeństwo ?)

generowanie htmla mozemy przerzucić do wątku


https://www.linkedin.com/pulse/ultimate-guide-nodejs-performance-feat-clustering-pm2-sutradhar/ -->

//wątki są cholernie problematyczne.
//Kazdy wątek, powołuję swoją instancję V8. Moze to być niepotrzebna degradacja wydajności
//bundlery w rózny sposób obsługują te workery. vite nie doczekał się do tej pory obsługi wątków

---

Symbole (trochę odpowiednik cech z rust-a):

const symbolAsString = Symbol("asString");

interface Base {
[symbolAsString]: () => string,
}

const symbolAsString2 = Symbol("asString");

interface Base2 {
[symbolAsString2]: () => string,
}

const serialize1 = <T extends Base>(value: T): string => {
return value[symbolAsString]();
};

const serialize2 = (value: Base): string => {
return value[symbolAsString]();
};

const serialize3 = (value: Base | Base2): string => {
if (symbolAsString2 in value) {
return value[symbolAsString2]();
}

    return value[symbolAsString]();

};

//[Symbol.asyncIterator]() {
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

// const symbolAsString = Symbol('asString');

// const serial = (value: { [symbolAsString]: () => string} | {}): string => {

// if (symbolAsString in value) {
// return value[symbolAsString]();
// }

// return '';
// }

// interface Base {
// [symbolAsString]: () => string;
// }

// const symbolAsString2 = Symbol('asString');

// interface Base2 {
// [symbolAsString2]: () => string;
// }

// const serialize1 = <T extends Base>(value: T): string => {
// return value[symbolAsString]();
// };

// const serialize2 = (value: Base): string => {
// return value[symbolAsString]();
// };

// const serialize3 = (value: Base | Base2): string => {
// if (symbolAsString2 in value) {
// return value[symbolAsString2]();
// }

// return value[symbolAsString]();
// };

//[Symbol.asyncIterator]() {
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
