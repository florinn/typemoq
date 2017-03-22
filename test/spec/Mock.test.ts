///<reference path="../../.tmp/src/typemoq.d.ts"/>
import * as TypeMoq from "typemoq";

import { TypeMoqTests } from "./fixtures";
import { Utils } from "./Utils";

let Mock = TypeMoq.Mock;
let MockBehavior = TypeMoq.MockBehavior;
let It = TypeMoq.It;
let Times = TypeMoq.Times;
let ExpectedCallType = TypeMoq.ExpectedCallType;
let MockException = TypeMoq.MockException;

import * as chai from "chai";

let assert = chai.assert;
let expect = chai.expect;

let hasProxyES6 = (typeof Proxy != "undefined");
let noProxyES6Msg = "global 'Proxy' object not available";

describe("Mock", () => {

    describe("ctor", () => {

        it("should create an instance using class as ctor parameter", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.Bar> = Mock.ofType(TypeMoqTests.Bar);

            expect(mock.object).to.be.not.null;
        });

        it("should create an instance using class as ctor parameter and allow interface cast", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.IBar> = Mock.ofType(TypeMoqTests.Bar);

            expect(mock.object).to.be.not.null;
        });

        it("should create an instance using interface as type variable and class as ctor parameter", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.IBar> = Mock.ofType<TypeMoqTests.IBar>(TypeMoqTests.Bar);

            expect(mock.object).to.be.not.null;
        });

        it("should create an instance using class as ctor parameter and ctor args", () => {

            let bar = new TypeMoqTests.Bar();
            let mock: TypeMoq.IMock<TypeMoqTests.Foo> = Mock.ofType(TypeMoqTests.Foo, MockBehavior.Loose, bar);

            expect(mock.object).to.be.not.null;
            expect(mock.object.bar).to.be.not.null;
        });

        it("should create an instance using a generic class as ctor parameter and ctor args", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.GenericFoo<TypeMoqTests.Bar>> = Mock.ofType(TypeMoqTests.GenericFoo, MockBehavior.Loose, TypeMoqTests.Bar, 999);

            expect(mock.object).to.be.not.null;
            expect(mock.object.bar).to.be.not.null;
            expect(mock.object.numberValue).to.be.not.null;
        });

        it("should create an instance from an existing object", () => {

            let bar = new TypeMoqTests.Bar();

            let mock: TypeMoq.IMock<TypeMoqTests.Bar> = Mock.ofInstance(bar);

            expect(mock.object).to.be.not.null;
        });

        it("should create an instance from a function object", () => {

            let mock1: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);
            let mock2: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);

            expect(mock1.object).to.be.not.null;
            expect(mock2.object).to.be.not.null;
        });

        describe("dynamic mock", () => {

            it("should create an instance using an interface as type variable", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock: TypeMoq.IMock<TypeMoqTests.IThing> = Mock.ofType<TypeMoqTests.IThing>();

                    expect(mock.object).to.be.not.null;
                    expect(mock.object.getA("abc")).to.be.undefined;
                    expect(mock.object.getB(123)).to.be.undefined;
                    expect(mock.object.getC()).to.be.undefined;
                    expect(mock.object.valueA).to.be.a("function");
                }

            });

            it("should create an instance using the 'instance' side of the class as type variable", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock: TypeMoq.IMock<TypeMoqTests.Greeter> = Mock.ofType<TypeMoqTests.Greeter>();

                    expect(mock.object).to.be.not.null;
                    expect(mock.object.greet()).to.be.undefined;
                }

            });

            it("should create an instance using the 'static' side of the class as type variable", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock: TypeMoq.IMock<typeof TypeMoqTests.Greeter> = Mock.ofType<typeof TypeMoqTests.Greeter>();

                    expect(mock.object).to.be.not.null;
                    expect(mock.object.instance()).to.be.undefined;
                }

            });

            it("should create an instance using a function as type variable", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    expect(mock.object).to.be.not.null;
                }

            });

        });

    });

    describe(".object", () => {

        it("should initialize proxy instance", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.Bar> = Mock.ofType(TypeMoqTests.Bar);

            let bar: TypeMoqTests.Bar = mock.object;
            let bar2: TypeMoqTests.IBar = mock.object;

            expect(bar).to.be.not.null;
            expect(bar).to.eq(bar2);
        });

        it("should expose interface passed in as type variable to ctor", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.IBar> = Mock.ofType<TypeMoqTests.IBar>(TypeMoqTests.Bar);

            let bar: TypeMoqTests.IBar = mock.object;
            let bar2: TypeMoqTests.Bar = mock.object;

            expect(bar).to.be.not.null;
            expect(bar).to.eq(bar2);
        });

        it("should expose type of object passed in as variable to ctor", () => {

            let bar = new TypeMoqTests.Bar();
            let mock: TypeMoq.IMock<TypeMoqTests.Bar> = Mock.ofInstance(bar);

            let bar2: TypeMoqTests.Bar = mock.object;

            expect(bar2).to.be.not.null;
        });

        it("should expose type of function passed in as variable to ctor", () => {

            let mock1: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);
            let mock2: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);
            let func1: () => string = mock1.object;
            let func2: (a: any, b: any, c: any) => string = mock2.object;

            expect(func1).to.be.not.null;
            expect(func2).to.be.not.null;
        });

        describe("dynamic mock", () => {

            it("should initialize proxy instance", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock: TypeMoq.IMock<TypeMoqTests.Bar> = Mock.ofType<TypeMoqTests.Bar>();

                    let bar: TypeMoqTests.Bar = mock.object;
                    let bar2: TypeMoqTests.IBar = mock.object;

                    expect(bar).to.be.not.null;
                    expect(bar).to.eq(bar2);
                }

            });

            it("should expose interface passed in as type variable", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock: TypeMoq.IMock<TypeMoqTests.IBar> = Mock.ofType<TypeMoqTests.IBar>();

                    let bar: TypeMoqTests.IBar = mock.object;
                    let bar2: TypeMoqTests.Bar = mock.object;

                    expect(bar).to.be.not.null;
                    expect(bar).to.eq(bar2);
                }

            });

        });

    });

    describe("mock behavior", () => {

        it("should return default value when behavior is loose", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            expect(mock.object.doNumber(999)).to.eq(undefined);
        });

        it("should throw when behavior is strict", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer, MockBehavior.Strict);

            expect(() => mock.object.doNumber(999)).to.throw(MockException);
        });

        it("should throw an exception derived from Error when behavior is strict", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer, MockBehavior.Strict);

            expect(() => mock.object.doNumber(999)).to.throw(Error);
        });

        describe("dynamic mock", () => {

            it("should return default value when behavior is loose", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    expect(mock.object.doNumber(999)).to.eq(undefined);
                }

            });

            it("should throw when behavior is strict", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>(undefined, MockBehavior.Strict);

                    expect(() => mock.object.doNumber(999)).to.throw(MockException);
                }

            });

            it("should throw an exception derived from Error when behavior is strict", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>(undefined, MockBehavior.Strict);

                    expect(() => mock.object.doNumber(999)).to.throw(Error);
                }

            });

        });
    });

    describe(".setup and .returns", () => {

        it("should match a no args function", () => {

            let mock: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);

            mock.setup(x => x()).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object()).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
        });

        it("should match a function with args", () => {

            let mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);

            mock.setup(x => x(It.isAny(), It.isAny(), It.isAny())).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
        });

        it('should match a function with explicit number value params', () => {

            let mock = Mock.ofInstance<(x: number) => void>(() => { });

            mock.setup(x => x(It.isValue(1))).returns(() => 123);

            expect(mock.object(1)).to.eq(123);
        });

        it('should match a function with implicit number value params', () => {

            let mock = Mock.ofInstance<(x: number) => void>(() => { });

            mock.setup(x => x(1)).returns(() => 123);

            expect(mock.object(1)).to.eq(123);
        });

        it('should match a function with explicit string value params', () => {

            let mock = Mock.ofInstance<(x: string) => void>(() => { });

            mock.setup(x => x(It.isValue("abc"))).returns(() => 123);

            expect(mock.object("abc")).to.eq(123);
        });

        it('should match a function with implicit string value params', () => {

            let mock = Mock.ofInstance<(x: string) => void>(() => { });

            mock.setup(x => x("abc")).returns(() => 123);

            expect(mock.object("abc")).to.eq(123);
        });

        it('should match a function with partial object value params', () => {

            let mock = Mock.ofInstance<(x: any) => void>(() => { });
            const anObject = { baz: 'hello', foo: 42 };

            mock.setup(x => x(It.isObjectWith({ baz: 'hello' }))).returns(() => 123);

            expect(mock.object(anObject)).to.eq(123);
        });

        it('should match a function with explicit object value params', () => {

            let mock = Mock.ofInstance<(x: any) => void>(() => { });
            const anObject = {};

            mock.setup(x => x(It.isValue(anObject))).returns(() => 123);

            expect(mock.object(anObject)).to.eq(123);
        });

        it('should match a function with implicit object value params', () => {

            let mock = Mock.ofInstance<(x: any) => void>(() => { });
            const anObject = {};

            mock.setup(x => x(anObject)).returns(() => 123);

            expect(mock.object(anObject)).to.eq(123);
        });

        it("should throw if more than one method is matched", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            expect(() => mock.setup(x => { x.doVoid(); x.doNumber(); })).to.throw(MockException);
        });

        it("should match a no args method", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber()).returns(() => 999);

            expect(mock.object.doNumber()).to.eq(999);
        });

        it("should match a method with explicit number value params", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber(It.isValue(321))).returns(() => 999);

            expect(mock.object.doNumber(321)).to.eq(999);
            expect(mock.object.doNumber(322)).to.eq(undefined);
            expect(mock.object.doNumber()).to.eq(undefined);
        });

        it("should match a method with implicit number value params", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber(321)).returns(() => 999);

            expect(mock.object.doNumber(321)).to.eq(999);
            expect(mock.object.doNumber(322)).to.eq(undefined);
            expect(mock.object.doNumber()).to.eq(undefined);
        });

        it("should match a method with explicit string value params", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doString(It.isValue("abc"))).returns((s: string) => s.toUpperCase());

            expect(mock.object.doString("abc")).to.eq("ABC");
            expect(mock.object.doString("cba")).to.eq(undefined);
            expect(mock.object.doString()).to.eq(undefined);
        });

        it("should match a method with implicit string value params", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doString("abc")).returns((s: string) => s.toUpperCase());

            expect(mock.object.doString("abc")).to.eq("ABC");
            expect(mock.object.doString("cba")).to.eq(undefined);
            expect(mock.object.doString()).to.eq(undefined);
        });

        it("should match a method with partial object value params", () => {

            let bar1 = new TypeMoqTests.Bar();
            bar1.value = "Lorem ipsum dolor sit amet";
            bar1.anyValue = 42;
            let bar2 = new TypeMoqTests.Bar();
            bar2.value = "Ut enim ad minim veniam";
            let match = { anyValue: 42 };
            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doObject(It.isObjectWith(match))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            expect(mock.object.doObject(bar2)).to.eq(undefined);

            bar2.anyValue = 42;
            expect(mock.object.doObject(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.doObject(new Object())).to.eq(undefined);
            expect(mock.object.doObject({ foo: 'nothing' })).to.eq(undefined);
            expect(mock.object.doObject()).to.eq(undefined);
        });

        it("should match a method with explicit object value params", () => {

            let bar1 = new TypeMoqTests.Bar();
            bar1.value = "Lorem ipsum dolor sit amet";
            let bar2 = new TypeMoqTests.Bar();
            bar2.value = "Ut enim ad minim veniam";
            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doObject(It.isValue(bar1))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            expect(mock.object.doObject(bar2)).to.eq(undefined);

            bar2.value = "Lorem ipsum dolor sit amet";
            expect(mock.object.doObject(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.doObject(new Object())).to.eq(undefined);
            expect(mock.object.doObject()).to.eq(undefined);
        });

        it("should match a method with implicit object value params", () => {

            let bar1 = new TypeMoqTests.Bar();
            bar1.value = "Lorem ipsum dolor sit amet";
            let bar2 = new TypeMoqTests.Bar();
            bar2.value = "Ut enim ad minim veniam";
            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doObject(bar1)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            expect(mock.object.doObject(bar2)).to.eq(undefined);

            bar2.value = "Lorem ipsum dolor sit amet";
            expect(mock.object.doObject(bar2)).to.eq(undefined);

            expect(mock.object.doObject(new Object())).to.eq(undefined);
            expect(mock.object.doObject()).to.eq(undefined);
        });

        it("should match a method with any object type params", () => {

            let bar1 = new TypeMoqTests.Bar();
            bar1.value = "Lorem ipsum dolor sit amet";
            let bar2 = new TypeMoqTests.Bar();
            bar2.value = "Ut enim ad minim veniam";
            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doObject(It.isAnyObject(TypeMoqTests.Bar))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            expect(mock.object.doObject(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.doObject(new Object())).to.eq(undefined);
            expect(mock.object.doObject()).to.eq(undefined);
        });

        it("should match a method with any string params", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

            expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
        });

        it("should match a method with any number params", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);

            expect(mock.object.doNumber(123)).to.eq(999);
        });

        it("should match a method with any interface/class params", () => {

            let bar1 = new TypeMoqTests.Bar();
            let bar2 = new TypeMoqTests.Bar();
            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doBar(It.isAnyObject(TypeMoqTests.Bar))).returns(() => bar2);

            expect(mock.object.doBar(bar1)).to.eq(bar2);
        });

        it("should match a method param by a predicate", () => {

            let bar1 = new TypeMoqTests.Bar();
            bar1.value = "Ut enim ad minim veniam";
            let bar2 = new TypeMoqTests.Bar();
            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam"))).returns(() => bar2);

            expect(mock.object.doBar(bar1)).to.eq(bar2);

            expect(mock.object.doBar(bar2)).to.eq(undefined);
        });

        it("should match a property getter", () => {

            let mock = Mock.ofType(TypeMoqTests.FooWithPublicGetterAndSetter);

            mock.setup(x => x.foo).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock.object.foo).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
        });

        it("should prefer oldest setup when multiple methods are setup", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);
            mock.setup(x => x.doString(It.isAnyString())).returns(() => "123");

            mock.setup(x => x.doString(It.isAnyString())).returns(() => "456");

            let user = new TypeMoqTests.DoerUser(mock.object);

            expect(user.execute("abc", 123)).to.eq("123");
        });

        it("should replay from oldest to newest record", () => {

            let mock = Mock.ofInstance((): number => -1, MockBehavior.Strict);

            mock.setup(x => x()).returns(() => 0);
            mock.setup(x => x()).returns(() => 1);
            mock.setup(x => x()).returns(() => 2);

            expect(mock.object()).to.eq(0);
            expect(mock.object()).to.eq(1);
            expect(mock.object()).to.eq(2);
            expect(() => mock.object()).to.throw(MockException);
        });

        it("should replay indefinitely when only a single record exists", () => {

            let mock = Mock.ofInstance((): number => -1, MockBehavior.Strict);

            mock.setup(x => x()).returns(() => 0);

            expect(mock.object()).to.eq(0);
            expect(mock.object()).to.eq(0);
            expect(mock.object()).to.eq(0);
        });

        it("should allow partial setup while keeping intact the target object", () => {

            let target = {
                a(): number { return 1; },
                b(): number { return this.a(); },
            };
            let mock = Mock.ofInstance(target);

            mock.callBase = true;

            expect(mock.object.a()).equal(1);
            expect(mock.object.b()).equal(1);

            mock.setup(x => x.a()).returns(() => 2);

            expect(target.a()).equal(1);
            expect(target.b()).equal(1);

            expect(mock.object.a()).equal(2);
            expect(mock.object.b()).equal(2);
        });

        describe("dynamic mock", () => {

            it("should be able to return for a property a falsy value", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock: TypeMoq.IMock<TypeMoqTests.IBar> = TypeMoq.Mock.ofType<TypeMoqTests.IBar>();

                    mock.setup(x => x.anyValue).returns(() => null);

                    expect(mock.object.anyValue).to.be.null;

                    mock.reset();
                    mock.setup(x => x.anyValue).returns(() => 0);

                    expect(mock.object.anyValue).to.eq(0);

                    mock.reset();
                    mock.setup(x => x.anyValue).returns(() => undefined);

                    expect(mock.object.anyValue).to.be.undefined;
                }

            });

            it("should throw if more than one method is matched", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    expect(() => mock.setup(x => { x.doVoid(); x.doNumber(); })).to.throw(MockException);
                }

            });

            it("should match a no args function", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x()).returns(() => 999);

                    expect(mock.object()).to.eq(999);
                }

            });

            it("should match a Function.prototype function", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    let context = {};
                    mock.setup(fn => fn.bind(context)).returns(fn => 999);

                    expect(mock.object.bind(context)).to.eq(999);
                }

            });

            it("should match a no args method", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber()).returns(() => 999);

                    expect(mock.object.doNumber()).to.eq(999);
                }

            });

            it("should match a function with explicit number value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isValue(321))).returns(() => 999);

                    expect(mock.object(321)).to.eq(999);
                    expect(mock.object(322)).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a method with explicit number value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber(It.isValue(321))).returns(() => 999);

                    expect(mock.object.doNumber(321)).to.eq(999);
                    expect(mock.object.doNumber(322)).to.eq(undefined);
                    expect(mock.object.doNumber()).to.eq(undefined);
                }

            });

            it("should match a function with implicit number value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(321)).returns(() => 999);

                    expect(mock.object(321)).to.eq(999);
                    expect(mock.object(322)).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a method with implicit number value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber(321)).returns(() => 999);

                    expect(mock.object.doNumber(321)).to.eq(999);
                    expect(mock.object.doNumber(322)).to.eq(undefined);
                    expect(mock.object.doNumber()).to.eq(undefined);
                }

            });

            it("should match a function with explicit string value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isValue("abc"))).returns((s: string) => s.toUpperCase());

                    expect(mock.object("abc")).to.eq("ABC");
                    expect(mock.object("cba")).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a method with explicit string value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doString(It.isValue("abc"))).returns((s: string) => s.toUpperCase());

                    expect(mock.object.doString("abc")).to.eq("ABC");
                    expect(mock.object.doString("cba")).to.eq(undefined);
                    expect(mock.object.doString()).to.eq(undefined);
                }

            });

            it("should match a function with implicit string value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x("abc")).returns((s: string) => s.toUpperCase());

                    expect(mock.object("abc")).to.eq("ABC");
                    expect(mock.object("cba")).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a method with implicit string value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doString("abc")).returns((s: string) => s.toUpperCase());

                    expect(mock.object.doString("abc")).to.eq("ABC");
                    expect(mock.object.doString("cba")).to.eq(undefined);
                    expect(mock.object.doString()).to.eq(undefined);
                }

            });

            it("should match a function with partial object value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Lorem ipsum dolor sit amet";
                    bar1.anyValue = 42;
                    let bar2 = new TypeMoqTests.Bar();
                    bar2.value = "Ut enim ad minim veniam";
                    let match = { anyValue: 42 };
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isObjectWith(match))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                    expect(mock.object(bar2)).to.eq(undefined);

                    bar2.anyValue = 42;
                    expect(mock.object(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object(new Object())).to.eq(undefined);
                    expect(mock.object({ foo: 'nothing' })).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a function with explicit object value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Lorem ipsum dolor sit amet";
                    let bar2 = new TypeMoqTests.Bar();
                    bar2.value = "Ut enim ad minim veniam";
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isValue(bar1))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                    expect(mock.object(bar2)).to.eq(undefined);

                    bar2.value = "Lorem ipsum dolor sit amet";
                    expect(mock.object(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object(new Object())).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a method with explicit object value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Lorem ipsum dolor sit amet";
                    let bar2 = new TypeMoqTests.Bar();
                    bar2.value = "Ut enim ad minim veniam";
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doObject(It.isValue(bar1))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                    expect(mock.object.doObject(bar2)).to.eq(undefined);

                    bar2.value = "Lorem ipsum dolor sit amet";
                    expect(mock.object.doObject(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object.doObject(new Object())).to.eq(undefined);
                    expect(mock.object.doObject()).to.eq(undefined);
                }

            });

            it("should match a function with implicit object value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Lorem ipsum dolor sit amet";
                    let bar2 = new TypeMoqTests.Bar();
                    bar2.value = "Ut enim ad minim veniam";
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(bar1)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                    expect(mock.object(bar2)).to.eq(undefined);

                    bar2.value = "Lorem ipsum dolor sit amet";
                    expect(mock.object(bar2)).to.eq(undefined);

                    expect(mock.object(new Object())).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a method with implicit object value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Lorem ipsum dolor sit amet";
                    let bar2 = new TypeMoqTests.Bar();
                    bar2.value = "Ut enim ad minim veniam";
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doObject(bar1)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                    expect(mock.object.doObject(bar2)).to.eq(undefined);

                    bar2.value = "Lorem ipsum dolor sit amet";
                    expect(mock.object.doObject(bar2)).to.eq(undefined);

                    expect(mock.object.doObject(new Object())).to.eq(undefined);
                    expect(mock.object.doObject()).to.eq(undefined);
                }

            });

            it("should match a function with any object type params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Lorem ipsum dolor sit amet";
                    let bar2 = new TypeMoqTests.Bar();
                    bar2.value = "Ut enim ad minim veniam";
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isAnyObject(TypeMoqTests.Bar))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                    expect(mock.object(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object(new Object())).to.eq(undefined);
                    expect(mock.object()).to.eq(undefined);
                }

            });

            it("should match a method with any object type params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Lorem ipsum dolor sit amet";
                    let bar2 = new TypeMoqTests.Bar();
                    bar2.value = "Ut enim ad minim veniam";
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doObject(It.isAnyObject(TypeMoqTests.Bar))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                    expect(mock.object.doObject(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object.doObject(new Object())).to.eq(undefined);
                    expect(mock.object.doObject()).to.eq(undefined);
                }

            });

            it("should match a function with any string params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isAnyString())).returns(s => s.toUpperCase());

                    expect(mock.object("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                }

            });

            it("should match a method with any string params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                    expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                }

            });

            it("should match a function with any number params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isAnyNumber())).returns(() => 999);

                    expect(mock.object(123)).to.eq(999);
                }

            });

            it("should match a method with any number params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);

                    expect(mock.object.doNumber(123)).to.eq(999);
                }

            });

            it("should match a function with any interface/class params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    let bar2 = new TypeMoqTests.Bar();
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.isAnyObject(TypeMoqTests.Bar))).returns(() => bar2);

                    expect(mock.object(bar1)).to.eq(bar2);
                }

            });

            it("should match a method with any interface/class params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    let bar2 = new TypeMoqTests.Bar();
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doBar(It.isAnyObject(TypeMoqTests.Bar))).returns(() => bar2);

                    expect(mock.object.doBar(bar1)).to.eq(bar2);
                }

            });

            it("should match a function param by a predicate", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Ut enim ad minim veniam";
                    let bar2 = new TypeMoqTests.Bar();
                    let mock = Mock.ofType<Function>();

                    mock.setup(x => x(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam"))).returns(() => bar2);

                    expect(mock.object(bar1)).to.eq(bar2);

                    expect(mock.object(bar2)).to.eq(undefined);
                }

            });

            it("should match a method param by a predicate", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let bar1 = new TypeMoqTests.Bar();
                    bar1.value = "Ut enim ad minim veniam";
                    let bar2 = new TypeMoqTests.Bar();
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam"))).returns(() => bar2);

                    expect(mock.object.doBar(bar1)).to.eq(bar2);

                    expect(mock.object.doBar(bar2)).to.eq(undefined);
                }

            });

            it("should match a property getter", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.FooWithPublicGetterAndSetter>();

                    mock.setup(x => x.foo).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                    expect(mock.object.foo).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                }

            });

            it("should prefer oldest setup when multiple methods are setup", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);
                    mock.setup(x => x.doString(It.isAnyString())).returns(() => "123");

                    mock.setup(x => x.doString(It.isAnyString())).returns(() => "456");

                    let user = new TypeMoqTests.DoerUser(mock.object);

                    expect(user.execute("abc", 123)).to.eq("123");
                }

            });

            it("should match a method with explicit value params", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.IThing>();
                    mock.callBase = false;

                    mock.setup(m => m.getA(It.isValue("asdf"))).returns(() => "fdsa");
                    mock.setup(m => m.getB(It.isValue(123))).returns(() => 321);

                    expect(TypeMoqTests.doSomething(mock.object)).equal("fdsa321");
                }

            });

            it("should match a method with any missing optional params", (done) => {

                if (!hasProxyES6 ||
                    typeof Promise == "undefined") {
                    done();
                }
                else {
                    let mock = TypeMoq.Mock.ofType<TypeMoqTests.APromise>(undefined, TypeMoq.MockBehavior.Strict);
                    let promise = new TypeMoqTests.AnotherPromise(mock.object);

                    mock.setup(x => x.doOperation<TypeMoqTests.OperationResult>(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny()))
                        .returns((op, processData, processError, timeout): Promise<TypeMoqTests.OperationResult> => {
                            return new Promise<TypeMoqTests.OperationResult>((resolve, reject) => {
                                setTimeout(function () {
                                    resolve({ result: "Success!", op: op, processData: processData, processError: processError, timeout: timeout}); //Yay! Everything went well!
                                }, 10);
                            });
                        });

                    promise.doSomething().then(value => {
                        expect(value.result).to.eq("Success!");
                        expect(value.op).to.be.a("function");
                        expect(value.processData).to.be.a("function");
                        expect(value.processError).to.be.a("function");
                        expect(value.timeout).to.eq(200);
                        done();
                    }).catch(e => {
                        done(e);
                    });
                }

            });

            it("should match a static method", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let greeter = TypeMoqTests.Greeter.instance();
                    let mock: TypeMoq.IMock<typeof TypeMoqTests.Greeter> = Mock.ofType<typeof TypeMoqTests.Greeter>();

                    mock.setup(x => x.instance()).returns(() => greeter);

                    expect(mock.object.instance()).to.eq(greeter);
                }

            });

        });

    });

    describe(".callback", () => {

        it("should execute callback when no args method is called", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            let called = false;

            mock.setup(x => x.doVoid()).callback(() => called = true);
            mock.object.doVoid();

            expect(called).to.eq(true);
        });

        it("should execute callback when method with args is called", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            let called1: boolean, called2: boolean = false;
            let numberArg: number;

            mock.setup(x => x.doString(It.isAnyString())).callback(() => called1 = true).returns(s => s.toUpperCase());
            mock.setup(x => x.doNumber(It.isAnyNumber())).callback(n => { numberArg = n; called2 = true; }).returns(n => n + 1);

            expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
            expect(called1).to.eq(true);
            expect(mock.object.doNumber(999)).to.eq(1000);
            expect(called2).to.eq(true);
            expect(numberArg).to.eq(999);
        });

        describe("dynamic mock", () => {

            it("should execute callback when no args method is called", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();
                    let called = false;

                    mock.setup(x => x.doVoid()).callback(() => called = true);
                    mock.object.doVoid();

                    expect(called).to.eq(true);
                }

            });

            it("should execute callback when method with args is called", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();
                    let called1: boolean, called2: boolean = false;
                    let numberArg: number;

                    mock.setup(x => x.doString(It.isAnyString())).callback(() => called1 = true).returns(s => s.toUpperCase());
                    mock.setup(x => x.doNumber(It.isAnyNumber())).callback(n => { numberArg = n; called2 = true; }).returns(n => n + 1);

                    expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                    expect(called1).to.eq(true);
                    expect(mock.object.doNumber(999)).to.eq(1000);
                    expect(called2).to.eq(true);
                    expect(numberArg).to.eq(999);
                }

            });

        });
    });

    describe(".callBase", () => {

        it("should call the underlying object of a mock created from a class type when callBase is true", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            mock.callBase = true;

            mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

            expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
            expect(mock.object.doNumber()).to.eq(101);
        });

        it("should call the underlying object of a mock created from a class type with ctor params when callBase is true", () => {

            let mock = Mock.ofType(TypeMoqTests.ClassWithNoDefaultConstructor, MockBehavior.Loose, "Lorem ipsum dolor sit amet", 999);
            mock.callBase = true;

            expect(mock.object.stringValue).to.eq("Lorem ipsum dolor sit amet");
            expect(mock.object.numberValue).to.eq(999);
        });

        it("should not call the underlying object of a mock created from a class type when callBase is false", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            mock.callBase = false;

            mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

            expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
            expect(mock.object.doNumber()).to.eq(undefined);
        });

        it("should call the underlying object of a mock created from an object when callBase is true", () => {

            let doer = new TypeMoqTests.Doer();
            let mock: TypeMoq.IMock<TypeMoqTests.Doer> = Mock.ofInstance(doer);
            mock.callBase = true;

            mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

            expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
            expect(mock.object.doNumber()).to.eq(101);
        });

        it("should not call the underlying object of a mock created from an object when callBase is false", () => {

            let doer = new TypeMoqTests.Doer();
            let mock: TypeMoq.IMock<TypeMoqTests.Doer> = Mock.ofInstance(doer);
            mock.callBase = false;

            mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

            expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
            expect(mock.object.doNumber()).to.eq(undefined);
        });

        it("should call the underlying object of a mock created from a function type when callBase is true", () => {

            let mock1: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);
            mock1.callBase = true;
            let mock2: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);
            mock2.callBase = true;

            mock2.setup(x => x(1, 2, 3)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock1.object()).to.eq("someFunc was called");
            expect(mock2.object(3, 2, 1)).to.eq("someFuncWithArgs was called");
            expect(mock2.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
        });

        it("should not call the underlying object of a mock created from a function type when callBase is false", () => {

            let mock1: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);
            mock1.callBase = false;
            let mock2: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);
            mock2.callBase = false;

            mock2.setup(x => x(1, 2, 3)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

            expect(mock1.object()).to.eq(undefined);
            expect(mock2.object(3, 2, 1)).to.eq(undefined);
            expect(mock2.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
        });

        it("should verify any inner calls inside a method call when callBase is true", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.Foo> = Mock.ofType(TypeMoqTests.Foo);
            mock.callBase = true;

            mock.object.register();
            mock.object.registerLambda();   // inside a lambda function calls cannot be verified

            mock.verify(x => x.canExecute(), Times.once());
        });

        it("should not verify any inner calls inside a method call when callBase is false", () => {

            let mock: TypeMoq.IMock<TypeMoqTests.Foo> = Mock.ofType(TypeMoqTests.Foo);
            mock.callBase = false;

            mock.object.register();
            mock.object.registerLambda();

            mock.verify(x => x.canExecute(), Times.never());
        });

    });

    describe(".throws", () => {

        it("should throw specified exception when matching a no args function", () => {

            let mock: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);

            mock.setup(x => x()).throws(new TypeMoqTests.CustomException());

            expect(() => mock.object()).to.throw(TypeMoqTests.CustomException);
        });

        it("should throw specified exception when matching a function with args", () => {

            let mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);

            mock.setup(x => x(It.isAny(), It.isAny(), It.isAny())).throws(new TypeMoqTests.CustomException());

            expect(() => mock.object(1, 2, 3)).to.throw(TypeMoqTests.CustomException);
        });

        it("should throw specified exception when matching a no args method", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doVoid()).throws(new TypeMoqTests.CustomException());

            expect(() => mock.object.doVoid()).to.throw(TypeMoqTests.CustomException);
        });

        it("should throw specified exception when matching a method with args", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber(999)).throws(new TypeMoqTests.CustomException());

            expect(() => mock.object.doNumber(999)).to.throw(TypeMoqTests.CustomException);
        });

        describe("dynamic mock", () => {

            it("should throw specified exception when matching a no args method", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doVoid()).throws(new TypeMoqTests.CustomException());

                    expect(() => mock.object.doVoid()).to.throw(TypeMoqTests.CustomException);
                }

            });

            it("should throw specified exception when matching a method with args", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber(999)).throws(new TypeMoqTests.CustomException());

                    expect(() => mock.object.doNumber(999)).to.throw(TypeMoqTests.CustomException);
                }

            });

        });

    });

    describe(".verify and .verifiable", () => {

        it("should check that a no args function was called at least once", () => {

            let mock: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);

            mock.object();

            mock.verify(x => x(), Times.atLeastOnce());
        });

        it("should check that a function with args was called at least once", () => {

            let mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);

            mock.object(1, 2, 3);

            mock.verify(x => x(It.isAnyNumber(), It.isAnyNumber(), It.isAnyNumber()), Times.atLeastOnce());
            expect(() => mock.verify(x => x(3, 2, 1), Times.atLeastOnce())).to.throw(MockException);
        });

        it("should throw if no args function not called at least once", () => {

            let mock: TypeMoq.IMock<() => string> = Mock.ofInstance(TypeMoqTests.someFunc);

            expect(() => mock.verify(x => x(), Times.atLeastOnce())).to.throw(MockException);
        });

        it("should throw if function with params not called at least once", () => {

            let mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = Mock.ofInstance(TypeMoqTests.someFuncWithArgs);

            expect(() => mock.verify(x => x(It.isAnyNumber(), It.isAnyNumber(), It.isAnyNumber()), Times.atLeastOnce())).to.throw(MockException);
        });

        it("should check that no args method was called at least once", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.object.doVoid();

            mock.verify(x => x.doVoid(), Times.atLeastOnce());
        });

        it("should check that method with params was called at least once", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.object.doString("Lorem ipsum dolor sit amet");

            mock.verify(x => x.doString(It.isValue("Lorem ipsum dolor sit amet")), Times.atLeastOnce());
        });

        it("should check that method with undefined params was called once", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.object.doString(undefined);

            mock.verify(x => x.doString(), Times.never());
            mock.verify(x => x.doString(undefined), Times.once());
            mock.verify(x => x.doString(It.isAny()), Times.once());
        });

        it("should check that value getter was called at least once", () => {

            let mock = Mock.ofType(TypeMoqTests.Bar);

            mock.object.value;

            mock.verify(x => x.value, Times.atLeastOnce());
        });

        it("should check that value setter was called at least once", () => {

            let mock = Mock.ofType(TypeMoqTests.Bar);

            mock.object.value = "Lorem ipsum dolor sit amet";

            mock.verify(x => x.value = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
        });

        it("should verify all expectations were called at most once", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            let bar = new TypeMoqTests.Bar();
            bar.value = "Ut enim ad minim veniam";

            mock.object.doVoid();
            mock.object.doString("Lorem ipsum dolor sit amet");
            mock.object.doNumber(999);
            mock.object.doBar(bar);

            mock.verify(x => x.doNumber(999), Times.atMostOnce());
            mock.verify(x => x.doString(It.isAny()), Times.atMostOnce());
            mock.verify(x => x.doVoid(), Times.atMostOnce());
            mock.verify(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam")), Times.atMostOnce());

            mock.object.doString("Ut enim ad minim veniam");

            expect(() => mock.verify(x => x.doString(It.isAny()), Times.atMostOnce())).to.throw(MockException);

            mock.object.doVoid();

            expect(() => mock.verify(x => x.doVoid(), Times.atMostOnce())).to.throw(MockException);

            mock.object.doBar(bar);

            expect(() => mock.verify(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam")), Times.atMostOnce())).to.throw(MockException);
        });

        it("should verify all expectations were called at least once", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            let bar = new TypeMoqTests.Bar();
            bar.value = "Ut enim ad minim veniam";

            mock.object.doVoid();
            mock.object.doString("Lorem ipsum dolor sit amet");
            mock.object.doString("Ut enim ad minim veniam");
            mock.object.doNumber(999);
            mock.object.doVoid();
            mock.object.doBar(bar);

            mock.verify(x => x.doNumber(999), Times.atLeastOnce());
            mock.verify(x => x.doString(It.isAny()), Times.atLeastOnce());
            mock.verify(x => x.doVoid(), Times.atLeastOnce());
            mock.verify(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam")), Times.atMostOnce());
        });

        it("should verify all expectations marked as verifiable were called at least once", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            let bar = new TypeMoqTests.Bar();
            bar.value = "Ut enim ad minim veniam";

            mock.setup(x => x.doNumber(999)).verifiable();
            mock.setup(x => x.doString(It.isAny())).verifiable();
            mock.setup(x => x.doVoid()).verifiable();

            mock.object.doVoid();
            mock.object.doString("Lorem ipsum dolor sit amet");
            mock.object.doString("Ut enim ad minim veniam");
            mock.object.doNumber(999);

            mock.verifyAll();

            mock.setup(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam"))).verifiable();

            mock.object.doVoid();
            mock.object.doBar(bar);

            mock.verifyAll();
        });

        it("should verify all expectations marked as verifiable were called a specific number of times", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);
            let bar = new TypeMoqTests.Bar();
            bar.value = "Ut enim ad minim veniam";

            mock.setup(x => x.doNumber(999)).verifiable();
            mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(2));
            mock.setup(x => x.doVoid()).verifiable(Times.atMostOnce());
            mock.setup(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam"))).verifiable(Times.exactly(2));

            mock.object.doVoid();
            mock.object.doString("Lorem ipsum dolor sit amet");
            mock.object.doString("Ut enim ad minim veniam");
            mock.object.doNumber(999);
            mock.object.doBar(bar);
            mock.object.doBar(bar);

            mock.verifyAll();

            mock.object.doVoid();

            expect(() => mock.verifyAll()).to.throw(MockException);
        });

        it("should check mock with the same verifiable invocation setup multiple times", () => {

            let mock = Mock.ofInstance((a: number) => { });

            mock.setup(x => x(It.isValue(0))).returns(() => 0).verifiable();
            mock.setup(x => x(It.isValue(0))).returns(() => 0).verifiable();

            expect(() => mock.verifyAll()).to.throw(MockException);

            mock.object(0);

            mock.verifyAll();

            mock.object(0);

            mock.verifyAll();
        });

        it("should be possible to chain callback and verifiable without an intermediary", () => {

            let mock = Mock.ofInstance(() => { });

            mock.setup(x => x()).callback(() => { }).callBase().verifiable(Times.never());
            mock.setup(x => x()).callback(() => { }).returns(() => null).verifiable(Times.never());
            mock.setup(x => x()).callback(() => { }).verifiable(Times.never());

            mock.verifyAll();
        });

        it("should check that mock passed to mock was called at least once", () => {

            let mockBar = Mock.ofType(TypeMoqTests.Bar);
            let mockFoo = Mock.ofType(TypeMoqTests.Foo, MockBehavior.Loose, mockBar.object);
            mockFoo.callBase = true;

            mockFoo.object.setBar("Lorem ipsum dolor sit amet");

            mockBar.verify(x => x.value = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
        });

        describe("sequence", () => {

            it('should check invocation order for different consecutive matchers', () => {

                let mock = Mock.ofInstance((x: number) => { });

                mock.setup(x => x(1)).verifiable(Times.once(), ExpectedCallType.InSequence);
                mock.setup(x => x(2)).verifiable(Times.once(), ExpectedCallType.InSequence);

                mock.object(1);
                mock.object(2);

                mock.verifyAll();

                mock.reset();

                mock.setup(x => x(1)).verifiable(Times.once(), ExpectedCallType.InSequence);
                mock.setup(x => x(2)).verifiable(Times.once(), ExpectedCallType.InSequence);

                mock.object(2);
                mock.object(1);

                expect(() => mock.verifyAll()).to.throw(MockException);
            });

            it('should check invocation order for same consecutive matcher', () => {

                let mock = Mock.ofInstance((x: number) => { });

                mock.setup(x => x(1)).verifiable(Times.once(), ExpectedCallType.InSequence);
                mock.setup(x => x(It.isAnyNumber())).verifiable(Times.atLeastOnce(), ExpectedCallType.InSequence);
                mock.setup(x => x(2)).verifiable(Times.atMostOnce(), ExpectedCallType.InSequence);

                mock.object(1);
                mock.object(2);

                mock.verifyAll();

                mock.reset();

                mock.setup(x => x(1)).verifiable(Times.once(), ExpectedCallType.InSequence);
                mock.setup(x => x(It.isAnyNumber())).verifiable(Times.atLeastOnce(), ExpectedCallType.InSequence);
                mock.setup(x => x(2)).verifiable(Times.atMostOnce(), ExpectedCallType.InSequence);

                mock.object(2);
                mock.object(1);

                expect(() => mock.verifyAll()).to.throw(MockException);
            });

        });

        describe("dynamic mock", () => {

            it("should check that no args method was called at least once", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.object.doVoid();

                    mock.verify(x => x.doVoid(), Times.atLeastOnce());
                }

            });

            it("should check that method with params was called at least once", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.object.doString("Lorem ipsum dolor sit amet");

                    mock.verify(x => x.doString(It.isValue("Lorem ipsum dolor sit amet")), Times.atLeastOnce());
                }

            });

            it("should check that value getter was called at least once", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Bar>();

                    mock.object.value;

                    mock.verify(x => x.value, Times.atLeastOnce());
                }

            });

            it("should check that value setter was called at least once", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Bar>();

                    mock.object.value = "Lorem ipsum dolor sit amet";

                    mock.verify(x => x.value = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
                }

            });

            it("should verify all expectations were called at most once", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();
                    let bar = new TypeMoqTests.Bar();
                    bar.value = "Ut enim ad minim veniam";

                    mock.object.doVoid();
                    mock.object.doString("Lorem ipsum dolor sit amet");
                    mock.object.doNumber(999);

                    mock.verify(x => x.doNumber(999), Times.atMostOnce());
                    mock.verify(x => x.doString(It.isAny()), Times.atMostOnce());
                    mock.verify(x => x.doVoid(), Times.atMostOnce());
                    mock.verify(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam")), Times.atMostOnce());

                    mock.object.doString("Ut enim ad minim veniam");
                    mock.object.doBar(bar);

                    expect(() => mock.verify(x => x.doString(It.isAny()), Times.atMostOnce())).to.throw(MockException);

                    mock.object.doVoid();

                    expect(() => mock.verify(x => x.doVoid(), Times.atMostOnce())).to.throw(MockException);
                }

            });

            it("should verify all expectations were called at least once", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();
                    let bar = new TypeMoqTests.Bar();
                    bar.value = "Ut enim ad minim veniam";

                    mock.object.doVoid();
                    mock.object.doString("Lorem ipsum dolor sit amet");
                    mock.object.doString("Ut enim ad minim veniam");
                    mock.object.doNumber(999);
                    mock.object.doVoid();
                    mock.object.doBar(bar);

                    mock.verify(x => x.doNumber(999), Times.atLeastOnce());
                    mock.verify(x => x.doString(It.isAny()), Times.atLeastOnce());
                    mock.verify(x => x.doVoid(), Times.atLeastOnce());
                    mock.verify(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam")), Times.atLeastOnce());
                }

            });

            it("should verify all expectations marked as verifiable were called at least once", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();
                    let bar = new TypeMoqTests.Bar();
                    bar.value = "Ut enim ad minim veniam";

                    mock.setup(x => x.doNumber(999)).verifiable();
                    mock.setup(x => x.doString(It.isAny())).verifiable();
                    mock.setup(x => x.doVoid()).verifiable();
                    mock.setup(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam"))).verifiable();

                    mock.object.doVoid();
                    mock.object.doString("Lorem ipsum dolor sit amet");
                    mock.object.doString("Ut enim ad minim veniam");
                    mock.object.doNumber(999);
                    mock.object.doBar(bar);

                    mock.verifyAll();

                    mock.object.doVoid();

                    mock.verifyAll();
                }

            });

            it("should verify all expectations marked as verifiable were called a specific number of times", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();
                    let bar = new TypeMoqTests.Bar();
                    bar.value = "Ut enim ad minim veniam";

                    mock.setup(x => x.doNumber(999)).verifiable();
                    mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(2));
                    mock.setup(x => x.doVoid()).verifiable(Times.atMostOnce());
                    mock.setup(x => x.doBar(It.is((x: TypeMoqTests.Bar) => x.value === "Ut enim ad minim veniam"))).verifiable(Times.exactly(2));

                    mock.object.doVoid();
                    mock.object.doString("Lorem ipsum dolor sit amet");
                    mock.object.doString("Ut enim ad minim veniam");
                    mock.object.doNumber(999);
                    mock.object.doBar(bar);
                    mock.object.doBar(bar);

                    mock.verifyAll();

                    mock.object.doVoid();

                    expect(() => mock.verifyAll()).to.throw(MockException);
                }

            });

        });

    });

    describe(".reset", () => {

        it("should remove any previous setups", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);
            mock.setup(x => x.doString(It.isAnyString())).returns(() => "123");

            let user1 = new TypeMoqTests.DoerUser(mock.object);

            expect(user1.execute("abc", 123)).to.eq("123");

            mock.reset();

            mock.setup(x => x.doString(It.isAnyString())).returns(() => "456");

            let user2 = new TypeMoqTests.DoerUser(mock.object);

            expect(user2.execute("abc", 123)).to.eq("456");
            expect(user2.execute("abcd", 1234)).to.eq("456");
        });

        it("should remove any previous expectations", () => {

            let mock = Mock.ofType(TypeMoqTests.Doer);

            mock.setup(x => x.doNumber(999)).verifiable();
            mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(2));
            mock.setup(x => x.doVoid()).verifiable(Times.atMostOnce());

            mock.object.doVoid();
            mock.object.doString("Lorem ipsum dolor sit amet");
            mock.object.doString("Ut enim ad minim veniam");
            mock.object.doNumber(999);

            mock.verifyAll();

            mock.reset();

            mock.setup(x => x.doNumber(999)).verifiable(Times.exactly(1));
            mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(1));
            mock.setup(x => x.doVoid()).verifiable(Times.exactly(1));

            mock.object.doVoid();
            mock.object.doString("Lorem ipsum dolor sit amet");
            mock.object.doNumber(999);

            mock.verifyAll();
        });

        it('should revert proxied object to its initial state', () => {

            let mock = Mock.ofInstance<() => void>(() => { });
            let obj = mock.object;

            mock.reset();

            obj();

            mock.verify(x => x(), Times.once());
        });

        describe("dynamic mock", () => {

            it("should remove any previous setups", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);
                    mock.setup(x => x.doString(It.isAnyString())).returns(() => "123");

                    let user1 = new TypeMoqTests.DoerUser(mock.object);

                    expect(user1.execute("abc", 123)).to.eq("123");

                    mock.reset();

                    mock.setup(x => x.doString(It.isAnyString())).returns(() => "456");

                    let user2 = new TypeMoqTests.DoerUser(mock.object);

                    expect(user2.execute("abc", 123)).to.eq("456");
                }

            });

            it("should remove any previous expectations", () => {

                if (!hasProxyES6) {
                    console.log(noProxyES6Msg);
                }
                else {
                    let mock = Mock.ofType<TypeMoqTests.Doer>();

                    mock.setup(x => x.doNumber(999)).verifiable();
                    mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(2));
                    mock.setup(x => x.doVoid()).verifiable(Times.atMostOnce());

                    mock.object.doVoid();
                    mock.object.doString("Lorem ipsum dolor sit amet");
                    mock.object.doString("Ut enim ad minim veniam");
                    mock.object.doNumber(999);

                    mock.verifyAll();

                    mock.reset();

                    mock.setup(x => x.doNumber(999)).verifiable(Times.exactly(1));
                    mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(1));
                    mock.setup(x => x.doVoid()).verifiable(Times.exactly(1));

                    mock.object.doVoid();
                    mock.object.doString("Lorem ipsum dolor sit amet");
                    mock.object.doNumber(999);

                    mock.verifyAll();
                }

            });

        });

    });

    describe("with chai,should.js,expect.js,better-assert expectations", () => {

        let mock: TypeMoq.IMock<TypeMoqTests.Bar>;

        beforeEach(() => {
            mock = Mock.ofType(TypeMoqTests.Bar);
        });

        //expect(mock(obj => obj.method("ping"))).to.have.been.called.atLeastOnce
        it("should check that method with args was called at least once");

    });

});
