import * as React from 'react';
import { FilmLabel } from './FilmLabel';
import { observer } from 'mobx-react-lite';
import { FilmIdModel } from '../AppState/ models/FilmIdModel';

interface PropsType {
    films: Array<FilmIdModel>
}

export const FilmList = observer((props: PropsType) => {
    const { films } = props;
    const list = films.map(
        (id) => <FilmLabel key={id.url} id={id} />
    );

    return (
        <>
            { list }
        </>
    );
});