import * as _ from "lodash";
import * as all from "./_all";
import { InterceptorContext, IInterceptStrategy, InterceptionAction } from "./InterceptorContext";
import { CurrentInterceptContext } from "./CurrentInterceptContext";

export class AddActualInvocation<T> implements IInterceptStrategy<T> {

    handleIntercept(invocation: all.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
        ctx.addInvocation(invocation);
        return InterceptionAction.Continue;
    }
}

export class ExtractProxyCall<T> implements IInterceptStrategy<T> {

    handleIntercept(invocation: all.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
        let expectedCalls = ctx.expectedCalls().slice();

        let findCallPred = <T>(c: all.IProxyCall<T>) => c.matches(invocation);

        let matchingCalls = _.filter(expectedCalls, (c: all.IProxyCall<T>) => {
            return findCallPred(c);
        });

        if (matchingCalls.length > 1)   // record/replay scenario 
            findCallPred = <T>(c: all.IProxyCall<T>) => !c.isInvoked &&
                c.matches(invocation);

        localCtx.call = _.find(expectedCalls, (c: all.IProxyCall<T>) => {
            return findCallPred(c);
        });
        
        if (localCtx.call != null) {
            // determine call type for dynamic mock at execution
            if (invocation.isAnUnknownDynamicCallAtExecution) {
                
                invocation.callType = localCtx.call.setupCall.callType;
                
                if (invocation.callType == all.CallType.FUNCTION)
                    return InterceptionAction.Stop; // avoid executing twice any existing setups
            }

            localCtx.call.evaluatedSuccessfully();
        }
        else if (ctx.behavior == all.MockBehavior.Strict)
                throw new all.MockException(all.MockExceptionReason.NoSetup, invocation, `'${invocation}'`);

        return InterceptionAction.Continue;
    }
}

export class ExecuteCall<T> implements IInterceptStrategy<T> {

    private _ctx: InterceptorContext<T>;

    handleIntercept(invocation: all.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
        this._ctx = ctx;
        let currentCall = localCtx.call;

        if (currentCall != null) {
            currentCall.execute(invocation);
            return InterceptionAction.Stop;
        }

        return InterceptionAction.Continue;
    }

}

export class InvokeBase<T> implements IInterceptStrategy<T> {

    handleIntercept(invocation: all.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
        if (ctx.mock.callBase) {
            invocation.invokeBase();
            return InterceptionAction.Stop;
        }
        return InterceptionAction.Continue;
    }
}

export class HandleMockRecursion<T> implements IInterceptStrategy<T> {

    handleIntercept(invocation: all.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
        //TODO: 
        return InterceptionAction.Continue;
    }
}