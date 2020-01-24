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
import { LastViewItemType } from './AppState/CurrentViewState';
import { PageType } from './AppState/CurrentView/type';

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

    if (currentView.mainView.type === 'main') {
        return (
            <>
                <h1>Lista filmów:</h1>
                <RenderMain />
            </>
        )
    }

    if (currentView.mainView.type === 'intro') {
        return (
            <>
                intro<br/>
                <Intro />
                <span onClick={appState.currentView.redirectToMain}>Back to main</span>
            </>
        );
    }

    if (currentView.mainView.type === 'film') {
        return (
            <>
                <h1>Film:</h1>
                <RenderFilm filmUrl={currentView.mainView.url} />
            </>
        );
    }

    if (currentView.mainView.type === 'character') {
        return (
            <>
                <h1>Character:</h1>
                <RenderCharacter characterUrl={currentView.mainView.character} />
            </>
        );
    }

    return assertNever('App -> render', currentView.mainView);
});

const Wrapper = styled('div')`
    display: flex;
`;

const Nav = styled('div')`
    width: 400px;
`;

const showPage = (page: PageType): string => {
    if (page.type === 'main') {
        return 'Strona gówna';
    }

    if (page.type === 'intro') {
        return 'Intro';
    }

    if (page.type === 'character') {
        return `Character: ${page.character}`;
    }

    if (page.type === 'film') {
        return `Film: ${page.url}`;
    }

    return '';
};

interface NavContentItemPropsType {
    item: LastViewItemType
}

const NavContentItem = observer((props: NavContentItemPropsType) => {
    const appState = useAppStateContext();
    const currentView = appState.currentView;

    const { item } = props;

    return (
        <div onClick={() => currentView.showPopup(item.page) } >
            {showPage(item.page) }
        </div>
    )
});

const NavContent = observer(() => {
    const appState = useAppStateContext();
    const currentView = appState.currentView.revertLastView;

    return (
        <div>
            { currentView.map((item) => <NavContentItem key={item.id} item={item} />) }
        </div>
    );
})

const PopupWrapper = styled('div')`
    background: gray;
    position: fixed;
    width: 80vw;
    height: 80vh;
    left: 10vw;
    top: 10vh;
`;

const Popup = observer(() => {
    const appState = useAppStateContext();
    const popup = appState.currentView.currentView.popup;

    if (popup !== null) {
        return (
            <PopupWrapper onClick={appState.currentView.hidePopup}>
                { showPage(popup) }
            </PopupWrapper>
        )
    }

    return null;
});

export const App = observer(() => {
    return (
        <Wrapper>
            <Nav>
                <NavContent />
            </Nav>
            <div>
                <AppInner />
            </div>
            <Popup />
        </Wrapper>
    )
});

//const store = new Store();


/*
interface StateType {
    value1: number,
    value2: number,
    value3: number,
}
*/

/*
({
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
*/

/*
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
*/
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
