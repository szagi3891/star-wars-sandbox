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


export const AppInner = observer(() => {
    const appState = useAppStateContext();
    const currentView = appState.currentView.currentView;

    if (currentView.type === 'main') {
        return (
            <>
                <h1>Lista filmów:</h1>
                <RenderMain />
            </>
        )
    }

    if (currentView.type === 'intro') {
        return (
            <>
                intro<br/>
                <Intro />
                <span onClick={appState.currentView.redirectToMain}>Back to main</span>
            </>
        );
    }

    if (currentView.type === 'film') {
        return (
            <>
                <h1>Film:</h1>
                <RenderFilm filmUrl={currentView.url} />
            </>
        );
    }

    if (currentView.type === 'character') {
        return (
            <>
                <h1>Character:</h1>
                <RenderCharacter characterUrl={currentView.character} />
            </>
        );
    }

    return assertNever('App -> render', currentView);
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
