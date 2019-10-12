import { observable, action, computed } from 'mobx';

const urlToUrlParams = (url: string): Array<string> => url.split('/').filter((chunk) => chunk.trim() !== '');

const tryMatch = <T>(urlChunks: Array<string>, tryList: Array<(urlChunks: Array<string>) => T | null>): T | null => {
    for (const tryItem of tryList) {
        const match = tryItem(urlChunks);

        if (match !== null) {
            return match;
        }
    }

    return null;
}

const getFromUrlChunks1 = <T>(
    urlChunks: Array<string>,
    fnMatch: (param1: string, rest: Array<string>) => T | null
): T | null => {
    if (urlChunks.length >= 1) {
        return fnMatch(urlChunks[0], urlChunks.slice(1));
    }

    return null;
}

const getFromUrlChunks2 = <T>(
    urlChunks: Array<string>,
    fnMatch: (param1: string, param2: string, rest: Array<string>) => T | null
): T | null => {
    if (urlChunks.length >= 2) {
        return fnMatch(urlChunks[0], urlChunks[1], urlChunks.slice(2));
    }

    return null;
}


export class CurrentViewMain {
    //@ts-ignore
    private type: 'ClassCurrentViewMain' = 'ClassCurrentViewMain';

    toUrlChunks(): Array<string> {
        return [];
    }

    static tryMatch(_urlChunks: Array<string>): CurrentViewMain | null {
        return new CurrentViewMain();
    }
};

export class CurrentViewIntro {
    //@ts-ignore
    private readonly type: 'ClassCurrentViewIntro' = 'ClassCurrentViewIntro';

    toUrlChunks(): Array<string> {
        return ['intro'];
    }

    static tryMatch(urlChunks: Array<string>): CurrentViewIntro | null {
        return getFromUrlChunks1(urlChunks, (param1: string, _rest: Array<string>) => {
            if (param1 === 'intro') {
                return new CurrentViewIntro();
            }

            return null;
        });
    }
}

export class CurrentViewFilm {
    //@ts-ignore
    private readonly type: 'ClassCurrentViewFilm' = 'ClassCurrentViewFilm';
    readonly filmUrl: string;

    constructor(filmUrl: string) {
        this.filmUrl = filmUrl;
    }

    toUrlChunks(): Array<string> {
        return [
            'film',
            btoa(this.filmUrl)
        ];
    }

    static tryMatch(urlChunks: Array<string>): CurrentViewFilm | null {
        return getFromUrlChunks2(urlChunks, (param1: string, param2: string, _rest: Array<string>) => {
            if (param1 === 'film') {
                return new CurrentViewFilm(atob(param2));
            }

            return null;
        });
    }
};

export class CurrentViewCharacter {
    //@ts-ignore
    private readonly type: 'ClassCurrentViewCharacter' = 'ClassCurrentViewCharacter';
    readonly character: string;

    constructor(character: string) {
        this.character = character;
    }

    toUrlChunks(): Array<string> {
        return [
            'profil',
            btoa(this.character)
        ];
    }

    static tryMatch(urlChunks: Array<string>): CurrentViewCharacter | null {
        return getFromUrlChunks2(urlChunks, (param1: string, param2: string, _rest: Array<string>) => {
            if (param1 === 'profil') {
                return new CurrentViewCharacter(atob(param2));
            }

            return null;
        });
    }
};

export type CurrentView = CurrentViewMain | CurrentViewIntro | CurrentViewFilm | CurrentViewCharacter;

export class CurrentViewState {

    @observable currentView: CurrentView;

    constructor(startView: CurrentView) {
        this.currentView = startView;
    }

    @action redirectToMain = () => {
        this.currentView = new CurrentViewMain();
    }

    @action redirectToIntro = () => {
        this.currentView = new CurrentViewIntro();
    }

    @action redirectToFilm = (filmUrl: string) => {
        this.currentView = new CurrentViewFilm(filmUrl);
    }

    @action redirectToCharacter = (character: string) => {
        this.currentView = new CurrentViewCharacter(character);
    }

    @action setCurrentView(currentView: CurrentView) {
        this.currentView = currentView;
    }

    @computed get windowLocation(): string {
        return `/${this.currentView.toUrlChunks().join('/')}`;
    }

    static match(url: string): CurrentView {
        const chunks = urlToUrlParams(url);

        const result = tryMatch<CurrentView | null>(
            chunks,
            [
                CurrentViewCharacter.tryMatch,
                CurrentViewFilm.tryMatch,
                CurrentViewIntro.tryMatch,
                CurrentViewMain.tryMatch
            ]
        );

        if (result !== null) {
            return result;
        }

        return new CurrentViewMain();
    }

    static createForContext(): CurrentViewState {
        return new CurrentViewState(
            new CurrentViewMain()
        );
    }
}





/*
export class CurrentViewMain1 {
    //@ts-ignore
    private readonly nominalType: void = undefined;
};

export class CurrentViewMain2 {
    //@ts-ignore
    private readonly nominalType: void = undefined;
};

console.info('CurrentViewMain1', CurrentViewMain1);
console.info('CurrentViewMain2', CurrentViewMain2);
console.info(CurrentViewMain1 === CurrentViewMain2);

const ob1 = new CurrentViewMain1();

console.info('check1', ob1 instanceof CurrentViewMain1);
console.info('check2', ob1 instanceof CurrentViewMain2);

const aa: CurrentViewMain1 = new CurrentViewMain2();
*/
