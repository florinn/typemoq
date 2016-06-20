namespace TypeMoqIntern {
    export type Ctor<T> = {
        new (): T;
        prototype;
    }
    export type CtorWithArgs<T> = {
        new (...ctorArgs: any[]): T;
        prototype;
    }
} 
