namespace TypeMoqIntern.Proxy {

    export interface ICallInterceptor {
        intercept(context: ICallContext): void;
    }

} 