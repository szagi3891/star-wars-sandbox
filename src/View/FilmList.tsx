import * as React from 'react';
import { FilmLabel } from './FilmLabel';
import { observer } from 'mobx-react-lite';
import { FilmIdModel } from '../AppState/ models/FilmIdModel';
import { createAutoMap } from '../utils/createMap';
import { makeObservable, observable } from 'mobx';

class ListState {
    @observable counter: number = 0;

    public static get = createAutoMap(() => new ListState());
    private constructor() {
        makeObservable(this);
    }

    inc = () => {
        this.counter += 1;
    };
}

interface PropsType {
    films: Array<FilmIdModel>;
}

export const FilmList = observer((props: PropsType) => {
    const { films } = props;
    const list = films.map((id) => (
        <FilmLabel
            key={id.url}
            id={id}
        />
    ));

    return (
        <>
            {list}
            <div>current counter = {ListState.get().counter}</div>
            <div onClick={() => ListState.get().inc()}>Up</div>
        </>
    );
});
