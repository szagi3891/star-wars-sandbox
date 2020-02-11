import * as React from 'react';
import { Models } from './Models';
import { Page } from './Routing/Page';

export class AppState {

    readonly currentView: Page;
    readonly models: Models = new Models();

    constructor(currentView: Page) {
        this.currentView = currentView;
        this.models = new Models();
    }

    static createForContext(): AppState {
        return new AppState(
            new Page()
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