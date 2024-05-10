import { AutoWeakMap, autoWeakMapKey } from './AutoWeakMap';
import { AutoMap, PrimitiveType } from './AutoMap';

// const construct = <C extends WeakKey, K extends PrimitiveType[], V>(): ((...key: [C, ...K]) => V) => {
//     throw Error('TODO');
// }

export const createAutoWeakMap = <C extends { [autoWeakMapKey]: () => void }, K extends PrimitiveType[], V>(
    createValue: (...key: [C, ...K]) => V
): ((...key: [C, ...K]) => V) => {

    type AutoMapFunc = (key: K) => V;
    type AutoWeakMapFunc = (context: C) => AutoMapFunc;
    
    const weakMap: AutoWeakMapFunc = AutoWeakMap.create<C, AutoMapFunc>(
        (context: C): AutoMapFunc => {            
            const autoMap = AutoMap.create<K, V>(
                (...key: K) => createValue(context, ...key)
            );
            return (key: K): V => autoMap(...key);
        }
    );

    return (...key: [C, ...K]): V => {
        const [context, ...rest] = key;
        return weakMap(context)(rest);
    };
};

//TODO - tą funnkcję przenieść do WeakMap ????


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
