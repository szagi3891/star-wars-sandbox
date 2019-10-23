//import { computed } from "mobx";

export class LocalStorageItemState {
    toLocalStorage(): string {
        return ''; 
    }

    static from(_data: string | null | undefined): LocalStorageItemState {
        return new LocalStorageItemState();
    }
}