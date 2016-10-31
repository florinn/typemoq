import * as _ from "lodash";
import * as all from "./_all";
import { Mock } from "./Mock";
import { Times } from "./Times";
import { InterceptorSetup } from "./InterceptorSetup";
import { Consts } from "./Consts";

export class MethodCall<T, TResult> implements all.IProxyCall<T>, all.IVerifies {

    protected _id: string;
    protected _setupCall: all.ICallContext;
    protected _setupCallback: all.IAction;
    protected _isVerifiable: boolean;
    protected _expectedCallCount: Times;
    protected _isInvoked: boolean;
    protected _callCount: number = 0;
    protected _thrownException: all.Exception;
    protected _evaluatedSuccessfully: boolean;

    constructor(public mock: Mock<T>, private _setupExpression: all.IFunc2<T, TResult>) {
        this._id = this.generateId();

        let interceptor = new InterceptorSetup();
        let proxy = Mock.proxyFactory.createProxy<T>(interceptor, mock.targetInstance);

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
            throw new all.MockException(all.MockExceptionReason.InvalidSetup,
                this._setupExpression, "InvalidSetupExpression Exception", "Invalid setup expression");
        }
    }

    private generateId() {
        return "MethodCall<" + _.uniqueId() + ">";
    }

    private transformToMatchers(args: IArguments): Array<all.IMatch> {
        let newArgs: Array<all.IMatch> = [];

        _.each(args, a => {
            if (!_.isObject(a)) {
                let newArg = new all.MatchValue(a);
                newArgs.push(newArg);
            }
            else {
                if (!_.isUndefined(a[Consts.IMATCH_MATCHES_NAME]) &&
                    !_.isUndefined(a[Consts.IMATCH_ID_NAME]) && a[Consts.IMATCH_ID_NAME] === Consts.IMATCH_ID_VALUE) {
                    newArgs.push(<all.IMatch>a);
                }
                else {
                    throw new all.MockException(all.MockExceptionReason.InvalidMatcher,
                        a, "InvalidMatcher Exception", "Invalid match object");
                }
            }
        });

        return newArgs;
    }

    // IProxyCall

    get id(): string { return this._id; }
    get setupExpression(): all.IAction1<T> { return this._setupExpression; }
    get setupCall(): all.ICallContext { return this._setupCall; }
    get isVerifiable(): boolean { return this._isVerifiable; }
    get expectedCallCount(): Times { return this._expectedCallCount; }
    get isInvoked(): boolean { return this._isInvoked; }
    get callCount(): number { return this._callCount; }

    evaluatedSuccessfully() {
        this._evaluatedSuccessfully = true;
    }

    matches(call: all.ICallContext): boolean {
        let match = false;

        if (this._setupCall.property && call && call.property &&
            this._setupCall.property.name === call.property.name) {

            if (this._setupCall.args.length === call.args.length) {

                match = true;

                _.each(this.setupCall.args, (x, index) => {
                    let setupArg = <all.IMatch>x;
                    let callArg = call.args[index];

                    if (match && !setupArg.___matches(callArg))
                        match = false;
                });

            }
        }

        return match;
    }

    execute(call: all.ICallContext): void {
        this._isInvoked = true;

        if (this._setupCallback != null) {
            this._setupCallback.apply(this, call.args);
        }

        if (this._thrownException != null) {
            throw this._thrownException;
        }

        this._callCount++;
    }

    // IVerifies

    verifiable(times: Times = Times.atLeastOnce()): void {
        this._isVerifiable = true;
        this._expectedCallCount = times;
    }

}