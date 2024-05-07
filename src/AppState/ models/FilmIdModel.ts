import { AutoMap } from "../../utils/AutoMap";
import { FilmModel } from "./FilmModel";


export class FilmIdModel {
    protected nominal: 'nominal' = 'nominal';
    public readonly type: 'FilmIdModel' = 'FilmIdModel';

    static mapa: AutoMap<string, FilmIdModel> = new AutoMap((url) => {
        return new FilmIdModel(url);
    });

    static get(url: string): FilmIdModel {
        return FilmIdModel.mapa.get(url);
    }

    private constructor(public readonly url: string) {
    }

    public model(): FilmModel {
        return FilmModel.get(this.url);
    }
}