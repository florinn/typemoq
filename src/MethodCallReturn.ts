import * as all from "./_all";
import { MockBase } from "./MockBase";
import { InterceptorSetup } from "./InterceptorSetup";
import { MethodCall } from "./MethodCall";

export class MethodCallReturn<T, TResult> extends MethodCall<T, TResult> implements all.ISetup<T, TResult>, all.IReturnsResult<T> {

    protected _returnValueFunc: all.IFuncN<any, TResult>;
    hasReturnValue: boolean;
    protected _callBase: boolean;
    private readonly _overrideTarget: boolean;

    private constructor(
        mock: MockBase<T>,
        setupExpression: all.IFunc2<T, TResult>,
        interceptor: InterceptorSetup<T>,
        proxy: T) {

        super(mock, setupExpression, interceptor, proxy);

        this._overrideTarget = mock.canOverrideTarget;
    }

    static ofStaticMock<U, UResult>(mock: MockBase<U>, setupExpression: all.IFunc2<U, UResult>) {
        let interceptor = new InterceptorSetup<U>();
        let proxy = all.ProxyFactory.createProxy<U>(mock.target, interceptor);
        let result = new MethodCallReturn(mock, setupExpression, interceptor, proxy);
        return result;
    }

    static ofDynamicMock<U, UResult>(mock: MockBase<U>, setupExpression: all.IFunc2<U, UResult>) {
        let interceptor = new InterceptorSetup<U>();
        let proxy = all.ProxyFactory.createProxyES6<U>(mock.target, interceptor);
        let result = new MethodCallReturn(mock, setupExpression, interceptor, proxy);
        return result;
    }

    // overrides

    execute(call: all.ICallContext): void {
        super.execute(call);

        if (this._callBase)
            call.invokeBase();
        else if (this.hasReturnValue) {
            call.returnValue = this._returnValueFunc.apply(this, call.args);
            // help ProxyES6 identify value getter invocation at execution time
            call.property.desc = { value: this.setupCall.property.desc && this.setupCall.property.desc.value };
        }
    }

    // ISetup

    callback(action: all.IActionN<any>): all.IReturnsThrows<T, TResult> {
        this._setupCallback = action;
        return this;
    }

    throws(exception: Error): all.IThrowsResult {
        this._thrownException = exception;
        return this;
    }

    returns(valueFunc: all.IFuncN<any, TResult>): all.IReturnsResult<T> {
        this._returnValueFunc = valueFunc;
        this.hasReturnValue = true;

        // override target
        if (this._overrideTarget) {
            let obj: Object = this.mock.target;
            let name: string = this.setupCall.property.name;
            let desc: all.PropDescriptor = this.setupCall.property.desc;

            if (!desc &&
                this.setupCall.proxyType == all.ProxyType.DYNAMIC) {
                // enable target property enumeration for dynamic mocks
                desc = {};
                desc.configurable = true;
                desc.enumerable = true;
                desc.value = null;
                Object.defineProperty(obj, name, desc);
            }
            else if (desc) {
                desc.configurable = true;
                desc.enumerable = true;
                desc.value = this._returnValueFunc;
                Object.defineProperty(obj, name, desc);
            }
        }

        return this;
    }

    callBase(): all.IReturnsResult<T> {
        this._callBase = true;
        return this;
    }

    // IReturnsResult

}