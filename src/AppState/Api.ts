import { autoMapContextSubscribe, autoMapKeyAsString } from '../utils/AutoMap';
// import { nanoid } from 'nanoid';

export class Api {
    protected nominal?: never;
    private readonly id: string;

    public constructor() {
        // this.id = nanoid();
        //TODO - przywrócić generowanie idka
        this.id = 'dasdas';
    }

    public [autoMapKeyAsString](): string {
        return this.id;
    }

    public [autoMapContextSubscribe](callback: () => void): void {
        

        //TODO - rejestracja
    }

    //TODO - akcja odpalająca czyszczenie, powinny zostać wywołane callacki, które pousuwają te obiekty z automapy

    //jeśli na serwerze, będą uruchomione jakieś timery, one mogą chcieć tworzyć nowe obiekty

    //jeśli oznaczymy w tym obiekcie Api, ze jest juz wyłączony, to kolejna próba zarejestrowania nowego
    //obiektu w tym kontekście od razu spowoduje wyrejestrowanie tego obiektu
}
