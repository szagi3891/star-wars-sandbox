import * as React from 'react';
import { Loading, Link } from './Common';
import { observer } from 'mobx-react-lite';
import { useAppStateContext } from '../AppState/AppState';

interface PropsType {
    filmUrl: string,
}

export const FilmLabel = observer((props: PropsType) => {
    const appState = useAppStateContext();

    const onClick = () => {
        appState.currentView.redirectToFilm(props.filmUrl);
    }

    const { filmUrl } = props;
    const filmItem = appState.models.getFilm(filmUrl);

    if (filmItem.type === 'loading') {
        return <Loading />;
    }

    return (
        <Link onClick={onClick}>
            {filmItem.value.title}
        </Link>
    );
});
