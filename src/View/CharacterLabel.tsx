import * as React from 'react';
import { AppStateComponent } from '../AppState/AppState';
import { Loading, Link } from './Common';
import { observer } from 'mobx-react';

interface PropsType {
    characterUrl: string,
}

@observer
export class CharacterLabel extends AppStateComponent<PropsType> {
    render() {
        const { characterUrl } = this.props;

        const characterResult = this.appState.models.getCharacter(characterUrl);

        if (characterResult.type === 'loading') {
            return <Loading />;
        }

        const character = characterResult.value;

        return (
            <Link onClick={this.onClick}>
                { character.name }
            </Link>
        );
    }

    onClick = () => {
        this.appState.currentView.redirectToCharacter(this.props.characterUrl);
    }
}