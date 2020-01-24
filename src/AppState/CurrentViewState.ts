import { observable, action, computed } from 'mobx';
import { PageType } from './CurrentView/type';
import { urlToUrlParams } from './CurrentView/convert';
import { getUuid } from './uuid';

export interface LastViewItemType {
    id: number,
    page: PageType,
}

export interface CurrentViewType {
    mainView: PageType,
    lastView: Array<LastViewItemType>,
    popup: null | PageType
}

const convertCurrentViewToUrl = (currentView: CurrentViewType): string => {
    return `/${btoa(JSON.stringify(currentView))}`;
};

export const convertUrlToCurrentView = (url: string): CurrentViewType => {
    const params = urlToUrlParams(url);

    if (params.length === 0) {
        return {
            mainView: {
                type: 'main'
            },
            lastView: [],
            popup: null
        };
    }

    return JSON.parse(atob(params[0]));         //niebezpieczny kod
};

const pushLastView = (lastView: Array<LastViewItemType>, newPage: PageType): Array<LastViewItemType> => {
    const newLastView = [...lastView, {
        id: getUuid(),
        page: newPage
    }];

    while (newLastView.length > 5) {
        newLastView.shift();
    }

    return newLastView;
};

const setNewMainView = (currentView: CurrentViewType, page: PageType): CurrentViewType => ({
    ...currentView,
    lastView: pushLastView(currentView.lastView, currentView.mainView),
    mainView: page,
});

export class CurrentViewState {

    @observable.ref currentView: CurrentViewType;

    constructor(startView: CurrentViewType) {
        this.currentView = startView;
    }

    @action redirectToMain = () => {
        this.currentView = setNewMainView(this.currentView, {
            type: 'main'
        });
    }

    @action redirectToIntro = () => {
        this.currentView = setNewMainView(this.currentView, {
            type: 'intro'
        });
    }

    @action redirectToFilm = (filmUrl: string) => {
        this.currentView = setNewMainView(this.currentView, {
            type: 'film',
            url: filmUrl
        });
    }

    @action redirectToCharacter = (character: string) => {
        this.currentView = this.currentView = setNewMainView(this.currentView, {
            type: 'character',
            character,
        });
    }

    @action showPopup(id: PageType) {
        this.currentView = {
            ...this.currentView,
            popup: id
        };
    }

    @action hidePopup = () => {
        this.currentView = {
            ...this.currentView,
            popup: null
        };
    }

    @action setCurrentView(currentView: CurrentViewType) {
        console.info('Ustawiam currentView', currentView);
        this.currentView = currentView;
    }

    @computed get windowLocation(): string {
        return convertCurrentViewToUrl(this.currentView);
    }


    @computed.struct get revertLastView(): Array<LastViewItemType> {
        const lastView = this.currentView.lastView.concat([]);
        lastView.reverse();
        return lastView;
    }


    static createForContext(): CurrentViewState {
        return new CurrentViewState({
            mainView: {
                type: 'main'
            },
            lastView: [],
            popup: null
        });
    }
}
