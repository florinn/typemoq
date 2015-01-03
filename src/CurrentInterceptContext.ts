module TypeMoq {

    export class CurrentInterceptContext<T> {
        call: proxy.IProxyCall<T>;
    }

} 