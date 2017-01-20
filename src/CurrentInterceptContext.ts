import * as all from "./_all";

export class CurrentInterceptContext<T> {
    call: all.IProxyCall<T>;
}