import { autoWeakMapKey } from '../utils/AutoWeakMap';
// import { nanoid } from 'nanoid';

export class Api {
    protected nominal?: never;

    [autoWeakMapKey] = (): void => {};

    public constructor() {}
}
