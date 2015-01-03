module TypeMoq {
    export interface IAction {
        (): void;
    }
    export interface IAction1<T> {
        (x: T): void;
    }
    export interface IActionN<T> {
        (...x: T[]): void;
    }

    export interface IFunc1<TResult> {
        (): TResult;
    }
    export interface IFunc2<T, TResult> {
        (x: T): TResult;
    }
    export interface IFuncN<T, TResult> {
        (...x: T[]): TResult;
    }
} 