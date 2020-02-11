import { observable } from "mobx";

export type PageIntroType = {
    type: 'view1'
} | {
    type: 'view2'
} | {
    type: 'view3'
};

export class PageIntro {
    @observable page: PageIntroType = {
        type: 'view1',
    };

    redirectTo1 = () => {
        this.page = {
            type: 'view1',
        }
    }

    redirectTo2 = () => {
        this.page = {
            type: 'view2',
        }
    }

    redirectTo3 = () => {
        this.page = {
            type: 'view3',
        }
    }
}
