import { observable, action, makeObservable } from 'mobx';
import { Page } from './Routing/Page';
//import { urlToUrlParams } from './Routing/convert';

// const convertCurrentViewToUrl = (page: Page): string => {
//     return `/${btoa(JSON.stringify(page.page))}`;
// };

// export const convertUrlToCurrentView = (url: string): PageType => {
//     const params = urlToUrlParams(url);

//     if (params.length === 0) {
//         return {
//             type: 'main'
//         };
//     }

//     return JSON.parse(atob(params[0]));         //niebezpieczny kod
// };

export class CurrentViewState {

    @observable.ref page: Page;

    constructor(startView: Page) {
        makeObservable(this);
        this.page = startView;
    }

    @action setCurrentView(page: Page) {
        console.info('Ustawiam currentView', page);
        this.page = page;
    }

    // @computed get windowLocation(): string {
    //     return convertCurrentViewToUrl(this.currentView);
    // }


    static createForContext(): CurrentViewState {
        return new CurrentViewState(new Page());
    }
}
