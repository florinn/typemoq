module TypeMoq {

    export class MethodCallReturn<T, TResult> extends MethodCall<T, TResult> implements api.ISetup<T, TResult>, api.IReturnsResult<T> {

        protected _returnValueFunc: IFuncN<any, TResult>;
        hasReturnValue: boolean;
        protected _callBase: boolean;

        constructor(mock: Mock<T>, setupExpression: IFunc2<T, TResult>) {
            super(mock, setupExpression);
        }

        // overrides

        execute(call: proxy.ICallContext): void {
            super.execute(call);

            if (this._callBase)
                call.invokeBase();
            else if(this.hasReturnValue)
                call.returnValue = this._returnValueFunc.apply(this, call.args);
        }

        // ISetup

        callback(action: IActionN<any>): api.IReturnsThrows<T, TResult> {
            this._setupCallback = action;
            return this;
        }

        throws(exception: Error): api.IThrowsResult {
            this._thrownException = exception;
            return this;
        }

        returns(valueFunc: IFuncN<any, TResult>): api.IReturnsResult<T> {
            this._returnValueFunc = valueFunc;
            this.hasReturnValue = true;
            return this;
        }

        callBase(): api.IReturnsResult<T> {
            this._callBase = true;
            return this;
        }

        // IReturnsResult

    }
} 