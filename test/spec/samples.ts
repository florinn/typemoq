module TypeMoq.Tests {

    export class Foo {
        constructor(private _bar?: IBar) { this._bar = _bar || new Bar() }

        get bar(): IBar { return this._bar }
        do(stringValue: string) { return 'Foo.do:' + stringValue }
    }

    export class Bar implements IBar {
        value: string;
    }

    export interface IBar {
        value: string;
    }

    export interface IDo {
        do(): void;
    }

    export class Doer implements IDo {
        do() { }
    }

    export class FooService implements IFooService { }
    export interface IFooService { }

    export class FooWithPrivateGetterAndSetter {
        private _foo: string;

        private get foo(): string { return this._foo }
        private set foo(value: string) { this._foo = value }
    }

    export class ClassWithNoDefaultConstructor {
        constructor(private _stringValue: string, private _numberValue: number) { }

        get stringValue(): string { return this._stringValue }
        set stringValue(value: string) { this._stringValue = value }

        get numberValue(): number { return this._numberValue }
        set numberValue(value: number) { this._numberValue = value }
    }

    export class FooWithConstructors {
        private _x;

        constructor(x: { stringValue: string; numberValue: number; });
        constructor(x: number);
        constructor(x) { this._x = x }

        get x() { return this._x }
        set x(value) { this._x = value }

        toString(): string {
            return this._x.toString();
        }
    }

    export class FooOverride extends Foo {
        do(stringValue: string) { return 'FooOverride.do: ' + super.do(stringValue) }
    }

    export interface IFoo {
        object: Object;
        bar: IBar;
        count: number;
        value?: number;
        echo(value: number): number;
        submit(): void;
        execute(command: string): string;
        [index: number]: string;
    }

    export interface IParams {
        executeByName(name: string, ...args: Object[]): string;
        executeParams(...args: string[]): string;
        executeArray(args: string[]): string;
    }

    export class FooBase {
        valueField: number;
        do(value: number): void { }
        check(value: string): boolean { return true }
        getIsProtected(): boolean { return this.isProtected() }
        isProtected(): boolean { return true }
        true(): boolean { return true }
        baseCalled: boolean = false;
        baseCall(value?: string): boolean {
            this.baseCalled = true;
            return this.baseCalled;
        }
        generic<T>(): number { return 0 }
    }

    export interface INewFoo extends IFoo {
        bar: IBar;
    }

    export interface INewBar extends IBar { }
}