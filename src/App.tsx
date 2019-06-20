import * as React from 'react';
import { observer } from 'mobx-react';
import { AppStateComponent } from './AppState/AppState';
import { assertNever } from './assertNever';

interface FilmLabelPropsType {
    filmUrl: string,
}

@observer
class FilmLabel extends AppStateComponent<FilmLabelPropsType> {
    render() {
        const { filmUrl } = this.props;
        const filmItem = this.appState.models.filmItem.get(filmUrl).get();

        if (filmItem.type === 'loading') {
            return 'loading';
        }
    
        return (
            <div onClick={this.onClick}>
                film label: {filmItem.value.title}
            </div>
        );
    }

    onClick = () => {
        this.appState.redirectToFilm(this.props.filmUrl);
    }
}

@observer
export class App extends AppStateComponent {
    render() {
        const currentView = this.appState.currentView;

        if (currentView.type === 'main') {
            return this.renderMain();
        }

        if (currentView.type === 'film') {
            return this.renderFilm(currentView.filmUrl);
        }

        return assertNever('App -> render', currentView);
    }

    renderMain() {
        const films = this.appState.models.films.get();

        if (films.type === 'loading') {
            return 'loading';
        }

        return (
            <div>
                <h1>Lista filmów:</h1>
                { films.value.map((urlId) => <FilmLabel key={urlId} filmUrl={urlId} />) }
            </div>
        );
    }

    renderFilm(filmUrl: string) {
        const filmItem = this.appState.models.filmItem.get(filmUrl).get();

        if (filmItem.type === 'loading') {
            return 'loading';
        }

        return (
            <div>
                <div>detale filmu {filmUrl}</div>
                <div>created: {filmItem.value.created}</div>
                <div onClick={this.redirectToMain}>redirect to main</div>
            </div>
        );
    }

    redirectToMain = () => {
        this.appState.redirectToMain();
    }
}
