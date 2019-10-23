import * as React from 'react';
//import { observer } from 'mobx-react';
import { observer, useLocalStore/*, useObserver*/ } from 'mobx-react-lite';
import { /*AppStateComponent,*/ useAppStateContext } from './AppState/AppState';
import { assertNever } from './assertNever';
import { FilmDetails } from './View/FilmDetails';
import { Loading } from './View/Common';
import { Character } from './View/Character';
import { FilmList } from './View/FilmList';
import { CurrentViewMain, CurrentViewFilm, CurrentViewCharacter, CurrentViewIntro } from './AppState/CurrentViewState';
//import { observable } from 'mobx';

//observerLite(

/*
class Store {
    @observable value1: number = 0;
    @observable value2: number = 0;
    @observable value3: number = 0;
}

const store = new Store();
*/

/*
interface StateType {
    value1: number,
    value2: number,
    value3: number,
}
*/

const Intro = observer(() => {
    const state = useLocalStore(() => ({
        value1: 0,
        value2: 0,
        value3: 0,
        inc1() {
            this.value1++;
        },
        inc2() {
            this.value2++;
        },
        inc3() {
            this.value3++;
        }
    }));

    //state.val3 = 3;

    React.useEffect(() => {
        const timer = setInterval(() => {
            console.info('tick1 - start');
            //store.value1++;
            state.inc1();
            console.info('tick1 - end');
        }, 2000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            console.info('tick2 - start');
            //store.value2++;
            state.inc2();
            console.info('tick2 - end');
        }, 5000);

        return () => {
            clearInterval(timer);
        }
    }, []);

    console.info('render');

    // return useObserver(() => (
    //     <>
    //         aaa { store.value1 }<br/>
    //         aaa { store.value1 }<br/>
    //     </>
    // ));

    //const storeValue3 = store.value3;
    //const storeValue3 = state.value3;

    /*
    const onClick = React.useCallback(() => {
        console.info('storeValue3', storeValue3);
        //store.value3++;
        state.inc3();
    }, []);
    */

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


export const App = observer(() => {
    const appState = useAppStateContext();
    const currentView = appState.currentView.currentView;

    if (currentView instanceof CurrentViewMain) {
        return (
            <>
                <h1>Lista filmów:</h1>
                <RenderMain />
            </>
        )
    }

    if (currentView instanceof CurrentViewIntro) {
        return (
            <>
                intro<br/>
                <Intro />
                <span onClick={appState.currentView.redirectToMain}>Back to main</span>
            </>
        );
    }

    if (currentView instanceof CurrentViewFilm) {
        return (
            <>
                <h1>Film:</h1>
                <RenderFilm filmUrl={currentView.filmUrl} />
            </>
        );
    }

    if (currentView instanceof CurrentViewCharacter) {
        return (
            <>
                <h1>Character:</h1>
                <RenderCharacter characterUrl={currentView.character} />
            </>
        );
    }

    return assertNever('App -> render', currentView);
});
