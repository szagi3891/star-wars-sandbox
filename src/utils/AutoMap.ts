export class AutoMapSerialized<K, V> {
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

type PrimitiveType = string | number | boolean | null | undefined;

export class AutoMap<K extends PrimitiveType[] | PrimitiveType, V> {
    private data: AutoMapSerialized<K, V>;

    public constructor(getValue: (id: K) => V) {
        this.data = new AutoMapSerialized(
            (id: K) => JSON.stringify(id),
            getValue
        );
    }

    public get(id: K): V {
        return this.data.get(id);
    }
}

