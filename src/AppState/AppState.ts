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

/*
const defaultAppState: AppState = AppState.createForContext();
const AppContext: React.Context<AppState> = React.createContext(defaultAppState);
*/

export const Provider = AppContext.Provider;


export const useAppStateContext = (): AppState => {
    return React.useContext(AppContext);
};