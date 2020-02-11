
export type PageType = {
    readonly type: 'main'
} | {
    readonly type: 'intro';
} | {
    readonly type: 'film';
    readonly url: string;
} | {
    readonly type: 'character',
    readonly character: string,
};

