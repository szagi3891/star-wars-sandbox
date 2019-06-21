interface ListResult {
    next: string | null,
    results: Array<{
        url: string,
    }>
};

/*
    Funkcja getListJson powinna mieć taki typ:

    const getListJson = async (
        url: string,
        decode: (data: unknown) => T | Error
    ): Promise<T> => {

    Ten parametr generyczny w obecnej wersji jest totalnie niepoprawny.
*/

const getListJson = async <T>(url: string): Promise<T> => {
    const result = await fetch(url);
    return await result.json();
};

const getList = async (baseUrl: string): Promise<Array<string>> => {

    const out: Array<string> = [];

    const merge = (chunk: ListResult) => {
        for (const item of chunk.results) {
            out.push(item.url);
        }
    };

    let result = await getListJson<ListResult>(baseUrl);
    merge(result);

    while (result.next !== null) {
        result = await getListJson<ListResult>(result.next);
        merge(result);
    }

    return out;
};

export const getFilms = async (): Promise<Array<string>> => {
    return await getList('https://swapi.co/api/films?format=json');
}

export interface FilmModel {
    title: string,
    created: string,
    characters: Array<string>,
}

export const getFilmModel = async (urlId: string) => getListJson<FilmModel>(urlId);

export interface CharacterModel {
    name: string,
    films: Array<string>,
}

export const getCharacterModel = async (urlId: string) => getListJson<CharacterModel>(urlId);
