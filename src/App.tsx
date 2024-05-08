import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from './AppState/AppState';
import { assertNever } from './assertNever';
import { FilmDetails } from './View/FilmDetails';
import { Loading } from './View/Common';
import { Character } from './View/Character';
import { FilmList } from './View/FilmList';
import styled from '@emotion/styled';
import { FilmListModel } from './AppState/ models/FilmListModel';

const RenderMain = observer(() => {
    const appState = useAppStateContext();
    const films = FilmListModel.get(appState.api).list;

    if (films.type === 'loading') {
        return <Loading />;
    }

    if (films.type === 'error') {
        return <div>Błąd ładowania listy filmów: {films.message}</div>;
    }

    return (
        <>
            <FilmList films={films.value.map((item) => item.id)} />
        </>
    );
});

export const AppInner = observer(() => {
    const appState = useAppStateContext();
    const view = appState.currentView.view;

    if (view.type === 'main') {
        return (
            <>
                <h1>Lista filmów:</h1>
                {<RenderMain />}
            </>
        );
    }

    if (view.type === 'film') {
        return (
            <>
                <h1>Film:</h1>
                <FilmDetails id={view.url} />
            </>
        );
    }

    if (view.type === 'character') {
        return (
            <>
                <h1>Character:</h1>
                <Character character={view.character} />
            </>
        );
    }

    return assertNever('App -> render', view);
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
    );
});
