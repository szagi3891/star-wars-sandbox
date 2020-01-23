import * as React from 'react';
import { CharacterModel } from '../AppState/api';
import { Link, Group } from './Common';
import { FilmList } from './FilmList';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';

interface PropsType {
    character: CharacterModel,
}

export const Character = observer((props: PropsType) => {
    const appState = useAppStateContext();

    const { character } = props;

    return (
        <div>
            <Group>
                { character.name }
            </Group>

            <Group>
                <h2>Films:</h2>
                <FilmList films={character.films} />
            </Group>

            <Group>
                <Link onClick={appState.currentView.redirectToMain}>Redirect to main view</Link>
            </Group>
        </div>
    );
});


