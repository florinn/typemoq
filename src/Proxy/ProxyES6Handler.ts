import * as _ from "lodash";
import * as common from "../Common/_all";
import { ICallContext, ProxyType, CallType } from "./ICallContext";
import { ICallInterceptor } from "./ICallInterceptor";
import * as inv from "./Invocation";
import { IProxyHandler, PropKey } from "./IProxyHandler";

export class ProxyES6Handler<T> implements IProxyHandler<T> {

    constructor(private readonly _interceptor: ICallInterceptor) {
    }

    apply(target: T, thisArg: any, argArray?: any): any {

        let funcName = common.Utils.functionName(target);
        let method = new inv.MethodInfo(target, funcName);
        let invocation: ICallContext = new inv.MethodInvocation(target, method, argArray, ProxyType.DYNAMIC);
        this._interceptor.intercept(invocation);

        return invocation.returnValue;
    }

    get(target: T, p: PropKey, receiver: any): any {

        let propValue = (<any>target)[p];
        let method = new inv.PropertyInfo(target, <string>p);
        let invocation = new inv.DynamicGetInvocation(method, propValue);
        
        this._interceptor.intercept(invocation);

        if (!_.isFunction(propValue) && 
            invocation.callType == CallType.PROPERTY &&
            invocation.property.desc) // value getter invocation at execution time
            
            return invocation.returnValue;
        else
            return (...args: any[]) => {

                this._interceptor.removeInvocation(invocation);

                let method = new inv.MethodInfo(target, <string>p);
                let methodInvocation = new inv.MethodInvocation(target, method, <any>args, ProxyType.DYNAMIC);
                this._interceptor.intercept(methodInvocation);

                return methodInvocation.returnValue;
            }
    }

    set(target: T, p: PropKey, value: any, receiver: any): boolean {

        let method = new inv.PropertyInfo(target, <string>p);
        let invocation: ICallContext = new inv.ValueSetterInvocation(method, <any>[value], ProxyType.DYNAMIC);
        this._interceptor.intercept(invocation);

        return Reflect.set(<Object>target, p, value, receiver);
    }

    defineProperty(target: T, p: PropKey, attributes: common.PropDescriptor): boolean {
        
        attributes.configurable = true;
        
        return Reflect.defineProperty(<Object>target, p, attributes);
    }

}
