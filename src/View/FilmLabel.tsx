import * as React from 'react';
import { AppStateComponent } from '../AppState/AppState';
import { observer } from 'mobx-react';
import { Loading, Link } from './Common';

interface PropsType {
    filmUrl: string,
}

@observer
export class FilmLabel extends AppStateComponent<PropsType> {
    render() {
        const { filmUrl } = this.props;
        const filmItem = this.appState.models.getFilm(filmUrl);

        if (filmItem.type === 'loading') {
            return <Loading />;
        }
    
        return (
            <Link onClick={this.onClick}>
                {filmItem.value.title}
            </Link>
        );
    }

    onClick = () => {
        this.appState.redirectToFilm(this.props.filmUrl);
    }
}
