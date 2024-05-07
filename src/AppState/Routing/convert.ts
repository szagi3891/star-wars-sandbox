import { FilmIdModel } from "../ models/FilmIdModel";
import { PageType } from "./Page";
import { PageIntro } from './PageIntro';

export const urlToUrlParams = (url: string): Array<string> => url.split('/').filter((chunk) => chunk.trim() !== '');

export const convertPageTypeToUrl = (page: PageType): string => {
    if (page.type === 'main') {
        return '/';
    }

    if (page.type === 'character') {
        return `/character/${btoa(page.character)}`;
    }


    if (page.type === 'film') {
        return `/film/${btoa(page.url.url)}`;
    }

    if (page.type === 'intro') {
        return '/intro';
    }

    return '/';
};

export const convertUrlToPageType  = (url: string): PageType => {
    const urlChunks = urlToUrlParams(url);

    if (urlChunks.length === 0) {
        return {
            type: 'main'
        };
    }

    if (urlChunks.length === 1 && urlChunks[0] === 'intro') {
        return {
            type: 'intro',
            subpage: new PageIntro()
        };
    }

    if (urlChunks.length === 2 && urlChunks[0] === 'film') {
        return {
            type: 'film',
            url: FilmIdModel.get(atob(urlChunks[1]))
        };
    }

    if (urlChunks.length === 2 && urlChunks[0] === 'character') {
        return {
            type: 'character',
            character: atob(urlChunks[1])
        };
    }

    return {
        type: 'main'
    };
};
