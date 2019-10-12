import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { Provider, AppState } from './AppState/AppState';
import { stringToCurrentView, CurrentViewState } from './AppState/CurrentViewState';
import { autorun } from 'mobx';

const currentView = stringToCurrentView(window.location.pathname);
const router = new CurrentViewState(currentView);
const appState = new AppState(router);

autorun(() => {
    const newUrl = router.windowLocation;

    if (window.location.pathname === newUrl) {
        console.info(`Url ignore ${newUrl}`);
    } else {
        console.info('Url set', newUrl);
        //@ ts-ignore
        window.history.pushState({a: 'Skojarzone dane'}, 'Title', newUrl);
    }
});

window.onpopstate = function(event: any) {
    console.info('on pop state', event.state);

    const currentView = stringToCurrentView(window.location.pathname);
    router.setCurrentView(currentView);
};

ReactDOM.render((
    <Provider value={appState}>
        <App />
    </Provider>
), document.getElementById('root'));

