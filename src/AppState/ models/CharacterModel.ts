import { makeObservable } from "mobx";
import { AutoMap } from "../../utils/AutoMap";
import { z } from 'zod';
import { FilmIdModel } from "./FilmIdModel";
import { Resource, Result } from "../../utils/Resource";

const CharacterZod = z.object({
    name: z.string(),
    films: z.array(z.string()),
});

export interface CharacterModelType {
    name: string,
    films: Array<FilmIdModel>,
}

const getCharacter = async (url: string) => {
    // https://swapi.dev/api/films/2/

    const response = await fetch(url); //'https://swapi.dev/api/films');
    const json = await response.json();

    const data = CharacterZod.parse(json);
    return {
        ...data,
        films: data.films.map(url => FilmIdModel.get(url))
    };
};

export class CharacterModel {

    protected nominal: 'nominal' = 'nominal';
    public readonly type: 'CharacterModel' = 'CharacterModel';

    static mapa: AutoMap<string, CharacterModel> = new AutoMap((url) => {
        return new CharacterModel(url);
    });

    static get(url: string): CharacterModel {
        return CharacterModel.mapa.get(url);
    }

    private data: Resource<CharacterModelType> = new Resource(() => getCharacter(this.url));

    private constructor(private readonly url: string) {
        makeObservable(this);
    }

    public get details(): Result<CharacterModelType> {
        return this.data.get();
    }
}