import * as React from 'react';
import { Models } from './Models';
import { CurrentViewState } from './CurrentViewState';

export class AppState {

    readonly currentView: CurrentViewState;
    readonly models: Models = new Models();

    constructor(currentView: CurrentViewState) {
        this.currentView = currentView;
        this.models = new Models();
    }

    static createForContext(): AppState {
        return new AppState(
            CurrentViewState.createForContext()
        );
    }
}

const AppContext = React.createContext(AppState.createForContext());

export const Provider = AppContext.Provider;

export class AppStateComponent<PropsType = {}, StateType = {}> extends React.Component<PropsType, StateType> {
    static contextType = AppContext;

    get appState(): AppState {
        //Fix for "any" type
        return this.context;
    }
}
