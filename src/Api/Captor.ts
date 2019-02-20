import {It} from "./It";

export interface Captor<T> {
    readonly value?: T
    readonly allValues: T[]

    capture(): T
}

export class ArgumentCaptor<T> implements Captor<T> {
    static argumentCaptor<Q>() : Captor<Q> {
        return new ArgumentCaptor<Q>();
    }
    private constructor() {
    }

    private capturedValues: T[] = [];

    get value(): T {
        if (this.capturedValues.length > 0) {
            return this.capturedValues[0]
        }
        return undefined
    }

    get allValues(): T[] {
        return this.capturedValues
    }

    capture(): T {
        return It.is((arg) => {
            this.capturedValues.push(arg);
            return true
        })
    }
}

