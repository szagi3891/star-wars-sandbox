import { makeObservable } from "mobx";
import { z } from 'zod';
import { Resource, Result } from "../../utils/Resource";
import { AutoMap } from "../../utils/AutoMap";

const ResponseZod = z.object({
    title: z.string(),
    director: z.string(),
    producer: z.string(),
    created: z.string(),
    characters: z.array(z.string()),
});

export type FilmModelType = z.TypeOf<typeof ResponseZod>;

const getFilm = async (url: string) => {
    // https://swapi.dev/api/films/2/

    const response = await fetch(url); //'https://swapi.dev/api/films');
    const json = await response.json();

    const data = ResponseZod.parse(json);
    return data;
};

export class FilmModel {

    protected nominal: 'nominal' = 'nominal';
    public readonly type: 'FilmModel' = 'FilmModel';

    static mapa: AutoMap<string, FilmModel> = new AutoMap((url) => {
        return new FilmModel(url);
    });

    static get(url: string): FilmModel {
        return FilmModel.mapa.get(url);
    }

    private data: Resource<FilmModelType> = new Resource(() => getFilm(this.url));

    private constructor(private readonly url: string) {
        makeObservable(this);
    }

    public get details(): Result<FilmModelType> {
        return this.data.get();
    }
}