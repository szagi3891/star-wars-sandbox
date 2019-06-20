import { observable } from "mobx";
import { getFilms, FilmItemType, getFilmItem } from "./api";

type ResultLoading = {
    type: 'loading'
}

type ResultReady<T> = {
    type: 'ready',
    value: T
};

type Result<T> = ResultLoading | ResultReady<T>;

class Resource<T> {
    readonly getValue: () => Promise<T>;
    @observable value: null | Result<T>;

    constructor(getValue: () => Promise<T>) {
        this.getValue = getValue;
        this.value = null;
    }

    get(): Result<T> {
        if (this.value === null) {
            this.value = {
                type: 'loading'
            };

            (async () => {
                const value = await this.getValue();
                this.value = {
                    type: 'ready',
                    value: value
                };
            })();
        }

        return this.value;
    }
}

class MobxAutoNew<K, V> {
    private create: (key: K) => V;
    private data: Map<K, V> = new Map();

    constructor(create: (key: K) => V) {
        this.create = create;
    }

    get(key:K): V {
        const item = this.data.get(key);
        if (item) {
            return item;
        }

        const newItem = this.create(key);
        this.data.set(key, newItem);
        return newItem;
    }
}

export class Models {

    readonly films: Resource<Array<string>> = new Resource(getFilms);
    readonly filmItem: MobxAutoNew<string, Resource<FilmItemType>> = new MobxAutoNew(
        (filmUrl: string) => new Resource(
            () => getFilmItem(filmUrl)
        )
    );
}


