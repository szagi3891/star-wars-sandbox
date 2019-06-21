import { observable, action } from 'mobx';

type CurrentViewMain = {
    type: 'main'
};

type CurrentViewFilm = {
    type: 'film',
    filmUrl: string
};

type CurrentViewCharacter = {
    type: 'character',
    filmUrl: string
};

type CurrentView = CurrentViewMain | CurrentViewFilm | CurrentViewCharacter;

export class CurrentViewState {

    @observable currentView: CurrentView = {
        type: 'main'
    };


    @action redirectToMain = () => {
        this.currentView = {
            type: 'main'
        };
    }

    @action redirectToFilm = (filmUrl: string) => {
        this.currentView = {
            type: 'film',
            filmUrl
        };
    }

    @action redirectToCharacter = (filmUrl: string) => {
        this.currentView = {
            type: 'character',
            filmUrl
        };
    }
}