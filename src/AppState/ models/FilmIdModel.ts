import { Api } from '../Api';
import { FilmModel } from './FilmModel';
import { AutoMap, AutoWeakMap } from '@reactive/utils';

export class FilmIdModel {
    protected nominal?: never;

    public static get = AutoWeakMap.create((api: Api, url: string) => new FilmIdModel(api, url));
    private constructor(private readonly api: Api, public readonly url: string) {}

    public model(): FilmModel {
        return FilmModel.get(this.api, this.url);
    }
}

export class Path {
    protected nominal?: never;
    public static get = AutoMap.create((url: Array<string>) => new Path(url));
    private constructor(public readonly path: Array<string>) {}
}

export class Path2 {
    protected nominal?: never;
    public static get = AutoMap.create((url: Array<string>, age: number) => new Path2(url, age));
    private constructor(public readonly path: Array<string>, _age: number) {}
}

export class Path3 {
    protected nominal?: never;
    public static get = AutoMap.create((age: number) => new Path3(age));
    private constructor(_age: number) {}
}
