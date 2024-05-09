import { AutoMap } from '../../utils/AutoMap';
import { Api } from '../Api';
import { AutoWeakMap } from '../../utils/AutoWeakMap';
import { FilmModel } from './FilmModel';

export class FilmIdModel {
    protected nominal?: never;

    private static data: AutoWeakMap<Api, AutoMap<string, FilmIdModel>> = new AutoWeakMap(
        (api) => new AutoMap((url) => new FilmIdModel(api, url))
    );

    public static get(api: Api, url: string): FilmIdModel {
        return FilmIdModel.data.get(api).get(url);
    }

    private constructor(private readonly api: Api, public readonly url: string) {}

    public model(): FilmModel {
        return FilmModel.get(this.api, this.url);
    }
}
