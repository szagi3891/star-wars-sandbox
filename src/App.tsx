import * as React from 'react';
import { observer, useLocalStore, /* useLocalStore, useObserver*/ } from 'mobx-react-lite';
import { useAppStateContext } from './AppState/AppState';
import { assertNever } from './assertNever';
import { FilmDetails } from './View/FilmDetails';
import { Loading } from './View/Common';
import { Character } from './View/Character';
import { FilmList } from './View/FilmList';
import { observable } from 'mobx';
import styled from '@emotion/styled';
import { PageIntro } from './AppState/Routing/PageIntro';

class Store {
    @observable value1: number = 0;
    @observable value2: number = 0;
    @observable value3: number = 0;
    
    public inc1 = () => {
        this.value1++;
    }

    public inc2 = () => {
        this.value2++;
    }

    public inc3 = () => {
        this.value3++;
    }
}


const Intro = observer(() => {
    const state = useLocalStore(() => new Store())
    //const state = React.useMemo(() => new Store(), []);

    return (
        <div onClick={state.inc3}>
            aaa1 { state.value1 }<br/>
            aaa2 { state.value2 }<br/>
            aaa3 { state.value3 }<br/>
        </div>
    );
});


const RenderMain = observer(() => {
    const appState = useAppStateContext();

    const films = appState.models.getFilms();

    if (films.type === 'loading') {
        return <Loading/>;
    }

    return (
        <>
            <span onClick={appState.currentView.redirectToIntro}>Intro</span>
            <FilmList films={films.value} />
        </>
    );
});


const RenderFilm = observer(({filmUrl}: {filmUrl: string}) => {
    const appState = useAppStateContext();

    const filmItem = appState.models.getFilm(filmUrl);

    if (filmItem.type === 'loading') {
        return <Loading/>;
    }

    return <FilmDetails film={filmItem.value}/>;
});


const RenderCharacter = observer(({characterUrl}: {characterUrl: string}) => {
    const appState = useAppStateContext();

    const characterResult = appState.models.getCharacter(characterUrl);

    if (characterResult.type === 'loading') {
        return <Loading/>;
    }

    return <Character character={characterResult.value}/>;
});

interface IntroPropsType {
    intro: PageIntro,
}

const AppIntro = observer((props: IntroPropsType) => {
    const { intro } = props;
    const page = intro.page;

    if (page.type === 'view1') {
        return (
            <>
                <div>view1</div>
                <div onClick={intro.redirectTo2}>go to 2</div>
                <div onClick={intro.redirectTo3}>go to 3</div>
            </>
        );
    }

    if (page.type === 'view2') {
        return (
            <>
                <div onClick={intro.redirectTo1}>go to 1</div>
                <div>view2</div>
                <div onClick={intro.redirectTo3}>go to 3</div>
            </>
        );
    }

    if (page.type === 'view3') {
        return (
            <>
                <div onClick={intro.redirectTo1}>go to 1</div>
                <div onClick={intro.redirectTo2}>go to 2</div>
                <div>view3</div>
            </>
        );
    }

    return assertNever('intro', page);
});

export const AppInner = observer(() => {
    const appState = useAppStateContext();
    const page = appState.currentView.page;

    if (page.type === 'main') {
        return (
            <>
                <h1>Lista filmów:</h1>
                <RenderMain />
            </>
        )
    }

    if (page.type === 'intro') {
        const pageIntro = page.page;

        return (
            <>
                intro<br/>
                <Intro />
                <span onClick={appState.currentView.redirectToMain}>Back to main</span>
                <AppIntro intro={pageIntro} />
            </>
        );
    }

    if (page.type === 'film') {
        return (
            <>
                <h1>Film:</h1>
                <RenderFilm filmUrl={page.url} />
            </>
        );
    }

    if (page.type === 'character') {
        return (
            <>
                <h1>Character:</h1>
                <RenderCharacter characterUrl={page.character} />
            </>
        );
    }

    return assertNever('App -> render', page);
});

const Wrapper = styled('div')`
    display: flex;
`;

export const App = observer(() => {
    return (
        <Wrapper>
            <div>
                <AppInner />
            </div>
        </Wrapper>
    )
});
