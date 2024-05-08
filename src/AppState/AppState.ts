import * as React from 'react';
import { Page } from './Routing/Page';
import { Api } from './Api';

export class AppState {
    public readonly api: Api;
    public readonly currentView: Page;

    constructor(currentView: Page) {
        this.currentView = currentView;
        this.api = new Api();
    }
}

//@ts-expect-error
const fakeAppState: AppState = {};

const AppContext = React.createContext<AppState>(fakeAppState);

/*
const defaultAppState: AppState = AppState.createForContext();
const AppContext: React.Context<AppState> = React.createContext(defaultAppState);
*/

export const Provider = AppContext.Provider;

export const useAppStateContext = (): AppState => {
    const state = React.useContext(AppContext);

    if (state === fakeAppState) {
        throw Error('Brak prividera z AppState');
    }

    return state;
};
