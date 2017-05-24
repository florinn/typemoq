import * as _ from "lodash";
import * as all from "./_all";
import { InterceptorExecute } from "./InterceptorExecute";
import { MethodCall } from "./MethodCall";
import { MethodCallReturn } from "./MethodCallReturn";

export abstract class MockBase<T> implements all.IMock<T> {

    private _id: string;
    protected _name: string;
    protected _interceptor: InterceptorExecute<T>;
    protected _proxy: T;
    private _callBase: boolean;

    constructor(
        public readonly target: T,
        public readonly canOverrideTarget: boolean,
        public readonly behavior: all.MockBehavior = all.MockBehavior.Loose) {
        
        this._id = this.generateId();
        this._name = this.getNameOf(this.target);
    }

    get object() { return this._proxy; }
    get name() { return this._name; }

    get callBase() { return this._callBase; }
    set callBase(value: boolean) { this._callBase = value; }

    private generateId() {
        return "Mock<" + _.uniqueId() + ">";
    }

    private getNameOf(instance: T): string {
        let result: string;

        if (_.isFunction(instance)) {
            result = all.Utils.functionName(instance);
        }
        else if (_.isObject(instance)) {
            let ctor = instance.constructor;
            result = all.Utils.functionName(ctor);
        }

        if (result)
            result = result.trim();

        return result;
    }

    // setup

    abstract setup<TResult>(expression: all.IFunc2<T, TResult>): MethodCallReturn<T, TResult>;

    // verify

    abstract verify<TResult>(expression: all.IFunc2<T, TResult>, times: all.Times): void;

    verifyAll(): void {
        try {
            this._interceptor.verify();
        }
        catch (e) {
            throw e;
        }
    }

    // reset

    reset(): void {
        this._interceptor.reset();
    }

}