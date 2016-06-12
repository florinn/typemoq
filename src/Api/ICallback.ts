namespace TypeMoqIntern.Api {
    export interface ICallback<T, TResult> {
        callback(action: IAction): IReturnsThrows<T, TResult>;
        callback(action: IAction1<T>): IReturnsThrows<T, TResult>;
    }
}  