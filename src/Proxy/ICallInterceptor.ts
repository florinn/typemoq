import { ICallContext } from "./ICallContext";

export interface ICallInterceptor {
    intercept(context: ICallContext): void;
    removeInvocation(context: ICallContext): void;
}