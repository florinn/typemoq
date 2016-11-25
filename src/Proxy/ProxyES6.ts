///<reference path="../../node_modules/typescript/lib/lib.es6.d.ts"/>
import * as common from "../Common/_all";
import * as error from "../Error/_all";
import { Consts } from "../Consts";
import { IProxy } from "./IProxy";
import { ICallContext } from "./ICallContext";
import { ICallInterceptor } from "./ICallInterceptor";
import { PropertyInfo, MethodInfo, MethodInvocation, MethodGetterInvocation, MethodSetterInvocation, ValueGetterInvocation, ValueSetterInvocation } from "./Invocation";

export class ProxyES6<T> implements IProxy {

    readonly ___id = Consts.IPROXY_ID_VALUE;

    private constructor(interceptor: ICallInterceptor) {
        
        let handler: ProxyHandler<T> = {
            apply: (target: T, thisArg: any, argArray?: any): any => {

                let funcName = common.Utils.functionName(target);
                let method = new MethodInfo(target, funcName);
                let invocation: ICallContext = new MethodInvocation(method, argArray);
                interceptor.intercept(invocation);

                return invocation.returnValue;
            },
            get: (target: T, p: PropertyKey, receiver: any): any => {

                let propValue = (<any>target)[p];
                let method = new PropertyInfo(target, <string>p, { value: true });
                let valueInvocation = new ValueGetterInvocation(method, propValue);          
                interceptor.intercept(valueInvocation);

                if (valueInvocation.returnValue && 
                    valueInvocation.property.desc && valueInvocation.property.desc.value) // value getter invocation at execution time
                    return valueInvocation.returnValue;
                else
                    return function (...args: any[]) {

                        interceptor.removeInvocation(valueInvocation);

                        let method = new MethodInfo(target, <string>p);
                        let methodInvocation = new MethodInvocation(method, <any>args);
                        interceptor.intercept(methodInvocation);

                        return methodInvocation.returnValue;
                    }
            },
            set: (target: T, p: PropertyKey, value: any, receiver: any): boolean => {

                let method = new PropertyInfo(target, <string>p);
                let invocation: ICallContext = new ValueSetterInvocation(method, <any>[value]);
                interceptor.intercept(invocation);

                return true;
            }
        };

        let p = <ProxyES6<T>>new Proxy({}, handler);

        return p;
    }

    static of<U>(interceptor: ICallInterceptor): ProxyES6<U> {
        ProxyES6.check();
        let result = new ProxyES6(interceptor);
        return result;
    }

    private static check(): void {
        if (typeof Proxy === "undefined")
            throw new error.MockException(error.MockExceptionReason.InvalidDynamicProxyRuntime,
                null, "ES6 Proxy object not detected; the dynamic mocking feature requires ES6 Proxy object support");
    }
}