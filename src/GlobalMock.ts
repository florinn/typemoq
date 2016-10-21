namespace TypeMoqIntern {

    export enum GlobalType { Class, Function, Value }

    export class GlobalMock<T> implements IGlobalMock<T> {

        private constructor(public mock: Mock<T>, private _name: string, private _type: GlobalType, public container: Object) {
            if (!this._name)
                this._name = mock.name;
        }

        static ofInstance<U>(targetInstance: U, globalName?: string, container: Object = window, behavior = MockBehavior.Loose): GlobalMock<U> {
            let mock = Mock.ofGlobalInstance(targetInstance, behavior);
            let type = _.isFunction(targetInstance) ? GlobalType.Function : GlobalType.Value;
            return new GlobalMock(mock, globalName, type, container);
        }

        static ofType<U>(targetConstructor: Ctor<U>, container: Object = window, behavior = MockBehavior.Loose): GlobalMock<U> {
            let targetInstance = new targetConstructor();
            let mock = Mock.ofInstance(targetInstance, behavior);
            return new GlobalMock(mock, undefined, GlobalType.Class, container);
        }

        get object() { return this.mock.object; }

        get name() { return this._name || this.mock.name; }
        get behavior() { return this.mock.behavior; }

        get callBase() { return this.mock.callBase; }
        set callBase(value: boolean) { this.mock.callBase = value; }

        get type() { return this._type; }

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

        reset(): void {
            this.mock.reset();
        }
    }

} 