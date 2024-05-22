import { autoWeakMapKey } from '@reactive/utils';
// import { nanoid } from 'nanoid';

export class Api {
    protected nominal?: never;

    [autoWeakMapKey] = (): void => {};

    public constructor() {}
}
