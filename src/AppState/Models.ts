import { FilmListModel } from "./ models/FilmListModel";
import { Api } from "./Api";

export class Models {

    constructor(private readonly api: Api) {
        
    }

    get filmList(): FilmListModel {
        return FilmListModel.get(this.api);
    }
}