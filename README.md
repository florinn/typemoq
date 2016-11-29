TypeMoq [![build badge](https://travis-ci.org/florinn/typemoq.svg?branch=master)](https://travis-ci.org/florinn/typemoq)
===================

Simple mocking library for JavaScript targeting [TypeScript](http://www.typescriptlang.org/) development. If you have used before a library like [Moq](https://github.com/Moq/moq4) then the syntax should look familiar, otherwise the examples below should hopefully provide enough information to get you started quickly.


Features
-------------
* Strongly typed
* Auto complete/intellisense support
* Static and dynamic mocking
* Mock objects, classes (with arguments) and interfaces
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

TypeMoq requires Lodash to run, so make sure to include it in your page along `typemoq.js`:

```html
<script src="https://unpkg.com/lodash/lodash.js"></script>
<script src="https://unpkg.com/typemoq/dist/typemoq.js"></script>
```

At this point you should have access in your script to a global variable named `TypeMoq`.


Usage
-------------

After importing TypeMoq into your project, the following types should be available:

Type | Description
---- | ----
*TypeMoq.Mock* | Used for creating 'regular' mocks (see [Create mocks](#create_mocks) and [Setup mocks](#setup_mocks))
*TypeMoq.MockBehavior* | Used to specify how the mock should act when no expectations are defined (see [Control mock behavior](#mock_behavior))
*TypeMoq.It* | Helper for matching arguments (see [Setup mocks](#setup_mocks) and [Verify expectations](#verify_expectations))
*TypeMoq.Times* | Helper for performing verification (see [Verify expectations](#verify_expectations))
*TypeMoq.GlobalMock* | Used to create 'global' mocks corresponding to global objects (see [Create global mocks](#create_global_mocks))
*TypeMoq.GlobalScope* | Used to create an execution context that makes use of any specified 'global' mocks (see [Auto sandbox global mocks](#auto_sandbox))
*TypeMoq.MockException* | Exception thrown internally containing debug info 


###<a name="create_mocks"></a> Create mocks

#### Static mocks

Static mocks can be created either from class types and constructor arguments or from existing objects, including function objects.

##### Using class types and constructor arguments

```typescript
// Using class as constructor parameter
let mock: TypeMoq.IMock<Bar> = TypeMoq.Mock.ofType(Bar);

// Using class as constructor parameter and casting result to interface
let mock: TypeMoq.IMock<IBar> = TypeMoq.Mock.ofType(Bar);

// Using interface as type variable and class as constructor parameter
let mock: TypeMoq.IMock<IBar> = TypeMoq.Mock.ofType<IBar>(Bar);

// Using class as constructor parameter and constructor arguments
let bar = new Bar();
let mock: TypeMoq.IMock<Foo> = TypeMoq.Mock.ofType(Foo, TypeMoq.MockBehavior.Loose, bar);

// Using a generic class as constructor parameter and constructor arguments
let mock: TypeMoq.IMock<GenericFoo<Bar>> = TypeMoq.Mock.ofType(GenericFoo, TypeMoq.MockBehavior.Loose, Bar, 999);
```

##### Using existing objects, including function objects

```typescript
// From an existing object
let bar = new Bar();
let mock: TypeMoq.IMock<Bar> = TypeMoq.Mock.ofInstance(bar);

// Or from function objects
let mock1: TypeMoq.IMock<() => string> = TypeMoq.Mock.ofInstance(someFunc);
let mock2: TypeMoq.IMock<(a: any, b: any, c: any)=>string> = TypeMoq.Mock.ofInstance(someFuncWithArgs);
```

#### Dynamic mocks

Dynamic mocking requires your runtime (browser or node.js) to support the `Proxy` global object added in ECMAScript 6.
If `Proxy` is not detected, TypeMoq is going to throw a MockException.

Dynamic mocks can be created from type parameters, both classes and interfaces being supported.

```typescript
// Using class as type parameter
let mock: TypeMoq.IMock<Bar> = TypeMoq.Mock.ofType<Bar>();

// Using interface as type parameter
let mock: TypeMoq.IMock<IBar> = TypeMoq.Mock.ofType<IBar>();

// Specifying mock behavior
let mock: TypeMoq.IMock<Foo> = TypeMoq.Mock.ofType<Foo>(undefined, TypeMoq.MockBehavior.Loose);
```

As opposed to static mocks, dynamic mocks have some limitations due to the absence of the underlying target instance:
 
* No partial mocking
* No embedded mocks passed as constructor arguments

**Note:** 
Mocks (created in any of the ways listed above) expose the actual mock object through the `.object` property (that has the same type as the class or object being mocked).


###<a name="setup_mocks"></a> Setup mocks

Mocks allow to match functions, methods and properties and setup return callbacks or exceptions to throw.

##### Parameter matchers

Matcher | Description
---- | ----
```TypeMoq.It.isValue<T>(x: T)``` | Performs deep comparison against the provided object or basic value
```TypeMoq.It.isAny()``` | Matches any type
```TypeMoq.It.isAnyObject<T>(x: Ctor<T>)``` | Matches any object compatible with the provided type
```TypeMoq.It.isAnyString()``` | Matches any string
```TypeMoq.It.isAnyNumber()``` | Matches any number
```TypeMoq.It.is<T>(predicate: IFunc2<T, boolean>)``` | Performs comparison using the provided predicate

##### Matching functions

```typescript
// Match a no args function
let mock: TypeMoq.IMock<() => string> = TypeMoq.Mock.ofInstance(someFunc);
mock.setup(x => x()).returns(() => "At vero eos et accusamus");

// Match a function with args
let mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = TypeMoq.Mock.ofInstance(someFuncWithArgs);
mock.setup(x => x(TypeMoq.It.isAny(), TypeMoq.It.isAny(), TypeMoq.It.isAny())).returns(() => "At vero eos et accusamus");
```

##### Matching methods

```typescript
let mock = TypeMoq.Mock.ofType(Doer);

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
let bar = new Bar();
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
let bar1 = new Bar();
let bar2 = new Bar();
mock.setup(x => x.doBar(TypeMoq.It.isAnyObject(Bar)));

// Match a method by a param predicate 
let bar1 = new Bar();
bar1.value = "Ut enim ad minim veniam";
let bar2 = new Bar();
let mock = Mock.ofType(Doer);

mock.setup(x => x.doBar(It.is((x: Bar) => x.value === "Ut enim ad minim veniam"))).returns(() => bar2);
```

##### Matching properties

```typescript
// Match a property getter
let mock = TypeMoq.Mock.ofType(FooWithPublicGetterAndSetter);
mock.setup(x => x.foo);

// Match a property setter
mock.object.foo = "Lorem ipsum dolor sit amet";
mock.verify(x => x.foo = It.isValue("Lorem ipsum dolor sit amet"), Times.atLeastOnce());
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
let mock = TypeMoq.Mock.ofType(Doer);
let called1, called2 = false;
let numberArg: number;

mock.setup(x => x.doString(TypeMoq.It.isAnyString())).callback(() => called1 = true).returns(s => s.toUpperCase());
mock.setup(x => x.doNumber(TypeMoq.It.isAnyNumber())).callback(n => { numberArg = n; called2 = true; }).returns(n => n + 1);
```


### Record and replay

Mocks allow to "record" and "replay" one or more setups for the same matching function, method or property.

* If a single setup is recorded then at replay it is always executed:
```typescript
let mock = TypeMoq.Mock.ofInstance(() => -1);

// record
mock.setup(x => x()).returns(() => 0);

// replay
expect(mock.object()).to.eq(0);
expect(mock.object()).to.eq(0);
expect(mock.object()).to.eq(0);
```

* If more setups are recorded then at replay they are executed in the order of registration:
```typescript
let mock = TypeMoq.Mock.ofInstance(() => -1);

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

In the latter case, when there are no more recorded setups left to play, the mock starts returning default values or raises MockException if `MockBehavior.Strict` (see [Control mock behavior](#mock_behavior)).


### Reset mocks

Calling `.reset()` on a mock returns the mock to its initial state by removing any previous setups.


###<a name="mock_behavior"></a> Control mock behavior

##### Using MockBehavior

When creating a mock, you may specify a behavior value such as:

* `MockBehavior.Loose` (default) - never throws when no corresponding setup is found and just returns default values
* `MockBehavior.Strict` - raises exceptions for anything that doesn't have a corresponding setup

```typescript
let mock = TypeMoq.Mock.ofType(Doer, TypeMoq.MockBehavior.Strict);
```

##### Partial mocking

When the mock property `callBase` is set to `true`, if there's no overriding setup the mock invokes the object being mocked.

```typescript
mock.callBase = true;
```

The default value of `callBase` is `false`, so by default when there's no overriding setup the mock returns `undefined`.

###<a name="verify_expectations"></a> Verify expectations

Expectations can be verified either one by one or all at once by marking matchers as verifiable.

##### Expectations

Expectation | Description
---- | ----
```TypeMoq.Times.exactly(n: number)``` | Called exactly `n` times
```TypeMoq.Times.never()``` | Never called 
```TypeMoq.Times.once()``` | Called once 
```TypeMoq.Times.atLeastOnce()``` | Called at least once (default value)
```TypeMoq.Times.atMostOnce()``` | Called at most once 

##### Verify expectations one by one

To verify an expectation you can use the `verify` method and specify a matching function and an expectation.

```typescript
// Verify that a no args function was called at least once
let mock: TypeMoq.IMock<() => string> = TypeMoq.Mock.ofInstance(someFunc);
mock.object();
mock.verify(x => x(), TypeMoq.Times.atLeastOnce());

// Verify that a function with args was called at least once
let mock: TypeMoq.IMock<(a: any, b: any, c: any) => string> = TypeMoq.Mock.ofInstance(someFuncWithArgs);
mock.object(1, 2, 3);
mock.verify(x => x(TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber(), TypeMoq.It.isAnyNumber()), TypeMoq.Times.atLeastOnce());

// Verify that no args method was called at least once
let mock = TypeMoq.Mock.ofType(Doer);
mock.object.doVoid();
mock.verify(x => x.doVoid(), TypeMoq.Times.atLeastOnce());

// Verify that method with params was called at least once
let mock = TypeMoq.Mock.ofType(Doer);
mock.object.doString("Lorem ipsum dolor sit amet");
mock.verify(x => x.doString(TypeMoq.It.isValue("Lorem ipsum dolor sit amet")), TypeMoq.Times.atLeastOnce());

// Verify that value getter was called at least once
let mock = TypeMoq.Mock.ofType(Bar);
mock.object.value;
mock.verify(x => x.value, TypeMoq.Times.atLeastOnce());

// Verify that value setter was called at least once
let mock = TypeMoq.Mock.ofType(Bar);
mock.object.value = "Lorem ipsum dolor sit amet";
mock.verify(x => x.value = TypeMoq.It.isValue("Lorem ipsum dolor sit amet"), TypeMoq.Times.atLeastOnce());
```

**Note:** 
When constructing a mock, it is allowed to pass mock objects as arguments and later verify expectations on them. E.g.: 

```typescript
let mockBar = TypeMoq.Mock.ofType(Bar);
let mockFoo = TypeMoq.Mock.ofType(Foo, TypeMoq.MockBehavior.Loose, mockBar.object);
mockFoo.callBase = true;

mockFoo.object.setBar("Lorem ipsum dolor sit amet");

mockBar.verify(x => x.value = TypeMoq.It.isValue("Lorem ipsum dolor sit amet"), TypeMoq.Times.atLeastOnce());
```

##### Verify all expectations at once

Instead of verifying one expectation at a time, you may specify the expectation at setup time by calling `verifiable(times: Times)` and then `verifyAll()` to check all expectations.

```typescript
mock.setup(x => x.doNumber(999)).verifiable();
mock.setup(x => x.doString(It.isAny())).verifiable(Times.exactly(2));
mock.setup(x => x.doVoid()).verifiable(Times.atMostOnce());

mock.object.doVoid();
mock.object.doString("Lorem ipsum dolor sit amet");
mock.object.doString("Ut enim ad minim veniam");
mock.object.doNumber(999);

mock.verifyAll();
```

The default value of the `times` param is `Times.atLeastOnce()`.

##### Verify expectation invocation order

Expectation invocation order | Description
---- | ----
```TypeMoq.ExpectedCallType.InAnyOrder``` | Only call count considered (default value) 
```TypeMoq.ExpectedCallType.InSequence``` | Both call count and order considered

```typescript
let mock = Mock.ofInstance((x: number) => { });

mock.setup(x => x(1)).verifiable(Times.once(), ExpectedCallType.InSequence);
mock.setup(x => x(2)).verifiable(Times.once(), ExpectedCallType.InSequence);

mock.object(2);
mock.object(1);

mock.verifyAll();  // it should throw MockException
```


###<a name="create_global_mocks"></a> Create global mocks

#### Static global mocks

Static global mocks are created by specifying a class type or an existing object, similar to regular static mocks.

You may also specify a container object for the type/object being mocked.

For browsers the top global object is the `window` object, which is the default `container` value in `TypeMoq.GlobalMock`.
For node.js the top global object is the `global` object.

##### Using class types

```typescript
// Create an instance using class as ctor parameter
let mock: TypeMoq.IGlobalMock<GlobalBar> = TypeMoq.GlobalMock.ofType(GlobalBar, global);

// Create an instance using class as ctor parameter and casting result to interface
let mock: TypeMoq.IGlobalMock<IGlobalBar> = TypeMoq.GlobalMock.ofType(GlobalBar, global);

// Create an instance using interface as type variable and class as ctor parameter
let mock: TypeMoq.IGlobalMock<IGlobalBar> = TypeMoq.GlobalMock.ofType<IGlobalBar>(GlobalBar, global);

// Create an instance of 'XmlHttpRequest' global type
let mock = TypeMoq.GlobalMock.ofType(XMLHttpRequest, global);
```

##### Using existing objects, including function objects

When creating mock instances out of global objects (such as `window.localStorage`), you should provide the name of the global object (*"localStorage"* in this case) as the second parameter.

```typescript
// Create an instance using class as ctor parameter and ctor args
let bar = new Bar();
let foo = new Foo(bar);
let mock: TypeMoq.IGlobalMock<Foo> = TypeMoq.GlobalMock.ofInstance(foo);

// Create an instance using a generic class as ctor parameter and ctor args
let foo = new GenericFoo(Bar);
let mock: TypeMoq.IGlobalMock<GenericFoo<Bar>> = TypeMoq.GlobalMock.ofInstance(foo);

// Create an instance from an existing object
let bar = new GlobalBar();
let mock: TypeMoq.IGlobalMock<GlobalBar> = TypeMoq.GlobalMock.ofInstance(bar);

// Create an instance from a function object
let mock1: TypeMoq.IGlobalMock<() => string> = TypeMoq.GlobalMock.ofInstance(someGlobalFunc);
let mock2: TypeMoq.IGlobalMock<(a: any, b: any, c: any) => string> = TypeMoq.GlobalMock.ofInstance(someGlobalFuncWithArgs);

// Create an instance from 'window.localStorage' global object
let mock = TypeMoq.GlobalMock.ofInstance(localStorage, "localStorage");
```

**Note:**
Due to browser security limitations, global mocks created by specifying class type cannot have constructor arguments

#### Dynamic global mocks

Dynamic global mocks are created by specifying a type parameter and the name of the global object as the first constructor argument.

```typescript
// Create an instance using a class as type parameter
let mock: TypeMoq.IGlobalMock<GlobalBar> = TypeMoq.GlobalMock.ofType2<GlobalBar>("GlobalBar", global);

// Create an instance using an interface as type parameter
let mock: TypeMoq.IGlobalMock<IGlobalBar> = TypeMoq.GlobalMock.ofType2<IGlobalBar>("IGlobalBar", global);

// Create an instance of 'XmlHttpRequest' global type
let mock = TypeMoq.GlobalMock.ofType2<XMLHttpRequest>("XMLHttpRequest", global);
```

Compared to static global mocks, dynamic global mocks suffer from the same limitations as regular dynamic mocks.

###<a name="auto_sandbox"></a> Auto sandbox global mocks

Replacing and restoring global class types and objects is done automagically by combining global mocks with global scopes.

```typescript
// Global no args function is auto sandboxed
let mock = TypeMoq.GlobalMock.ofInstance(someGlobalFunc);
TypeMoq.GlobalScope.using(mock).with(() => {
    someGlobalFunc();
    someGlobalFunc();
});

// Global function with args is auto sandboxed
let mock = TypeMoq.GlobalMock.ofInstance(someGlobalFuncWithArgs);
TypeMoq.GlobalScope.using(mock).with(() => {
    someGlobalFuncWithArgs(1,2,3);
    someGlobalFuncWithArgs("1","2","3");
    someGlobalFuncWithArgs(1, 2, 3);
);

// Global object is auto sandboxed
let mock = TypeMoq.GlobalMock.ofType(GlobalBar);
TypeMoq.GlobalScope.using(mock).with(() => {
    let bar1 = new GlobalBar();
    bar1.value;
    bar1.value;
});

// 'window.XmlHttpRequest' global object is auto sandboxed
let mock = TypeMoq.GlobalMock.ofType(XMLHttpRequest);
TypeMoq.GlobalScope.using(mock).with(() => {
    let xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "http://www.typescriptlang.org", true);
    xhr1.send();
    mock.verify(x => x.send(), TypeMoq.Times.exactly(1));
});
let xhr2 = new XMLHttpRequest();
xhr2.open("GET", "http://www.typescriptlang.org", true);
xhr2.send();
mock.verify(x => x.send(), TypeMoq.Times.exactly(1));

// 'window.localStorage' global object is auto sandboxed
let mock = TypeMoq.GlobalMock.ofInstance(localStorage, "localStorage");
mock.setup(x => x.getItem(TypeMoq.It.isAnyString())).returns((key: string) => "[]");
TypeMoq.GlobalScope.using(mock).with(() => {
    expect(localStorage.getItem("xyz")).to.eq("[]");
});
localStorage.setItem("xyz", "Lorem ipsum dolor sit amet");
expect(localStorage.getItem("xyz")).to.eq("Lorem ipsum dolor sit amet");
```

**Note:** 
Within a global scope, when constructing objects from global functions/class types which are being replaced by mocks, the constructor always returns the mocked object (of corresponding type) passed in as argument to the `using` function
