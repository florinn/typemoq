/// <reference path='_all.ts' />

namespace TypeMoqIntern.Proxy {
    export interface IProxyCall<T> {
        id: string;
        setupExpression: IAction1<T>;
        setupCall: proxy.ICallContext;
        isVerifiable: boolean;
        expectedCallCount: Times;
        isInvoked: boolean;
        callCount: number;
        evaluatedSuccessfully(): void;

        matches(call: proxy.ICallContext): boolean;
        execute(call: proxy.ICallContext): void;
    }
} 