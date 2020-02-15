import { observable } from "mobx";

export type PageIntroType = {
    type: 'view1'
} | {
    type: 'view2'
} | {
    type: 'view3'
};

export class PageIntro {
    @observable view: PageIntroType = {
        type: 'view1',
    };

    redirectTo1 = () => {
        this.view = {
            type: 'view1',
        }
    }

    redirectTo2 = () => {
        this.view = {
            type: 'view2',
        }
    }

    redirectTo3 = () => {
        this.view = {
            type: 'view3',
        }
    }
}
