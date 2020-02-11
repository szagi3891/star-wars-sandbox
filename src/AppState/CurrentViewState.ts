import { observable, action, computed } from 'mobx';
import { PageType } from './Routing/Page';
import { urlToUrlParams } from './Routing/convert';

const convertCurrentViewToUrl = (currentView: PageType): string => {
    return `/${btoa(JSON.stringify(currentView))}`;
};

export const convertUrlToCurrentView = (url: string): PageType => {
    const params = urlToUrlParams(url);

    if (params.length === 0) {
        return {
            type: 'main'
        };
    }

    return JSON.parse(atob(params[0]));         //niebezpieczny kod
};

export class CurrentViewState {

    @observable.ref currentView: PageType;

    constructor(startView: PageType) {
        this.currentView = startView;
    }

    @action redirectToMain = () => {
        this.currentView = {
            type: 'main'
        };
    }

    @action redirectToIntro = () => {
        this.currentView = {
            type: 'intro',
            page: {
                type: 'view1'
            }
        };
    }

    @action redirectToFilm = (filmUrl: string) => {
        this.currentView = {
            type: 'film',
            url: filmUrl
        };
    }

    @action redirectToCharacter = (character: string) => {
        this.currentView = {
            type: 'character',
            character,
        };
    }

    @action setCurrentView(currentView: PageType) {
        console.info('Ustawiam currentView', currentView);
        this.currentView = currentView;
    }

    @computed get windowLocation(): string {
        return convertCurrentViewToUrl(this.currentView);
    }


    static createForContext(): CurrentViewState {
        return new CurrentViewState({
            type: 'main'
        });
    }
}
