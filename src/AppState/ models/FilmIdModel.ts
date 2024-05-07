import { AutoMapWeak } from "../../utils/AutoMapWeak";


export class FilmIdModel {
    protected nominal: 'nominal' = 'nominal';
    public readonly type: 'FilmIdModel' = 'FilmIdModel';

    static mapa: AutoMapWeak<string, FilmIdModel> = new AutoMapWeak((url) => {
        return new FilmIdModel(url);
    });

    static get(url: string): FilmIdModel {
        return FilmIdModel.mapa.get(url);
    }

    private constructor(public readonly url: string) {
    }
}