import { IPropertyInfo, InvocationType } from "./Invocation";

export enum CallType {
    UNKNOWN, PROPERTY, FUNCTION
}

export enum ProxyType {
    STATIC, DYNAMIC
}

export interface ICallContext {
    args: IArguments;
    property: IPropertyInfo;
    returnValue: any;
    invokeBase(): void;
    invocationType: InvocationType;
    callType: CallType;
    proxyType: ProxyType;
    isAnUnknownDynamicCallAtExecution: boolean;
}
