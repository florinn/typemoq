module TypeMoq {

    export class GlobalMock<T> implements IGlobalMock<T> {

        constructor(public mock: Mock<T>, public container: Object) {
        }

        static ofInstance<U>(instance: U, container: Object = window, behavior = MockBehavior.Loose): GlobalMock<U> {
            var mock = Mock.ofInstance(instance, behavior);
            return new GlobalMock(mock, container);
        }

        static ofType<U>(ctor: Ctor<U>, container: Object = window, behavior = MockBehavior.Loose): GlobalMock<U> {
            var instance = new ctor();
            var mock = Mock.ofInstance(instance, behavior);
            return new GlobalMock(mock, container);
        }

        get object() { return this.mock.object; }

        get name() { return this.mock.name; }
        get behavior() { return this.mock.behavior; }

        get callBase() { return this.mock.callBase; }
        set callBase(value: boolean) { this.mock.callBase = value; }

        get isFunction() { return this.mock.isFunction; }

        // setup

        setup<TResult>(expression: IFunc2<T, TResult>): MethodCallReturn<T, TResult> {
            return this.mock.setup(expression);
        }

        // verify

        verify<TResult>(expression: IFunc2<T, TResult>, times: Times): void {
            this.mock.verify(expression, times);
        }

        verifyAll(): void {
            this.mock.verifyAll();
        }
    }

} 