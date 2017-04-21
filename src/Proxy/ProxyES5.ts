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

    private constructor(interceptor: ICallInterceptor, instance: T) {
        this.check(instance);
        let that = this;

        let props = common.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(instance);
        _.each(props, (prop: { name: string; desc: common.PropDescriptor }) => {

            if (_.isFunction(prop.desc.value)) {
                let propDesc: common.PropDescriptor = {
                    configurable: prop.desc.configurable,
                    enumerable: prop.desc.enumerable,
                    writable: prop.desc.writable
                };

                this.defineMethodProxy(that, interceptor, instance, prop.name, propDesc);
            }
            else {
                let propDesc: common.PropDescriptor = {
                    configurable: prop.desc.configurable,
                    enumerable: prop.desc.enumerable
                };

                if (prop.desc.value !== undefined)
                    this.defineValuePropertyProxy(that, interceptor, instance, prop.name, prop.desc.value, propDesc);
                else
                    this.defineGetSetPropertyProxy(that, interceptor, instance, prop.name, prop.desc.get, prop.desc.set, propDesc);
            }

        });
    }

    static of<U>(instance: U, interceptor: ICallInterceptor): ProxyES5<U> {
        ProxyES5.check(instance);

        let result: any;

        if (_.isFunction(instance)) {
            let funcName = common.Utils.functionName(instance);
            result = ProxyES5.methodProxyValue(undefined, interceptor, instance, funcName, null);
        }
        else {
            result = new ProxyES5(interceptor, instance);
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

    private static check<U>(instance: U): void {
        ProxyES5.checkNotNullOrUndefined(instance);

        // allow only primitive objects and functions
        let ok = false;
        if (_.isFunction(instance) ||
            (_.isObject(instance) && !ProxyES5.isPrimitiveObject(instance)))
            ok = true;

        if (!ok)
            throw new error.MockException(error.MockExceptionReason.InvalidArg,
                instance, `'${instance}'; proxy argument should be a function or a non primitive object`);
    }

    private check<U>(instance: U): void {
        ProxyES5.checkNotNullOrUndefined(instance);

        // allow only non primitive objects
        let ok = false;
        if (!_.isFunction(instance) &&
            (_.isObject(instance) && !ProxyES5.isPrimitiveObject(instance)))
            ok = true;

        if (!ok)
            throw new error.MockException(error.MockExceptionReason.InvalidArg,
                instance, `'${instance}'; proxy argument should be a non primitive object`);
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
        instance: T,
        propName: string,
        propDesc: common.PropDescriptor = { configurable: true, enumerable: true, writable: false }) {

        propDesc.value = ProxyES5.methodProxyValue(that, interceptor, instance, propName, propDesc);

        this.defineProperty(that, propName, propDesc);
    }

    private static methodProxyValue<U>(
        that: Object,
        interceptor: ICallInterceptor,
        instance: U,
        propName: string,
        propDesc: common.PropDescriptor): () => any {

        function proxy() {
            let method = new MethodInfo(instance, propName, propDesc);
            let invocation: ICallContext = new MethodInvocation(that, method, arguments);
            interceptor.intercept(invocation);
            return invocation.returnValue;
        }
        return proxy;
    }

    private defineValuePropertyProxy(
        that: Object,
        interceptor: ICallInterceptor,
        instance: T,
        propName: string,
        propValue: any,
        propDesc: common.PropDescriptor = { configurable: true, enumerable: true }) {

        function getProxy(): any {
            let method = new PropertyInfo(instance, propName);
            let invocation: ICallContext = new ValueGetterInvocation(method, propValue);
            interceptor.intercept(invocation);
            return invocation.returnValue;
        }
        propDesc.get = getProxy;

        function setProxy(v: any): void {
            let method = new PropertyInfo(instance, propName);
            let invocation: ICallContext = new ValueSetterInvocation(method, arguments);
            interceptor.intercept(invocation);
        }
        propDesc.set = setProxy;

        this.defineProperty(that, propName, propDesc);
    }

    private defineGetSetPropertyProxy(
        that: Object,
        interceptor: ICallInterceptor,
        instance: T,
        propName: string,
        get?: () => any,
        set?: (v: any) => void,
        propDesc: common.PropDescriptor = { configurable: true, enumerable: true }) {

        function getProxy(): any {
            let method = new PropertyInfo(instance, propName);
            let invocation: ICallContext = new MethodGetterInvocation(method, get);
            interceptor.intercept(invocation);
            return invocation.returnValue;
        }
        propDesc.get = getProxy;

        function setProxy(v: any): void {
            let method = new PropertyInfo(instance, propName);
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