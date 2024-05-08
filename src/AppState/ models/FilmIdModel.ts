import { AutoMap } from '../../utils/AutoMap';
import { Api } from '../Api';
import { FilmModel } from './FilmModel';

export class FilmIdModel {
    protected nominal?: never;

    private static mapa: AutoMap<[Api, string], FilmIdModel> = new AutoMap(([api, url]) => {
        return new FilmIdModel(api, url);
    });

    public static get(api: Api, url: string): FilmIdModel {
        return FilmIdModel.mapa.get([api, url]);
    }

    private constructor(private readonly api: Api, public readonly url: string) {}

    public model(): FilmModel {
        return FilmModel.get(this.api, this.url);
    }
}
