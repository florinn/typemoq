/// <reference path='_all.ts' />

module TypeMoq.Proxy {
    export interface ICallInterceptor {
        intercept(context: ICallContext): void;
    }
} 