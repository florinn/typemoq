/// <reference path='../setup.ts' /> 

import Mock = TypeMoq.Mock;

module TypeMoq.Tests {

    describe("Mock", () => {

        describe("ctor", () => {

            it("should create an instance using class as ctor parameter", () => {

                var mock: Mock<Bar> = Mock.ofType(Bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using interface as type variable and class as ctor parameter", () => {

                var mock: Mock<IBar> = Mock.ofType<IBar>(Bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using class as ctor parameter and ctor args", () => {

                var bar = new Bar();
                var mock: Mock<Foo> = Mock.ofType(Foo, MockBehavior.Loose, bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using a generic class as ctor parameter and ctor args", () => {

                var mock: Mock<GenericFoo<Bar>> = Mock.ofType(GenericFoo, MockBehavior.Loose, Bar);

                expect(mock.object).to.be.not.null;
            })
            
            it("should create an instance from an existing object", () => {

                var bar = new Bar();

                var mock: Mock<Bar> = Mock.ofInstance(bar);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance from a function object", () => {

                var mock1: Mock<() => string> = Mock.ofInstance(someFunc);
                var mock2: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                expect(mock1.object).to.be.not.null;
                expect(mock2.object).to.be.not.null;
            });

        });
        
        describe(".object", () => {

            it("should initialize proxy instance", () => {

                var mock: Mock<Bar> = Mock.ofType(Bar);

                var bar: Bar = mock.object;
                var bar2: IBar = mock.object;

                expect(bar).to.be.not.null;
                expect(bar).to.eq(bar2);
            });

            it("should expose interface passed in as type variable to ctor", () => {

                var mock: Mock<IBar> = Mock.ofType<IBar>(Bar);

                var bar: IBar = mock.object;
                var bar2: Bar = mock.object;

                expect(bar).to.be.not.null;
                expect(bar).to.eq(bar2);
            });

            it("should expose type of object passed in as variable to ctor", () => {

                var bar = new Bar();
                var mock: Mock<Bar> = Mock.ofInstance(bar);

                var bar: Bar = mock.object;

                expect(bar).to.be.not.null;
            });

            it("should expose type of function passed in as variable to ctor", () => {

                var mock1: Mock<() => string> = Mock.ofInstance(someFunc);
                var mock2: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);
                var func1: () => string = mock1.object;
                var func2: (a: any, b: any, c: any) => string = mock2.object;

                expect(func1).to.be.not.null;
                expect(func2).to.be.not.null;
            });

        });

        describe("mock behavior", () => {

            it("should return default value when behavior is loose", () => {

                var mock = Mock.ofType(Doer);

                expect(mock.object.doNumber(999)).to.eq(undefined);
            });

            it("should throw when behavior is strict", () => {

                var mock = Mock.ofType(Doer, MockBehavior.Strict);

                expect(() => mock.object.doNumber(999)).to.throw(error.MockException);
            });
        });

        describe(".setup and .returns", () => {

            it("should match a no args function", () => {

                var mock: Mock<() => string> = Mock.ofInstance(someFunc);

                mock.setup(x => x()).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object()).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

            it("should match a function with args", () => {

                var mock: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                mock.setup(x => x(It.isAny(), It.isAny(), It.isAny())).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

            it("should throw if more than one method is matched", () => {

                var mock = Mock.ofType(Doer);

                expect(() => mock.setup(x => { x.doVoid(); x.doNumber(); })).to.throw(error.MockException);
            });

            it("should match a no args method", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber()).returns(() => 999);

                expect(mock.object.doNumber()).to.eq(999);
            });

            it("should throw if any setup param not a match object", () => {

                var bar = new Bar();
                var mock = Mock.ofType(Doer);

                expect(() => mock.setup(x => x.doObject(bar))).to.throw(error.MockException);
            });

            it("should match a method with explicit number value params", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(It.isValue(321))).returns(() => 999);

                expect(mock.object.doNumber(321)).to.eq(999);
                expect(mock.object.doNumber(322)).to.eq(undefined);
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should match a method with implicit number value params", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(321)).returns(() => 999);

                expect(mock.object.doNumber(321)).to.eq(999);
                expect(mock.object.doNumber(322)).to.eq(undefined);
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should match a method with explicit string value params", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doString(It.isValue("abc"))).returns((s: string) => s.toUpperCase());

                expect(mock.object.doString("abc")).to.eq("ABC");
                expect(mock.object.doString("cba")).to.eq(undefined);
                expect(mock.object.doString()).to.eq(undefined);
            });

            it("should match a method with implicit string value params", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doString("abc")).returns((s: string) => s.toUpperCase());

                expect(mock.object.doString("abc")).to.eq("ABC");
                expect(mock.object.doString("cba")).to.eq(undefined);
                expect(mock.object.doString()).to.eq(undefined);
            });

            it("should match a method with object value params", () => {

                var bar = new Bar();
                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doObject(It.isAnyObject(Bar))).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object.doObject(bar)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
                expect(mock.object.doObject(new Object())).to.eq(undefined);
                expect(mock.object.doObject()).to.eq(undefined);
            });

            it("should match a method with any string params", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
            });

            it("should match a method with any number params", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(It.isAnyNumber())).returns(() => 999);

                expect(mock.object.doNumber(123)).to.eq(999);
            });

            it("should match a method with any interface/class params", () => {

                var bar1 = new Bar();
                var bar2 = new Bar();
                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doBar(It.isAnyObject(Bar))).returns(() => bar2);

                expect(mock.object.doBar(bar1)).to.eq(bar2);
            });

            it("should match a property getter", () => {

                var mock = Mock.ofType(FooWithPublicGetterAndSetter);

                mock.setup(x => x.foo).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock.object.foo).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

        });

        describe(".callback", () => {

            it("should execute callback when no args method is called", () => {

                var mock = Mock.ofType(Doer);
                var called = false;

                mock.setup(x => x.doVoid()).callback(() => called = true);
                mock.object.doVoid();

                expect(called).to.eq(true);
            });

            it("should execute callback when method with args is called", () => {

                var mock = Mock.ofType(Doer);
                var called1, called2 = false;
                var numberArg: number;

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

                var mock = Mock.ofType(Doer);
                mock.callBase = true;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(101);
            });

            it("should not call the underlying object of a mock created from a class type when callBase is false", () => {

                var mock = Mock.ofType(Doer);
                mock.callBase = false;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should call the underlying object of a mock created from an object when callBase is true", () => {

                var doer = new Doer();
                var mock: Mock<Doer> = Mock.ofInstance(doer);
                mock.callBase = true;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(101);
            });

            it("should not call the underlying object of a mock created from an object when callBase is false", () => {

                var doer = new Doer();
                var mock: Mock<Doer> = Mock.ofInstance(doer);
                mock.callBase = false;

                mock.setup(x => x.doString(It.isAnyString())).returns(s => s.toUpperCase());

                expect(mock.object.doString("Lorem ipsum dolor sit amet")).to.eq("LOREM IPSUM DOLOR SIT AMET");
                expect(mock.object.doNumber()).to.eq(undefined);
            });

            it("should call the underlying object of a mock created from a function type when callBase is true", () => {

                var mock1: Mock<() => string> = Mock.ofInstance(someFunc);
                mock1.callBase = true;
                var mock2: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);
                mock2.callBase = true;

                mock2.setup(x => x(1, 2, 3)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock1.object()).to.eq("someFunc was called");
                expect(mock2.object(3, 2, 1)).to.eq("someFuncWithArgs was called");
                expect(mock2.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });

            it("should not call the underlying object of a mock created from a function type when callBase is false", () => {

                var mock1: Mock<() => string> = Mock.ofInstance(someFunc);
                mock1.callBase = false;
                var mock2: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);
                mock2.callBase = false;

                mock2.setup(x => x(1, 2, 3)).returns(() => "At vero eos et accusamus et iusto odio dignissimos ducimus");

                expect(mock1.object()).to.eq(undefined);
                expect(mock2.object(3, 2, 1)).to.eq(undefined);
                expect(mock2.object(1, 2, 3)).to.eq("At vero eos et accusamus et iusto odio dignissimos ducimus");
            });
            
        });

        describe(".throws", () => {

            it("should throw specified exception when matching a no args function", () => {

                var mock: Mock<() => string> = Mock.ofInstance(someFunc);

                mock.setup(x => x()).throws(new CustomException());

                expect(() => mock.object()).to.throw(CustomException);
            });

            it("should throw specified exception when matching a function with args", () => {

                var mock: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                mock.setup(x => x(It.isAny(), It.isAny(), It.isAny())).throws(new CustomException());

                expect(() => mock.object(1, 2, 3)).to.throw(CustomException);
            });

            it("should throw specified exception when matching a no args method", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doVoid()).throws(new CustomException());

                expect(() => mock.object.doVoid()).to.throw(CustomException);
            });

            it("should throw specified exception when matching a method with args", () => {

                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(999)).throws(new CustomException());

                expect(() => mock.object.doNumber(999)).to.throw(CustomException);
            });
        });

        describe(".verify and .verifiable", () => {

            it("should check that a no args function was called at least once", () => {

                var mock: Mock<() => string> = Mock.ofInstance(someFunc);

                mock.object();

                mock.verify(x => x(), Times.atLeastOnce());
            });

            it("should check that a function with args was called at least once", () => {

                var mock: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                mock.object(1, 2, 3);

                mock.verify(x => x(It.isAnyNumber(), It.isAnyNumber(), It.isAnyNumber()), Times.atLeastOnce());
                expect(() => mock.verify(x => x(3, 2, 1), Times.atLeastOnce())).to.throw(error.MockException);
            });

            it("should throw if no args function not called at least once", () => {

                var mock: Mock<() => string> = Mock.ofInstance(someFunc);

                expect(() => mock.verify(x => x(), Times.atLeastOnce())).to.throw(error.MockException);
            });

            it("should throw if function with params not called at least once", () => {

                var mock: Mock<(a: any, b: any, c: any) => string> = Mock.ofInstance(someFuncWithArgs);

                expect(() => mock.verify(x => x(It.isAnyNumber(), It.isAnyNumber(), It.isAnyNumber()), Times.atLeastOnce())).to.throw(error.MockException);
            });

            it("should check that no args method was called at least once", () => {

                var mock = Mock.ofType(Doer);

                mock.object.doVoid();

                mock.verify(x => x.doVoid(), Times.atLeastOnce());
            });

            it("should check that method with params was called at least once", () => {

                var mock = Mock.ofType(Doer);

                mock.object.doString("Lorem ipsum dolor sit amet");

                mock.verify(x => x.doString(It.isValue("Lorem ipsum dolor sit amet")), Times.atLeastOnce());
            });

            it("should check that value getter was called at least once", () => {

                var mock = Mock.ofType(Bar);

                mock.object.value;

                mock.verify(x => x.value, Times.atLeastOnce());
            });

            it("should check that value setter was called at least once", () => {

                var mock = Mock.ofType(Bar);

                mock.object.value = "Lorem ipsum dolor sit amet";

                mock.verify(x => x.value = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
            });

            it("should verify all expectations were called at most once", () => {

                var mock = Mock.ofType(Doer);

                mock.object.doVoid();
                mock.object.doString("Lorem ipsum dolor sit amet");
                mock.object.doNumber(999);

                mock.verify(x => x.doNumber(999), Times.atMostOnce());
                mock.verify(x => x.doString(It.isAny()), Times.atMostOnce());
                mock.verify(x => x.doVoid(), Times.atMostOnce());
            });

            it("should verify all expectations were called at least once", () => {

                var mock = Mock.ofType(Doer);

                mock.object.doVoid();
                mock.object.doString("Lorem ipsum dolor sit amet");
                mock.object.doNumber(999);

                mock.verify(x => x.doNumber(999), Times.atLeastOnce());
                mock.verify(x => x.doString(It.isAny()), Times.atLeastOnce());
                mock.verify(x => x.doVoid(), Times.atLeastOnce());
            });

            it("should verify all expectations marked as verifiable", () => {
                
                var mock = Mock.ofType(Doer);

                mock.setup(x => x.doNumber(999)).verifiable();
                mock.setup(x => x.doString(It.isAny())).verifiable();
                mock.setup(x => x.doVoid()).verifiable();

                mock.object.doVoid();
                mock.object.doString("Lorem ipsum dolor sit amet");
                mock.object.doNumber(999);

                mock.verifyAll();
            });

            it("should check that mock passed to mock was called at least once", () => {

                var mockBar = Mock.ofType(Bar);
                var mockFoo = Mock.ofType(Foo, MockBehavior.Loose, mockBar.object);
                mockFoo.callBase = true;

                mockFoo.object.setBar("Lorem ipsum dolor sit amet");

                mockBar.verify(x => x.value = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
            });

        });

        describe("with chai,should.js,expect.js,better-assert expectations", () => {

            var mock: Mock<Bar>;

            beforeEach(() => {
                mock = Mock.ofType(Bar);
            });

            //expect(mock(obj => obj.method("ping"))).to.have.been.called.atLeastOnce
            it("should check that method with args was called at least once");

        });

    });

}