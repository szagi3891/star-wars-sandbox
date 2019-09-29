import { observable, action, computed } from 'mobx';

type CurrentViewMain = {
    type: 'main'
};

type CurrentViewFilm = {
    type: 'film',
    filmUrl: string
};

type CurrentViewCharacter = {
    type: 'character',
    character: string
};

export type CurrentView = CurrentViewMain | CurrentViewFilm | CurrentViewCharacter;

const buildMainState = (): CurrentViewMain => ({
    type: 'main'
});

const buildFilmState = (filmUrl: string): CurrentViewFilm => ({
    type: 'film',
    filmUrl
});

const buildCharacterState = (character: string): CurrentViewCharacter => ({
    type: 'character',
    character
});

export class CurrentViewState {

    @observable currentView: CurrentView;

    constructor(startView: CurrentView) {
        this.currentView = startView;
    }

    @action redirectToMain = () => {
        this.currentView = {
            type: 'main'
        };
    }

    @action redirectToFilm = (filmUrl: string) => {
        this.currentView = buildFilmState(filmUrl);
    }

    @action redirectToCharacter = (character: string) => {
        this.currentView = {
            type: 'character',
            character
        };
    }

    @action setCurrentView(currentView: CurrentView) {
        this.currentView = currentView;
    }

    @computed get windowLocation(): string {
        return currentViewToString(this.currentView);
    }

    static createForContext(): CurrentViewState {
        return new CurrentViewState(
            buildMainState()
        );
    }
}

export const currentViewToString = (currentView: CurrentView) => {
    if (currentView.type === 'film') {
        return `/film/${btoa(currentView.filmUrl)}`;
    }

    if (currentView.type === 'character') {
        return `/profil/${btoa(currentView.character)}`;
    }

    return '/';
};

export const stringToCurrentView = (url: string): CurrentView => {
    const chunks = url.split('/').filter((chunk) => chunk.trim() !== '');

    if (chunks.length === 2) {
        const [main, param] = chunks;

        if (main === 'film') {
            return buildFilmState(atob(param));
        }

        if (main === 'profil') {
            return buildCharacterState(atob(param));
        }
    }

    return buildMainState();
};