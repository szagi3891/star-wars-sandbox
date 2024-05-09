import { AutoMap } from '../../utils/AutoMap';
import { AutoWeakMap } from '../../utils/AutoWeakMap';
import { Api } from '../Api';
import { CharacterModel } from './CharacterModel';

/*
https://dev.to/tylim88/typescript-nominal-type-the-right-way-k9j
*/

export class CharacterIdModel {
    protected nominal?: never;

    static mapa: AutoWeakMap<Api, AutoMap<string, CharacterIdModel>> = new AutoWeakMap(
        (api) =>
            new AutoMap((url) => {
                return new CharacterIdModel(api, url);
            })
    );

    static get(api: Api, url: string): CharacterIdModel {
        return CharacterIdModel.mapa.get(api).get(url);
    }

    private constructor(private readonly api: Api, public readonly url: string) {}

    public get reactKey(): string {
        return `key-${this.url}`;
    }

    public model(): CharacterModel {
        return CharacterModel.get(this.api, this.url);
    }
}

// Przykład pokazujący zachowanie klasy traktowanej jako nominalnej

// const aaa = (char: CharacterIdModel) => {};

// class AAA {
//     protected nominal?: never;

//     get url(): string {
//         return '';
//     }

//     get reactKey(): string {
//         return '';
//     }

//     model(): CharacterModel {
//         throw Error('TODO');
//     }
// }

// aaa(new AAA());
