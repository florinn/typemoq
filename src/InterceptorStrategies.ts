/// <reference path='_all.ts' />

namespace TypeMoqIntern {

    export class AddActualInvocation<T> implements IInterceptStrategy<T> {

        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
            ctx.addInvocation(invocation);
            return InterceptionAction.Continue;
        }
    }

    export class ExtractProxyCall<T> implements IInterceptStrategy<T> {

        handleIntercept(invocation: proxy.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction {
            let orderedCalls = ctx.orderedCalls().slice();

            let findCallPred = <T>(c: proxy.IProxyCall<T>) => c.matches(invocation);

            let matchingCalls = _.filter(orderedCalls, c => {
                return findCallPred(c);
            });

            if (matchingCalls.length > 1)   // record/replay scenario 
                findCallPred = <T>(c: proxy.IProxyCall<T>) => !c.isInvoked &&
                    c.matches(invocation);

            localCtx.call = _.find(orderedCalls, c => {
                return findCallPred(c);
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
            let currentCall = localCtx.call;

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