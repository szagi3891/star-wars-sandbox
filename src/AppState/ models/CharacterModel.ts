import { makeObservable } from 'mobx';
import { z } from 'zod';
import { FilmIdModel } from './FilmIdModel';
import { Resource, Result } from '../../utils/Resource';
import { Api } from '../Api';
import { createAutoWeakMap } from '../../utils/createMap';

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

export class CharacterModel {
    protected nominal?: never;
    private data: Resource<CharacterModelType> = new Resource(() => getCharacter(this.api, this.url));

    public static get = createAutoWeakMap((api: Api, url: string) => new CharacterModel(api, url));
    private constructor(private readonly api: Api, private readonly url: string) {
        makeObservable(this);
    }

    public get details(): Result<CharacterModelType> {
        return this.data.get();
    }
}
