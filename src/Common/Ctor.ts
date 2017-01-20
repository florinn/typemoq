export type Ctor<T> = {
    new (): T;
    prototype: Object;
}

export type CtorWithArgs<T> = {
    new (...ctorArgs: any[]): T;
    prototype: Object;
}