import * as React from 'react';
import { Link, Loading } from './Common';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';
import { FilmIdModel } from '../AppState/ models/FilmIdModel';

interface PropsType {
    id: FilmIdModel,
}

export const FilmLabel = observer((props: PropsType) => {
    const appState = useAppStateContext();

    const onClick = () => {
        appState.currentView.redirectToFilm(props.id);
    }

    const details = props.id.model().details;

    if (details.type === 'loading') {
        return <Loading />;
    }

    if (details.type === 'error') {
        return (
            <div>
                Error: {details.message}
            </div>
        );
    }
    
    // const { filmUrl } = props;
    // const filmItem = appState.models.getFilm(filmUrl);

    // if (filmItem.type === 'loading') {
    //     return <Loading />;
    // }

    return (
        <Link onClick={onClick}>
            {details.value.title}
        </Link>
    );
});
