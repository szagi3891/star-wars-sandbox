import { PageIntroType } from "./PageIntroType";

export type PageType = {
    readonly type: 'main'
} | {
    readonly type: 'intro';
    readonly page: PageIntroType,
} | {
    readonly type: 'film';
    readonly url: string;
} | {
    readonly type: 'character',
    readonly character: string,
};

