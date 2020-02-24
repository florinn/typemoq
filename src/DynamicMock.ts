import * as all from "./_all";
import { MockBase } from "./MockBase";
import { MockBehavior } from "./_all";
import { InterceptorExecute } from "./InterceptorExecute";
import { MethodCall } from "./MethodCall";
import { MethodCallReturn } from "./MethodCallReturn";

export class DynamicMock<T> extends MockBase<T> {

    private constructor(
        target: T,
        name: string,
        canOverrideTarget: boolean,
        behavior: all.MockBehavior) {

        super(target, canOverrideTarget, behavior);

        if (name)
            this._name = name;

        this._interceptor = new InterceptorExecute(this);
        this._proxy = all.ProxyFactory.createProxyES6<T>(target, this._interceptor);
    }

    static ofType<U>(name: string, behavior: all.MockBehavior, shouldOverrideTarget: boolean): all.IMock<U> {
        const mock: DynamicMock<U> = new DynamicMock<U>(<any>(() => { }), name, shouldOverrideTarget, behavior);
        return mock;
    }

    // setup

    setup<TResult>(expression: all.IFunc2<T, TResult>, clearExisting?: boolean): MethodCallReturn<T, TResult> {
        const call = MethodCallReturn.ofDynamicMock(this, expression);
        this._interceptor.addExpectedCall(call, clearExisting);
        return call;
    }

    // verify

    verify<TResult>(expression: all.IFunc2<T, TResult>, times: all.Times): void {
        const call = MethodCall.ofDynamicMock(this, expression);
        this._interceptor.addExpectedCall(call);
        try {
            this._interceptor.verifyCallCount(call, times);
        }
        catch (e) {
            throw e;
        }
    }

}