import * as _ from "lodash";
import * as all from "./_all";
import { IMock } from "./IMock";
import { MockFactory } from "./MockFactory";
import { InterceptorExecute } from "./InterceptorExecute";
import { MethodCall } from "./MethodCall";
import { MethodCallReturn } from "./MethodCallReturn";
import { Times } from "./Times";

export enum MockBehavior { Loose, Strict }

export class Mock<T> implements IMock<T> {

    static proxyFactory: all.IProxyFactory = new all.ProxyFactory();

    private _id: string;
    private _name: string;
    private _interceptor: InterceptorExecute<T>;
    private _proxy: T;
    private _callBase: boolean;

    constructor(private _targetInstance: T, public readonly isGlobalInstance: boolean, private _behavior = MockBehavior.Loose) {
        if (!isGlobalInstance)
            this._targetInstance = this.cloneDeep(_targetInstance);
        this._id = this.generateId();
        this._name = this.getNameOf(this.targetInstance);
        this._interceptor = new InterceptorExecute(this._behavior, this);
        this._proxy = Mock.proxyFactory.createProxy<T>(this._interceptor, this.targetInstance);
    }

    static ofInstance<U>(targetInstance: U, behavior = MockBehavior.Loose): Mock<U> {
        let mock = MockFactory.createMockFromInstance(targetInstance, behavior);
        return mock;
    }

    static ofType<U>(targetConstructor: all.CtorWithArgs<U>, behavior = MockBehavior.Loose, ...targetConstructorArgs: any[]): Mock<U> {
        let mock: Mock<U> = Mock.ofType2(targetConstructor, targetConstructorArgs, behavior);
        return mock;
    }

    static ofType2<U>(targetConstructor: all.CtorWithArgs<U>, targetConstructorArgs: any[], behavior = MockBehavior.Loose): Mock<U> {
        let mock: Mock<U> = MockFactory.createMockFromType(targetConstructor, behavior, targetConstructorArgs);
        return mock;
    }

    get targetInstance() { return this._targetInstance; }

    get object() { return this._proxy; }

    get name() { return this._name; }
    get behavior() { return this._behavior; }

    get callBase() { return this._callBase; }
    set callBase(value: boolean) { this._callBase = value; }

    private cloneDeep(target: T): T {
        let copy = target;
        if (!_.isFunction(target)) {
            let func = (x: any): any => {
                var value: any;
                if (all.Proxy.isProxy(x))
                    return x;
            };
            copy = _.cloneDeepWith(target, func);
        }
        return copy;
    }

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

    setup<TResult>(expression: all.IFunc2<T, TResult>): MethodCallReturn<T, TResult> {
        let call = new MethodCallReturn<T, TResult>(this, expression);
        this._interceptor.addCall(call);
        return call;
    }

    // verify

    verify<TResult>(expression: all.IFunc2<T, TResult>, times: Times): void {
        let call = new MethodCall<T, TResult>(this, expression);
        this._interceptor.addCall(call);
        try {
            this._interceptor.verifyCallCount(call, times);
        }
        catch (e) {
            throw e;
        }
    }

    verifyAll(): void {
        try {
            this._interceptor.verify();
        }
        catch (e) {
            throw e;
        }
    }

    reset(): void {
        this._interceptor.reset();
    }
}