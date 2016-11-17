import * as all from "./_all";
import { MockBehavior } from "./_all";
import { MethodCallReturn } from "./MethodCallReturn";

export enum GlobalType { Class, Function, Value }

export class GlobalMock<T> implements all.IGlobalMock<T> {

    constructor(public mock: all.IMock<T>, private _name: string, private _type: GlobalType, public container: Object) {
        if (!this._name)
            this._name = mock.name;
    }

    get object() { return this.mock.object; }

    get name() { return this._name || this.mock.name; }
    get behavior() { return this.mock.behavior; }

    get callBase() { return this.mock.callBase; }
    set callBase(value: boolean) { this.mock.callBase = value; }

    get type() { return this._type; }

    // setup

    setup<TResult>(expression: all.IFunc2<T, TResult>): MethodCallReturn<T, TResult> {
        return this.mock.setup(expression);
    }

    // verify

    verify<TResult>(expression: all.IFunc2<T, TResult>, times: all.Times): void {
        this.mock.verify(expression, times);
    }

    verifyAll(): void {
        this.mock.verifyAll();
    }

    reset(): void {
        this.mock.reset();
    }
}