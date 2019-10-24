import * as React from 'react';
import { FilmModel } from '../AppState/api';
import { Link, Group } from './Common';
import { CharacterLabel } from './CharacterLabel';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';

interface PropsType {
    film: FilmModel,
}

export const FilmDetails = observer((props: PropsType) => {
    const appState = useAppStateContext();

    const { film } = props;

    const redirectToMain = () => {
        appState.currentView.redirectToMain();
    }

    const renderCharacters = () => {
        return props.film.characters.map(
            (characterUrl) => <CharacterLabel key={characterUrl} characterUrl={characterUrl} />
        );
    }
    return (
        <>
            <Group>
                <h2>Details:</h2>
                <div>Title: {film.title}</div>
                <div>Created: {film.created}</div>
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
