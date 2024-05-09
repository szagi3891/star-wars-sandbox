import { makeObservable } from 'mobx';
import { z } from 'zod';
import { Resource, Result } from '../../utils/Resource';
import { CharacterIdModel } from './CharacterIdModel';
import { Api } from '../Api';
import { modelConstruct } from '../../utils/modelConstruct';

const ResponseZod = z.object({
    title: z.string(),
    director: z.string(),
    producer: z.string(),
    created: z.string(),
    characters: z.array(z.string()),
});

export type FilmModelType = {
    title: string;
    director: string;
    producer: string;
    created: string;
    characters: Array<CharacterIdModel>;
};

const getFilm = async (api: Api, url: string) => {
    // https://swapi.dev/api/films/2/

    const response = await fetch(url); //'https://swapi.dev/api/films');
    const json = await response.json();

    const data = ResponseZod.parse(json);
    return {
        ...data,
        characters: data.characters.map((url) => CharacterIdModel.get(api, url)),
    };
};

export class FilmModel {
    protected nominal?: never;
    // public static get = modelConstruct<Api, [string], FilmModel>((api, url) => new FilmModel(api, url));
    public static get = modelConstruct((api: Api, url: string) => new FilmModel(api, url));

    private data: Resource<FilmModelType> = new Resource(() => getFilm(this.api, this.url));

    private constructor(private readonly api: Api, private readonly url: string) {
        makeObservable(this);
    }

    public get details(): Result<FilmModelType> {
        return this.data.get();
    }
}
