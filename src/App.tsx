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
            <div>
                film label: {filmItem.value.title}
            </div>
        );
    }
}

@observer
export class App extends AppStateComponent {
    render() {
        const currentView = this.appState.currentView;

        if (currentView.type === 'main') {
            return this.renderMain();
        }

        return assertNever('App -> render', currentView.type);
    }

    renderMain() {
        const films = this.appState.models.films.get();

        if (films.type === 'loading') {
            return 'loading';
        }

        return (
            <div>
                { films.value.map((urlId) => <FilmLabel key={urlId} filmUrl={urlId} />) }
            </div>
        );
    }
}
