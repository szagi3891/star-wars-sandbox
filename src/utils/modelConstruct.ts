import { AutoWeakMap } from './AutoWeakMap';
import { AutoMap, PrimitiveType } from './AutoMap';

// const construct = <C extends WeakKey, K extends PrimitiveType[], V>(): ((...key: [C, ...K]) => V) => {
//     throw Error('TODO');
// }

export const modelConstruct = <C extends WeakKey, K extends PrimitiveType[], V>(
    createValue: (...key: [C, ...K]) => V
): ((...key: [C, ...K]) => V) => {
    const data: AutoWeakMap<C, AutoMap<K, V>> = new AutoWeakMap(
        (context: C) =>
            new AutoMap((key: K): V => {
                return createValue(context, ...key);
            })
    );

    return (...key: [C, ...K]): V => {
        const [context, ...rest] = key;
        return data.get(context).get(rest);
    };
};
