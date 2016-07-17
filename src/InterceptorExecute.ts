/// <reference path='_all.ts' />

namespace TypeMoqIntern {

    export class InterceptorExecute<T> implements Proxy.ICallInterceptor {
        private _interceptorContext: InterceptorContext<T>;

        constructor(behavior: MockBehavior, mock: IMock<T>) {
            this._interceptorContext = new InterceptorContext(behavior, mock);
        }

        get interceptorContext(): InterceptorContext<T> { return this._interceptorContext; }

        intercept(invocation: proxy.ICallContext) {
            let localCtx = new CurrentInterceptContext();

            _.some(this.interceptionStrategies(), (strategy: IInterceptStrategy<T>) => {
                if (InterceptionAction.Stop === strategy.handleIntercept(invocation, this.interceptorContext, localCtx)) {
                    return true;
                }
            });
        }

        addCall(call: proxy.IProxyCall<T>): void {
            this._interceptorContext.addOrderedCall(call);
        }

        verifyCall<T>(call: proxy.IProxyCall<T>, times: Times): void {
            let actualCalls: Array<proxy.ICallContext> = this._interceptorContext.actualInvocations();

            let callCount = _.filter(actualCalls, c => call.matches(c)).length;

            if (!times.verify(callCount)) {
                this.throwVerifyCallException(call.setupCall, times);
            }
        }

        verify(): void {
            let orderedCalls: Array<proxy.IProxyCall<T>> = this._interceptorContext.orderedCalls();

            let verifiables = _.filter(orderedCalls, c => c.isVerifiable);

            _.forEach(verifiables, v => {
                this.verifyCall(v, v.expectedCallCount);
            });
        }

        private interceptionStrategies(): _.List<IInterceptStrategy<T>> {
            let strategies: _.List<IInterceptStrategy<T>> = [
                new AddActualInvocation(),
                new ExtractProxyCall(),
                new ExecuteCall(),
                new InvokeBase(),
                new HandleMockRecursion()
            ];
            return strategies;
        }

        private throwVerifyCallException(call: proxy.ICallContext, times: Times) {
            let e = new error.MockException(error.MockExceptionReason.VerificationFailed,
                call, "VerifyCall Exception", times.failMessage);
            throw e;
        }

    }

} 