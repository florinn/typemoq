import { ICallInterceptor } from "./ICallInterceptor";
import { Proxy } from "./Proxy";
import { ProxyES6 } from "./ProxyES6";

export class ProxyFactory {
    
    static createProxy<T>(interceptor: ICallInterceptor, instance: T): T {
        let proxy: T = <T><any>Proxy.of(instance, interceptor);
        return proxy;
    }

    static createProxyES6<T>(interceptor: ICallInterceptor): T {
        let proxy: T = <T><any>ProxyES6.of(interceptor);
        return proxy;
    }

}