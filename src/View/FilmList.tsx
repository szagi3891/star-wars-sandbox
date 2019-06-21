import * as React from 'react';
import { AppStateComponent } from '../AppState/AppState';
import { observer } from 'mobx-react';
import { FilmLabel } from './FilmLabel';

interface PropsType {
    films: Array<string>
}

@observer
export class FilmList extends AppStateComponent<PropsType> {
    render() {
        const { films } = this.props;

        return (
            <>
                { films.map(
                    (urlId) => <FilmLabel key={urlId} filmUrl={urlId} />
                ) }
            </>
        );
    }
}