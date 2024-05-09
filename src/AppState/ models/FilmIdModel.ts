import { Api } from '../Api';
import { FilmModel } from './FilmModel';
import { modelConstruct } from '../../utils/modelConstruct';

export class FilmIdModel {
    protected nominal?: never;

    public static get = modelConstruct((api: Api, url: string) => new FilmIdModel(api, url));
    private constructor(private readonly api: Api, public readonly url: string) {}

    public model(): FilmModel {
        return FilmModel.get(this.api, this.url);
    }
}
