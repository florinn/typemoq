import * as _ from "lodash";
import * as common from "../Common/_all";
import * as error from "../Error/_all";
import { Consts } from "../Consts";
import { IProxy } from "./IProxy";
import { ICallContext } from "./ICallContext";
import { ICallInterceptor } from "./ICallInterceptor";
import { PropertyInfo, MethodInfo, MethodInvocation, MethodGetterInvocation, MethodSetterInvocation, ValueGetterInvocation, ValueSetterInvocation } from "./Invocation";

export class ProxyES5<T> implements IProxy {

    readonly ___id = Consts.IPROXY_ID_VALUE;

    private constructor(target: T, interceptor: ICallInterceptor) {
        this.check(target);
        let that = this;

        let props = common.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(target);
        _.each(props, (prop: { name: string; desc: common.PropDescriptor }) => {

            if (_.isFunction(prop.desc.value)) {
                let propDesc: common.PropDescriptor = {
                    configurable: prop.desc.configurable,
                    enumerable: prop.desc.enumerable,
                    writable: prop.desc.writable
                };

                this.defineMethodProxy(that, interceptor, target, prop.name, propDesc);
            }
            else {
                let propDesc: common.PropDescriptor = {
                    configurable: prop.desc.configurable,
                    enumerable: prop.desc.enumerable
                };

                if (prop.desc.value !== undefined)
                    this.defineValuePropertyProxy(that, interceptor, target, prop.name, prop.desc.value, propDesc);
                else
                    this.defineGetSetPropertyProxy(that, interceptor, target, prop.name, prop.desc.get, prop.desc.set, propDesc);
            }

        });
    }

    static of<U>(target: U, interceptor: ICallInterceptor): ProxyES5<U> {
        ProxyES5.check(target);

        let result: any;

        if (_.isFunction(target)) {
            let funcName = common.Utils.functionName(target);
            result = ProxyES5.methodProxyValue(undefined, interceptor, target, funcName, null);
        }
        else {
            result = new ProxyES5(target, interceptor);
        }

        return result;
    }

    static isProxy(obj: any): boolean {
        if (!_.isNil(obj) &&
            !_.isUndefined(obj[Consts.IPROXY_ID_NAME]) && obj[Consts.IPROXY_ID_NAME] === Consts.IPROXY_ID_VALUE)
            return true;
        else
            return false;
    }

    private static check<U>(target: U): void {
        ProxyES5.checkNotNullOrUndefined(target);

        // allow only primitive objects and functions
        let ok = false;
        if (_.isFunction(target) ||
            (_.isObject(target) && !ProxyES5.isPrimitiveObject(target)))
            ok = true;

        if (!ok)
            throw new error.MockException(error.MockExceptionReason.InvalidArg,
                target, `'${target}'; proxy argument should be a function or a non primitive object`);
    }

    private check<U>(target: U): void {
        ProxyES5.checkNotNullOrUndefined(target);

        // allow only non primitive objects
        let ok = false;
        if (!_.isFunction(target) &&
            (_.isObject(target) && !ProxyES5.isPrimitiveObject(target)))
            ok = true;

        if (!ok)
            throw new error.MockException(error.MockExceptionReason.InvalidArg,
                target, `'${target}'; proxy argument should be a non primitive object`);
    }

    private static checkNotNullOrUndefined<U>(instance: U): void {
        if (_.isNil(instance))
            throw new error.MockException(error.MockExceptionReason.InvalidArg,
                instance, `'${instance}'; proxy argument is required`);
    }

    private static isPrimitiveObject(obj: Object): boolean {
        let result = false;

        if (_.isFunction(obj) ||
            _.isArray(obj) ||
            _.isDate(obj) ||
            _.isNull(obj))
            result = true;

        return result;
    }

    private defineMethodProxy(
        that: Object,
        interceptor: ICallInterceptor,
        target: T,
        propName: string,
        propDesc: common.PropDescriptor = { configurable: true, enumerable: true, writable: false }) {

        propDesc.value = ProxyES5.methodProxyValue(that, interceptor, target, propName, propDesc);

        this.defineProperty(that, propName, propDesc);
    }

    private static methodProxyValue<U>(
        that: Object,
        interceptor: ICallInterceptor,
        target: U,
        propName: string,
        propDesc: common.PropDescriptor): () => any {

        function proxy() {
            let method = new MethodInfo(target, propName, propDesc);
            let invocation: ICallContext = new MethodInvocation(that, method, arguments);
            interceptor.intercept(invocation);
            return invocation.returnValue;
        }
        return proxy;
    }

    private defineValuePropertyProxy(
        that: Object,
        interceptor: ICallInterceptor,
        target: T,
        propName: string,
        propValue: any,
        propDesc: common.PropDescriptor = { configurable: true, enumerable: true }) {

        function getProxy(): any {
            let method = new PropertyInfo(target, propName);
            let invocation: ICallContext = new ValueGetterInvocation(method, propValue);
            interceptor.intercept(invocation);
            return invocation.returnValue;
        }
        propDesc.get = getProxy;

        function setProxy(v: any): void {
            let method = new PropertyInfo(target, propName);
            let invocation: ICallContext = new ValueSetterInvocation(method, arguments);
            interceptor.intercept(invocation);
        }
        propDesc.set = setProxy;

        this.defineProperty(that, propName, propDesc);
    }

    private defineGetSetPropertyProxy(
        that: Object,
        interceptor: ICallInterceptor,
        target: T,
        propName: string,
        get?: () => any,
        set?: (v: any) => void,
        propDesc: common.PropDescriptor = { configurable: true, enumerable: true }) {

        function getProxy(): any {
            let method = new PropertyInfo(target, propName);
            let invocation: ICallContext = new MethodGetterInvocation(method, get);
            interceptor.intercept(invocation);
            return invocation.returnValue;
        }
        propDesc.get = getProxy;

        function setProxy(v: any): void {
            let method = new PropertyInfo(target, propName);
            let invocation: ICallContext = new MethodSetterInvocation(method, set, arguments);
            interceptor.intercept(invocation);
        }
        propDesc.set = setProxy;

        this.defineProperty(that, propName, propDesc);
    }

    private defineProperty(obj: Object, name: string, desc: common.PropDescriptor) {
        try {
            Object.defineProperty(obj, name, desc);
        }
        catch (e) {
            console.log(e.message);
        }
    }
}