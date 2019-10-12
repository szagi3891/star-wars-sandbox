import { observable, action, computed } from 'mobx';

export class CurrentViewMain {
    readonly type: 'ClassCurrentViewMain' = 'ClassCurrentViewMain';
};

export class CurrentViewIntro {
    readonly type: 'ClassCurrentViewIntro' = 'ClassCurrentViewIntro';
}

export class CurrentViewFilm {
    readonly type: 'ClassCurrentViewFilm' = 'ClassCurrentViewFilm';
    readonly filmUrl: string;

    constructor(filmUrl: string) {
        this.filmUrl = filmUrl;
    }
};

export class CurrentViewCharacter {
    readonly type: 'ClassCurrentViewCharacter' = 'ClassCurrentViewCharacter';
    readonly character: string;

    constructor(character: string) {
        this.character = character;
    }
};

export type CurrentView = CurrentViewMain | CurrentViewIntro | CurrentViewFilm | CurrentViewCharacter;

export class CurrentViewState {

    @observable currentView: CurrentView;

    constructor(startView: CurrentView) {
        this.currentView = startView;
    }

    @action redirectToMain = () => {
        this.currentView = new CurrentViewMain();
    }

    @action redirectToIntro = () => {
        this.currentView = new CurrentViewIntro();
    }

    @action redirectToFilm = (filmUrl: string) => {
        this.currentView = new CurrentViewFilm(filmUrl);
    }

    @action redirectToCharacter = (character: string) => {
        this.currentView = new CurrentViewCharacter(character);
    }

    @action setCurrentView(currentView: CurrentView) {
        this.currentView = currentView;
    }

    @computed get windowLocation(): string {
        return currentViewToString(this.currentView);
    }

    static createForContext(): CurrentViewState {
        return new CurrentViewState(
            new CurrentViewMain()
        );
    }
}

export const currentViewToString = (currentView: CurrentView) => {
    if (currentView instanceof CurrentViewFilm) {
        return `/film/${btoa(currentView.filmUrl)}`;
    }

    if (currentView instanceof CurrentViewCharacter) {
        return `/profil/${btoa(currentView.character)}`;
    }

    return '/';
};

export const stringToCurrentView = (url: string): CurrentView => {
    const chunks = url.split('/').filter((chunk) => chunk.trim() !== '');

    if (chunks.length === 2) {
        const [main, param] = chunks;

        if (main === 'film') {
            return new CurrentViewFilm(atob(param));
        }

        if (main === 'profil') {
            return new CurrentViewFilm(atob(param));
        }
    }

    return new CurrentViewMain();
};