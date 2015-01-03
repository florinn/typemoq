/// <reference path='_all.ts' />

module TypeMoq.Proxy {
    export interface ICallContext {
        args: IArguments;
        property: IPropertyInfo;
        returnValue: any;
        invokeBase(): void;
    }
} 