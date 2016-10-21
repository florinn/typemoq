namespace TypeMoqIntern.Proxy {

    export interface IProxyFactory {
        createProxy<T>(interceptor: ICallInterceptor, instance: T): T;
    }

}  