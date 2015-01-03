/// <reference path='_all.ts' />

module TypeMoq.Proxy {
    export class ProxyFactory implements IProxyFactory {
        createProxy<T>(interceptor: ICallInterceptor, instance: T): T {
            var proxy: T = <T><any> Proxy.of(instance, interceptor);
            return proxy;
        }
    }
}