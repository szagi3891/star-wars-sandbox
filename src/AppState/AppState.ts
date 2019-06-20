import * as React from 'react';
import { observable, action } from 'mobx';
import { Models } from './Models';

type CurrentViewMain = {
    type: 'main'
};

type CurrentViewFilm = {
    type: 'film',
    filmUrl: string
};

type CurrentView = CurrentViewMain | CurrentViewFilm;

export class AppState {

    readonly models: Models = new Models();

    @observable currentView: CurrentView = {
        type: 'main'
    };

    static createForContext(): AppState {
        return new AppState();
    }

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
}

const AppContext = React.createContext(AppState.createForContext());

export const Consumer = AppContext.Consumer;
export const Provider = AppContext.Provider;

export class AppStateComponent<PropsType = {}, StateType = {}> extends React.Component<PropsType, StateType> {
    static contextType = AppContext;

    get appState(): AppState {
        //Fix for "any" type
        return this.context;
    }
}
