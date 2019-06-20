import * as React from 'react';
import { observable } from 'mobx';
import { getFilms } from './api';
import { Models } from './Models';

type CurrentViewMain = {
    type: 'main'
};

type CurrentView = CurrentViewMain;

export class AppState {

    readonly models: Models = new Models();

    @observable currentView: CurrentView = {
        type: 'main'
    };

    static createForContext(): AppState {
        return new AppState();
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

const run = async () => {
    const fils = await getFilms();
}

run().then(() => {
    console.info('end');
}).catch((err) => {
    console.error(err);
});

