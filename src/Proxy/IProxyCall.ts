/// <reference path='_all.ts' />

module TypeMoq.Proxy {
    export interface IProxyCall<T> {
        id: string;
        callCount: number;
        //isConditional(): boolean;
        failMessage: string;
        isInvoked: boolean;
        isVerifiable: boolean;
        setupExpression: IAction1<T>;
        setupCall: proxy.ICallContext;
        evaluatedSuccessfully(): void;

        matches(call: proxy.ICallContext): boolean;
        execute(call: proxy.ICallContext): void;
    }
} 