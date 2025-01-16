import { Injectable } from "@angular/core";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class GenericService {
    constructor() {}

    isLocalStorageDefined(): boolean {
        if (typeof localStorage !== 'undefined') {
            return true
        } else return false
    }

    getItemFromLocalStorage(key: string): string | undefined | unknown {
        try {
            if(this.isLocalStorageDefined()) {
                return localStorage.getItem(key);
            } else return undefined
        } catch (error) {
            console.warn(error)
            return undefined;
        }
    }
}