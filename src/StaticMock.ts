import * as _ from "lodash";
import * as all from "./_all";
import { MockBase } from "./MockBase";
import { MockBehavior } from "./_all";
import { InterceptorExecute } from "./InterceptorExecute";
import { MethodCall } from "./MethodCall";
import { MethodCallReturn } from "./MethodCallReturn";

export class StaticMock<T> extends MockBase<T> {

    private constructor(
        target: T,
        canOverrideTarget: boolean,
        behavior: all.MockBehavior) {

        super(target, canOverrideTarget, behavior);

        this._interceptor = new InterceptorExecute(this);
        this._proxy = all.ProxyFactory.createProxy<T>(target, this._interceptor);
    }

    static ofInstance<U>(targetInstance: U, behavior: all.MockBehavior, shouldOverrideTarget: boolean): all.IMock<U> {
        targetInstance = StaticMock.cloneDeep(targetInstance);
        const mock: StaticMock<U> = new StaticMock(targetInstance, shouldOverrideTarget, behavior);
        return mock;
    }

    static ofGlobalInstance<U>(targetInstance: U, behavior: all.MockBehavior): all.IMock<U> {
        const mock: StaticMock<U> = new StaticMock(targetInstance, false, behavior);
        return mock;
    }

    static ofType<U>(targetConstructor: all.CtorWithArgs<U>, behavior: all.MockBehavior, shouldOverrideTarget: boolean, targetConstructorArgs: any[]): all.IMock<U> {
        const targetInstance: U = all.Utils.conthunktor(targetConstructor, targetConstructorArgs);
        const mock: StaticMock<U> = new StaticMock(targetInstance, shouldOverrideTarget, behavior);
        return mock;
    }

    private static cloneDeep<T>(target: T): T {
        let copy = target;
        if (!_.isFunction(target)) {
            let func = (x: any): any => {
                var value: any;
                if (all.ProxyES5.isProxy(x))
                    return x;
            };
            copy = _.cloneDeepWith(target, func);
        }
        return copy;
    }

    // setup

    setup<TResult>(expression: all.IFunc2<T, TResult>): MethodCallReturn<T, TResult> {
        const call = MethodCallReturn.ofStaticMock(this, expression);
        this._interceptor.addExpectedCall(call);
        return call;
    }

    // verify

    verify<TResult>(expression: all.IFunc2<T, TResult>, times: all.Times): void {
        const call = MethodCall.ofStaticMock(this, expression);
        call.verifiable(times);
        this._interceptor.addExpectedCall(call);
        try {
            this._interceptor.verifyCallCount(call, times);
        }
        catch (e) {
            throw e;
        }
    }

}