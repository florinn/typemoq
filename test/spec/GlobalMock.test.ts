module TypeMoq.Tests {

    describe("GlobalMock", () => {

        describe("ctor", () => {

            it("should create an instance using class as ctor parameter", () => {

                var mock: GlobalMock<GlobalBar> = GlobalMock.ofType(GlobalBar);

                expect(mock).to.be.not.null;
            });

            it("should create an instance using interface as type variable and class as ctor parameter", () => {

                var mock: GlobalMock<IGlobalBar> = GlobalMock.ofType<IGlobalBar>(GlobalBar);

                expect(mock).to.be.not.null;
            });

            it("should create an instance using class as ctor parameter and ctor args", () => {

                var bar = new Bar();
                var foo = new Foo(bar);
                var mock: GlobalMock<Foo> = GlobalMock.ofInstance(foo);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using a generic class as ctor parameter and ctor args", () => {

                var foo = new GenericFoo(Bar);
                var mock: GlobalMock<GenericFoo<Bar>> = GlobalMock.ofInstance(foo);

                expect(mock.object).to.be.not.null;
            })

            it("should create an instance from an existing object", () => {

                var bar = new GlobalBar();

                var mock: GlobalMock<GlobalBar> = GlobalMock.ofInstance(bar);

                expect(mock).to.be.not.null;
            });

            it("should create an instance from a function object", () => {

                var mock1: GlobalMock<() => string> = GlobalMock.ofInstance(someGlobalFunc);
                var mock2: GlobalMock<(a: any, b: any, c: any) => string> = GlobalMock.ofInstance(someGlobalFuncWithArgs);

                expect(mock1).to.be.not.null;
                expect(mock2).to.be.not.null;
            });

        });

        describe("scope.using and .with (auto sandboxing)", () => {

            it("should check that global no args function is auto sandboxed", () => {

                var mock = GlobalMock.ofInstance(someGlobalFunc);

                mock.verify(x => x(), Times.never());

                Scope.using(mock).with(() => {

                    someGlobalFunc();
                    someGlobalFunc();

                    mock.verify(x => x(), Times.exactly(2));

                });

                someGlobalFunc();

                mock.verify(x => x(), Times.exactly(2));
            });

            it("should check that global function with args is auto sandboxed", () => {

                var mock = GlobalMock.ofInstance(someGlobalFuncWithArgs);

                mock.verify(x => x(It.isAny(), It.isAny(), It.isAny()), Times.never());

                Scope.using(mock).with(() => {

                    someGlobalFuncWithArgs(1,2,3);
                    someGlobalFuncWithArgs("1","2","3");
                    someGlobalFuncWithArgs(1, 2, 3);

                    mock.verify(x => x(1,2,3), Times.exactly(2));

                });

                someGlobalFuncWithArgs(1,2,3);

                mock.verify(x => x(1, 2, 3), Times.exactly(2));
            });

            it("should check that global object is auto sandboxed", () => {

                var mock = GlobalMock.ofType(GlobalBar);

                mock.verify(x => x.value, Times.never());

                Scope.using(mock).with(() => {

                    var bar1 = new GlobalBar();

                    bar1.value;
                    bar1.value;

                    mock.verify(x => x.value, Times.exactly(2));

                });

                var bar2 = new GlobalBar();

                bar2.value;

                mock.verify(x => x.value, Times.exactly(2));
            });

            it("should check that XmlHttpRequest global object is auto sandboxed", () => {

                var mock = GlobalMock.ofType(XMLHttpRequest);

                mock.verify(x => x.send(It.isAny()), Times.never());

                Scope.using(mock).with(() => {

                    var xhr1 = new XMLHttpRequest();

                    xhr1.open("GET", "http://www.typescriptlang.org", true);
                    xhr1.send();
                    xhr1.open("GET", "http://www.typescriptlang.org", true);
                    xhr1.send();

                    mock.verify(x => x.send(), Times.exactly(2));

                });

                var xhr2 = new XMLHttpRequest();

                xhr2.open("GET", "http://www.typescriptlang.org", true);
                xhr2.send();

                mock.verify(x => x.send(), Times.exactly(2));
            });

        });

    });

} 