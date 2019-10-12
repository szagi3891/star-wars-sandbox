export const urlToUrlParams = (url: string): Array<string> => url.split('/').filter((chunk) => chunk.trim() !== '');

export const tryMatch = <T>(
    urlParams: Array<string>,
    tryList: Array<(urlParams: Array<string>
) => T | null>): T | null => {
    for (const tryItem of tryList) {
        const match = tryItem(urlParams);

        if (match !== null) {
            return match;
        }
    }

    return null;
}

export const getFromUrlParams1 = <T>(
    urlParams: Array<string>,
    fnMatch: (param1: string, rest: Array<string>) => T | null
): T | null => {
    if (urlParams.length >= 1) {
        return fnMatch(urlParams[0], urlParams.slice(1));
    }

    return null;
}

export const getFromUrlParams2 = <T>(
    urlParams: Array<string>,
    fnMatch: (param1: string, param2: string, rest: Array<string>) => T | null
): T | null => {
    if (urlParams.length >= 2) {
        return fnMatch(urlParams[0], urlParams[1], urlParams.slice(2));
    }

    return null;
}

