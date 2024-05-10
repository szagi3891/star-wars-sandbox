import * as React from 'react';
import { FilmLabel } from './FilmLabel';
import { observer } from 'mobx-react-lite';
import { FilmIdModel } from '../AppState/ models/FilmIdModel';
import { makeObservable, observable } from 'mobx';
import { AutoMap } from '../utils/AutoMap';

class ListState {
    @observable counter: number = 0;

    public static get = AutoMap.create(() => new ListState());
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
