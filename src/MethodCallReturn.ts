import * as all from "./_all";
import { Mock } from "./Mock";
import { MethodCall } from "./MethodCall";

export class MethodCallReturn<T, TResult> extends MethodCall<T, TResult> implements all.ISetup<T, TResult>, all.IReturnsResult<T> {

    protected _returnValueFunc: all.IFuncN<any, TResult>;
    hasReturnValue: boolean;
    protected _callBase: boolean;
    private readonly _overrideTarget: boolean;

    constructor(mock: Mock<T>, setupExpression: all.IFunc2<T, TResult>) {
        super(mock, setupExpression);

        this._overrideTarget = !mock.isGlobalInstance;
    }

    // overrides

    execute(call: all.ICallContext): void {
        super.execute(call);

        if (this._callBase)
            call.invokeBase();
        else if (this.hasReturnValue)
            call.returnValue = this._returnValueFunc.apply(this, call.args);
    }

    // ISetup

    callback(action: all.IActionN<any>): all.IReturnsThrows<T, TResult> {
        this._setupCallback = action;
        return this;
    }

    throws(exception: Error): all.IThrowsResult {
        this._thrownException = exception;
        return this;
    }

    returns(valueFunc: all.IFuncN<any, TResult>): all.IReturnsResult<T> {
        this._returnValueFunc = valueFunc;
        this.hasReturnValue = true;

        // override target
        if (this._overrideTarget) {
            let obj: Object = this.mock.targetInstance;
            let name: string = this.setupCall.property.name;
            let desc: PropertyDescriptor = this.setupCall.property.desc;
            if (desc) {
                desc.value = this._returnValueFunc;
                Object.defineProperty(obj, name, desc);
            }
        }

        return this;
    }

    callBase(): all.IReturnsResult<T> {
        this._callBase = true;
        return this;
    }

    // IReturnsResult

}