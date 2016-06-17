namespace TypeMoqIntern {

    export enum GlobalType { Class, Function, Value }

    export class GlobalMock<T> implements IGlobalMock<T> {

        constructor(public mock: Mock<T>, private _name: string, private _type: GlobalType, public container: Object) {
        }

        static ofInstance<U>(instance: U, name?: string, container: Object = window, behavior = MockBehavior.Loose): GlobalMock<U> {
            let mock = Mock.ofInstance(instance, behavior);
            let type = _.isFunction(instance) ? GlobalType.Function : GlobalType.Value;
            return new GlobalMock(mock, name, type, container);
        }

        static ofType<U>(ctor: Ctor<U>, name?: string, container: Object = window, behavior = MockBehavior.Loose): GlobalMock<U> {
            let instance = new ctor();
            let mock = Mock.ofInstance(instance, behavior);
            return new GlobalMock(mock, name, GlobalType.Class, container);
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
    }

} 