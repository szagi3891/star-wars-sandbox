import * as React from 'react';
import { AppStateComponent } from "../AppState/AppState";
import { FilmModel } from '../AppState/api';
import { observer } from 'mobx-react';
import { Link, Group } from './Common';
import { CharacterLabel } from './CharacterLabel';

interface PropsType {
    film: FilmModel,
}

@observer
export class FilmDetails extends AppStateComponent<PropsType> {
    render() {
        const { film } = this.props;

        return (
            <>
                <Group>
                    <h2>Details:</h2>
                    <div>Title: {film.title}</div>
                    <div>Created: {film.created}</div>
                </Group>

                <Group>
                    <h2>Characters:</h2>
                    { this.renderCharacters() }
                </Group>

                <Group>
                    <Link onClick={this.redirectToMain}>Redirect to main view</Link>
                </Group>
            </>
        );
    }

    redirectToMain = () => {
        this.appState.currentView.redirectToMain();
    }

    renderCharacters() {
        return this.props.film.characters.map(
            (characterUrl) => <CharacterLabel key={characterUrl} characterUrl={characterUrl} />
        );
    }
}