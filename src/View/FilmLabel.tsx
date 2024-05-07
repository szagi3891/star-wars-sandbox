import * as React from 'react';
import { Link } from './Common';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';
import { FilmIdModel } from '../AppState/ models/FilmIdModel';

interface PropsType {
    title: string,
    id: FilmIdModel,
}

export const FilmLabel = observer((props: PropsType) => {
    const appState = useAppStateContext();

    const onClick = () => {
        appState.currentView.redirectToFilm(props.id);
    }

    // const { filmUrl } = props;
    // const filmItem = appState.models.getFilm(filmUrl);

    // if (filmItem.type === 'loading') {
    //     return <Loading />;
    // }

    return (
        <Link onClick={onClick}>
            {props.title}
        </Link>
    );
});
