import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Provider, AppState } from './AppState/AppState';
// import { CurrentViewState/*, convertUrlToCurrentView*/ } from './AppState/CurrentViewState';
// import { autorun } from 'mobx';
import { Page } from './AppState/Routing/Page';

const page = new Page();
const appState = new AppState(page);


//const currentView = convertUrlToCurrentView(window.location.pathname);
//const router = new CurrentViewState(currentView);
//const appState = new AppState(router);

// autorun(() => {
//     const newUrl = router.windowLocation;

//     if (window.location.pathname === newUrl) {
//         console.info(`Url ignore ${newUrl}`);
//     } else {
//         console.info('Url set', newUrl);
//         //@ ts-ignore
//         window.history.pushState({a: 'Skojarzone dane'}, 'Title', newUrl);
//     }
// });

// window.onpopstate = function(event: any) {
//     console.info('on pop state', event.state);

//     const currentView = convertUrlToCurrentView(window.location.pathname);
//     router.setCurrentView(currentView);
// };

const root = document.getElementById('root');

if (root === null) {
    console.error('Brakuje root');
} else {
    createRoot(root).render(
        <Provider value={appState}>
            <App />
        </Provider>
    );
}
