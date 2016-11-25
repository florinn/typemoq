import * as all from "./_all";

export class InterceptorSetup<T> implements all.ICallInterceptor {
    private _interceptedCall: all.ICallContext;

    get interceptedCall(): all.ICallContext { return this._interceptedCall; }

    intercept(invocation: all.ICallContext) {
        if (this._interceptedCall) {
            throw new all.MockException(all.MockExceptionReason.MoreThanOneSetup,
                invocation, `'${invocation}'; setup should contain only one expression`);
        }

        this._interceptedCall = invocation;
    }

    removeInvocation(invocation: all.ICallContext) {
        if(this._interceptedCall && 
            this._interceptedCall === invocation)
                this._interceptedCall = undefined;
    }
}