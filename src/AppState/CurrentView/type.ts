
export interface PageMainType {
    readonly type: 'main'
};

export interface PageIntroType {
    readonly type: 'intro';
}

export interface PageFilmType {
    readonly type: 'film';
    readonly url: string;
};

export interface PageCharacterType {
    readonly type: 'character',
    readonly character: string,
};

export type PageType = PageMainType | PageIntroType | PageFilmType | PageCharacterType;
