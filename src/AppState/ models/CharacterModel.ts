import { makeObservable } from 'mobx';
import { AutoMap } from '../../utils/AutoMap';
import { z } from 'zod';
import { FilmIdModel } from './FilmIdModel';
import { Resource, Result } from '../../utils/Resource';
import { Api } from '../Api';

const CharacterZod = z.object({
    name: z.string(),
    films: z.array(z.string()),
});

export interface CharacterModelType {
    name: string;
    films: Array<FilmIdModel>;
}

const getCharacter = async (api: Api, url: string) => {
    // https://swapi.dev/api/films/2/

    const response = await fetch(url); //'https://swapi.dev/api/films');
    const json = await response.json();

    const data = CharacterZod.parse(json);
    return {
        ...data,
        films: data.films.map((url) => FilmIdModel.get(api, url)),
    };
};

const symbolAsString = Symbol('asString');

export class CharacterModel {
    protected nominal?: never;

    private static mapa: AutoMap<[Api, string], CharacterModel> = new AutoMap(([api, url]) => {
        return new CharacterModel(api, url);
    });

    public static get(api: Api, url: string): CharacterModel {
        return CharacterModel.mapa.get([api, url]);
    }

    private data: Resource<CharacterModelType> = new Resource(() => getCharacter(this.api, this.url));

    private constructor(private readonly api: Api, private readonly url: string) {
        makeObservable(this);
    }

    public get details(): Result<CharacterModelType> {
        return this.data.get();
    }

    [symbolAsString](): string {
        return '';
    }
}

// interface Base {
//     [symbolAsString]: () => string;
// }

// const symbolAsString2 = Symbol('asString');

// interface Base2 {
//     [symbolAsString2]: () => string;
// }

// const serialize1 = <T extends Base>(value: T): string => {
//     return value[symbolAsString]();
// };

// const serialize2 = (value: Base): string => {
//     return value[symbolAsString]();
// };

// const serialize3 = (value: Base | Base2): string => {
//     if (symbolAsString2 in value) {
//         return value[symbolAsString2]();
//     }

//     return value[symbolAsString]();
// };

//[Symbol.asyncIterator]() {
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of
