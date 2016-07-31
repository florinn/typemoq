/// <reference path='_all.ts' />

namespace TypeMoqIntern {

    export class InterceptorSetup<T> implements Proxy.ICallInterceptor {
        private _interceptedCall: proxy.ICallContext;

        get interceptedCall() { return this._interceptedCall; }

        intercept(invocation: proxy.ICallContext) {
            if (this._interceptedCall) {
                throw new error.MockException(error.MockExceptionReason.MoreThanOneSetup,
                    invocation, "MoreThanOneSetupExpression Exception", "Setup should contain only one expression");
            }

            this._interceptedCall = invocation;
        }
    }

}