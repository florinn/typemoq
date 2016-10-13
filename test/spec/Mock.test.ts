/// <reference path='../setup.ts' /> 

let Mock = typemoq.Mock;
let MockBehavior = typemoq.MockBehavior;
let It = typemoq.It;
let Times = typemoq.Times;
let MockException = typemoq.MockException;

module TypeMoqTests {

    describe("Mock", () => {

        describe("ctor", () => {

            it("should create an instance using class as ctor parameter", () => {

                let mock: TypeMoq.Mock<Bar> = Mock.ofType(Bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using class as ctor parameter and allow interface cast", () => {

                let mock: TypeMoq.Mock<IBar> = Mock.ofType(Bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using interface as type variable and class as ctor parameter", () => {

                let mock: TypeMoq.Mock<IBar> = Mock.ofType<IBar>(Bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using class as ctor parameter and ctor args", () => {

                let bar = new Bar();
                let mock: TypeMoq.Mock<Foo> = Mock.ofType(Foo, MockBehavior.Loose, bar);

                expect(mock.object).to.be.not.null;
                expect(mock.object.bar).to.be.not.null;
            });

            it("should create an instance using a generic class as ctor parameter and ctor args", () => {

                let mock: TypeMoq.Mock<GenericFoo<Bar>> = Mock.ofType(GenericFoo, MockBehavior.Loose, Bar, 999);

                expect(mock.object).to.be.not.null;
                expect(mock.object.bar).to.be.not.null;
                expect(mock.object.numberValue).to.be.not.null;
            })
            
            it("should create an instance from an existing object", () => {

                let bar = new Bar();

                let mock: TypeMoq.Mock<Bar> = Mock.ofInstance(bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance from a function object", () => {

                let mock1: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);
                let mock2: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                expect(mock1.object).to.be.not.null;
                expect(mock2.object).to.be.not.null;
            });

        });
        
        describe(".object", () => {

            it("should initialize proxy instance", () => {

                let mock: TypeMoq.Mock<Bar> = Mock.ofType(Bar);

                let bar: Bar = mock.object;
                let bar2: IBar = mock.object;

                expect(bar).to.be.not.null;
                expect(bar).to.eq(bar2);
            });

            it("should expose interface passed in as type variable to ctor", () => {

                let mock: TypeMoq.Mock<IBar> = Mock.ofType<IBar>(Bar);

                let bar: IBar = mock.object;
                let bar2: Bar = mock.object;

                expect(bar).to.be.not.null;
                expect(bar).to.eq(bar2);
            });

            it("should expose type of object passed in as variable to ctor", () => {

                let bar = new Bar();
                let mock: TypeMoq.Mock<Bar> = Mock.ofInstance(bar);

                let bar2: Bar = mock.object;

                expect(bar2).to.be.not.null;
            });

            it("should expose type of function passed in as variable to ctor", () => {

                let mock1: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);
                let mock2: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);
                let func1: () => string = mock1.object;
                let func2: (a: any, b: any, c: any) => string = mock2.object;

                expect(func1).to.be.not.null;
                expect(func2).to.be.not.null;
            });

        });

        describe("mock behavior", () => {

            it("should return default value when behavior is loose", () => {

                let mock = Mock.ofType(Doer);

                expect(mock.object.doNumber(999)).to.eq(undefined);
            });

            it("should throw when behavior is strict", () => {

                let mock = Mock.ofType(Doer, MockBehavior.Strict);

                expect(() => mock.object.doNumber(999)).to.throw(MockException);
            });

            it("should throw an exception derived from Error when behavior is strict", () => {

                let mock = Mock.ofType(Doer, MockBehavior.Strict);

                expect(() => mock.object.doNumber(999)).to.throw(Error);
            });
        });

        describe(".setup and .returns", () => {

            it("should match a no args function", () => {

                let mock: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);

                mock.setup(x => x()).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object()).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

            it("should match a function with args", () => {

                let mock: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                mock.setup(x => x(It.isAny(), It.isAny(), It.isAny())).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

            it("should throw if more than one method is matched", () => {

                let mock = Mock.ofType(Doer);

                expect(() => mock.setup(x => { x.doVoid(); x.doNumber(); })).to.throw(MockException);
            });

            it("should match a no args method", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber()).returns(() => 999);

                expect(mock.object.doNumber()).to.eq(999);
            });

            it("should throw if any setup param not a match object", () => {

                let bar = new Bar();
                let mock = Mock.ofType(Doer);

                expect(() => mock.setup(x => x.doObject(bar))).to.throw(MockException);
            });

            it("should match a method with explicit number value params", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(It.isValue(321))).returns(() => 999);

                expect(mock.object.doNumber(321)).to.eq(999);
                expect(mock.object.doNumber(322)).to.eq(undefined);
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should match a method with implicit number value params", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(321)).returns(() => 999);

                expect(mock.object.doNumber(321)).to.eq(999);
                expect(mock.object.doNumber(322)).to.eq(undefined);
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should match a method with explicit string value params", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doString(It.isValue("abc"))).returns((s: string) => s.toUpperCase());

                expect(mock.object.doString("abc")).to.eq("ABC");
                expect(mock.object.doString("cba")).to.eq(undefined);
                expect(mock.object.doString()).to.eq(undefined);
            });

            it("should match a method with implicit string value params", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doString("abc")).returns((s: string) => s.toUpperCase());

                expect(mock.object.doString("abc")).to.eq("ABC");
                expect(mock.object.doString("cba")).to.eq(undefined);
                expect(mock.object.doString()).to.eq(undefined);
            });

            it("should match a method with object value params", () => {

                let bar1 = new Bar();
                bar1.value = "Lorem ipsum dolor sit amet";
                let bar2 = new Bar();
                bar2.value = "Ut enim ad minim veniam";
                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doObject(It.isValue(bar1))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                expect(mock.object.doObject(bar2)).to.eq(undefined);

                bar2.value = "Lorem ipsum dolor sit amet";
                expect(mock.object.doObject(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object.doObject(new Object())).to.eq(undefined);
                expect(mock.object.doObject()).to.eq(undefined);
            });

            it("should match a method with any object type params", () => {

                let bar1 = new Bar();
                bar1.value = "Lorem ipsum dolor sit amet";
                let bar2 = new Bar();
                bar2.value = "Ut enim ad minim veniam";
                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doObject(It.isAnyObject(Bar))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object.doObject(bar1)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                expect(mock.object.doObject(bar2)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object.doObject(new Object())).to.eq(undefined);
                expect(mock.object.doObject()).to.eq(undefined);
            });

            it("should match a method with any string params", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
            });

            it("should match a method with any number params", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);

                expect(mock.object.doNumber(123)).to.eq(999);
            });

            it("should match a method with any interface/class params", () => {

                let bar1 = new Bar();
                let bar2 = new Bar();
                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doBar(It.isAnyObject(Bar))).returns(() => bar2);

                expect(mock.object.doBar(bar1)).to.eq(bar2);
            });

            it("should match a method param by a predicate", () => {

                let bar1 = new Bar();
                bar1.value = "Ut enim ad minim veniam";
                let bar2 = new Bar();
                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doBar(It.is((x: Bar) => x.value === "Ut enim ad minim veniam"))).returns(() => bar2);

                expect(mock.object.doBar(bar1)).to.eq(bar2);

                expect(mock.object.doBar(bar2)).to.eq(undefined);
            });

            it("should match a property getter", () => {

                let mock = Mock.ofType(FooWithPublicGetterAndSetter);

                mock.setup(x => x.foo).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object.foo).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

            it("should prefer oldest setup when multiple methods are setup", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);
                mock.setup(x => x.doString(It.isAnyString())).returns(() => "123");

                mock.setup(x => x.doString(It.isAnyString())).returns(() => "456");

                let user = new DoerUser(mock.object);

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

        });

        describe(".callback", () => {

            it("should execute callback when no args method is called", () => {

                let mock = Mock.ofType(Doer);
                let called = false;

                mock.setup(x => x.doVoid()).callback(() => called = true);
                mock.object.doVoid();

                expect(called).to.eq(true);
            });

            it("should execute callback when method with args is called", () => {

                let mock = Mock.ofType(Doer);
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
        });

        describe(".callBase", () => {

            it("should call the underlying object of a mock created from a class type when callBase is true", () => {

                let mock = Mock.ofType(Doer);
                mock.callBase = true;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(101);
            });

            it("should call the underlying object of a mock created from a class type with ctor params when callBase is true", () => {

                let mock = Mock.ofType(ClassWithNoDefaultConstructor, MockBehavior.Loose, "Lorem ipsum dolor sit amet", 999);
                mock.callBase = true;

                expect(mock.object.stringValue).to.eq("Lorem ipsum dolor sit amet");
                expect(mock.object.numberValue).to.eq(999);
            });

            it("should not call the underlying object of a mock created from a class type when callBase is false", () => {

                let mock = Mock.ofType(Doer);
                mock.callBase = false;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should call the underlying object of a mock created from an object when callBase is true", () => {

                let doer = new Doer();
                let mock: TypeMoq.Mock<Doer> = Mock.ofInstance(doer);
                mock.callBase = true;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(101);
            });

            it("should not call the underlying object of a mock created from an object when callBase is false", () => {

                let doer = new Doer();
                let mock: TypeMoq.Mock<Doer> = Mock.ofInstance(doer);
                mock.callBase = false;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should call the underlying object of a mock created from a function type when callBase is true", () => {

                let mock1: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);
                mock1.callBase = true;
                let mock2: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);
                mock2.callBase = true;

                mock2.setup(x => x(1, 2, 3)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock1.object()).to.eq("someFunc was called");
                expect(mock2.object(3, 2, 1)).to.eq("someFuncWithArgs was called");
                expect(mock2.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

            it("should not call the underlying object of a mock created from a function type when callBase is false", () => {

                let mock1: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);
                mock1.callBase = false;
                let mock2: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);
                mock2.callBase = false;

                mock2.setup(x => x(1, 2, 3)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock1.object()).to.eq(undefined);
                expect(mock2.object(3, 2, 1)).to.eq(undefined);
                expect(mock2.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });
            
        });

        describe(".throws", () => {

            it("should throw specified exception when matching a no args function", () => {

                let mock: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);

                mock.setup(x => x()).throws(new CustomException());

                expect(() => mock.object()).to.throw(CustomException);
            });

            it("should throw specified exception when matching a function with args", () => {

                let mock: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                mock.setup(x => x(It.isAny(), It.isAny(), It.isAny())).throws(new CustomException());

                expect(() => mock.object(1, 2, 3)).to.throw(CustomException);
            });

            it("should throw specified exception when matching a no args method", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doVoid()).throws(new CustomException());

                expect(() => mock.object.doVoid()).to.throw(CustomException);
            });

            it("should throw specified exception when matching a method with args", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(999)).throws(new CustomException());

                expect(() => mock.object.doNumber(999)).to.throw(CustomException);
            });
        });

        describe(".verify and .verifiable", () => {

            it("should check that a no args function was called at least once", () => {

                let mock: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);

                mock.object();

                mock.verify(x => x(), Times.atLeastOnce());
            });

            it("should check that a function with args was called at least once", () => {

                let mock: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                mock.object(1, 2, 3);

                mock.verify(x => x(It.isAnyNumber(), It.isAnyNumber(), It.isAnyNumber()), Times.atLeastOnce());
                expect(() => mock.verify(x => x(3, 2, 1), Times.atLeastOnce())).to.throw(MockException);
            });

            it("should throw if no args function not called at least once", () => {

                let mock: TypeMoq.Mock<() => string> = Mock.ofInstance(someFunc);

                expect(() => mock.verify(x => x(), Times.atLeastOnce())).to.throw(MockException);
            });

            it("should throw if function with params not called at least once", () => {

                let mock: TypeMoq.Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                expect(() => mock.verify(x => x(It.isAnyNumber(), It.isAnyNumber(), It.isAnyNumber()), Times.atLeastOnce())).to.throw(MockException);
            });

            it("should check that no args method was called at least once", () => {

                let mock = Mock.ofType(Doer);

                mock.object.doVoid();

                mock.verify(x => x.doVoid(), Times.atLeastOnce());
            });

            it("should check that method with params was called at least once", () => {

                let mock = Mock.ofType(Doer);

                mock.object.doString("Lorem ipsum dolor sit amet");

                mock.verify(x => x.doString(It.isValue("Lorem ipsum dolor sit amet")), Times.atLeastOnce());
            });

            it("should check that value getter was called at least once", () => {

                let mock = Mock.ofType(Bar);

                mock.object.value;

                mock.verify(x => x.value, Times.atLeastOnce());
            });

            it("should check that value setter was called at least once", () => {

                let mock = Mock.ofType(Bar);

                mock.object.value = "Lorem ipsum dolor sit amet";

                mock.verify(x => x.value = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
            });

            it("should verify all expectations were called at most once", () => {

                let mock = Mock.ofType(Doer);

                mock.object.doVoid();
                mock.object.doString("Lorem ipsum dolor sit amet");
                mock.object.doNumber(999);

                mock.verify(x => x.doNumber(999), Times.atMostOnce());
                mock.verify(x => x.doString(It.isAny()), Times.atMostOnce());
                mock.verify(x => x.doVoid(), Times.atMostOnce());

                mock.object.doString("Ut enim ad minim veniam");

                expect(() => mock.verify(x => x.doString(It.isAny()), Times.atMostOnce())).to.throw(MockException);

                mock.object.doVoid();

                expect(() => mock.verify(x => x.doVoid(), Times.atMostOnce())).to.throw(MockException);
            });

            it("should verify all expectations were called at least once", () => {

                let mock = Mock.ofType(Doer);

                mock.object.doVoid();
                mock.object.doString("Lorem ipsum dolor sit amet");
                mock.object.doString("Ut enim ad minim veniam");
                mock.object.doNumber(999);
                mock.object.doVoid();

                mock.verify(x => x.doNumber(999), Times.atLeastOnce());
                mock.verify(x => x.doString(It.isAny()), Times.atLeastOnce());
                mock.verify(x => x.doVoid(), Times.atLeastOnce());
            });

            it("should verify all expectations marked as verifiable were called at least once", () => {
                
                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(999)).verifiable();
                mock.setup(x => x.doString(It.isAny())).verifiable();
                mock.setup(x => x.doVoid()).verifiable();

                mock.object.doVoid();
                mock.object.doString("Lorem ipsum dolor sit amet");
                mock.object.doString("Ut enim ad minim veniam");
                mock.object.doNumber(999);

                mock.verifyAll();

                mock.object.doVoid();

                mock.verifyAll();
            });

            it("should verify all expectations marked as verifiable were called a specific number of times", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(999)).verifiable();
                mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(2));
                mock.setup(x => x.doVoid()).verifiable(Times.atMostOnce());

                mock.object.doVoid();
                mock.object.doString("Lorem ipsum dolor sit amet");
                mock.object.doString("Ut enim ad minim veniam");
                mock.object.doNumber(999);

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

                const mock = new Mock<() => void>(() => { });

                mock.setup(x => x()).callback(() => { }).callBase().verifiable(Times.never());

                mock.setup(x => x()).callback(() => { }).returns(() => null).verifiable(Times.never());

                mock.setup(x => x()).callback(() => { }).verifiable(Times.never());

                mock.verifyAll();
            });

            it("should check that mock passed to mock was called at least once", () => {

                let mockBar = Mock.ofType(Bar);
                let mockFoo = Mock.ofType(Foo, MockBehavior.Loose, mockBar.object);
                mockFoo.callBase = true;

                mockFoo.object.setBar("Lorem ipsum dolor sit amet");

                mockBar.verify(x => x.value = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
            });

        });

        describe(".reset", () => {

            it("should remove any previous setups", () => {

                let mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);
                mock.setup(x => x.doString(It.isAnyString())).returns(() => "123");

                let user1 = new DoerUser(mock.object);

                expect(user1.execute("abc", 123)).to.eq("123");

                mock.reset();

                mock.setup(x => x.doString(It.isAnyString())).returns(() => "456");

                let user2 = new DoerUser(mock.object);

                expect(user2.execute("abc", 123)).to.eq("456");
            });

            it("should remove any previous expectations", () => {

                let mock = Mock.ofType(Doer);

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

        });

        describe("with chai,should.js,expect.js,better-assert expectations", () => {

            let mock: TypeMoq.Mock<Bar>;

            beforeEach(() => {
                mock = Mock.ofType(Bar);
            });

            //expect(mock(obj => obj.method("ping"))).to.have.been.called.atLeastOnce
            it("should check that method with args was called at least once");

        });

    });

}