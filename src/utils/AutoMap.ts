export const autoMapKeyAsString = Symbol("autoMapKeyAsString");

class AutoMapSerialized<K, V> {
    private data: Map<string, V>;

    public constructor(
        private readonly serializeKey: (id: K) => string,
        private readonly getValue: (id: K) => V
    ) {
        this.data = new Map();
    }

    public get(id: K): V {
        const idString = this.serializeKey(id);
        const item = this.data.get(idString);

        if (item !== undefined) {
            return item;
        }

        const newItem = this.getValue(id);

        this.data.set(idString, newItem);
        return newItem;
    }
}

type PrimitiveBaseType = string | number | boolean | null | undefined;

type PrimitiveType = PrimitiveBaseType | { [autoMapKeyAsString]: () => string };

const reduceSymbol = (value: PrimitiveType): PrimitiveBaseType => {
    if (value === null || value === undefined || typeof value === 'string' || typeof value === 'number'  || typeof value === 'boolean') {
        return value;
    }

    return value[autoMapKeyAsString]();
}

const reduceComplexSymbol = (value: PrimitiveType[] | PrimitiveType): PrimitiveBaseType[] | PrimitiveBaseType => {
    if (Array.isArray(value)) {
        return value.map(reduceSymbol);
    }

    return reduceSymbol(value);
}

export class AutoMap<K extends PrimitiveType[] | PrimitiveType, V> {
    private data: AutoMapSerialized<K, V>;

    public constructor(getValue: (id: K) => V) {
        this.data = new AutoMapSerialized(
            (id: K) => JSON.stringify(reduceComplexSymbol(id)),
            getValue
        );
    }

    public get(id: K): V {
        return this.data.get(id);
    }
}

/*
    dzięki tej cesze autoMapKeyAsString, nie trzeba eksportować na zewnątrz AutoMapSerialized
*/

export const autoMapValueDestructor = Symbol("autoMapValueDestructor");
export const autoMapContextSubscribe = Symbol("autoMapContextSubscribe");

interface BaseContext {
    [autoMapKeyAsString]: () => string,
    [autoMapContextSubscribe]: (callback: () => void) => void,
}

interface BaseV {
    [autoMapValueDestructor]?: () => void,
}

export class AutoMapContext<C extends BaseContext, K extends PrimitiveType[], V extends BaseV> {
    private readonly data: Map<string, V>;

    public constructor(private readonly getValue: (id: [C, ...K]) => V) {
        this.data = new Map();
    }

    public get(idIn: [C, ...K]): V {
        const idString = JSON.stringify(reduceComplexSymbol(idIn));
        const item = this.data.get(idString);

        if (item !== undefined) {
            return item;
        }

        const newItem = this.getValue(idIn);
        const context = idIn[0];

        context[autoMapContextSubscribe](() => {
            this.data.delete(idString);

            if (newItem[autoMapValueDestructor] !== undefined) {
                newItem[autoMapValueDestructor]();
            }
        });

        this.data.set(idString, newItem);
        return newItem;
    }
}

