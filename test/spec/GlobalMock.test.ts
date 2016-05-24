/// <reference path='../setup.ts' /> 

var GlobalMock = typemoq.GlobalMock;
var GlobalScope = typemoq.GlobalScope;


module TypeMoqTests {

    var container: any;

    describe("GlobalMock", () => {

        beforeEach(() => {
            if (isNodeJS())
                container = global;
            else
                // assume test is running in browser
                container = window;
        });

        describe("ctor", () => {

            it("should create an instance using class as ctor parameter", () => {

                var mock: TypeMoq.GlobalMock<GlobalBar> = GlobalMock.ofType(GlobalBar, null, container);

                expect(mock).to.be.not.null;
            });

            it("should create an instance using interface as type variable and allow interface cast", () => {

                var mock: TypeMoq.GlobalMock<IGlobalBar> = GlobalMock.ofType(GlobalBar, null, container);

                expect(mock).to.be.not.null;
            });

            it("should create an instance using interface as type variable and class as ctor parameter", () => {

                var mock: TypeMoq.GlobalMock<IGlobalBar> = GlobalMock.ofType<IGlobalBar>(GlobalBar, null, container);

                expect(mock).to.be.not.null;
            });

            it("should create an instance using class as ctor parameter and ctor args", () => {

                var bar = new Bar();
                var foo = new Foo(bar);
                var mock: TypeMoq.GlobalMock<Foo> = GlobalMock.ofInstance(foo, null, container);

                expect(mock.object).to.be.not.null;
            });

            it("should create an instance using a generic class as ctor parameter and ctor args", () => {

                var foo = new GenericFoo(Bar);
                var mock: TypeMoq.GlobalMock<GenericFoo<Bar>> = GlobalMock.ofInstance(foo, null, container);

                expect(mock.object).to.be.not.null;
            })

            it("should create an instance from an existing object", () => {

                var bar = new GlobalBar();

                var mock: TypeMoq.GlobalMock<GlobalBar> = GlobalMock.ofInstance(bar, null, container);

                expect(mock).to.be.not.null;
            });

            it("should create an instance from a function object", () => {

                var mock1: TypeMoq.GlobalMock<() => string> = GlobalMock.ofInstance(someGlobalFunc, null, container);
                var mock2: TypeMoq.GlobalMock<(a: any, b: any, c: any) => string> = GlobalMock.ofInstance(someGlobalFuncWithArgs, null, container);

                expect(mock1).to.be.not.null;
                expect(mock2).to.be.not.null;
            });

        });

        describe("scope.using and .with (auto sandboxing)", () => {

            it("should check that global no args function is auto sandboxed", () => {

                var mock = GlobalMock.ofInstance(someGlobalFunc, null, container);

                mock.verify(x => x(), Times.never());

                GlobalScope.using(mock).with(() => {

                    container.someGlobalFunc();
                    container.someGlobalFunc();

                    mock.verify(x => x(), Times.exactly(2));

                });

                container.someGlobalFunc();

                mock.verify(x => x(), Times.exactly(2));
            });

            it("should check that global function with args is auto sandboxed", () => {

                var mock = GlobalMock.ofInstance(someGlobalFuncWithArgs, null, container);

                mock.verify(x => x(It.isAny(), It.isAny(), It.isAny()), Times.never());

                GlobalScope.using(mock).with(() => {

                    container.someGlobalFuncWithArgs(1, 2, 3);
                    container.someGlobalFuncWithArgs("1", "2", "3");
                    container.someGlobalFuncWithArgs(1, 2, 3);

                    mock.verify(x => x(1, 2, 3), Times.exactly(2));

                });

                container.someGlobalFuncWithArgs(1, 2, 3);

                mock.verify(x => x(1, 2, 3), Times.exactly(2));
            });

            it("should check that global object is auto sandboxed", () => {

                var mock = GlobalMock.ofType(GlobalBar, null, container);

                mock.verify(x => x.value, Times.never());

                GlobalScope.using(mock).with(() => {

                    var bar1 = new container.GlobalBar();

                    bar1.value;
                    bar1.value;

                    mock.verify(x => x.value, Times.exactly(2));

                });

                var bar2 = new container.GlobalBar();

                bar2.value;

                mock.verify(x => x.value, Times.exactly(2));
            });

            it("should check that 'XmlHttpRequest' global object is auto sandboxed", () => {

                var mock = GlobalMock.ofType(XMLHttpRequest, null, container);

                mock.verify(x => x.send(It.isAny()), Times.never());

                GlobalScope.using(mock).with(() => {

                    var xhr1 = new container.XMLHttpRequest();

                    xhr1.open("GET", "http://www.typescriptlang.org", true);
                    xhr1.send();
                    xhr1.open("GET", "http://www.typescriptlang.org", true);
                    xhr1.send();

                    mock.verify(x => x.send(), Times.exactly(2));

                });

                var xhr2 = new container.XMLHttpRequest();

                xhr2.open("GET", "http://www.typescriptlang.org", true);
                xhr2.send();

                mock.verify(x => x.send(), Times.exactly(2));
            });

            it("should check that 'localStorage' global object is auto sandboxed", () => {

                var mock = GlobalMock.ofInstance(localStorage, "localStorage", container);

                mock.setup(x => x.getItem(It.isAnyString())).returns((key: string) => "[]");

                GlobalScope.using(mock).with(() => {

                    expect(container.localStorage.getItem("xyz")).to.eq("[]");

                    mock.verify(x => x.getItem(It.isAnyString()), Times.exactly(1));

                });

                container.localStorage.setItem("xyz", "Lorem ipsum dolor sit amet");

                expect(container.localStorage.getItem("xyz")).to.eq("Lorem ipsum dolor sit amet");

                mock.verify(x => x.getItem(It.isAnyString()), Times.exactly(1));
            });

        });

    });

} 