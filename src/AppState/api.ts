interface ListResult {
    next: string | null,
    results: Array<{
        url: string,
    }>
};

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

export interface FilmItemType {
    title: string,
    created: string,
}

export const getFilmItem = async (urlId: string): Promise<FilmItemType> => {
    return await getListJson<FilmItemType>(urlId);
};