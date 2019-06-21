import * as React from 'react';
import { Models } from './Models';
import { CurrentViewState } from './CurrentViewState';

export class AppState {

    readonly currentView: CurrentViewState = new CurrentViewState();
    readonly models: Models = new Models();

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
