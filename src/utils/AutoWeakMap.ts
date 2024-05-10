export const autoWeakMapKey = Symbol('AutoWeakMapKey');

export class AutoWeakMap<K extends { [autoWeakMapKey]: () => void }, V> {
    private data: WeakMap<K, V>;

    constructor(private readonly create: (key: K) => V) {
        this.data = new Map();
    }

    get(id: K): V {
        const value = this.data.get(id);

        if (value !== undefined) {
            return value;
        }

        const newValue = this.create(id);
        this.data.set(id, newValue);
        return newValue;
    }

    static create = <K extends { [autoWeakMapKey]: () => void }, V>(
        createValue: (key: K) => V
    ): ((key: K) => V) => {
        const data: AutoWeakMap<K, V> = new AutoWeakMap(createValue);
    
        return (key: K): V => {
            return data.get(key);
        };
    };
}
