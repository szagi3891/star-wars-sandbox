import * as React from 'react';
import { FilmLabel } from './FilmLabel';
import { observer } from 'mobx-react-lite';
import { FilmIdModel } from '../AppState/ models/FilmIdModel';
import { makeObservable, observable } from 'mobx';
import { AutoMap } from '@reactive/utils';
import { GithubUser } from '../AppState/ models/GithubUser';
import { useAppStateContext } from '../AppState/AppState';
import { GithubUserRepos } from '../AppState/ models/GithubUserRepos';

class ListState {
    @observable counter: number = 0;

    public static get = AutoMap.create(() => new ListState());
    public static get2 = AutoMap.create<[string], ListState>(() => new ListState());
    private constructor() {
        makeObservable(this);
    }

    inc = () => {
        this.counter += 1;
    };
}

const Github = observer(() => {
    const appState = useAppStateContext();
    const model = GithubUser.get(appState.api, 'microsoft').data.get();

    if (model.type === 'loading') {
        return <div>Loading</div>;
    }

    if (model.type === 'error') {
        return <div>Error: ${model.message}</div>;
    }

    return <pre>{JSON.stringify(model.value)}</pre>;
});

const GithubRepo = observer(() => {
    const appState = useAppStateContext();
    const model = GithubUserRepos.get(appState.api, 'microsoft').data.get();

    if (model.type === 'loading') {
        return <div>Loading</div>;
    }

    if (model.type === 'error') {
        return <div>Error: ${model.message}</div>;
    }

    const listJsx = model.value.map((record) => (
        <div>
            <hr />
            <div>{record.id}</div>
            <div>{record.name}</div>
        </div>
    ));

    return (
        <div>
            <div>Repozutoriów: {model.value.length}</div>
            <div>{listJsx}</div>
        </div>
    );
});

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
            <Github />
            <GithubRepo />
        </>
    );
});
