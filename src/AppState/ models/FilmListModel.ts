import { makeObservable } from 'mobx';
import { z } from 'zod';
import { FilmIdModel } from './FilmIdModel';
import { Resource, ResourceResult, AutoWeakMap } from '@reactive/utils';
import { Api } from '../Api';

const FilmZod = z.object({
    title: z.string(),
    url: z.string(),
});

const Response = z.object({
    results: z.array(FilmZod),
});

export interface FilmListModelItemType {
    title: string;
    id: FilmIdModel;
}

const getList = async (api: Api): Promise<Array<FilmListModelItemType>> => {
    const response = await fetch('https://swapi.dev/api/films');
    const json = await response.json();

    const data = Response.parse(json);

    return data.results.map((item) => ({
        ...item,
        id: FilmIdModel.get(api, item.url),
    }));
};

export class FilmListModel {
    protected nominal?: never;
    private data: Resource<Array<FilmListModelItemType>> = new Resource(() => getList(this.api));

    public static get = AutoWeakMap.create((api: Api) => new FilmListModel(api));
    private constructor(private readonly api: Api) {
        makeObservable(this);
    }

    get list(): ResourceResult<FilmListModelItemType[]> {
        return this.data.get();
    }
}
