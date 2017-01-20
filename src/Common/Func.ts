export type IAction = () => void;
export type IAction1<T> = (x: T) => void;
export type IActionN<T> = (...x: T[]) => void;

export type IFunc1<TResult> = () => TResult;
export type IFunc2<T, TResult> = (x: T) => TResult;
export type IFuncN<T, TResult> = (...x: T[]) => TResult;