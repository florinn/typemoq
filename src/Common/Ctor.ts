module TypeMoq {
    export interface Ctor<T> {
        new (): T;
        prototype;
    }
    export interface CtorWithArgs<T> {
        new (...ctorArgs: any[]): T;
        prototype;
    }
} 