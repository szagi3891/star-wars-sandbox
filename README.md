


# Plusy
  - brak centralnego miejsca na modele. Statyczny konstruktór / getter mozna wykonać z dowolnego miejsca w kodzie dzięki temu
    ze instancje są przechowywane w zmiennej statycznej

  - statyczny konstruktor, moze sprawdzić czy string / number, przychodzący z zewnątrz, jest poprawnym id.
    Mode.get(string) -> Model | null

  - Statyczna analiza jest bardzo uszczelniona. Zalezności pomiędzy funkcjonalnościami przełączają się na typowanie nominalne.

# minusy
  - brak kontroli nad cyklicznościami. Potencjalnie będzie moliwe stworzenie zaleności, ze moduł A zaciaga moduł B a modół B próbuje zaciągnąć moduł A,
    ale niekoiecznie to moze występować podczas tworzenia definicji z modułami.
    Ten przypadek moze być w praktyce ultra rzadki, jak zrobienie nieskończonej pętli.


----


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

