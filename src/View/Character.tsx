import * as React from 'react';
import { AppStateComponent } from '../AppState/AppState';
import { CharacterModel } from '../AppState/api';
import { Link, Group } from './Common';
import { FilmList } from './FilmList';

interface PropsType {
    character: CharacterModel,
}
export class Character extends AppStateComponent<PropsType> {
    render() {
        const { character } = this.props;

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
                    <Link onClick={this.redirectToMain}>Redirect to main view</Link>
                </Group>
            </div>
        );
    }

    redirectToMain = () => {
        this.appState.redirectToMain();
    }
}

