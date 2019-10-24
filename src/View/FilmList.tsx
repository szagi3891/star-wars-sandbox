import * as React from 'react';
import { FilmLabel } from './FilmLabel';
import { observer } from 'mobx-react-lite';

interface PropsType {
    films: Array<string>
}


export const FilmList = observer((props: PropsType) => {
    const { films } = props;

    return (
        <>
            { films.map(
                (urlId) => <FilmLabel key={urlId} filmUrl={urlId} />
            ) }
        </>
    );
});