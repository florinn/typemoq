import { Utils } from "./Utils";

export function someGlobalFunc() {
    return "someGlobalFunc was called";
}

export function someGlobalFuncWithArgs(a: any, b: any, c: any) {
    return "someGlobalFuncWithArgs was called";
}

export class GlobalBar implements IGlobalBar {
    value: string = '';
}

export interface IGlobalBar {
    value: string;
}

export module TypeMoqTests {

    export function someFunc() {
        return "someFunc was called";
    }

    export function someFuncWithArgs(a: any, b: any, c: any) {
        return "someFuncWithArgs was called";
    }

    export class CustomException implements Error {
        constructor(public name: string = null, public message: string = null) {
        }
    }

    export class Foo {
        constructor(private _bar: IBar) { this._bar = _bar || new Bar(); }

        get bar(): IBar { return this._bar; }
        do(stringValue: string) { return 'Foo.do:' + stringValue; }
        setBar(value: string) { this._bar.value = value; }

        register() {
            this.canExecute();
        }

        registerLambda = () => {
            this.canExecute();
        }

        canExecute(): void {
            //console.log('Foo.canExecute()');
        }
    }

    export class GenericFoo<T> {
        private _bar: T;

        constructor(barCtor?: { new (): T }, public numberValue?: number) { this._bar = new barCtor(); }

        get bar(): T { return this._bar; }
        do(stringValue: string) { return 'GenericFoo.do:' + stringValue + ': ' + this._bar.toString(); }
    }

    export enum AnEnum {
        One = 1,
        Two,
        Three
    }

    export class Bar implements IBar {
        value: string = '';
        anyValue: any = undefined;
        enumValue: AnEnum;
    }

    export interface IBar {
        value: string;
        anyValue: any;
        enumValue: AnEnum;
    }

    export interface IDo {
        doVoid(): void;
        doNumber(n?: number): number;
        doString(s?: string): string;
    }

    export class Doer implements IDo {
        doVoid(): void { }
        doNumber(n?: number): number { return n || 101; }
        doString(s?: string): string { return s || 'xyz'; }
        doObject(o?: Object): Object { return o || new Object(); }
        doBar(b?: Bar): Bar { return b; }
    }

    export class DoerUser {
        private doer: IDo;

        constructor(doer: IDo) {
            this.doer = doer;
        }

        execute(s: string, n: number): string {
            this.doer.doNumber(n);
            return this.doer.doString(s);
        }
    }

    export class FooService implements IFooService { }
    export interface IFooService { }

    export class FooWithPublicGetterAndSetter {
        private _foo: string;

        public get foo(): string { return this._foo; }
        public set foo(value: string) { this._foo = value; }
    }

    export class FooWithPrivateGetterAndSetter {
        private _foo: string;

        private get foo(): string { return this._foo; }
        private set foo(value: string) { this._foo = value; }
    }

    export class ClassWithNoDefaultConstructor {
        constructor(private _stringValue: string, private _numberValue: number) { }

        get stringValue(): string { return this._stringValue; }
        set stringValue(value: string) { this._stringValue = value; }

        get numberValue(): number { return this._numberValue; }
        set numberValue(value: number) { this._numberValue = value; }
    }

    export class FooWithConstructors {
        private _x: any;

        constructor(x: { stringValue: string; numberValue: number; });
        constructor(x: number);
        constructor(x: any) { this._x = x; }

        get x() { return this._x; }
        set x(value) { this._x = value; }

        toString(): string {
            return this._x.toString();
        }
    }

    export class FooOverride extends Foo {
        do(stringValue: string) { return 'FooOverride.do: ' + super.do(stringValue); }
    }

    export class GenericFooOverride<T> extends GenericFoo<T> {
        do(stringValue: string) { return 'GenericFooOverride.do: ' + super.do(stringValue); }
    }

    export class NumberFooOverride extends GenericFooOverride<Number> {
        do(stringValue: string) { return 'NumberFooOverride.do: ' + super.do(stringValue); }
    }

    export interface IFoo {
        object: Object;
        bar: IBar;
        count: number;
        value?: number;
        echo(value: number): number;
        submit(): void;
        execute(command: string): string;
        save: (data: any, data2: any) => void;
        [index: number]: string;
    }

    export interface IParams {
        executeByName(name: string, ...args: Object[]): string;
        executeParams(...args: string[]): string;
        executeArray(args: string[]): string;
    }

    export class FooBase {
        static valueField: number;
        static do(value: number): void { }
        check(value: string): boolean { return true; }
        getIsProtected(): boolean { return this.isProtected(); }
        isProtected(): boolean { return true; }
        true(): boolean { return true; }
        baseCalled: boolean = false;
        baseCall(value?: string): boolean {
            this.baseCalled = true;
            return this.baseCalled;
        }
        generic<T>(): number { return 0; }
    }

    export interface INewFoo extends IFoo {
        bar: IBar;
    }

    export interface INewBar extends IBar { }

    export class CircularFoo {
        circularReference: CircularFoo

        constructor() {
            this.circularReference = this;
        }
    }

    export interface IThing {
        getA(a: string): string;
        getB(b: number): number;
        getC(): boolean;
        valueA: string;
    }

    export class Greeter {
        private static _instance: Greeter | null;
        static instance(): Greeter {
            if (!this._instance) {
                this._instance = new Greeter();
            }
            return this._instance;
        }

        greet(): string {
            return 'Hello';
        }
    }

    export function doSomething(thing: IThing): string {
        return thing.getA("asdf") + thing.getB(123);
    }

    export interface OperationResult {
        result: string;
        op: () => void;
        processData: (data: string) => boolean;
        processError: (err: string) => boolean;
        timeout: number;
    }

    export class APromise {
        public doOperation<T>(
            op: () => void,
            processData: (data: string) => boolean,
            processError: (err: string) => boolean,
            timeout: number
        ): Promise<T> {
            return new Promise((resolve, reject) => {
                reject("Fail!");
            });
        }
    }

    export class AnotherPromise {
        constructor(private myPromise: APromise) { }
        public doSomething(): Promise<OperationResult> {
            return this.myPromise.doOperation<OperationResult>(
                () => { },
                (x) => true,
                (x) => true,
                200
            );
        }
    }

    export class XMLHttpRequest {
        open(method: string, url: string, async?: boolean, user?: string, password?: string): void { };
        send(data?: Document): void
        send(data?: string): void
        send(data?: any): void { };
    }

    class LocalStorage {
        _store: any = {};
        getItem(key: string): any { return this._store[key]; }
        setItem(key: string, data: string): void { this._store[key] = data; }
    }
}
