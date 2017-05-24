import { ICallInterceptor } from "./ICallInterceptor";
import { ProxyES5 } from "./ProxyES5";
import { ProxyES6 } from "./ProxyES6";
import { ProxyES6Handler } from "./ProxyES6Handler";

export class ProxyFactory {
    
    static createProxy<T>(target: T, interceptor: ICallInterceptor): T {
        let proxy: T = <T><any>ProxyES5.of(target, interceptor);
        return proxy;
    }

    static createProxyES6<T>(target: T, interceptor: ICallInterceptor): T {
        let proxyHandler: ProxyES6Handler<T> = new ProxyES6Handler(interceptor);
        let proxy: T = <T><any>ProxyES6.of(target, proxyHandler);
        return proxy;
    }
}