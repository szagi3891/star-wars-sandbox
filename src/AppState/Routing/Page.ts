import { CharacterIdModel } from "../ models/CharacterIdModel";
import { FilmIdModel } from "../ models/FilmIdModel";
import { PageIntro } from "./PageIntro";
import { observable, action, makeObservable } from "mobx";

export type PageType = {
    readonly type: 'main'
} | {
    readonly type: 'intro';
    readonly subpage: PageIntro
} | {
    readonly type: 'film';
    readonly url: FilmIdModel;
} | {
    readonly type: 'character',
    readonly character: CharacterIdModel,
};

export class Page {
    constructor() {
        makeObservable(this);
    }
    @observable view: PageType = {
        type: 'main',
    };

    @action redirectToMain = () => {
        this.view = {
            type: 'main'
        };
    }

    @action redirectToIntro = (): PageIntro => {
        const newIntro = new PageIntro();

        this.view = {
            type: 'intro',
            subpage: newIntro
        };

        return newIntro;
    }

    @action redirectToFilm = (filmUrl: FilmIdModel) => {
        this.view = {
            type: 'film',
            url: filmUrl
        };
    }

    @action redirectToCharacter = (character: CharacterIdModel) => {
        this.view = {
            type: 'character',
            character,
        };
    }
}