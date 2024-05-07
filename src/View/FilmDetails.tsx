import * as React from 'react';
import { Link, Group, Loading } from './Common';
import { CharacterLabel } from './CharacterLabel';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';
import { FilmIdModel } from '../AppState/ models/FilmIdModel';

interface PropsType {
    id: FilmIdModel,
}

export const FilmDetails = observer((props: PropsType) => {
    const appState = useAppStateContext();
    const { id } = props;

    const details = id.model().details;

    if (details.type === 'loading') {
        return <Loading/>;
    }

    if (details.type === 'error') {
        return (
            <div>
                Błąd ładowania filmu: {details.message}
            </div>
        );
    }

    const redirectToMain = () => {
        appState.currentView.redirectToMain();
    }

    const renderCharacters = () => {
        return details.value.characters.map(
            (characterUrl) => <CharacterLabel key={characterUrl} characterUrl={characterUrl} />
        );
    }
    return (
        <>
            <Group>
                <h2>Details:</h2>
                <div>Title: {details.value.title}</div>
                <div>Created: {details.value.created}</div>
            </Group>

            <Group>
                <h2>Characters:</h2>
                { renderCharacters() }
            </Group>

            <Group>
                <Link onClick={redirectToMain}>Redirect to main view</Link>
            </Group>
        </>
    );
});
