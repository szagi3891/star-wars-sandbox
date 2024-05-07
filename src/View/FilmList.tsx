import * as React from 'react';
import { FilmLabel } from './FilmLabel';
import { observer } from 'mobx-react-lite';
import { FilmListModelItemType } from '../AppState/ models/FilmListModel';

interface PropsType {
    films: Array<FilmListModelItemType>
}

export const FilmList = observer((props: PropsType) => {
    const { films } = props;
    const list = films.map(
        (item) => <FilmLabel key={item.id.url} title={item.title} id={item.id} />
    );

    return (
        <>
            { list }
        </>
    );
});