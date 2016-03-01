/// <reference path='_all.ts' />

module TypeMoq {

    export class AddActualInvocation<T> implements IInterceptStrategy<T> {

        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
            ctx.addInvocation(invocation);
            return InterceptionAction.Continue;
        }
    }

    export class ExtractProxyCall<T> implements IInterceptStrategy<T> {

        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
            var reversedOrderedCalls = ctx.orderedCalls().slice().reverse();

            localCtx.call = _.find(reversedOrderedCalls, c => {
                return c.matches(invocation);
            });

            if (localCtx.call != null) {
                localCtx.call.evaluatedSuccessfully();
            }
            else if (ctx.behavior == MockBehavior.Strict) {
                throw new error.MockException(error.MockExceptionReason.NoSetup, invocation);
            }

            return InterceptionAction.Continue;
        }
    }

    export class ExecuteCall<T> implements IInterceptStrategy<T> {

        private _ctx: InterceptorContext<T>;

        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
            this._ctx = ctx;
            var currentCall = localCtx.call;

            if (currentCall != null) {
                currentCall.execute(invocation);
                return InterceptionAction.Stop;
            }  
                      
            return InterceptionAction.Continue;
        }

    }

    export class InvokeBase<T> implements IInterceptStrategy<T> {

        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
            if (ctx.mock.callBase) {
                invocation.invokeBase();
                return InterceptionAction.Stop;
            }
            return InterceptionAction.Continue;
        }
    }

    export class HandleMockRecursion<T> implements IInterceptStrategy<T> {

        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
            //TODO: 
            return InterceptionAction.Continue;
        }
    }

} 