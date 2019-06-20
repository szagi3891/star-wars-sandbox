export const assertNever = (label: string, value: never) => {
    throw Error(`Incorrect assertNever ${label} ${value}`);
};
