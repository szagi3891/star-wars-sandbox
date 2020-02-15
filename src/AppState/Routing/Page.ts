import { PageIntro } from "./PageIntro";
import { observable, action } from "mobx";

export type PageType = {
    readonly type: 'main'
} | {
    readonly type: 'intro';
    readonly subpage: PageIntro
} | {
    readonly type: 'film';
    readonly url: string;
} | {
    readonly type: 'character',
    readonly character: string,
};

export class Page {
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

    @action redirectToFilm = (filmUrl: string) => {
        this.view = {
            type: 'film',
            url: filmUrl
        };
    }

    @action redirectToCharacter = (character: string) => {
        this.view = {
            type: 'character',
            character,
        };
    }
}