import { IProxyFactory } from "./IProxyFactory";
import { ICallInterceptor } from "./ICallInterceptor";
import { Proxy } from "./Proxy";

export class ProxyFactory implements IProxyFactory {
    createProxy<T>(interceptor: ICallInterceptor, instance: T): T {
        let proxy: T = <T><any>Proxy.of(instance, interceptor);
        return proxy;
    }
}