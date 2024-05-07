type PrimitiveType = string | number | boolean | null | undefined;

export class AutoMapWeakSerialized<K, V extends WeakKey> {
    private readonly registry: FinalizationRegistry<string>;
    private data: Map<string, WeakRef<V>>;

    constructor(
        private readonly serializeKey: (id: K) => string,
        private readonly create: (key: K) => V
    ) {
        this.registry = new FinalizationRegistry((id) => {
            this.data.delete(id);
        });
        this.data = new Map();
    }

    get(id: K): V {
        const idString = this.serializeKey(id);
        const value = this.data.get(idString);

        if (value !== undefined) {
            const valueDeref = value.deref();

            if (valueDeref !== undefined) {
                return valueDeref;
            }
        }

        const newValue = this.create(id);
        this.registry.register(newValue, idString);
        this.data.set(idString, new WeakRef(newValue));
        return newValue;
    }
}

export class AutoMapWeak<K extends PrimitiveType[] | PrimitiveType, V extends WeakKey> {
    private data: AutoMapWeakSerialized<K, V>;

    constructor(create: (key: K) => V) {
        const serializeKey = (id: K): string => {
            if (typeof id === 'string') {
                return id;
            }
    
            if (typeof id === 'number') {
                return id.toString();
            }
    
            return JSON.stringify(id);
        }

        this.data = new AutoMapWeakSerialized(
            serializeKey,
            create
        );
    }

    get(id: K): V {
        return this.data.get(id);
    }
}

//Potencjalnie tak mozna wykorzystać tą AutoMapę
/*
class Aaaa {
    static coll: AutoMapWeak<string, Aaaa> = new AutoMapWeak((id: string) => new Aaaa(id));

    static create(key: string): Aaaa {
        return Aaaa.coll.get(key);
    }

    private constructor(private readonly key: string) {

    }
}
*/
