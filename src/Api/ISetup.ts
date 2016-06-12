namespace TypeMoqIntern.Api {
    export interface ISetup<T, TResult> extends ICallback<T, TResult>, IReturnsThrows<T, TResult>, IVerifies { } 
}