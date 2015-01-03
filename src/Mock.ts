/// <reference path='_all.ts' />

module TypeMoq {

    export enum MockBehavior { Loose, Strict }

    export class Mock<T> implements IMock<T> {

        static proxyFactory: proxy.IProxyFactory = new TypeMoq.Proxy.ProxyFactory();

        private _id: string;
        private _name: string;
        private _interceptor: InterceptorExecute<T>;
        private _proxy: T;
        private _callBase: boolean;

        constructor(public instance: T, private _behavior = MockBehavior.Loose) {
            this._id = this.generateId();
            this._name = this.getNameOf(instance);
            this._interceptor = new InterceptorExecute(this._behavior, this);
            this._proxy = Mock.proxyFactory.createProxy<T>(this._interceptor, instance);
        }

        static ofInstance<U>(instance: U, behavior = MockBehavior.Loose): Mock<U> {
            var mock = new Mock(instance, behavior);
            return mock;
        }

        static ofType<U>(ctor: CtorWithArgs<U>, behavior = MockBehavior.Loose, ...ctorArgs: any[]): Mock<U> {
            var mock: Mock<U> = Mock.ofType2(ctor, ctorArgs, behavior);
            return mock;
        }

        static ofType2<U>(ctor: CtorWithArgs<U>, ctorArgs: any[], behavior = MockBehavior.Loose): Mock<U> {
            var instance: U = Utils.conthunktor(ctor, ctorArgs);
            var mock: Mock<U> = new Mock(instance, behavior);
            return mock;
        }

        get object() { return this._proxy; }

        get name() { return this._name; }
        get behavior() { return this._behavior; }

        get callBase() { return this._callBase; }
        set callBase(value: boolean) { this._callBase = value; }

        get isFunction() { return _.isFunction(this.instance); }

        private generateId() {
            return "Mock<" + _.uniqueId() + ">";
        }

        private getNameOf(instance: T): string {
            var result: string;

            if (_.isFunction(instance)) {
                result = Utils.functionName(instance);
            }
            else if (_.isObject(instance)) {
                var ctor = instance.constructor;
                result = Utils.functionName(ctor);
            }

            if (result)
                result = result.trim();

            return result;
        }

        // setup

        setup<TResult>(expression: IFunc2<T, TResult>): MethodCallReturn<T, TResult> {
            var call = new MethodCallReturn<T, TResult>(this, expression);
            this._interceptor.addCall(call);
            return call;
        }

        // verify

        verify<TResult>(expression: IFunc2<T, TResult>, times: Times): void {
            var call = new MethodCall<T, TResult>(this, expression);
            this._interceptor.addCall(call);
            try {
                this._interceptor.verifyCall(call, times);
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

    }

}