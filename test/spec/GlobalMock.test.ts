import * as TypeMoq from "typemoq";

import { TypeMoqTests, GlobalBar, IGlobalBar, someGlobalFunc, someGlobalFuncWithArgs } from "./fixtures";
import { Utils } from "./Utils";

let GlobalMock = TypeMoq.GlobalMock;
let GlobalScope = TypeMoq.GlobalScope;
let It = TypeMoq.It;
let Times = TypeMoq.Times;

import * as chai from "chai";

let assert = chai.assert;
let expect = chai.expect;

let container: any;
if (Utils.isNodeJS())
    container = global;
else
    container = window;

container["someGlobalFunc"] = someGlobalFunc;
container["someGlobalFuncWithArgs"] = someGlobalFuncWithArgs;
container["GlobalBar"] = GlobalBar;
container["XMLHttpRequest"] = TypeMoqTests.XMLHttpRequest;

describe("GlobalMock", () => {

    describe("ctor", () => {

        it("should create an instance using class as ctor parameter", () => {

            let mock: TypeMoq.GlobalMock<GlobalBar> = GlobalMock.ofType(GlobalBar, container);

            expect(mock).to.be.not.null;
        });

        it("should create an instance using interface as type variable and allow interface cast", () => {

            let mock: TypeMoq.GlobalMock<IGlobalBar> = GlobalMock.ofType(GlobalBar, container);

            expect(mock).to.be.not.null;
        });

        it("should create an instance using interface as type variable and class as ctor parameter", () => {

            let mock: TypeMoq.GlobalMock<IGlobalBar> = GlobalMock.ofType<IGlobalBar>(GlobalBar, container);

            expect(mock).to.be.not.null;
        });

        it("should create an instance using class as ctor parameter and ctor args", () => {

            let bar = new TypeMoqTests.Bar();
            let foo = new TypeMoqTests.Foo(bar);
            let mock: TypeMoq.GlobalMock<TypeMoqTests.Foo> = GlobalMock.ofInstance(foo, "foo", container);

            expect(mock.object).to.be.not.null;
        });

        it("should create an instance using a generic class as ctor parameter and ctor args", () => {

            let foo = new TypeMoqTests.GenericFoo(TypeMoqTests.Bar);
            let mock: TypeMoq.GlobalMock<TypeMoqTests.GenericFoo<TypeMoqTests.Bar>> = GlobalMock.ofInstance(foo, "foo", container);

            expect(mock.object).to.be.not.null;
        })

        it("should create an instance from an existing object", () => {

            let bar = new GlobalBar();

            let mock: TypeMoq.GlobalMock<GlobalBar> = GlobalMock.ofInstance(bar, "bar", container);

            expect(mock).to.be.not.null;
        });

        it("should create an instance from a function object", () => {

            let mock1: TypeMoq.GlobalMock<() => string> = GlobalMock.ofInstance(someGlobalFunc, undefined, container);
            let mock2: TypeMoq.GlobalMock<(a: any, b: any, c: any) => string> = GlobalMock.ofInstance(someGlobalFuncWithArgs, undefined, container);

            expect(mock1).to.be.not.null;
            expect(mock2).to.be.not.null;
        });

    });

    describe("scope.using and .with (auto sandboxing)", () => {

        it("should check that global no args function is auto sandboxed", () => {

            let mock = GlobalMock.ofInstance(someGlobalFunc, undefined, container);

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

            let mock = GlobalMock.ofInstance(someGlobalFuncWithArgs, undefined, container);

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

        it("should check that global type is auto sandboxed", () => {

            let mock = GlobalMock.ofType(GlobalBar, container);

            mock.verify(x => x.value, Times.never());

            GlobalScope.using(mock).with(() => {

                let bar1 = new container.GlobalBar();

                bar1.value;
                bar1.value;

                mock.verify(x => x.value, Times.exactly(2));

            });

            let bar2 = new container.GlobalBar();

            bar2.value;

            mock.verify(x => x.value, Times.exactly(2));
        });

        it("should check that 'XmlHttpRequest' global object is auto sandboxed", () => {

            let mock = GlobalMock.ofType(XMLHttpRequest, container);

            mock.verify(x => x.send(It.isAny()), Times.never());

            GlobalScope.using(mock).with(() => {

                let xhr1 = new container.XMLHttpRequest();

                xhr1.open("GET", "http://www.typescriptlang.org", true);
                xhr1.send();
                xhr1.open("GET", "http://www.typescriptlang.org", true);
                xhr1.send();

                mock.verify(x => x.send(), Times.exactly(2));

            });

            let xhr2 = new container.XMLHttpRequest();

            xhr2.open("GET", "http://www.typescriptlang.org", true);
            xhr2.send();

            mock.verify(x => x.send(), Times.exactly(2));
        });

        it("should check that 'localStorage' global object is auto sandboxed", () => {

            if (!container["localStorage"]) {
                console.log("global 'localStorage' is undefined");
            }
            else {
                let mock = GlobalMock.ofInstance(localStorage, "localStorage", container);

                mock.setup(x => x.getItem(It.isAnyString())).returns((key: string) => "[]");

                GlobalScope.using(mock).with(() => {

                    expect(container.localStorage.getItem("xyz")).to.eq("[]");

                    mock.verify(x => x.getItem(It.isAnyString()), Times.exactly(1));

                });

                container.localStorage.setItem("xyz", "Lorem ipsum dolor sit amet");

                expect(container.localStorage.getItem("xyz")).to.eq("Lorem ipsum dolor sit amet");

                mock.verify(x => x.getItem(It.isAnyString()), Times.exactly(1));
            }

        });

    });

});