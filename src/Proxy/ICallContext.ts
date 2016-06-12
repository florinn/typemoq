/// <reference path='_all.ts' />

namespace TypeMoqIntern.Proxy {
    export interface ICallContext {
        args: IArguments;
        property: IPropertyInfo;
        returnValue: any;
        invokeBase(): void;
    }
} 