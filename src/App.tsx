import * as React from 'react';
import { observer } from 'mobx-react';
import { AppStateComponent } from './AppState/AppState';
import { assertNever } from './assertNever';
import { FilmDetails } from './View/FilmDetails';
import { Loading } from './View/Common';
import { Character } from './View/Character';
import { FilmList } from './View/FilmList';

@observer
export class App extends AppStateComponent {
    render() {
        const currentView = this.appState.currentView.currentView;

        if (currentView.type === 'main') {
            return (
                <>
                    <h1>Lista filmów:</h1>
                    { this.renderMain() }
                </>
            )
        }

        if (currentView.type === 'film') {
            return (
                <>
                    <h1>Film:</h1>
                    { this.renderFilm(currentView.filmUrl) }
                </>
            );
        }

        if (currentView.type === 'character') {
            return (
                <>
                    <h1>Character:</h1>
                    { this.renderCharacter(currentView.character) }
                </>
            );
        }

        return assertNever('App -> render', currentView);
    }

    renderMain() {
        const films = this.appState.models.getFilms();

        if (films.type === 'loading') {
            return <Loading/>;
        }

        return <FilmList films={films.value} />;
    }

    renderFilm(filmUrl: string) {
        const filmItem = this.appState.models.getFilm(filmUrl);

        if (filmItem.type === 'loading') {
            return <Loading/>;
        }

        return <FilmDetails film={filmItem.value}/>;
    }

    renderCharacter(characterUrl: string) {
        const characterResult = this.appState.models.getCharacter(characterUrl);

        if (characterResult.type === 'loading') {
            return <Loading/>;
        }

        return <Character character={characterResult.value}/>;
    }
}
