import * as React from 'react';
import { Loading, Link } from './Common';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';
import { CharacterIdModel } from '../AppState/ models/CharacterIdModel';

interface PropsType {
    characterUrl: CharacterIdModel,
}

export const CharacterLabel = observer((props: PropsType) => {
    const appState = useAppStateContext();
    const { characterUrl } = props;

    // const characterResult = appState.models.getCharacter(characterUrl);
    const details = characterUrl.model().details;
    
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

    const character = details.value;

    const onClick = () => {
        appState.currentView.redirectToCharacter(props.characterUrl);
    }

    return (
        <Link onClick={onClick}>
            { character.name }
        </Link>
    );
});
