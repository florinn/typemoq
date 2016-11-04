import * as _ from "lodash";
import * as all from "./_all";
import { IMock } from "./IMock";
import { MockBehavior } from "./Mock";
import { InterceptorContext, IInterceptStrategy, InterceptionAction } from "./InterceptorContext";
import { CurrentInterceptContext } from "./CurrentInterceptContext";
import * as strategy from "./InterceptorStrategies";
import { Times } from "./Times";

export class InterceptorExecute<T> implements all.ICallInterceptor {
    private _interceptorContext: InterceptorContext<T>;

    constructor(behavior: MockBehavior, mock: IMock<T>) {
        this._interceptorContext = new InterceptorContext(behavior, mock);
    }

    get interceptorContext(): InterceptorContext<T> { return this._interceptorContext; }

    intercept(invocation: all.ICallContext) {
        let localCtx = new CurrentInterceptContext();

        _.some(this.interceptionStrategies(), (strategy: IInterceptStrategy<T>) => {
            if (InterceptionAction.Stop === strategy.handleIntercept(invocation, this.interceptorContext, localCtx)) {
                return true;
            }
        });
    }

    addCall(call: all.IProxyCall<T>): void {
        this._interceptorContext.addOrderedCall(call);
    }

    verifyCall<T>(call: all.IProxyCall<T>, times: Times): void {
        let actualCalls: Array<all.ICallContext> = this._interceptorContext.actualInvocations();

        let callCount = _.filter(actualCalls, c => call.matches(c)).length;

        if (!times.verify(callCount)) {
            this.throwVerifyCallException(call.setupCall, times);
        }
    }

    verify(): void {
        let orderedCalls: Array<all.IProxyCall<T>> = this._interceptorContext.orderedCalls();

        let verifiables = _.filter(orderedCalls, c => c.isVerifiable);

        _.forEach(verifiables, v => {
            this.verifyCall(v, v.expectedCallCount);
        });
    }

    reset(): void {
        this._interceptorContext.reset();
    }

    private interceptionStrategies(): _.List<IInterceptStrategy<T>> {
        let strategies: _.List<IInterceptStrategy<T>> = [
            new strategy.AddActualInvocation(),
            new strategy.ExtractProxyCall(),
            new strategy.ExecuteCall(),
            new strategy.InvokeBase(),
            new strategy.HandleMockRecursion()
        ];
        return strategies;
    }

    private throwVerifyCallException(call: all.ICallContext, times: Times) {
        let e = new all.MockException(all.MockExceptionReason.VerificationFailed,
            call, "VerifyCall Exception", times.failMessage);
        throw e;
    }

}