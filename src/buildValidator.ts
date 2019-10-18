import * as t from 'io-ts';
import { Context, ValidationError } from 'io-ts';
import { fold } from 'fp-ts/lib/Either';

const getContextPath = (context: Context): string => context.map(({ key }, index) => {
    if (index === 0 && key === '') {
        return '.';
    }

    return key;
}).join('/');

interface MessageType {
    path: string,
    value: any,
    expected: string,
}

const failure = (es: Array<ValidationError>): Array<MessageType> => es.map((e: ValidationError): MessageType => {
    const lastTypeName = e.context[e.context.length - 1].type.name;

    return {
        path: getContextPath(e.context),
        value: e.value,
        expected: lastTypeName
    };
});

const success = (): Array<MessageType> => {
    return []
};

type Validator<A> = (data: unknown) => A | Error;

export const buildValidator = <A>(label: string, decoder: t.Type<A>, dumpDataWhenError: boolean = false): Validator<A> => {

    return (dataIn: unknown): A | Error => {
        const decodeResult = decoder.decode(dataIn);

        //When error
        if (decodeResult._tag === 'Left') {
            const errorDecodeInfo = fold(failure, success)(decodeResult);

            if (dumpDataWhenError) {
                console.error({
                    label: `Decoder '${label}'`,
                    dataIn,
                    errorDecodeInfo
                });
            }

            return new Error(JSON.stringify({
                label: `Decoder '${label}'`,
                errorDecodeInfo
            }));
        }

        return decodeResult.right;
    };
};