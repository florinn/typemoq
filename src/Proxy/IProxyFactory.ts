import { ICallInterceptor } from "./ICallInterceptor";

export interface IProxyFactory {
    createProxy<T>(interceptor: ICallInterceptor, instance: T): T;
}