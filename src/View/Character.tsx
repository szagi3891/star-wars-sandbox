import * as React from 'react';
import { Link, Group, Loading } from './Common';
// import { FilmList } from './FilmList';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';
import { CharacterIdModel } from '../AppState/ models/CharacterIdModel';

interface PropsType {
    character: CharacterIdModel,
}

export const Character = observer((props: PropsType) => {
    const appState = useAppStateContext();

    const { character } = props;

    const details = character.model().details;

    if (details.type === 'loading') {
        return <Loading />;
    }

    if (details.type === 'error') {
        return (
            <div>
                Error: {details.message}
            </div>
        );
    }

// const RenderCharacter = observer(({characterUrl}: {characterUrl: CharacterIdModel}) => {
//     const appState = useAppStateContext();

//     const characterResult = appState.models.getCharacter(characterUrl);

//     if (characterResult.type === 'loading') {
//         return <Loading/>;
//     }

//     return <Character character={characterResult.value}/>;
// });


    return (
        <div>
            <Group>
                { details.value.name }
            </Group>

            <Group>
                <h2>Films:</h2>
                //TODO - przywrócić ten komponent
                {/* <FilmList films={character.films} /> */}
            </Group>

            <Group>
                <Link onClick={appState.currentView.redirectToMain}>Redirect to main view</Link>
            </Group>
        </div>
    );
});


