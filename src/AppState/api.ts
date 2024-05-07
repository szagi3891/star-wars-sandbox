
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

export interface FilmModel {
    title: string,
    created: string,
    characters: Array<string>,
}

export interface CharacterModel {
    name: string,
    films: Array<string>,
}

export const getCharacterModel = async (urlId: string) => getListJson<CharacterModel>(urlId);
