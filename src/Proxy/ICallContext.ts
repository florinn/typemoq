import { IPropertyInfo } from "./Invocation";

export interface ICallContext {
    args: IArguments;
    property: IPropertyInfo;
    returnValue: any;
    invokeBase(): void;
}