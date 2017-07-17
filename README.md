TypeMoq [![build badge](https://travis-ci.org/florinn/typemoq.svg?branch=master)](https://travis-ci.org/florinn/typemoq)
===================

Simple mocking library for JavaScript targeting [TypeScript](http://www.typescriptlang.org/) development. If you have used before a library like [Moq](https://github.com/Moq/moq4) then the syntax should look familiar, otherwise the examples below should hopefully provide enough information to get you started quickly.


Features
-------------
* Strongly typed
* Auto complete/intellisense support
* Static and dynamic mocking
* Mock objects, classes (with arguments), constructor functions and interfaces
* Control mock behavior
* Record and replay expectations
* Auto sandbox global objects and types
* Support ECMAScript 5 and 6
* Support node.js and browser

----------

[![Sauce Test Status](https://saucelabs.com/browser-matrix/florinn.svg)](https://saucelabs.com/u/florinn)

----------


Installing
-------------

###### Release version

```
npm install typemoq
```

Or add this *NuGet* dependency to your project:
```
PM> Install-Package typemoq 
```

The distribution directory should contain:

* *Compiled JavaScript:* `typemoq.js` and its minified version `typemoq-min.js`
* *TypeScript definitions:* `typemoq.d.ts`

###### Development version

```
npm install https://github.com/florinn/typemoq
```


##### Node.js

###### TypeScript 1.6 and later

```typescript
import * as TypeMoq from "typemoq";
```

###### TypeScript pre 1.6

```typescript
/// <reference path="./node_modules/typemoq/dist/typemoq.d.ts" />
TypeMoq = require("typemoq");
```


##### Browser

Include at the top of your script file:
```typescript
/// <reference path="./node_modules/typemoq/dist/typemoq.d.ts" />
import * as TypeMoq from "typemoq";
```

TypeMoq requires some dependencies to run, so make sure to include them in your page before `typemoq.js`:

```html
<script src="https://unpkg.com/circular-json/build/circular-json"></script>
<script src="https://unpkg.com/lodash"></script>
<script src="https://unpkg.com/typemoq"></script>
```

Also in your `tsconfig.json` you need to set the module target as `UMD`:
```
"compilerOptions": {
    ...
    "module": "UMD",
    ...
}
```

At this point you should have access in your script to a global variable named `TypeMoq`.


Usage
-------------

After importing TypeMoq into your project, the following types should be available:

Type | Description
---- | ----
*TypeMoq.Mock* | Used for creating 'regular' mocks (see [Create mocks](#create-mocks) and [Setup mocks](#setup-mocks))
*TypeMoq.MockBehavior* | Used to specify how the mock should act when no expectations are defined (see [Control mock behavior](#control-mock-behavior))
*TypeMoq.It* | Helper for matching arguments (see [Setup mocks](#setup-mocks) and [Verify expectations](#verify-expectations))
*TypeMoq.Times* | Helper for performing verification (see [Verify expectations](#verify-expectations))
*TypeMoq.GlobalMock* | Used to create 'global' mocks corresponding to global objects (see [Create global mocks](#create-global-mocks))
*TypeMoq.GlobalScope* | Used to create an execution context that makes use of any specified 'global' mocks (see [Auto sandbox global mocks](#auto-sandbox-global-mocks))
*TypeMoq.MockException* | Exception thrown internally containing debug info 


### Create mocks

#### Static mocks

Static mocks can be created either from class types and constructor arguments or from existing objects, including function objects.

##### Using class types and constructor arguments

```typescript
interface IBar {
  value: string;
  anyValue: any;
}

class Bar implements IBar {
  value: string = '';
  anyValue: any = undefined;
}

class Foo {
  constructor(private _bar: IBar) { this._bar = _bar || new Bar(); }
  
  get bar(): IBar { return this._bar; }
  do(stringValue: string) { return 'Foo.do:' + stringValue; }
  setBar(value: string) { this._bar.value = value; }
}

class GenericFoo<T> {
  private _bar: T;

  constructor(barCtor?: { new (): T }, public numberValue?: number) {
    this._bar = new barCtor(); 
  }

  get bar(): T { return this._bar; }
  do(stringValue: string) { return 'GenericFoo.do:' + stringValue + ': ' + this._bar.toString(); }
}

// Using class as constructor parameter
const mock: TypeMoq.IMock<Bar> = TypeMoq.Mock.ofType(Bar);

// Using class as constructor parameter and casting result to interface
const mock: TypeMoq.IMock<IBar> = TypeMoq.Mock.ofType(Bar);

// Using interface as type variable and class as constructor parameter
const mock: TypeMoq.IMock<IBar> = TypeMoq.Mock.ofType<IBar>(Bar);

// Using class as constructor parameter and constructor arguments
const bar = new Bar();
const mock: TypeMoq.IMock<Foo> = TypeMoq.Mock.ofType(Foo, TypeMoq.MockBehavior.Loose, bar);

// Using a generic class as constructor parameter and constructor arguments
const mock: TypeMoq.IMock<GenericFoo<Bar>> = TypeMoq.Mock.ofType(GenericFoo, TypeMoq.MockBehavior.Loose, Bar, 999);
```

##### Using existing objects, including function objects

```typescript
function someFunc() {
  return "someFunc was called";
}

function someFuncWithArgs(a: any, b: any, c: any) {
  return "someFuncWithArgs was called";
}

// From an existing object
const bar = new Bar();
const mock: TypeMoq.IMock<Bar> = TypeMoq.Mock.ofInstance(bar);

// Or from function objects
const mock1: TypeMoq.IMock<() => string> = TypeMoq.Mock.ofInstance(someFunc);
const mock2: TypeMoq.IMock<(a: any, b: any, c: any)=>string> = TypeMoq.Mock.ofInstance(someFuncWithArgs);
```

#### Dynamic mocks

Dynamic mocking requires your runtime (browser or node.js) to support the `Proxy` global object added in ECMAScript 6.
If `Proxy` is not detected, TypeMoq is going to throw a MockException.

A dynamic mock is created by specifying a type parameter. 
The following type parameters are supported:

* `Function` (as the type of a [function object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function))

```typescript
// Using Function as type parameter
const mock: TypeMoq.IMock<Function> = TypeMoq.Mock.ofType<Function>();
```

* a class type

```typescript
// Using the 'instance' side of the class as type parameter
const mock: TypeMoq.IMock<Bar> = TypeMoq.Mock.ofType<Bar>();

// Specifying mock behavior
const mock: TypeMoq.IMock<Foo> = TypeMoq.Mock.ofType<Foo>(undefined, TypeMoq.MockBehavior.Loose);
```

* a constructor function

```typescript
// Using the 'static' side of the class as type parameter
const mock: TypeMoq.IMock<typeof Bar> = TypeMoq.Mock.ofType<typeof Bar>();
```

* an interface type

```typescript
// Using an interface as type parameter
const mock: TypeMoq.IMock<IBar> = TypeMoq.Mock.ofType<IBar>();
```


As opposed to static mocks, dynamic mocks have some limitations due to the absence of the underlying target instance:
 
* No partial mocking
* No embedded mocks passed as constructor arguments
* Properties return by default a `function` object and not `undefined`

```typescript
interface IThing {
  getA(a: string): string;
  getB(b: number): number;
  getC(): boolean;
  valueA: string;
}

const mock: TypeMoq.IMock<IThing> = TypeMoq.Mock.ofType<IThing>();

expect(mock.object.getA("abc")).to.be.undefined;
expect(mock.object.getB(123)).to.be.undefined;
expect(mock.object.getC()).to.be.undefined;
expect(mock.object.valueA).to.be.a("function");
```

As a workaround you may set the property to return `undefined`:

```typescript
mock.setup(x => x.valueA).returns(() => undefined);

expect(mock.object.valueA).to.be.undefined;
```

This limitation also impacts the scenario where a mocked object is passed to `Promise.resolve`. To be able to handle such scenario, the mocked object must be set as a thenable (i.e. has a "then" method) by returning `undefined` or another value:

```typescript
mock.setup((x: any) => x.then).returns(() => undefined);

Promise.resolve(mock.object)
  .then(x => {
    expect(x).eql(mock.object);
  });
```


**Note:**
A mock (created in any of the ways listed above) exposes the actual mock object through the `.object` property (that has the same type as the class or object being mocked).


### Setup mocks

Mocks allow to match functions, methods and properties and setup return callbacks or exceptions to throw.

`setup` accepts a function (also referred as 'matcher') taking as input argument the type being mocked and as body the value/property/method (with arguments if that's the case) to match.

##### Parameter matchers

Matcher | Description
---- | ----
```TypeMoq.It.isValue<T>(x: T)``` | Performs deep comparison against the provided object or basic value
```TypeMoq.It.isObjectWith<T>(x: Object)``` | Performs partial deep comparison against the provided object
```TypeMoq.It.isAny()``` | Matches any type
```TypeMoq.It.isAnyObject<T>(x: Ctor<T>)``` | Matches any object compatible with the provided type
```TypeMoq.It.isAnyString()``` | Matches any string
```TypeMoq.It.isAnyNumber()``` | Matches any number
```TypeMoq.It.is<T>(predicate: IFunc2<T, boolean>)``` | Performs comparison using the provided predicate

If no matcher is specified then an implicit matcher is considered that performs strict equality deep comparison, equivalent to `TypeMoq.It.is(x => _.isEqual(x, a))`.

##### Matching functions

```typescript
// Match a no args function
const mock: TypeMoq.IMock<() => string> = TypeMoq.Mock.ofInstance(someFunc);
mock.setup(x => x()).returns(() => "At vero eos et accusamus");

// Match a function with args
const mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = TypeMoq.Mock.ofInstance(someFuncWithArgs);
mock.setup(x => x(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny())).returns(() => "At vero eos et accusamus");
```

##### Matching methods

```typescript
class Doer {
  doVoid(): void { }
  doNumber(n?: number): number { return n || 101; }
  doString(s?: string): string { return s || 'xyz'; }
  doObject(o?: Object): Object { return o || new Object(); }
  doBar(b?: Bar): Bar { return b; }
}

const mock = TypeMoq.Mock.ofType(Doer);

// Match a no args method
mock.setup(x => x.doNumber());

// Match a method with explicit number value params
mock.setup(x => x.doNumber(TypeMoq.It.isValue(321)));

// Match a method with implicit number value params
mock.setup(x => x.doNumber(321));

// Match a method with explicit string value params
mock.setup(x => x.doString(TypeMoq.It.isValue("abc")));

// Match a method with implicit string value params
mock.setup(x => x.doString("abc"));

// Match a method with object value params
const bar = new Bar();
mock.setup(x => x.doObject(TypeMoq.It.isAnyObject(Bar)));

// Match a method with implicit object value params
const anObject = {};
mock.setup(x => x(anObject)).returns(() => 123);
expect(mock.object(anObject)).to.eq(123);

// Match a method with any string params
mock.setup(x => x.doString(TypeMoq.It.isAnyString()));

// Match a method with any number params
mock.setup(x => x.doNumber(TypeMoq.It.isAnyNumber()));

// Match a method with any interface/class params
mock.setup(x => x.doBar(TypeMoq.It.isAnyObject(Bar)));

// Match a method by a param predicate 
const bar1 = new Bar();
bar1.value = "Ut enim ad minim veniam";
const bar2 = new Bar();
const mock = TypeMoq.Mock.ofType(Doer);

mock.setup(x => x.doBar(TypeMoq.It.is((x: Bar) => x.value === "Ut enim ad minim veniam"))).returns(() => bar2);
```

To be able to match the static methods of some class, you would need to create a dynamic mock of the type of the class itself. E.g.

```typescript
class Greeter {
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

const greeter = Greeter.instance();
const mock: TypeMoq.IMock<typeof Greeter> = TypeMoq.Mock.ofType<typeof Greeter>();

mock.setup(x => x.instance()).returns(() => greeter);

expect(mock.object.instance()).to.eq(greeter);
```

##### Matching properties

```typescript
class FooWithPublicGetterAndSetter {
  private _foo: string;
  public get foo(): string { return this._foo; }
  public set foo(value: string) { this._foo = value; }
}

// Match a property getter
const mock = TypeMoq.Mock.ofType(FooWithPublicGetterAndSetter);
mock.setup(x => x.foo);

// Match a property setter
mock.object.foo = "Lorem ipsum dolor sit amet";
mock.verify(x => x.foo = TypeMoq.It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
```

**Note:**
To be able to match a property make sure the property is initialized.
Otherwise the TypeScript compiler will omit the uninitialized property from the emitted JavaScript and hence TypeMoq will throw a MockException with an 'invalid setup expression' message.

```typescript
class Baz {
  value: string = '';
  anyValue: any;
}

const mock = TypeMoq.Mock.ofType(Baz);
mock.setup(x => x.value);       // OK
mock.setup(x => x.anyValue);    // throws MockException - invalid setup expression
```

##### Matching objects

```typescript
interface Baz {
  bar: string
  jaz: number  
}

class FooWithObjectArgMethod {
  private _foo: Object
  public foo(value: Object): void { }
}

const mock = TypeMoq.Mock.ofType(FooWithObjectArgMethod);

// Match object deeply
mock.setup(x => x.foo(TypeMoq.It.isValue({ bar: 'hello', jaz: 42 })));

// Match object partially
mock.setup(x => x.foo(TypeMoq.It.isObjectWith({ jaz: 42 })));
```

**Note:**
For the predicate based matcher, `TypeMoq.It.is<T>(predicate: IFunc2<T, boolean>)`, the argument of the predicate is a deep clone of the target argument, thus for doing object equality comparison, `===` should be replaced by `_.isEqual`.

```typescript
interface BeanParams {
  colour: string
}

interface Service {
  getBeans(params: BeanParams): string;
}

const service = TypeMoq.Mock.ofType<Service>();
const beanParams: BeanParams = { colour: 'red' };

// Wrong way of doing strict object comparison
service.setup(x => x.getBeans(TypeMoq.It.is<BeanParams>(x => x === beanParams))).returns(() => 'success');
expect(service.object.getBeans(beanParams)).to.not.eq('success');

// Right way of doing strict object comparison
service.setup(x => x.getBeans(TypeMoq.It.is<BeanParams>(x => _.isEqual(x, beanParams)))).returns(() => 'success');
service.setup(x => x.getBeans(beanParams)).returns(() => 'success');  // Short form equivalent to the explicit form above
expect(service.object.getBeans(beanParams)).to.eq('success');
```


##### Attaching return callbacks

The callback attached to `.returns` has the same signature as the matching function/method.

Also the callback gets called with the arguments passed to the matching function/method and it must have the same return type, making possible the following:

```typescript
mock.setup(x => x.doString("abc")).returns((s: string) => s.toUpperCase());
```

##### Attaching exceptions to throw

```typescript
mock.setup(...).throws(new CustomException());
```


### Attach callbacks

Attached callbacks are called before the `.returns` callback or `.throws` get called, and they have similar signature and behavior to `.returns` callbacks.

```typescript
const mock = TypeMoq.Mock.ofType(Doer);
let called1, called2 = false;
let numberArg: number;

mock.setup(x => x.doString(TypeMoq.It.isAnyString())).callback(() => called1 = true).returns(s => s.toUpperCase());
mock.setup(x => x.doNumber(TypeMoq.It.isAnyNumber())).callback(n => { numberArg = n; called2 = true; }).returns(n => n + 1);
```


### Record and replay

Mocks allow to "record" and "replay" one or more setups for the same matching function, method or property.

* If a single setup is recorded then at replay it is always executed:
```typescript
const mock = TypeMoq.Mock.ofInstance(() => -1);

// record
mock.setup(x => x()).returns(() => 0);

// replay
expect(mock.object()).to.eq(0);
expect(mock.object()).to.eq(0);
expect(mock.object()).to.eq(0);
```

* If more setups are recorded then at replay they are executed in the order of registration:
```typescript
const mock = TypeMoq.Mock.ofInstance(() => -1);

// record
mock.setup(x => x()).returns(() => 0);
mock.setup(x => x()).returns(() => 1);
mock.setup(x => x()).returns(() => 2);

// replay
expect(mock.object()).to.eq(0);
expect(mock.object()).to.eq(1);
expect(mock.object()).to.eq(2);
expect(mock.object()).to.eq(undefined);
```

In the latter case, when there are no more recorded setups left to play, the mock starts returning default values or raises MockException if `MockBehavior.Strict` (see [Control mock behavior](#control-mock-behavior)).


### Reset mocks

Calling `.reset()` on a mock returns the mock to its initial state by removing any previous setups.


### Control mock behavior

##### Using MockBehavior

When creating a mock, you may specify a behavior value such as:

* `MockBehavior.Loose` (default) - never throws when no corresponding setup is found and just returns default values
* `MockBehavior.Strict` - raises exceptions for anything that doesn't have a corresponding setup

```typescript
const mock = TypeMoq.Mock.ofType(Doer, TypeMoq.MockBehavior.Strict);
```

##### Partial mocking

When the mock property `callBase` is set to `true`, if there's no overriding setup the mock invokes the object being mocked.

```typescript
mock.callBase = true;
```

The default value of `callBase` is `false`, so by default when there's no overriding setup the mock returns `undefined`.

### Verify expectations

Expectations can be verified either one by one or all at once by marking matchers as verifiable.

##### Expectations

Expectation | Description
---- | ----
```TypeMoq.Times.exactly(n: number)``` | Called exactly `n` times
```TypeMoq.Times.never()``` | Never called
```TypeMoq.Times.once()``` | Called once
```TypeMoq.Times.atLeast(n: number)``` | Called at least `n` times
```TypeMoq.Times.atMost(n: number)``` | Called at most `n` times
```TypeMoq.Times.atLeastOnce()``` | Called at least once (default value)
```TypeMoq.Times.atMostOnce()``` | Called at most once

##### Verify expectations one by one

To verify an expectation you can use the `verify` method and specify a matching function and an expectation.

```typescript
// Verify that a no args function was called at least once
const mock: TypeMoq.IMock<() => string> = TypeMoq.Mock.ofInstance(someFunc);
mock.object();
mock.verify(x => x(), TypeMoq.Times.atLeastOnce());

// Verify that a function with args was called at least once
const mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = TypeMoq.Mock.ofInstance(someFuncWithArgs);
mock.object(1, 2, 3);
mock.verify(x => x(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()), TypeMoq.Times.atLeastOnce());

// Verify that no args method was called at least once
const mock = TypeMoq.Mock.ofType(Doer);
mock.object.doVoid();
mock.verify(x => x.doVoid(), TypeMoq.Times.atLeastOnce());

// Verify that method with params was called at least once
const mock = TypeMoq.Mock.ofType(Doer);
mock.object.doString("Lorem ipsum dolor sit amet");
mock.verify(x => x.doString(TypeMoq.It.isValue("Lorem ipsum dolor sit amet")), TypeMoq.Times.atLeastOnce());

// Verify that value getter was called at least once
const mock = TypeMoq.Mock.ofType(Bar);
mock.object.value;
mock.verify(x => x.value, TypeMoq.Times.atLeastOnce());

// Verify that value setter was called at least once
const mock = TypeMoq.Mock.ofType(Bar);
mock.object.value = "Lorem ipsum dolor sit amet";
mock.verify(x => x.value = TypeMoq.It.isValue("Lorem ipsum dolor sit amet"), TypeMoq.Times.atLeastOnce());
```

**Note:**

* When constructing a mock, it is allowed to pass mock objects as arguments and later verify expectations on them. E.g.: 

```typescript
const mockBar = TypeMoq.Mock.ofType(Bar);
const mockFoo = TypeMoq.Mock.ofType(Foo, TypeMoq.MockBehavior.Loose, mockBar.object);
mockFoo.callBase = true;

mockFoo.object.setBar("Lorem ipsum dolor sit amet");

mockBar.verify(x => x.value = TypeMoq.It.isValue("Lorem ipsum dolor sit amet"), TypeMoq.Times.atLeastOnce());
```

* For static mocks, TypeMoq is able to verify any inner calls inside regular functions but not inside lambda ones. E.g.:

```typescript
class FooBar {
  register(): void {
    this.canExecute();
  }

  registerLambda = () => {
    this.canExecute();
  }

  canExecute(): void {
    console.log("FooBar.canExecute() was called");
  }
}

const mock: TypeMoq.IMock<FooBar> = TypeMoq.Mock.ofType(FooBar);
mock.callBase = true;

mock.object.register();
mock.object.registerLambda(); // Function calls cannot be verified inside a lambda

mock.verify(x => x.canExecute(), TypeMoq.Times.once());
```

##### Verify all expectations at once

Instead of verifying one expectation at a time, you may specify the expectation at setup time by calling `verifiable(times: TypeMoq.Times)` and then `verifyAll()` to check all expectations.

The default value of the `times` parameter is equal to `TypeMoq.Times.once()`.

```typescript
mock.setup(x => x.doNumber(999)).verifiable(); // implicitly TypeMoq.Times.once()
mock.setup(x => x.doString(TypeMoq.It.isAny())).verifiable(TypeMoq.Times.exactly(2));
mock.setup(x => x.doVoid()).verifiable(TypeMoq.Times.atMostOnce());

mock.object.doVoid();
mock.object.doString("Lorem ipsum dolor sit amet");
mock.object.doString("Ut enim ad minim veniam");
mock.object.doNumber(999);

mock.verifyAll();
```

When mock behavior is `TypeMoq.MockBehavior.Strict`, every call to `.setup()` automatically calls `.verifiable()` behind the scenes, as the default.

```typescript
const mock = TypeMoq.Mock.ofType(Doer, TypeMoq.MockBehavior.Strict);

mock.setup(x => x.doNumber(999)); // implicitly TypeMoq.Times.once()
mock.setup(x => x.doVoid()).verifiable(TypeMoq.Times.atMostOnce());

mock.object.doVoid();
mock.object.doNumber(999);

mock.verifyAll();
```

##### Verify expectation invocation order

Expectation invocation order | Description
---- | ----
```TypeMoq.ExpectedCallType.InAnyOrder``` | Only call count considered (default value) 
```TypeMoq.ExpectedCallType.InSequence``` | Both call count and order considered

```typescript
const mock = TypeMoq.Mock.ofInstance((x: number) => { });

mock.setup(x => x(1)).verifiable(TypeMoq.Times.once(), TypeMoq.ExpectedCallType.InSequence);
mock.setup(x => x(2)).verifiable(TypeMoq.Times.once(), TypeMoq.ExpectedCallType.InSequence);

mock.object(2);
mock.object(1);

mock.verifyAll();  // it should throw MockException
```


### Create global mocks

#### Static global mocks

Static global mocks are created by specifying a class type or an existing object, similar to regular static mocks.

You may also specify a container object for the type/object being mocked.

For browsers the top global object is the `window` object, which is the default `container` value in `TypeMoq.GlobalMock`.
For node.js the top global object is the `global` object.

##### Using class types

```typescript
// global scope

interface IGlobalBar {
  value: string;
}

class GlobalBar implements IGlobalBar {
  value: string = '';
}

// Create an instance using class as ctor parameter
const mock: TypeMoq.IGlobalMock<GlobalBar> = TypeMoq.GlobalMock.ofType(GlobalBar, global);

// Create an instance using class as ctor parameter and casting result to interface
const mock: TypeMoq.IGlobalMock<IGlobalBar> = TypeMoq.GlobalMock.ofType(GlobalBar, global);

// Create an instance using interface as type variable and class as ctor parameter
const mock: TypeMoq.IGlobalMock<IGlobalBar> = TypeMoq.GlobalMock.ofType<IGlobalBar>(GlobalBar, global);

// Create an instance of 'XmlHttpRequest' global type
const mock = TypeMoq.GlobalMock.ofType(XMLHttpRequest, global);
```

##### Using existing objects, including function objects

When creating mock instances out of global objects (such as `window.localStorage`), you should provide the name of the global object (*"localStorage"* in this case) as the second parameter.

```typescript
// Create an instance using class as ctor parameter and ctor args
const bar = new Bar();
const foo = new Foo(bar);
const mock: TypeMoq.IGlobalMock<Foo> = TypeMoq.GlobalMock.ofInstance(foo);

// Create an instance using a generic class as ctor parameter and ctor args
const foo = new GenericFoo(Bar);
const mock: TypeMoq.IGlobalMock<GenericFoo<Bar>> = TypeMoq.GlobalMock.ofInstance(foo);

// Create an instance from an existing object
const bar = new GlobalBar();
const mock: TypeMoq.IGlobalMock<GlobalBar> = TypeMoq.GlobalMock.ofInstance(bar);

// Create an instance from a function object
const mock1: TypeMoq.IGlobalMock<() => string> = TypeMoq.GlobalMock.ofInstance(someGlobalFunc);
const mock2: TypeMoq.IGlobalMock<(a: any, b: any, c: any) => string> = TypeMoq.GlobalMock.ofInstance(someGlobalFuncWithArgs);

// Create an instance from 'window.localStorage' global object
const mock = TypeMoq.GlobalMock.ofInstance(localStorage, "localStorage");
```

**Note:**
Due to browser security limitations, global mocks created by specifying class type cannot have constructor arguments

#### Dynamic global mocks

Dynamic global mocks are created by specifying a type parameter and the name of the global object as the first constructor argument.

```typescript
// Create an instance using a class as type parameter
const mock: TypeMoq.IGlobalMock<GlobalBar> = TypeMoq.GlobalMock.ofType2<GlobalBar>("GlobalBar", global);

// Create an instance using an interface as type parameter
const mock: TypeMoq.IGlobalMock<IGlobalBar> = TypeMoq.GlobalMock.ofType2<IGlobalBar>("IGlobalBar", global);

// Create an instance of 'XmlHttpRequest' global type
const mock = TypeMoq.GlobalMock.ofType2<XMLHttpRequest>("XMLHttpRequest", global);
```

Compared to static global mocks, dynamic global mocks suffer from the same limitations as regular dynamic mocks.

### Auto sandbox global mocks

Replacing and restoring global class types and objects is done automagically by combining global mocks with global scopes.

```typescript
// global scope

function someGlobalFunc() {
  return "someGlobalFunc was called";
}

function someGlobalFuncWithArgs(a: any, b: any, c: any) {
  return "someGlobalFuncWithArgs was called";
}

// Global no args function is auto sandboxed
const mock = TypeMoq.GlobalMock.ofInstance(someGlobalFunc);
TypeMoq.GlobalScope.using(mock).with(() => {
    someGlobalFunc();
    someGlobalFunc();
});

// Global function with args is auto sandboxed
const mock = TypeMoq.GlobalMock.ofInstance(someGlobalFuncWithArgs);
TypeMoq.GlobalScope.using(mock).with(() => {
    someGlobalFuncWithArgs(1,2,3);
    someGlobalFuncWithArgs("1","2","3");
    someGlobalFuncWithArgs(1, 2, 3);
);

// Global object is auto sandboxed
const mock = TypeMoq.GlobalMock.ofType(GlobalBar);
TypeMoq.GlobalScope.using(mock).with(() => {
    const bar1 = new GlobalBar();
    bar1.value;
    bar1.value;
});

// 'window.XmlHttpRequest' global object is auto sandboxed
const mock = TypeMoq.GlobalMock.ofType(XMLHttpRequest);
TypeMoq.GlobalScope.using(mock).with(() => {
    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://www.typescriptlang.org", true);
    xhr1.send();
    mock.verify(x => x.send(), TypeMoq.Times.exactly(1));
});
const xhr2 = new XMLHttpRequest();
xhr2.open("GET", "http://www.typescriptlang.org", true);
xhr2.send();
mock.verify(x => x.send(), TypeMoq.Times.exactly(1));

// 'window.localStorage' global object is auto sandboxed
const mock = TypeMoq.GlobalMock.ofInstance(localStorage, "localStorage");
mock.setup(x => x.getItem(TypeMoq.It.isAnyString())).returns((key: string) => "[]");
TypeMoq.GlobalScope.using(mock).with(() => {
    expect(localStorage.getItem("xyz")).to.eq("[]");
});
localStorage.setItem("xyz", "Lorem ipsum dolor sit amet");
expect(localStorage.getItem("xyz")).to.eq("Lorem ipsum dolor sit amet");
```

**Note:** 
Inside the scope of a TypeMoq.GlobalScope, when constructing objects from global functions/class types which are being replaced by mocks, the constructor always returns the mocked object (of corresponding type) passed in as argument to the `TypeMoq.GlobalScope.using` function
