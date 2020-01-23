
let nextId = 1;


export const getUuid = (): number => {
    const current = nextId;
    nextId++;
    return current;
}