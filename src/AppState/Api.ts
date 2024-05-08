import { autoMapContextSubscribe, autoMapKeyAsString } from '../utils/AutoMap';
// import { nanoid } from 'nanoid';

export class Api {
    protected nominal?: never;
    private readonly id: string;

    private callbacks: Array<() => void> | null;

    public constructor() {
        // this.id = nanoid();
        //TODO - przywrócić generowanie idka
        this.id = 'dasdas';

        this.callbacks = [];
    }

    public [autoMapKeyAsString](): string {
        return this.id;
    }

    public [autoMapContextSubscribe](callback: () => void): void {
        if (this.callbacks === null) {
            callback();
            return;
        }
    
        this.callbacks.push(callback);
    }

    public shoutdown(): void {
        const callbacks = this.callbacks;
        this.callbacks = null;

        for (const callback of callbacks ?? []) {
            callback();
        }
    }
}
