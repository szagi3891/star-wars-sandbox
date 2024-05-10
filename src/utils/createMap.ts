import { AutoWeakMap, autoWeakMapKey } from './AutoWeakMap';
import { AutoMap, PrimitiveType } from './AutoMap';

// const construct = <C extends WeakKey, K extends PrimitiveType[], V>(): ((...key: [C, ...K]) => V) => {
//     throw Error('TODO');
// }

export const createAutoWeakMap = <C extends { [autoWeakMapKey]: () => void }, K extends PrimitiveType[], V>(
    createValue: (...key: [C, ...K]) => V
): ((...key: [C, ...K]) => V) => {

    const data: AutoWeakMap<C, (...key: K) => V> = new AutoWeakMap((context: C) => {
        return AutoMap.create<K, V>((...key: K): V => {
            return createValue(context, ...key);
        });
    });

    return (...key: [C, ...K]): V => {
        const [context, ...rest] = key;
        return data.get(context)(...rest);
    };
};

//TODO - AutoWeakMap.create(funkcja) => zwraca funkcję


//Takie coś mogłoby zadziałać, ale konstruktor musiałby być publiczny
//createValue: new (...args: [C, ...K]) => V

// type Constructor = new (...args: any[]) => Object;
// const inst = <R>(create: new (...args: any[]) => R): R => {
//     return new create(1);
// };

// class DDD {
//     constructor(api: Api, name: string) {}
// }

// const aaa = modelConstruct(DDD)

// const aaa = inst(DDD)
