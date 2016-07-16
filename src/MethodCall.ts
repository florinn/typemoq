namespace TypeMoqIntern {

    export class MethodCall<T, TResult> implements proxy.IProxyCall<T>, api.IVerifies {

        protected _id: string;
        protected _callCount: number;
        protected _expectedCallCount: number;
        protected _isOnce: boolean;
        protected _setupCallback: IAction;
        protected _setupCall: proxy.ICallContext;
        protected _thrownException: error.Exception;
        protected _isVerifiable: boolean;
        protected _evaluatedSuccessfully: boolean;
        failMessage: string;
        isInvoked: boolean;

        constructor(public mock: Mock<T>, private _setupExpression: IFunc2<T, TResult>) {
            this._id = this.generateId();

            let interceptor = new InterceptorSetup();
            let proxy = Mock.proxyFactory.createProxy<T>(interceptor, mock.instance);

            _setupExpression(proxy);

            if (interceptor.interceptedCall) {
                let ic = interceptor.interceptedCall;

                let newArgs = this.transformToMatchers(ic.args);
                Object.defineProperty(newArgs, "callee",
                    { configurable: false, enumerable: true, writable: false, value: ic.args.callee });
                ic.args = <IArguments><any>newArgs;

                this._setupCall = ic;
            }
            else {
                throw new error.MockException(error.MockExceptionReason.InvalidSetupExpression,
                    this._setupExpression, "InvalidSetupExpression Exception", "Invalid setup expression");
            }
        }

        private generateId() {
            return "MethodCall<" + _.uniqueId() + ">";
        }

        private transformToMatchers(args: IArguments): Array<match.IMatch> {
            let newArgs: Array<match.IMatch> = [];

            _.each(args, a => {
                if (!_.isObject(a)) {
                    let newArg = new match.MatchValue(a);
                    newArgs.push(newArg);
                }
                else {
                    if (!_.isUndefined(a[Consts.IMATCH_MATCHES_NAME]) &&
                        !_.isUndefined(a[Consts.IMATCH_ID_NAME]) && a[Consts.IMATCH_ID_NAME] === Consts.IMATCH_ID_VALUE) {
                        newArgs.push(<match.IMatch>a);
                    }
                    else {
                        throw new error.MockException(error.MockExceptionReason.InvalidMatcher,
                            a, "InvalidMatcher Exception", "Invalid match object");
                    }
                }
            });

            return newArgs;
        }

        get id(): string { return this._id; }
        get callCount(): number { return this._callCount; }
        get setupExpression(): IAction1<T> { return this._setupExpression; }
        get setupCall(): proxy.ICallContext { return this._setupCall; }
        get isVerifiable(): boolean { return this._isVerifiable; }

        evaluatedSuccessfully() {
            this._evaluatedSuccessfully = true;
        }

        // IProxyCall

        matches(call: proxy.ICallContext): boolean {
            let match = false;

            if (this._setupCall.property && call && call.property &&
                this._setupCall.property.name === call.property.name) {

                if (this._setupCall.args.length === call.args.length) {

                    match = true;

                    _.each(this.setupCall.args, (x, index) => {
                        let setupArg = <match.IMatch>x;
                        let callArg = call.args[index];

                        if (match && !setupArg.___matches(callArg))
                            match = false;
                    });

                }
            }

            return match;
        }

        execute(call: proxy.ICallContext): void {
            this.isInvoked = true;

            if (this._setupCallback != null) {
                this._setupCallback.apply(this, call.args);
            }

            if (this._thrownException != null) {
                throw this._thrownException;
            }

            this._callCount++;

            if (this._isOnce) {
                let times = Times.atMostOnce();

                if (!times.verify(this._callCount)) {
                    throw new error.MockException(error.MockExceptionReason.MoreThanOneCall,
                        this, "MoreThanOneCall Exception", times.failMessage);
                }
            }

            if (this._expectedCallCount) {
                let times = Times.exactly(this._expectedCallCount);

                if (!times.verify(this._callCount)) {
                    throw new error.MockException(error.MockExceptionReason.MoreThanNCalls,
                        this, "MoreThanNCalls Exception", times.failMessage);
                }
            }
        }

        // IThrowsResult

        verifiable(failMessage?: string): void {
            this._isVerifiable = true;
            if (failMessage != null)
                this.failMessage = failMessage;
        }

    }

} 