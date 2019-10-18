import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { Provider, AppState } from './AppState/AppState';
import { CurrentViewState } from './AppState/CurrentViewState';
import { autorun } from 'mobx';
import * as t from 'io-ts';
import { buildValidator } from './buildValidator';
import { LocalStorageItemState } from './AppState/LocalStorageItemState';

const item = LocalStorageItemState.from(
    localStorage.getItem('jakis_klucz')
);

autorun(() => {
    localStorage.setItem('jakis_klucz', item.toLocalStorage())
});


const VIO = t.interface({
    a: t.interface({
        b: t.number
    })
})

const decode = buildValidator('VIO', VIO, true);

const result = decode({
    a: {
        b: null
    }
});

if (result instanceof Error) {
    console.error(result);
}

/*
const result2 = decode({
    a: {
        b: 3
    }
});
*/
const result2 = decode(null);

if (result2 instanceof Error) {
    console.error(result2);
}

const currentView = CurrentViewState.match(window.location.pathname);
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

    const currentView = CurrentViewState.match(window.location.pathname);
    router.setCurrentView(currentView);
};

ReactDOM.render((
    <Provider value={appState}>
        <App />
    </Provider>
), document.getElementById('root'));

