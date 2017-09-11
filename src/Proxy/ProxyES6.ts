///<reference path="../../node_modules/typescript/lib/lib.es6.d.ts"/>
import * as error from "../Error/_all";
import { Consts } from "../Consts";
import { IProxy } from "./IProxy";
import { IProxyHandler, PropKey } from "./IProxyHandler";

export class ProxyES6<T> implements IProxy {

    readonly ___id = Consts.IPROXY_ID_VALUE;

    private constructor(target: T, handler: IProxyHandler<T>) {
        const p = <ProxyES6<T>>new Proxy(<Object>target, handler);
        (<any>p)[Symbol.toStringTag] = Function.prototype.toString.bind(target);
        return p;
    }

    static of<U>(target: U, handler: IProxyHandler<U>): ProxyES6<U> {
        ProxyES6.check();
        const result = new ProxyES6(target, handler);
        return result;
    }

    private static check(): void {
        if (typeof Proxy === "undefined")
            throw new error.MockException(error.MockExceptionReason.InvalidDynamicProxyRuntime,
                null, "ES6 Proxy object not detected; the dynamic mocking feature requires ES6 Proxy object support");
    }
}
