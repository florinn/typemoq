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

    static ofType<U>(name: string, behavior: all.MockBehavior): all.IMock<U> {
        let mock: DynamicMock<U> = new DynamicMock<U>(<any>(() => { }), name, true, behavior);
        return mock;
    }

    // setup

    setup<TResult>(expression: all.IFunc2<T, TResult>): MethodCallReturn<T, TResult> {
        let call = MethodCallReturn.ofDynamicMock(this, expression);
        this._interceptor.addExpectedCall(call);
        return call;
    }

    // verify

    verify<TResult>(expression: all.IFunc2<T, TResult>, times: all.Times): void {
        let call = MethodCall.ofDynamicMock(this, expression);
        this._interceptor.addExpectedCall(call);
        try {
            this._interceptor.verifyCallCount(call, times);
        }
        catch (e) {
            throw e;
        }
    }

}