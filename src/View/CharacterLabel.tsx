import * as React from 'react';
import { Loading, Link } from './Common';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';

interface PropsType {
    characterUrl: string,
}

export const CharacterLabel = observer((props: PropsType) => {
    const appState = useAppStateContext();
    const { characterUrl } = props;

    const characterResult = appState.models.getCharacter(characterUrl);

    if (characterResult.type === 'loading') {
        return <Loading />;
    }

    const character = characterResult.value;

    const onClick = () => {
        appState.currentView.redirectToCharacter(props.characterUrl);
    }

    return (
        <Link onClick={onClick}>
            { character.name }
        </Link>
    );
});
