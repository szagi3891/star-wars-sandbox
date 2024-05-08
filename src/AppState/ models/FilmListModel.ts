import { makeObservable } from "mobx";
import { z } from 'zod';
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

export interface FilmListModelItemType {
    title: string,
    id: FilmIdModel,
}

const getList = async (): Promise<Array<FilmListModelItemType>> => {
    const response = await fetch('https://swapi.dev/api/films');
    const json = await response.json();

    const data = Response.parse(json);

    return data.results.map(item => ({
        ...item,
        id: FilmIdModel.get(item.url),
    }));
}

export class FilmListModel {
    protected nominal: 'nominal' = 'nominal';

    private static mapa: AutoMapWeak<undefined, FilmListModel> = new AutoMapWeak(() => {
        return new FilmListModel();
    });

    public static get(): FilmListModel {
        return FilmListModel.mapa.get(undefined);
    }

    private data: Resource<Array<FilmListModelItemType>> = new Resource(getList);

    private constructor() {
        makeObservable(this);
    }

    get list(): Result<FilmListModelItemType[]> {
        return this.data.get();
    }
}

