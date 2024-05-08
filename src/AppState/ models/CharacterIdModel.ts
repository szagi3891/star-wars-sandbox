import { AutoMap } from "../../utils/AutoMap";
import { CharacterModel } from "./CharacterModel";

/*
https://dev.to/tylim88/typescript-nominal-type-the-right-way-k9j
*/

export class CharacterIdModel {
    protected nominal?:never;

    static mapa: AutoMap<string, CharacterIdModel> = new AutoMap((url) => {
        return new CharacterIdModel(url);
    });

    static get(url: string): CharacterIdModel {
        return CharacterIdModel.mapa.get(url);
    }

    private constructor(public readonly url: string) {
    }

    public get reactKey(): string {
        return `key-${this.url}`;
    }

    public model(): CharacterModel {
        return CharacterModel.get(this.url);
    }
}


// Przykład pokazujący zachowanie klasy traktowanej jako nominalnej

// const aaa = (char: CharacterIdModel) => {

// };


// class AAA {
//     protected nominal?:never;

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
