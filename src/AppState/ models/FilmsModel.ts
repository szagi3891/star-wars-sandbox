import { makeObservable } from "mobx";
import { z } from 'zod';
// import { Resource, Result } from "../Models";
import { AutoMapWeak } from "../../utils/AutoMapWeak";
import { FilmIdModel } from "./FilmIdModel";
import { Resource, Result } from "../../utils/Resource";

const FilmZod = z.object({
    title: z.string(),
    url: z.string(),
});

const Response = z.object({
    results: z.array(FilmZod)
});

export interface FilmsModelItemType {
    title: string,
    id: FilmIdModel,
}

const getList = async (): Promise<Array<FilmsModelItemType>> => {
    const response = await fetch('https://swapi.dev/api/films');
    const json = await response.json();

    const data = Response.parse(json);

    return data.results.map(item => ({
        ...item,
        id: FilmIdModel.get(item.url),
    }));
}

export class FilmsModel {
    protected nominal: 'nominal' = 'nominal';
    public readonly type: 'FilmsModel' = 'FilmsModel';

    static mapa: AutoMapWeak<undefined, FilmsModel> = new AutoMapWeak(() => {
        return new FilmsModel();
    });

    static get(): FilmsModel {
        return FilmsModel.mapa.get(undefined);
    }

    private data: Resource<Array<FilmsModelItemType>> = new Resource(getList);

    private constructor() {
        makeObservable(this);
    }

    get list(): Result<FilmsModelItemType[]> {
        return this.data.get();
    }
}

