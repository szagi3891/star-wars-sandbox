import { computed } from "mobx";

export class LocalStorageItemState {
    @computed toLocalStorage(): string {
        return ''; 
    }

    static from(data: string | null | undefined): LocalStorageItemState {
        return new LocalStorageItemState();
    }
}