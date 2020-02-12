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
    @observable page: PageType = {
        type: 'main',
    };

    @action redirectToMain = () => {
        this.page = {
            type: 'main'
        };
    }

    @action redirectToIntro = (): PageIntro => {
        const newIntro = new PageIntro();

        this.page = {
            type: 'intro',
            subpage: newIntro
        };

        return newIntro;
    }

    @action redirectToFilm = (filmUrl: string) => {
        this.page = {
            type: 'film',
            url: filmUrl
        };
    }

    @action redirectToCharacter = (character: string) => {
        this.page = {
            type: 'character',
            character,
        };
    }
}