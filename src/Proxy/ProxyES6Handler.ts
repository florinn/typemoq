import * as _ from "lodash";
import * as common from "../Common/_all";
import { ICallContext } from "./ICallContext";
import { ICallInterceptor } from "./ICallInterceptor";
import { PropertyInfo, MethodInfo, MethodInvocation, MethodGetterInvocation, MethodSetterInvocation, ValueGetterInvocation, ValueSetterInvocation } from "./Invocation";

export class ProxyES6Handler<T> implements ProxyHandler<T> {

    constructor(private readonly _interceptor: ICallInterceptor) {
    }

    apply(target: T, thisArg: any, argArray?: any): any {

        let funcName = common.Utils.functionName(target);
        let method = new MethodInfo(target, funcName);
        let invocation: ICallContext = new MethodInvocation(target, method, argArray);
        this._interceptor.intercept(invocation);

        return invocation.returnValue;
    }

    get(target: T, p: PropertyKey, receiver: any): any {

        let propValue = (<any>target)[p];
        let method = new PropertyInfo(target, <string>p, { value: true });
        let valueInvocation = new ValueGetterInvocation(method, propValue);
        this._interceptor.intercept(valueInvocation);

        if (!_.isFunction(propValue) && 
            !_.isUndefined(valueInvocation.returnValue) &&
            valueInvocation.property.desc && valueInvocation.property.desc.value) // value getter invocation at execution time
            
            return valueInvocation.returnValue;
        else
            return (...args: any[]) => {

                this._interceptor.removeInvocation(valueInvocation);

                let method = new MethodInfo(target, <string>p);
                let methodInvocation = new MethodInvocation(target, method, <any>args);
                this._interceptor.intercept(methodInvocation);

                return methodInvocation.returnValue;
            }
    }

    set(target: T, p: PropertyKey, value: any, receiver: any): boolean {

        let method = new PropertyInfo(target, <string>p);
        let invocation: ICallContext = new ValueSetterInvocation(method, <any>[value]);
        this._interceptor.intercept(invocation);

        return Reflect.set(target, p, value, receiver);
    }

    defineProperty(target: T, p: PropertyKey, attributes: PropertyDescriptor): boolean {
        
        attributes.configurable = true;
        
        return Reflect.defineProperty(target, p, attributes);
    }

}