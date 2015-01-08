module TypeMoq {
    export interface IMock<T> {
        object: T;
        name: string;
        behavior: MockBehavior;
        callBase: boolean;
        setup<TResult>(expression: IFunc2<T, TResult>): MethodCallReturn<T, TResult>;
        verify<TResult>(expression: IFunc2<T, TResult>, times: Times): void;
        verifyAll(): void;
    }
} 