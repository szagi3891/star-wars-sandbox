import { autoMapKeyAsString } from '../utils/AutoMap';
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
}
