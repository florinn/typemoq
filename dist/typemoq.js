var TypeMoq;
(function (TypeMoq) {
    var Cons = (function () {
        function Cons() {
        }
        Cons.IMATCH_ID_VALUE = "438A51D3-6864-49D7-A655-CA1153B86965";
        Cons.IMATCH_ID_NAME = "___id";
        Cons.IMATCH_MATCHES_NAME = "___matches";
        return Cons;
    }());
    TypeMoq.Cons = Cons;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var CurrentInterceptContext = (function () {
        function CurrentInterceptContext() {
        }
        return CurrentInterceptContext;
    }());
    TypeMoq.CurrentInterceptContext = CurrentInterceptContext;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    (function (GlobalType) {
        GlobalType[GlobalType["Class"] = 0] = "Class";
        GlobalType[GlobalType["Function"] = 1] = "Function";
        GlobalType[GlobalType["Value"] = 2] = "Value";
    })(TypeMoq.GlobalType || (TypeMoq.GlobalType = {}));
    var GlobalType = TypeMoq.GlobalType;
    var GlobalMock = (function () {
        function GlobalMock(mock, _name, _type, container) {
            this.mock = mock;
            this._name = _name;
            this._type = _type;
            this.container = container;
        }
        GlobalMock.ofInstance = function (instance, name, container, behavior) {
            if (container === void 0) { container = window; }
            if (behavior === void 0) { behavior = TypeMoq.MockBehavior.Loose; }
            var mock = TypeMoq.Mock.ofInstance(instance, behavior);
            var type = _.isFunction(instance) ? GlobalType.Function : GlobalType.Value;
            return new GlobalMock(mock, name, type, container);
        };
        GlobalMock.ofType = function (ctor, name, container, behavior) {
            if (container === void 0) { container = window; }
            if (behavior === void 0) { behavior = TypeMoq.MockBehavior.Loose; }
            var instance = new ctor();
            var mock = TypeMoq.Mock.ofInstance(instance, behavior);
            return new GlobalMock(mock, name, GlobalType.Class, container);
        };
        Object.defineProperty(GlobalMock.prototype, "object", {
            get: function () { return this.mock.object; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "name", {
            get: function () { return this._name || this.mock.name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "behavior", {
            get: function () { return this.mock.behavior; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "callBase", {
            get: function () { return this.mock.callBase; },
            set: function (value) { this.mock.callBase = value; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "type", {
            get: function () { return this._type; },
            enumerable: true,
            configurable: true
        });
        // setup
        GlobalMock.prototype.setup = function (expression) {
            return this.mock.setup(expression);
        };
        // verify
        GlobalMock.prototype.verify = function (expression, times) {
            this.mock.verify(expression, times);
        };
        GlobalMock.prototype.verifyAll = function () {
            this.mock.verifyAll();
        };
        return GlobalMock;
    }());
    TypeMoq.GlobalMock = GlobalMock;
})(TypeMoq || (TypeMoq = {}));




























var TypeMoq;
(function (TypeMoq) {
    var PropertyRetriever = (function () {
        function PropertyRetriever() {
        }
        PropertyRetriever.getOwnEnumerables = function (obj) {
            return this._getPropertyNames(obj, true, false, this._enumerable);
            // Or could use for..in filtered with hasOwnProperty or just this: return Object.keys(obj);
        };
        PropertyRetriever.getOwnNonenumerables = function (obj) {
            return this._getPropertyNames(obj, true, false, this._notEnumerable);
        };
        PropertyRetriever.getOwnEnumerablesAndNonenumerables = function (obj) {
            return this._getPropertyNames(obj, true, false, this._enumerableAndNotEnumerable);
            // Or just use: return Object.getOwnPropertyNames(obj);
        };
        PropertyRetriever.getPrototypeEnumerables = function (obj) {
            return this._getPropertyNames(obj, false, true, this._enumerable);
        };
        PropertyRetriever.getPrototypeNonenumerables = function (obj) {
            return this._getPropertyNames(obj, false, true, this._notEnumerable);
        };
        PropertyRetriever.getPrototypeEnumerablesAndNonenumerables = function (obj) {
            return this._getPropertyNames(obj, false, true, this._enumerableAndNotEnumerable);
        };
        PropertyRetriever.getOwnAndPrototypeEnumerables = function (obj) {
            return this._getPropertyNames(obj, true, true, this._enumerable);
            // Or could use unfiltered for..in
        };
        PropertyRetriever.getOwnAndPrototypeNonenumerables = function (obj) {
            return this._getPropertyNames(obj, true, true, this._notEnumerable);
        };
        PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables = function (obj) {
            return this._getPropertyNames(obj, true, true, this._enumerableAndNotEnumerable);
        };
        // Private static property checker callbacks
        PropertyRetriever._enumerable = function (obj, prop) {
            return obj.propertyIsEnumerable(prop);
        };
        PropertyRetriever._notEnumerable = function (obj, prop) {
            return !obj.propertyIsEnumerable(prop);
        };
        PropertyRetriever._enumerableAndNotEnumerable = function (obj, prop) {
            return true;
        };
        PropertyRetriever._getPropertyNames = function (obj, iterateSelfBool, iteratePrototypeBool, includePropCb) {
            var result = [];
            do {
                if (iterateSelfBool) {
                    var props = Object.getOwnPropertyNames(obj);
                    _.forEach(props, function (prop) {
                        var duplicate = _.find(result, function (p) { return p.name === prop; });
                        if (!duplicate && includePropCb(obj, prop)) {
                            var propDesc = Object.getOwnPropertyDescriptor(obj, prop);
                            result.push({ name: prop, desc: propDesc });
                        }
                    });
                }
                if (!iteratePrototypeBool) {
                    break;
                }
                iterateSelfBool = true;
            } while (obj = Object.getPrototypeOf(obj));
            return result;
        };
        return PropertyRetriever;
    }());
    TypeMoq.PropertyRetriever = PropertyRetriever;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getUUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
        Utils.functionName = function (fun) {
            var ret = fun.toString();
            ret = ret.substr('function '.length);
            ret = ret.substr(0, ret.indexOf('('));
            return ret;
        };
        Utils.conthunktor = function (ctor, args) {
            return (function () {
                var Temp = function () { }, inst, ret;
                Temp.prototype = ctor.prototype;
                inst = new Temp();
                if (_.isFunction(ctor))
                    ret = ctor.apply(inst, args);
                return _.isObject(ret) ? ret : inst;
            })();
        };
        return Utils;
    }());
    TypeMoq.Utils = Utils;
})(TypeMoq || (TypeMoq = {}));




var TypeMoq;
(function (TypeMoq) {
    var Error;
    (function (Error) {
        var Exception = (function () {
            function Exception(name, message) {
                this.name = name;
                this.message = message;
                this.name = name;
            }
            Exception.prototype.toString = function () {
                return this.name;
            };
            return Exception;
        }());
        Error.Exception = Exception;
    })(Error = TypeMoq.Error || (TypeMoq.Error = {}));
})(TypeMoq || (TypeMoq = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeMoq;
(function (TypeMoq) {
    var Error;
    (function (Error) {
        (function (MockExceptionReason) {
            MockExceptionReason[MockExceptionReason["NoSetup"] = 0] = "NoSetup";
            MockExceptionReason[MockExceptionReason["MoreThanOneSetupExpression"] = 1] = "MoreThanOneSetupExpression";
            MockExceptionReason[MockExceptionReason["InvalidSetupExpression"] = 2] = "InvalidSetupExpression";
            MockExceptionReason[MockExceptionReason["InvalidMatcher"] = 3] = "InvalidMatcher";
            MockExceptionReason[MockExceptionReason["InvalidProxyArgument"] = 4] = "InvalidProxyArgument";
            MockExceptionReason[MockExceptionReason["UnknownGlobalType"] = 5] = "UnknownGlobalType";
            MockExceptionReason[MockExceptionReason["VerificationFailed"] = 6] = "VerificationFailed";
            MockExceptionReason[MockExceptionReason["MoreThanOneCall"] = 7] = "MoreThanOneCall";
            MockExceptionReason[MockExceptionReason["MoreThanNCalls"] = 8] = "MoreThanNCalls";
        })(Error.MockExceptionReason || (Error.MockExceptionReason = {}));
        var MockExceptionReason = Error.MockExceptionReason;
        var MockException = (function (_super) {
            __extends(MockException, _super);
            function MockException(reason, ctx, name, message) {
                if (name === void 0) { name = 'Mock Exception'; }
                _super.call(this, name, message);
                this.reason = reason;
                this.ctx = ctx;
            }
            return MockException;
        }(Error.Exception));
        Error.MockException = MockException;
    })(Error = TypeMoq.Error || (TypeMoq.Error = {}));
})(TypeMoq || (TypeMoq = {}));







var TypeMoq;
(function (TypeMoq) {
    var Match;
    (function (Match) {
        var MatchAnyObject = (function () {
            function MatchAnyObject(_ctor) {
                this._ctor = _ctor;
                this.___id = TypeMoq.Cons.IMATCH_ID_VALUE;
            }
            MatchAnyObject.prototype.___matches = function (object) {
                var match = false;
                if (this._ctor.prototype === object.constructor.prototype)
                    match = true;
                return match;
            };
            return MatchAnyObject;
        }());
        Match.MatchAnyObject = MatchAnyObject;
        var MatchAny = (function () {
            function MatchAny() {
                this.___id = TypeMoq.Cons.IMATCH_ID_VALUE;
            }
            MatchAny.prototype.___matches = function (object) {
                var match = false;
                if (!_.isUndefined(object))
                    match = true;
                return match;
            };
            return MatchAny;
        }());
        Match.MatchAny = MatchAny;
        var MatchAnyString = (function () {
            function MatchAnyString() {
                this.___id = TypeMoq.Cons.IMATCH_ID_VALUE;
            }
            MatchAnyString.prototype.___matches = function (object) {
                var match = false;
                if (_.isString(object))
                    match = true;
                return match;
            };
            return MatchAnyString;
        }());
        Match.MatchAnyString = MatchAnyString;
        var MatchAnyNumber = (function () {
            function MatchAnyNumber() {
                this.___id = TypeMoq.Cons.IMATCH_ID_VALUE;
            }
            MatchAnyNumber.prototype.___matches = function (object) {
                var match = false;
                if (_.isNumber(object))
                    match = true;
                return match;
            };
            return MatchAnyNumber;
        }());
        Match.MatchAnyNumber = MatchAnyNumber;
    })(Match = TypeMoq.Match || (TypeMoq.Match = {}));
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var Match;
    (function (Match) {
        var MatchValue = (function () {
            function MatchValue(_value) {
                this._value = _value;
                this.___id = TypeMoq.Cons.IMATCH_ID_VALUE;
            }
            MatchValue.prototype.___matches = function (object) {
                var match = false;
                if (_.isEqual(this._value, object))
                    match = true;
                return match;
            };
            return MatchValue;
        }());
        Match.MatchValue = MatchValue;
    })(Match = TypeMoq.Match || (TypeMoq.Match = {}));
})(TypeMoq || (TypeMoq = {}));








var TypeMoq;
(function (TypeMoq) {
    var Proxy;
    (function (Proxy) {
        var MethodInvocation = (function () {
            function MethodInvocation(_property, _args) {
                this._property = _property;
                this._args = _args;
            }
            Object.defineProperty(MethodInvocation.prototype, "args", {
                get: function () { return this._args || { length: 0, callee: null }; },
                set: function (value) { this._args = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MethodInvocation.prototype, "property", {
                get: function () { return this._property; },
                enumerable: true,
                configurable: true
            });
            MethodInvocation.prototype.invokeBase = function () {
                this.returnValue = this._property.toFunc.apply(this._property.obj, this._args);
            };
            return MethodInvocation;
        }());
        Proxy.MethodInvocation = MethodInvocation;
        var GetterInvocation = (function () {
            function GetterInvocation(_property, value) {
                this._property = _property;
                this.returnValue = value;
            }
            Object.defineProperty(GetterInvocation.prototype, "args", {
                get: function () {
                    var args = [];
                    Object.defineProperty(args, "callee", { configurable: false, enumerable: true, writable: false, value: null });
                    return args;
                },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GetterInvocation.prototype, "property", {
                get: function () { return this._property; },
                enumerable: true,
                configurable: true
            });
            GetterInvocation.prototype.invokeBase = function () {
            };
            return GetterInvocation;
        }());
        Proxy.GetterInvocation = GetterInvocation;
        var SetterInvocation = (function () {
            function SetterInvocation(_property, _args) {
                this._property = _property;
                this._args = _args;
            }
            Object.defineProperty(SetterInvocation.prototype, "args", {
                get: function () { return this._args; },
                set: function (value) { this._args = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SetterInvocation.prototype, "property", {
                get: function () { return this._property; },
                enumerable: true,
                configurable: true
            });
            SetterInvocation.prototype.invokeBase = function () {
                this.returnValue = this._property.obj[this._property.name] = this._args[0];
            };
            return SetterInvocation;
        }());
        Proxy.SetterInvocation = SetterInvocation;
        var MethodInfo = (function () {
            function MethodInfo(obj, name) {
                this.obj = obj;
                this.name = name;
            }
            Object.defineProperty(MethodInfo.prototype, "toFunc", {
                get: function () {
                    var func;
                    if (_.isFunction(this.obj))
                        func = this.obj;
                    else
                        func = this.obj[this.name];
                    return func;
                },
                enumerable: true,
                configurable: true
            });
            return MethodInfo;
        }());
        Proxy.MethodInfo = MethodInfo;
        var PropertyInfo = (function () {
            function PropertyInfo(obj, name) {
                this.obj = obj;
                this.name = name;
            }
            return PropertyInfo;
        }());
        Proxy.PropertyInfo = PropertyInfo;
    })(Proxy = TypeMoq.Proxy || (TypeMoq.Proxy = {}));
})(TypeMoq || (TypeMoq = {}));






var TypeMoq;
(function (TypeMoq) {
    var Proxy;
    (function (Proxy_1) {
        var Proxy = (function () {
            function Proxy(interceptor, instance) {
                var _this = this;
                this.check(instance);
                var that = this;
                var props = TypeMoq.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(instance);
                _.each(props, function (prop) {
                    if (_.isFunction(prop.desc.value)) {
                        var propDesc = {
                            configurable: prop.desc.configurable,
                            enumerable: prop.desc.enumerable,
                            writable: prop.desc.writable,
                        };
                        _this.defineMethodProxy(that, interceptor, instance, prop.name, propDesc);
                    }
                    else {
                        var propDesc = {
                            configurable: prop.desc.configurable,
                            enumerable: prop.desc.enumerable,
                        };
                        _this.definePropertyProxy(that, interceptor, instance, prop.name, prop.desc.value, propDesc);
                    }
                });
            }
            Proxy.of = function (instance, interceptor) {
                Proxy.check(instance);
                var result;
                if (_.isFunction(instance)) {
                    var funcName = TypeMoq.Utils.functionName(instance);
                    result = Proxy.methodProxyValue(interceptor, instance, funcName);
                }
                else {
                    result = new Proxy(interceptor, instance);
                }
                return result;
            };
            Proxy.check = function (instance) {
                Proxy.checkNotNull(instance);
                // allow only primitive objects and functions
                var ok = false;
                if (_.isFunction(instance) ||
                    (_.isObject(instance) && !Proxy.isPrimitiveObject(instance)))
                    ok = true;
                if (!ok)
                    throw new error.MockException(error.MockExceptionReason.InvalidProxyArgument, instance, "InvalidProxyArgument Exception", "Argument should be a function or a non primitive object");
            };
            Proxy.prototype.check = function (instance) {
                Proxy.checkNotNull(instance);
                // allow only non primitive objects
                var ok = false;
                if (!_.isFunction(instance) &&
                    (_.isObject(instance) && !Proxy.isPrimitiveObject(instance)))
                    ok = true;
                if (!ok)
                    throw new error.MockException(error.MockExceptionReason.InvalidProxyArgument, instance, "InvalidProxyArgument Exception", "Argument should be a non primitive object");
            };
            Proxy.checkNotNull = function (instance) {
                if (_.isNull(instance))
                    throw new error.MockException(error.MockExceptionReason.InvalidProxyArgument, instance, "InvalidProxyArgument Exception", "Argument cannot be null");
            };
            Proxy.isPrimitiveObject = function (obj) {
                var result = false;
                if (_.isFunction(obj) ||
                    _.isArray(obj) ||
                    _.isDate(obj) ||
                    _.isNull(obj))
                    result = true;
                return result;
            };
            Proxy.prototype.defineMethodProxy = function (that, interceptor, instance, propName, propDesc) {
                if (propDesc === void 0) { propDesc = { configurable: false, enumerable: true, writable: false }; }
                propDesc.value = Proxy.methodProxyValue(interceptor, instance, propName);
                this.defineProperty(that, propName, propDesc);
            };
            Proxy.methodProxyValue = function (interceptor, instance, propName) {
                function proxy() {
                    var method = new Proxy_1.MethodInfo(instance, propName);
                    var invocation = new Proxy_1.MethodInvocation(method, arguments);
                    interceptor.intercept(invocation);
                    return invocation.returnValue;
                }
                return proxy;
            };
            Proxy.prototype.definePropertyProxy = function (that, interceptor, instance, propName, propValue, propDesc) {
                if (propDesc === void 0) { propDesc = { configurable: false, enumerable: true }; }
                function getProxy() {
                    var method = new Proxy_1.PropertyInfo(instance, propName);
                    var invocation = new Proxy_1.GetterInvocation(method, propValue);
                    interceptor.intercept(invocation);
                    return invocation.returnValue;
                }
                propDesc.get = getProxy;
                function setProxy(v) {
                    var method = new Proxy_1.PropertyInfo(instance, propName);
                    var invocation = new Proxy_1.SetterInvocation(method, arguments);
                    interceptor.intercept(invocation);
                }
                propDesc.set = setProxy;
                this.defineProperty(that, propName, propDesc);
            };
            Proxy.prototype.defineProperty = function (obj, name, desc) {
                try {
                    Object.defineProperty(obj, name, desc);
                }
                catch (e) {
                    console.log(e.message);
                }
            };
            return Proxy;
        }());
        Proxy_1.Proxy = Proxy;
    })(Proxy = TypeMoq.Proxy || (TypeMoq.Proxy = {}));
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var Proxy;
    (function (Proxy) {
        var ProxyFactory = (function () {
            function ProxyFactory() {
            }
            ProxyFactory.prototype.createProxy = function (interceptor, instance) {
                var proxy = Proxy.Proxy.of(instance, interceptor);
                return proxy;
            };
            return ProxyFactory;
        }());
        Proxy.ProxyFactory = ProxyFactory;
    })(Proxy = TypeMoq.Proxy || (TypeMoq.Proxy = {}));
})(TypeMoq || (TypeMoq = {}));










var TypeMoq;
(function (TypeMoq) {
    (function (InterceptionAction) {
        InterceptionAction[InterceptionAction["Continue"] = 0] = "Continue";
        InterceptionAction[InterceptionAction["Stop"] = 1] = "Stop";
    })(TypeMoq.InterceptionAction || (TypeMoq.InterceptionAction = {}));
    var InterceptionAction = TypeMoq.InterceptionAction;
    var InterceptorContext = (function () {
        function InterceptorContext(behavior, mock) {
            this.behavior = behavior;
            this.mock = mock;
            this._actualInvocations = [];
            this._orderedCalls = [];
        }
        InterceptorContext.prototype.addInvocation = function (invocation) { this._actualInvocations.push(invocation); };
        InterceptorContext.prototype.actualInvocations = function () { return this._actualInvocations; };
        InterceptorContext.prototype.clearInvocations = function () { this._actualInvocations = []; };
        InterceptorContext.prototype.addOrderedCall = function (call) { this._orderedCalls.push(call); };
        InterceptorContext.prototype.removeOrderedCall = function (call) {
            _.filter(this._orderedCalls, function (x) {
                return x.id !== call.id;
            });
        };
        InterceptorContext.prototype.orderedCalls = function () { return this._orderedCalls; };
        return InterceptorContext;
    }());
    TypeMoq.InterceptorContext = InterceptorContext;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var InterceptorExecute = (function () {
        function InterceptorExecute(behavior, mock) {
            this._interceptorContext = new TypeMoq.InterceptorContext(behavior, mock);
        }
        Object.defineProperty(InterceptorExecute.prototype, "interceptorContext", {
            get: function () { return this._interceptorContext; },
            enumerable: true,
            configurable: true
        });
        InterceptorExecute.prototype.intercept = function (invocation) {
            var _this = this;
            var localCtx = new TypeMoq.CurrentInterceptContext();
            _.some(this.interceptionStrategies(), function (strategy) {
                if (TypeMoq.InterceptionAction.Stop === strategy.handleIntercept(invocation, _this.interceptorContext, localCtx)) {
                    return true;
                }
            });
        };
        InterceptorExecute.prototype.addCall = function (call) {
            this._interceptorContext.addOrderedCall(call);
        };
        InterceptorExecute.prototype.verifyCall = function (call, times) {
            var actualCalls = this._interceptorContext.actualInvocations();
            var callCount = _.filter(actualCalls, function (c) { return call.matches(c); }).length;
            if (!times.verify(callCount)) {
                this.throwVerifyCallException(call.setupCall, times);
            }
        };
        InterceptorExecute.prototype.verify = function () {
            var orderedCalls = this._interceptorContext.orderedCalls();
            var verifiables = _.filter(orderedCalls, function (c) { return c.isVerifiable; });
            var invokes = _.filter(orderedCalls, function (c) { return c.isVerifiable && c.isInvoked; });
            var times = TypeMoq.Times.exactly(verifiables.length);
            if (!times.verify(invokes.length))
                this.throwVerifyException(verifiables, times);
        };
        InterceptorExecute.prototype.interceptionStrategies = function () {
            var strategies = [
                new TypeMoq.AddActualInvocation(),
                new TypeMoq.ExtractProxyCall(),
                new TypeMoq.ExecuteCall(),
                new TypeMoq.InvokeBase(),
                new TypeMoq.HandleMockRecursion()
            ];
            return strategies;
        };
        InterceptorExecute.prototype.throwVerifyCallException = function (call, times) {
            var e = new error.MockException(error.MockExceptionReason.VerificationFailed, call, "VerifyCall Exception", times.failMessage);
            throw e;
        };
        InterceptorExecute.prototype.throwVerifyException = function (failures, times) {
            var e = new error.MockException(error.MockExceptionReason.VerificationFailed, failures, "Verify Exception", times.failMessage);
            throw e;
        };
        return InterceptorExecute;
    }());
    TypeMoq.InterceptorExecute = InterceptorExecute;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var InterceptorSetup = (function () {
        function InterceptorSetup() {
        }
        Object.defineProperty(InterceptorSetup.prototype, "interceptedCall", {
            get: function () { return this._interceptedCall; },
            enumerable: true,
            configurable: true
        });
        InterceptorSetup.prototype.intercept = function (invocation) {
            if (this._interceptedCall) {
                throw new error.MockException(error.MockExceptionReason.MoreThanOneSetupExpression, invocation, "MoreThanOneSetupExpression Exception", "Setup should contain only one expression");
            }
            this._interceptedCall = invocation;
        };
        return InterceptorSetup;
    }());
    TypeMoq.InterceptorSetup = InterceptorSetup;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var AddActualInvocation = (function () {
        function AddActualInvocation() {
        }
        AddActualInvocation.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            ctx.addInvocation(invocation);
            return TypeMoq.InterceptionAction.Continue;
        };
        return AddActualInvocation;
    }());
    TypeMoq.AddActualInvocation = AddActualInvocation;
    var ExtractProxyCall = (function () {
        function ExtractProxyCall() {
        }
        ExtractProxyCall.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            var reversedOrderedCalls = ctx.orderedCalls().slice().reverse();
            localCtx.call = _.find(reversedOrderedCalls, function (c) {
                return c.matches(invocation);
            });
            if (localCtx.call != null) {
                localCtx.call.evaluatedSuccessfully();
            }
            else if (ctx.behavior == TypeMoq.MockBehavior.Strict) {
                throw new error.MockException(error.MockExceptionReason.NoSetup, invocation);
            }
            return TypeMoq.InterceptionAction.Continue;
        };
        return ExtractProxyCall;
    }());
    TypeMoq.ExtractProxyCall = ExtractProxyCall;
    var ExecuteCall = (function () {
        function ExecuteCall() {
        }
        ExecuteCall.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            this._ctx = ctx;
            var currentCall = localCtx.call;
            if (currentCall != null) {
                currentCall.execute(invocation);
                return TypeMoq.InterceptionAction.Stop;
            }
            return TypeMoq.InterceptionAction.Continue;
        };
        return ExecuteCall;
    }());
    TypeMoq.ExecuteCall = ExecuteCall;
    var InvokeBase = (function () {
        function InvokeBase() {
        }
        InvokeBase.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            if (ctx.mock.callBase) {
                invocation.invokeBase();
                return TypeMoq.InterceptionAction.Stop;
            }
            return TypeMoq.InterceptionAction.Continue;
        };
        return InvokeBase;
    }());
    TypeMoq.InvokeBase = InvokeBase;
    var HandleMockRecursion = (function () {
        function HandleMockRecursion() {
        }
        HandleMockRecursion.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            //TODO: 
            return TypeMoq.InterceptionAction.Continue;
        };
        return HandleMockRecursion;
    }());
    TypeMoq.HandleMockRecursion = HandleMockRecursion;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var It = (function () {
        function It() {
        }
        It.isValue = function (x) {
            var matcher = new match.MatchValue(x);
            return matcher;
        };
        It.isAnyObject = function (x) {
            var matcher = new match.MatchAnyObject(x);
            return matcher;
        };
        It.isAny = function () {
            var matcher = new match.MatchAny();
            return matcher;
        };
        It.isAnyString = function () {
            var matcher = new match.MatchAnyString();
            return matcher;
        };
        It.isAnyNumber = function () {
            var matcher = new match.MatchAnyNumber();
            return matcher;
        };
        return It;
    }());
    TypeMoq.It = It;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var MethodCall = (function () {
        function MethodCall(mock, _setupExpression) {
            this.mock = mock;
            this._setupExpression = _setupExpression;
            this._id = this.generateId();
            var interceptor = new TypeMoq.InterceptorSetup();
            var proxy = TypeMoq.Mock.proxyFactory.createProxy(interceptor, mock.instance);
            _setupExpression(proxy);
            if (interceptor.interceptedCall) {
                var ic = interceptor.interceptedCall;
                var newArgs = this.transformToMatchers(ic.args);
                Object.defineProperty(newArgs, "callee", { configurable: false, enumerable: true, writable: false, value: ic.args.callee });
                ic.args = newArgs;
                this._setupCall = ic;
            }
            else {
                throw new error.MockException(error.MockExceptionReason.InvalidSetupExpression, this._setupExpression, "InvalidSetupExpression Exception", "Invalid setup expression");
            }
        }
        MethodCall.prototype.generateId = function () {
            return "MethodCall<" + _.uniqueId() + ">";
        };
        MethodCall.prototype.transformToMatchers = function (args) {
            var newArgs = [];
            _.each(args, function (a) {
                if (!_.isObject(a)) {
                    var newArg = new match.MatchValue(a);
                    newArgs.push(newArg);
                }
                else {
                    if (!_.isUndefined(a[TypeMoq.Cons.IMATCH_MATCHES_NAME]) &&
                        !_.isUndefined(a[TypeMoq.Cons.IMATCH_ID_NAME]) && a[TypeMoq.Cons.IMATCH_ID_NAME] === TypeMoq.Cons.IMATCH_ID_VALUE) {
                        newArgs.push(a);
                    }
                    else {
                        throw new error.MockException(error.MockExceptionReason.InvalidMatcher, a, "InvalidMatcher Exception", "Invalid match object");
                    }
                }
            });
            return newArgs;
        };
        Object.defineProperty(MethodCall.prototype, "id", {
            get: function () { return this._id; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "callCount", {
            get: function () { return this._callCount; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "setupExpression", {
            get: function () { return this._setupExpression; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "setupCall", {
            get: function () { return this._setupCall; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "isVerifiable", {
            get: function () { return this._isVerifiable; },
            enumerable: true,
            configurable: true
        });
        MethodCall.prototype.evaluatedSuccessfully = function () {
            this._evaluatedSuccessfully = true;
        };
        // IProxyCall
        MethodCall.prototype.matches = function (call) {
            var match = false;
            if (this._setupCall.property && call && call.property &&
                this._setupCall.property.name === call.property.name) {
                if (this._setupCall.args.length === call.args.length) {
                    match = true;
                    _.each(this.setupCall.args, function (x, index) {
                        var setupArg = x;
                        var callArg = call.args[index];
                        if (match && !setupArg.___matches(callArg))
                            match = false;
                    });
                }
            }
            return match;
        };
        MethodCall.prototype.execute = function (call) {
            this.isInvoked = true;
            if (this._setupCallback != null) {
                this._setupCallback.apply(this, call.args);
            }
            if (this._thrownException != null) {
                throw this._thrownException;
            }
            this._callCount++;
            if (this._isOnce) {
                var times = TypeMoq.Times.atMostOnce();
                if (!times.verify(this._callCount)) {
                    throw new error.MockException(error.MockExceptionReason.MoreThanOneCall, this, "MoreThanOneCall Exception", times.failMessage);
                }
            }
            if (this._expectedCallCount) {
                var times = TypeMoq.Times.exactly(this._expectedCallCount);
                if (!times.verify(this._callCount)) {
                    throw new error.MockException(error.MockExceptionReason.MoreThanNCalls, this, "MoreThanNCalls Exception", times.failMessage);
                }
            }
        };
        // IThrowsResult
        MethodCall.prototype.verifiable = function (failMessage) {
            this._isVerifiable = true;
            if (failMessage != null)
                this.failMessage = failMessage;
        };
        return MethodCall;
    }());
    TypeMoq.MethodCall = MethodCall;
})(TypeMoq || (TypeMoq = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeMoq;
(function (TypeMoq) {
    var MethodCallReturn = (function (_super) {
        __extends(MethodCallReturn, _super);
        function MethodCallReturn(mock, setupExpression) {
            _super.call(this, mock, setupExpression);
        }
        // overrides
        MethodCallReturn.prototype.execute = function (call) {
            _super.prototype.execute.call(this, call);
            if (this._callBase)
                call.invokeBase();
            else if (this.hasReturnValue)
                call.returnValue = this._returnValueFunc.apply(this, call.args);
        };
        // ISetup
        MethodCallReturn.prototype.callback = function (action) {
            this._setupCallback = action;
            return this;
        };
        MethodCallReturn.prototype.throws = function (exception) {
            this._thrownException = exception;
            return this;
        };
        MethodCallReturn.prototype.returns = function (valueFunc) {
            this._returnValueFunc = valueFunc;
            this.hasReturnValue = true;
            return this;
        };
        MethodCallReturn.prototype.callBase = function () {
            this._callBase = true;
            return this;
        };
        return MethodCallReturn;
    }(TypeMoq.MethodCall));
    TypeMoq.MethodCallReturn = MethodCallReturn;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    (function (MockBehavior) {
        MockBehavior[MockBehavior["Loose"] = 0] = "Loose";
        MockBehavior[MockBehavior["Strict"] = 1] = "Strict";
    })(TypeMoq.MockBehavior || (TypeMoq.MockBehavior = {}));
    var MockBehavior = TypeMoq.MockBehavior;
    var Mock = (function () {
        function Mock(instance, _behavior) {
            if (_behavior === void 0) { _behavior = MockBehavior.Loose; }
            this.instance = instance;
            this._behavior = _behavior;
            this._id = this.generateId();
            this._name = this.getNameOf(instance);
            this._interceptor = new TypeMoq.InterceptorExecute(this._behavior, this);
            this._proxy = Mock.proxyFactory.createProxy(this._interceptor, instance);
        }
        Mock.ofInstance = function (instance, behavior) {
            if (behavior === void 0) { behavior = MockBehavior.Loose; }
            var mock = new Mock(instance, behavior);
            return mock;
        };
        Mock.ofType = function (ctor, behavior) {
            if (behavior === void 0) { behavior = MockBehavior.Loose; }
            var ctorArgs = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                ctorArgs[_i - 2] = arguments[_i];
            }
            var mock = Mock.ofType2(ctor, ctorArgs, behavior);
            return mock;
        };
        Mock.ofType2 = function (ctor, ctorArgs, behavior) {
            if (behavior === void 0) { behavior = MockBehavior.Loose; }
            var instance = TypeMoq.Utils.conthunktor(ctor, ctorArgs);
            var mock = new Mock(instance, behavior);
            return mock;
        };
        Object.defineProperty(Mock.prototype, "object", {
            get: function () { return this._proxy; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mock.prototype, "name", {
            get: function () { return this._name; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mock.prototype, "behavior", {
            get: function () { return this._behavior; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mock.prototype, "callBase", {
            get: function () { return this._callBase; },
            set: function (value) { this._callBase = value; },
            enumerable: true,
            configurable: true
        });
        Mock.prototype.generateId = function () {
            return "Mock<" + _.uniqueId() + ">";
        };
        Mock.prototype.getNameOf = function (instance) {
            var result;
            if (_.isFunction(instance)) {
                result = TypeMoq.Utils.functionName(instance);
            }
            else if (_.isObject(instance)) {
                var ctor = instance.constructor;
                result = TypeMoq.Utils.functionName(ctor);
            }
            if (result)
                result = result.trim();
            return result;
        };
        // setup
        Mock.prototype.setup = function (expression) {
            var call = new TypeMoq.MethodCallReturn(this, expression);
            this._interceptor.addCall(call);
            return call;
        };
        // verify
        Mock.prototype.verify = function (expression, times) {
            var call = new TypeMoq.MethodCall(this, expression);
            this._interceptor.addCall(call);
            try {
                this._interceptor.verifyCall(call, times);
            }
            catch (e) {
                throw e;
            }
        };
        Mock.prototype.verifyAll = function () {
            try {
                this._interceptor.verify();
            }
            catch (e) {
                throw e;
            }
        };
        Mock.proxyFactory = new TypeMoq.Proxy.ProxyFactory();
        return Mock;
    }());
    TypeMoq.Mock = Mock;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var Times = (function () {
        function Times(_condition, _from, _to, failMessage) {
            this._condition = _condition;
            this._from = _from;
            this._to = _to;
            this._failMessage = _.template(failMessage);
        }
        Object.defineProperty(Times.prototype, "failMessage", {
            get: function () { return this._failMessage({ n: this._from, m: this._lastCallCount }); },
            enumerable: true,
            configurable: true
        });
        Times.prototype.verify = function (callCount) {
            this._lastCallCount = callCount;
            return this._condition(callCount);
        };
        Times.exactly = function (n) {
            return new Times(function (c) { return c === n; }, n, n, Times.NO_MATCHING_CALLS_EXACTLY_N_TIMES);
        };
        Times.never = function () {
            return Times.exactly(0);
        };
        Times.once = function () {
            return Times.exactly(1);
        };
        Times.atLeastOnce = function () {
            return new Times(function (c) { return c >= 1; }, 1, Number.MAX_VALUE, Times.NO_MATCHING_CALLS_AT_LEAST_ONCE);
        };
        Times.atMostOnce = function () {
            return new Times(function (c) { return c >= 0 && c <= 1; }, 0, 1, Times.NO_MATCHING_CALLS_AT_MOST_ONCE);
        };
        Times.NO_MATCHING_CALLS_EXACTLY_N_TIMES = "Expected invocation on the mock <%= n %> times, invoked <%= m %> times";
        Times.NO_MATCHING_CALLS_AT_LEAST_ONCE = "Expected invocation on the mock at least once";
        Times.NO_MATCHING_CALLS_AT_MOST_ONCE = "Expected invocation on the mock at most once";
        return Times;
    }());
    TypeMoq.Times = Times;
})(TypeMoq || (TypeMoq = {}));


var error = TypeMoq.Error;
var match = TypeMoq.Match;
var proxy = TypeMoq.Proxy;


var TypeMoq;
(function (TypeMoq) {
    var GlobalScope = (function () {
        function GlobalScope(_args) {
            this._args = _args;
        }
        GlobalScope.using = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var scope = new GlobalScope(args);
            return scope;
        };
        GlobalScope.prototype.with = function (action) {
            var initial = [];
            try {
                _.each(this._args, function (a) {
                    if (!_.isUndefined(a.container[a.name])) {
                        var containerProps = TypeMoq.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(a.container);
                        var prop = _.find(containerProps, function (p) { return p.name === a.name; });
                        initial[a.name] = prop.desc;
                        var desc = {};
                        switch (a.type) {
                            case TypeMoq.GlobalType.Class:
                                //TODO: return a new mock every time with same interceptor as the one used by mock passed in as arg to 'using' 
                                //      (to support different ctor arguments)
                                desc.value = function () { return a.mock.object; };
                                break;
                            case TypeMoq.GlobalType.Function:
                                desc.value = a.mock.object;
                                break;
                            case TypeMoq.GlobalType.Value:
                                desc.get = function () { return a.mock.object; };
                                break;
                            default:
                                throw new error.MockException(error.MockExceptionReason.UnknownGlobalType, a, "UnknownGlobalType Exception", "unknown global type: " + a.type);
                        }
                        try {
                            Object.defineProperty(a.container, a.name, desc);
                        }
                        catch (e) {
                            console.log("1: " + e);
                        }
                    }
                });
                action.apply(this, this._args);
            }
            finally {
                _.each(this._args, function (a) {
                    if (!_.isUndefined(a.mock.instance)) {
                        var desc = initial[a.name];
                        if (desc) {
                            switch (a.type) {
                                case TypeMoq.GlobalType.Class:
                                    break;
                                case TypeMoq.GlobalType.Function:
                                    break;
                                case TypeMoq.GlobalType.Value:
                                    desc.configurable = true;
                                    break;
                                default:
                            }
                            try {
                                Object.defineProperty(a.container, a.name, desc);
                            }
                            catch (e) {
                                console.log("2: " + e);
                            }
                        }
                    }
                });
            }
        };
        return GlobalScope;
    }());
    TypeMoq.GlobalScope = GlobalScope;
})(TypeMoq || (TypeMoq = {}));


var TypeMoqStatic;
(function (TypeMoqStatic) {
    TypeMoqStatic.Mock = TypeMoq.Mock;
    TypeMoqStatic.MockBehavior = TypeMoq.MockBehavior;
    TypeMoqStatic.It = TypeMoq.It;
    TypeMoqStatic.Times = TypeMoq.Times;
    TypeMoqStatic.GlobalMock = TypeMoq.GlobalMock;
    TypeMoqStatic.GlobalScope = TypeMoq.GlobalScope;
    TypeMoqStatic.MockException = TypeMoq.Error.MockException;
})(TypeMoqStatic || (TypeMoqStatic = {}));
typemoq = TypeMoqStatic;


if (typeof require !== "undefined") {
    var _ = require("underscore");
}
if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = typemoq;
    }
    exports.typemoq = typemoq;
}
else {
    this.typemoq = typemoq;
}



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJDb25zdGFudHMudHMiLCJDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cyIsIkdsb2JhbE1vY2sudHMiLCJBcGkvSUNhbGxiYWNrLnRzIiwiQXBpL0lSZXR1cm5zLnRzIiwiQXBpL0lTZXR1cC50cyIsIkFwaS9JVGhyb3dzLnRzIiwiQXBpL0lVc2luZy50cyIsIkFwaS9JVmVyaWZpZXMudHMiLCJBcGkvX2FsbC50cyIsIkNvbW1vbi9DdG9yLnRzIiwiQ29tbW9uL0Z1bmMudHMiLCJDb21tb24vUHJvcGVydHlSZXRyaWV2ZXIudHMiLCJDb21tb24vVXRpbHMudHMiLCJDb21tb24vX2FsbC50cyIsIkVycm9yL0V4Y2VwdGlvbi50cyIsIkVycm9yL01vY2tFeGNlcHRpb24udHMiLCJFcnJvci9fYWxsLnRzIiwiTWF0Y2gvSU1hdGNoLnRzIiwiTWF0Y2gvTWF0Y2hBbnkudHMiLCJNYXRjaC9NYXRjaFZhbHVlLnRzIiwiTWF0Y2gvX2FsbC50cyIsIlByb3h5L0lDYWxsQ29udGV4dC50cyIsIlByb3h5L0lDYWxsSW50ZXJjZXB0b3IudHMiLCJQcm94eS9JbnZvY2F0aW9uLnRzIiwiUHJveHkvSVByb3h5Q2FsbC50cyIsIlByb3h5L0lQcm94eUZhY3RvcnkudHMiLCJQcm94eS9Qcm94eS50cyIsIlByb3h5L1Byb3h5RmFjdG9yeS50cyIsIlByb3h5L19hbGwudHMiLCJJR2xvYmFsTW9jay50cyIsIklNb2NrLnRzIiwiSW50ZXJjZXB0b3JDb250ZXh0LnRzIiwiSW50ZXJjZXB0b3JFeGVjdXRlLnRzIiwiSW50ZXJjZXB0b3JTZXR1cC50cyIsIkludGVyY2VwdG9yU3RyYXRlZ2llcy50cyIsIkl0LnRzIiwiTWV0aG9kQ2FsbC50cyIsIk1ldGhvZENhbGxSZXR1cm4udHMiLCJNb2NrLnRzIiwiVGltZXMudHMiLCJfYWxsLnRzIiwiR2xvYmFsU2NvcGUudHMiLCJfZXhwb3J0cy50cyIsIl9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGlu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QUFDLENBQUM7SUFDSixrQkFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDcEIsMEJBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQ3BDLGdCQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNoQixtQkFBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDdEIsd0JBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0lBQ2hDLHlCQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztJQUNsQywyQkFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQzlELENBQUMsRUFSTSxhQUFhLEtBQWIsYUFBYSxRQVFuQjtBQUdELE9BQU8sR0FBRyxhQUFhLENBQUM7OztBQ3ZCeEIsNEVBQTRFO0FBRTVFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQXFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUM5QixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbnMge1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfSURfVkFMVUUgPSBcIjQzOEE1MUQzLTY4NjQtNDlENy1BNjU1LUNBMTE1M0I4Njk2NVwiO1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfSURfTkFNRSA9IFwiX19faWRcIjtcclxuICAgICAgICBzdGF0aWMgSU1BVENIX01BVENIRVNfTkFNRSA9IFwiX19fbWF0Y2hlc1wiO1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4ge1xyXG4gICAgICAgIGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD47XHJcbiAgICB9XHJcblxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBHbG9iYWxUeXBlIHsgQ2xhc3MsIEZ1bmN0aW9uLCBWYWx1ZSB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbE1vY2s8VD4gaW1wbGVtZW50cyBJR2xvYmFsTW9jazxUPiB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX3R5cGU6IEdsb2JhbFR5cGUsIHB1YmxpYyBjb250YWluZXI6IE9iamVjdCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mSW5zdGFuY2U8VT4oaW5zdGFuY2U6IFUsIG5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgPyBHbG9iYWxUeXBlLkZ1bmN0aW9uIDogR2xvYmFsVHlwZS5WYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHbG9iYWxNb2NrKG1vY2ssIG5hbWUsIHR5cGUsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlPFU+KGN0b3I6IEN0b3I8VT4sIG5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgY3RvcigpO1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdsb2JhbE1vY2sobW9jaywgbmFtZSwgR2xvYmFsVHlwZS5DbGFzcywgY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLm1vY2sub2JqZWN0OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZSB8fCB0aGlzLm1vY2submFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMubW9jay5iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLm1vY2suY2FsbEJhc2U7IH1cclxuICAgICAgICBzZXQgY2FsbEJhc2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5tb2NrLmNhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblxyXG4gICAgICAgIC8vIHNldHVwXHJcblxyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2NrLnNldHVwKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vY2sudmVyaWZ5KGV4cHJlc3Npb24sIHRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrLnZlcmlmeUFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibW9kdWxlIFR5cGVNb3EuQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24pOiBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PjtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24xPFQ+KTogSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD47XHJcbiAgICB9XHJcbn0gICIsIm1vZHVsZSBUeXBlTW9xLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm5zKHZhbHVlRnVuY3Rpb246IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICAgICAgY2FsbEJhc2UoKTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Jlc3VsdDxUPiBleHRlbmRzIElWZXJpZmllcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiBleHRlbmRzIElSZXR1cm5zPFQsIFRSZXN1bHQ+LCBJVGhyb3dzIHtcclxuICAgIH1cclxufSAgICIsIm1vZHVsZSBUeXBlTW9xLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTZXR1cDxULCBUUmVzdWx0PiBleHRlbmRzIElDYWxsYmFjazxULCBUUmVzdWx0PiwgSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4sIElWZXJpZmllcyB7IH0gXHJcbn0iLCJtb2R1bGUgVHlwZU1vcS5BcGkge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93cyB7XHJcbiAgICAgICAgdGhyb3dzPFQgZXh0ZW5kcyBlcnJvci5FeGNlcHRpb24+KGV4Y2VwdGlvbjogVCk6IElUaHJvd3NSZXN1bHQ7XHJcblx0fVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93c1Jlc3VsdCBleHRlbmRzIElWZXJpZmllcyB7XHJcblx0fVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElVc2luZ1Jlc3VsdCB7XHJcbiAgICAgICAgd2l0aChhY3Rpb246IElBY3Rpb24pOiB2b2lkO1xyXG4gICAgfVxyXG59ICAgIiwibW9kdWxlIFR5cGVNb3EuQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZlcmlmaWVzIHtcclxuICAgICAgICB2ZXJpZmlhYmxlKGZhaWxNZXNzYWdlPzogc3RyaW5nKTogdm9pZDtcclxuICAgIH1cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUNhbGxiYWNrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJUmV0dXJucy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVNldHVwLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJVGhyb3dzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJVXNpbmcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lWZXJpZmllcy50cycgLz4gICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ3RvcjxUPiB7XHJcbiAgICAgICAgbmV3ICgpOiBUO1xyXG4gICAgICAgIHByb3RvdHlwZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ3RvcldpdGhBcmdzPFQ+IHtcclxuICAgICAgICBuZXcgKC4uLmN0b3JBcmdzOiBhbnlbXSk6IFQ7XHJcbiAgICAgICAgcHJvdG90eXBlO1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbiB7XHJcbiAgICAgICAgKCk6IHZvaWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBY3Rpb24xPFQ+IHtcclxuICAgICAgICAoeDogVCk6IHZvaWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBY3Rpb25OPFQ+IHtcclxuICAgICAgICAoLi4ueDogVFtdKTogdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGdW5jMTxUUmVzdWx0PiB7XHJcbiAgICAgICAgKCk6IFRSZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGdW5jMjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgKHg6IFQpOiBUUmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRnVuY048VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICguLi54OiBUW10pOiBUUmVzdWx0O1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVJldHJpZXZlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25FbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fZW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGNvdWxkIHVzZSBmb3IuLmluIGZpbHRlcmVkIHdpdGggaGFzT3duUHJvcGVydHkgb3IganVzdCB0aGlzOiByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25Ob25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fbm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBqdXN0IHVzZTogcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0UHJvdG90eXBlRW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldFByb3RvdHlwZU5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duQW5kUHJvdG90eXBlRW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGNvdWxkIHVzZSB1bmZpbHRlcmVkIGZvci4uaW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVOb25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIHRydWUsIHRoaXMuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFByaXZhdGUgc3RhdGljIHByb3BlcnR5IGNoZWNrZXIgY2FsbGJhY2tzXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2VudW1lcmFibGUob2JqLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbm90RW51bWVyYWJsZShvYmosIHByb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuICFvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUob2JqLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2dldFByb3BlcnR5TmFtZXMob2JqLCBpdGVyYXRlU2VsZkJvb2wsIGl0ZXJhdGVQcm90b3R5cGVCb29sLCBpbmNsdWRlUHJvcENiKTogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciB9PiB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgfT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVyYXRlU2VsZkJvb2wpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocHJvcHMsIHByb3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVwbGljYXRlID0gXy5maW5kKHJlc3VsdCwgcCA9PiBwLm5hbWUgPT09IHByb3ApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGUgJiYgaW5jbHVkZVByb3BDYihvYmosIHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IG5hbWU6IHByb3AsIGRlc2M6IHByb3BEZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVyYXRlUHJvdG90eXBlQm9vbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGl0ZXJhdGVTZWxmQm9vbCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVdGlscyB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRVVUlEKCkge1xyXG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBmdW5jdGlvbk5hbWUoZnVuKSB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBmdW4udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0ID0gcmV0LnN1YnN0cignZnVuY3Rpb24gJy5sZW5ndGgpO1xyXG4gICAgICAgICAgICByZXQgPSByZXQuc3Vic3RyKDAsIHJldC5pbmRleE9mKCcoJykpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNvbnRodW5rdG9yPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgYXJnczogYW55W10pOiBVIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgVGVtcCA9ICgpID0+IHsgfSwgaW5zdCwgcmV0O1xyXG4gICAgICAgICAgICAgICAgVGVtcC5wcm90b3R5cGUgPSBjdG9yLnByb3RvdHlwZTtcclxuICAgICAgICAgICAgICAgIGluc3QgPSBuZXcgVGVtcCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjdG9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBjdG9yLmFwcGx5KGluc3QsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNPYmplY3QocmV0KSA/IHJldCA6IGluc3Q7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0N0b3IudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0Z1bmMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3BlcnR5UmV0cmlldmVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdVdGlscy50cycgLz4iLCJtb2R1bGUgVHlwZU1vcS5FcnJvciB7XHJcbiAgICBleHBvcnQgY2xhc3MgRXhjZXB0aW9uIGltcGxlbWVudHMgRXJyb3Ige1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lPzogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgVHlwZU1vcS5FcnJvciB7XHJcbiAgICBleHBvcnQgZW51bSBNb2NrRXhjZXB0aW9uUmVhc29uIHtcclxuICAgICAgICBOb1NldHVwLFxyXG4gICAgICAgIE1vcmVUaGFuT25lU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgIEludmFsaWRTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgSW52YWxpZE1hdGNoZXIsXHJcbiAgICAgICAgSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgVW5rbm93bkdsb2JhbFR5cGUsXHJcbiAgICAgICAgVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgIE1vcmVUaGFuT25lQ2FsbCxcclxuICAgICAgICBNb3JlVGhhbk5DYWxsc1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1vY2tFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb24ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwdWJsaWMgcmVhc29uOiBNb2NrRXhjZXB0aW9uUmVhc29uLFxyXG4gICAgICAgICAgICBwdWJsaWMgY3R4OiBhbnksXHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZyA9ICdNb2NrIEV4Y2VwdGlvbicsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nRXhjZXB0aW9uLnRzJyAvPiBcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTW9ja0V4Y2VwdGlvbi50cycgLz4iLCJtb2R1bGUgVHlwZU1vcS5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWF0Y2gge1xyXG4gICAgICAgIF9fX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoQW55T2JqZWN0PFQ+IGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY3RvcjogQ3RvcjxUPikge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N0b3IucHJvdG90eXBlID09PSBvYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueSBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29ucy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueVN0cmluZyBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29ucy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoQW55TnVtYmVyIGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuTWF0Y2gge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaFZhbHVlPFQ+IGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmFsdWU6IFQpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRXF1YWwodGhpcy5fdmFsdWUsIG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJTWF0Y2gudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01hdGNoQW55LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaFZhbHVlLnRzJyAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgYXJnczogSUFyZ3VtZW50cztcclxuICAgICAgICBwcm9wZXJ0eTogSVByb3BlcnR5SW5mbztcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBpbnRlcmNlcHQoY29udGV4dDogSUNhbGxDb250ZXh0KTogdm9pZDtcclxuICAgIH1cclxufSAiLCJtb2R1bGUgVHlwZU1vcS5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kSW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IE1ldGhvZEluZm8sIHByaXZhdGUgX2FyZ3M/OiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3MgfHwgeyBsZW5ndGg6IDAsIGNhbGxlZTogbnVsbCB9OyB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgdGhpcy5fYXJncyA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuX3Byb3BlcnR5LnRvRnVuYy5hcHBseSh0aGlzLl9wcm9wZXJ0eS5vYmosIHRoaXMuX2FyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdldHRlckludm9jYXRpb24gaW1wbGVtZW50cyBJQ2FsbENvbnRleHQge1xyXG4gICAgICAgIHJldHVyblZhbHVlOiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb3BlcnR5OiBQcm9wZXJ0eUluZm8sIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMge1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXJncywgXCJjYWxsZWVcIixcclxuICAgICAgICAgICAgICAgIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogbnVsbCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+YXJncztcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgfVxyXG5cclxuICAgICAgICBnZXQgcHJvcGVydHkoKTogUHJvcGVydHlJbmZvIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnR5OyB9XHJcblxyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgcHJpdmF0ZSBfYXJnczogSUFyZ3VtZW50cykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGFyZ3MoKTogSUFyZ3VtZW50cyB7IHJldHVybiB0aGlzLl9hcmdzOyB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgdGhpcy5fYXJncyA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuX3Byb3BlcnR5Lm9ialt0aGlzLl9wcm9wZXJ0eS5uYW1lXSA9IHRoaXMuX2FyZ3NbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kSW5mbyBpbXBsZW1lbnRzIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IE9iamVjdCwgcHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgdG9GdW5jKCk6IEZ1bmN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmM6IEZ1bmN0aW9uO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMub2JqKSlcclxuICAgICAgICAgICAgICAgIGZ1bmMgPSA8RnVuY3Rpb24+dGhpcy5vYmo7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZ1bmMgPSB0aGlzLm9ialt0aGlzLm5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5SW5mbyBpbXBsZW1lbnRzIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IE9iamVjdCwgcHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIG9iajogT2JqZWN0O1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJveHlDYWxsPFQ+IHtcclxuICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgIGNhbGxDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIC8vaXNDb25kaXRpb25hbCgpOiBib29sZWFuO1xyXG4gICAgICAgIGZhaWxNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgaXNJbnZva2VkOiBib29sZWFuO1xyXG4gICAgICAgIGlzVmVyaWZpYWJsZTogYm9vbGVhbjtcclxuICAgICAgICBzZXR1cEV4cHJlc3Npb246IElBY3Rpb24xPFQ+O1xyXG4gICAgICAgIHNldHVwQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG4gICAgICAgIGV2YWx1YXRlZFN1Y2Nlc3NmdWxseSgpOiB2b2lkO1xyXG5cclxuICAgICAgICBtYXRjaGVzKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IGJvb2xlYW47XHJcbiAgICAgICAgZXhlY3V0ZShjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiB2b2lkO1xyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm94eUZhY3Rvcnkge1xyXG4gICAgICAgIGNyZWF0ZVByb3h5PFQ+KGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLCBpbnN0YW5jZTogVCk6IFQ7XHJcbiAgICB9XHJcbn0gICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgUHJveHk8VD4ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLCBpbnN0YW5jZTogVCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByb3BzID0gUHJvcGVydHlSZXRyaWV2ZXIuZ2V0T3duQW5kUHJvdG90eXBlRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIF8uZWFjaChwcm9wcywgcHJvcCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihwcm9wLmRlc2MudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogcHJvcC5kZXNjLmNvbmZpZ3VyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogcHJvcC5kZXNjLmVudW1lcmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBwcm9wLmRlc2Mud3JpdGFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVNZXRob2RQcm94eSh0aGF0LCBpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3AubmFtZSwgcHJvcERlc2MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogcHJvcC5kZXNjLmNvbmZpZ3VyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogcHJvcC5kZXNjLmVudW1lcmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVQcm9wZXJ0eVByb3h5KHRoYXQsIGludGVyY2VwdG9yLCBpbnN0YW5jZSwgcHJvcC5uYW1lLCBwcm9wLmRlc2MudmFsdWUsIHByb3BEZXNjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mPFU+KGluc3RhbmNlOiBVLCBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcikge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVjayhpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmdW5jTmFtZSA9IFV0aWxzLmZ1bmN0aW9uTmFtZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBQcm94eS5tZXRob2RQcm94eVZhbHVlKGludGVyY2VwdG9yLCBpbnN0YW5jZSwgZnVuY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFByb3h5KGludGVyY2VwdG9yLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjaGVjazxVPihpbnN0YW5jZTogVSk6IHZvaWQge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVja05vdE51bGwoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWxsb3cgb25seSBwcmltaXRpdmUgb2JqZWN0cyBhbmQgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgIHZhciBvayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSB8fFxyXG4gICAgICAgICAgICAgICAgKF8uaXNPYmplY3QoaW5zdGFuY2UpICYmICFQcm94eS5pc1ByaW1pdGl2ZU9iamVjdChpbnN0YW5jZSkpKVxyXG4gICAgICAgICAgICAgICAgb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCFvaylcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgc2hvdWxkIGJlIGEgZnVuY3Rpb24gb3IgYSBub24gcHJpbWl0aXZlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hlY2s8VT4oaW5zdGFuY2U6IFUpOiB2b2lkIHtcclxuICAgICAgICAgICAgUHJveHkuY2hlY2tOb3ROdWxsKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFsbG93IG9ubHkgbm9uIHByaW1pdGl2ZSBvYmplY3RzXHJcbiAgICAgICAgICAgIHZhciBvayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihpbnN0YW5jZSkgJiZcclxuICAgICAgICAgICAgICAgIChfLmlzT2JqZWN0KGluc3RhbmNlKSAmJiAhUHJveHkuaXNQcmltaXRpdmVPYmplY3QoaW5zdGFuY2UpKSlcclxuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb2spXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCBcIkludmFsaWRQcm94eUFyZ3VtZW50IEV4Y2VwdGlvblwiLCBcIkFyZ3VtZW50IHNob3VsZCBiZSBhIG5vbiBwcmltaXRpdmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tOb3ROdWxsPFU+KGluc3RhbmNlOiBVKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmIChfLmlzTnVsbChpbnN0YW5jZSkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCBcIkludmFsaWRQcm94eUFyZ3VtZW50IEV4Y2VwdGlvblwiLCBcIkFyZ3VtZW50IGNhbm5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaXNQcmltaXRpdmVPYmplY3Qob2JqOiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzQXJyYXkob2JqKSB8fFxyXG4gICAgICAgICAgICAgICAgXy5pc0RhdGUob2JqKSB8fFxyXG4gICAgICAgICAgICAgICAgXy5pc051bGwob2JqKSlcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmVNZXRob2RQcm94eShcclxuICAgICAgICAgICAgdGhhdDogT2JqZWN0LFxyXG4gICAgICAgICAgICBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcixcclxuICAgICAgICAgICAgaW5zdGFuY2U6IFQsXHJcbiAgICAgICAgICAgIHByb3BOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSB9KSB7XHJcblxyXG4gICAgICAgICAgICBwcm9wRGVzYy52YWx1ZSA9IFByb3h5Lm1ldGhvZFByb3h5VmFsdWUoaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wTmFtZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmluZVByb3BlcnR5KHRoYXQsIHByb3BOYW1lLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBtZXRob2RQcm94eVZhbHVlPFU+KFxyXG4gICAgICAgICAgICBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcixcclxuICAgICAgICAgICAgaW5zdGFuY2U6IFUsXHJcbiAgICAgICAgICAgIHByb3BOYW1lOiBzdHJpbmcpOiAoKSA9PiBhbnkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbmV3IE1ldGhvZEluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgTWV0aG9kSW52b2NhdGlvbihtZXRob2QsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJveHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZVByb3BlcnR5UHJveHkoXHJcbiAgICAgICAgICAgIHRoYXQ6IE9iamVjdCxcclxuICAgICAgICAgICAgaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgICAgIGluc3RhbmNlOiBULFxyXG4gICAgICAgICAgICBwcm9wTmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBwcm9wVmFsdWU6IGFueSxcclxuICAgICAgICAgICAgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQcm94eSgpOiBhbnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgR2V0dGVySW52b2NhdGlvbihtZXRob2QsIHByb3BWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5nZXQgPSBnZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFByb3h5KHY6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgU2V0dGVySW52b2NhdGlvbihtZXRob2QsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvcERlc2Muc2V0ID0gc2V0UHJveHk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmluZVByb3BlcnR5KHRoYXQsIHByb3BOYW1lLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZVByb3BlcnR5KG9iajogT2JqZWN0LCBuYW1lOiBzdHJpbmcsIGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgZGVzYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgUHJveHlGYWN0b3J5IGltcGxlbWVudHMgSVByb3h5RmFjdG9yeSB7XHJcbiAgICAgICAgY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBwcm94eTogVCA9IDxUPjxhbnk+IFByb3h5Lm9mKGluc3RhbmNlLCBpbnRlcmNlcHRvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm94eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbENvbnRleHQudHMnIC8+IFxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbEludGVyY2VwdG9yLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJbnZvY2F0aW9uLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJUHJveHlDYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJUHJveHlGYWN0b3J5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nUHJveHlGYWN0b3J5LnRzJyAvPiIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbE1vY2s8VD4gZXh0ZW5kcyBJTW9jazxUPiB7XHJcbiAgICAgICAgbW9jazogTW9jazxUPjtcclxuICAgICAgICB0eXBlOiBHbG9iYWxUeXBlO1xyXG4gICAgICAgIGNvbnRhaW5lcjogT2JqZWN0O1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vY2s8VD4ge1xyXG4gICAgICAgIG9iamVjdDogVDtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgYmVoYXZpb3I6IE1vY2tCZWhhdmlvcjtcclxuICAgICAgICBjYWxsQmFzZTogYm9vbGVhbjtcclxuICAgICAgICBzZXR1cDxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pOiBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+O1xyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQ7XHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcblx0ZXhwb3J0IGVudW0gSW50ZXJjZXB0aW9uQWN0aW9uIHsgQ29udGludWUsIFN0b3AgfVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblx0XHRoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LFx0Y3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sXHRsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb247XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JDb250ZXh0PFQ+IHtcclxuXHRcdHByaXZhdGUgX2FjdHVhbEludm9jYXRpb25zOiBBcnJheTxwcm94eS5JQ2FsbENvbnRleHQ+ID0gW107XHJcblx0XHRwcml2YXRlIF9vcmRlcmVkQ2FsbHM6IEFycmF5PHByb3h5LklQcm94eUNhbGw8VD4+ID0gW107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHVibGljIGJlaGF2aW9yOiBNb2NrQmVoYXZpb3IsIHB1YmxpYyBtb2NrOiBJTW9jazxUPikgeyB9XHJcblxyXG5cdFx0YWRkSW52b2NhdGlvbihpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHsgdGhpcy5fYWN0dWFsSW52b2NhdGlvbnMucHVzaChpbnZvY2F0aW9uKTsgfVxyXG5cdFx0YWN0dWFsSW52b2NhdGlvbnMoKSB7IHJldHVybiB0aGlzLl9hY3R1YWxJbnZvY2F0aW9uczsgfVxyXG5cdFx0Y2xlYXJJbnZvY2F0aW9ucygpIHsgdGhpcy5fYWN0dWFsSW52b2NhdGlvbnMgPSBbXTsgfVxyXG5cclxuXHRcdGFkZE9yZGVyZWRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pIHsgdGhpcy5fb3JkZXJlZENhbGxzLnB1c2goY2FsbCk7IH1cclxuXHRcdHJlbW92ZU9yZGVyZWRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pIHtcclxuXHRcdFx0Xy5maWx0ZXIodGhpcy5fb3JkZXJlZENhbGxzLCAoeDogcHJveHkuSVByb3h5Q2FsbDxUPikgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB4LmlkICE9PSBjYWxsLmlkO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdG9yZGVyZWRDYWxscygpIHsgcmV0dXJuIHRoaXMuX29yZGVyZWRDYWxsczsgfVxyXG5cdH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvckV4ZWN1dGU8VD4gaW1wbGVtZW50cyBQcm94eS5JQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRvckNvbnRleHQ6IEludGVyY2VwdG9yQ29udGV4dDxUPjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoYmVoYXZpb3I6IE1vY2tCZWhhdmlvciwgbW9jazogSU1vY2s8VD4pIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0ID0gbmV3IEludGVyY2VwdG9yQ29udGV4dChiZWhhdmlvciwgbW9jayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaW50ZXJjZXB0b3JDb250ZXh0KCk6IEludGVyY2VwdG9yQ29udGV4dDxUPiB7IHJldHVybiB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxDdHggPSBuZXcgQ3VycmVudEludGVyY2VwdENvbnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIF8uc29tZSh0aGlzLmludGVyY2VwdGlvblN0cmF0ZWdpZXMoKSwgKHN0cmF0ZWd5OiBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChJbnRlcmNlcHRpb25BY3Rpb24uU3RvcCA9PT0gc3RyYXRlZ3kuaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb24sIHRoaXMuaW50ZXJjZXB0b3JDb250ZXh0LCBsb2NhbEN0eCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0LmFkZE9yZGVyZWRDYWxsKGNhbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5Q2FsbDxULCBUUmVzdWx0PihjYWxsOiBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+LCB0aW1lczogVGltZXMpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGFjdHVhbENhbGxzOiBBcnJheTxwcm94eS5JQ2FsbENvbnRleHQ+ID0gdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0LmFjdHVhbEludm9jYXRpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FsbENvdW50ID0gXy5maWx0ZXIoYWN0dWFsQ2FsbHMsIGMgPT4gY2FsbC5tYXRjaGVzKGMpKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeShjYWxsQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRocm93VmVyaWZ5Q2FsbEV4Y2VwdGlvbihjYWxsLnNldHVwQ2FsbCwgdGltZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2ZXJpZnkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBvcmRlcmVkQ2FsbHM6IEFycmF5PHByb3h5LklQcm94eUNhbGw8VD4+ID0gdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0Lm9yZGVyZWRDYWxscygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZlcmlmaWFibGVzID0gXy5maWx0ZXIob3JkZXJlZENhbGxzLCBjID0+IGMuaXNWZXJpZmlhYmxlKTtcclxuICAgICAgICAgICAgdmFyIGludm9rZXMgPSBfLmZpbHRlcihvcmRlcmVkQ2FsbHMsIGMgPT4gYy5pc1ZlcmlmaWFibGUgJiYgYy5pc0ludm9rZWQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpbWVzID0gVGltZXMuZXhhY3RseSh2ZXJpZmlhYmxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeShpbnZva2VzLmxlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRocm93VmVyaWZ5RXhjZXB0aW9uKHZlcmlmaWFibGVzLCB0aW1lcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludGVyY2VwdGlvblN0cmF0ZWdpZXMoKTogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4ge1xyXG4gICAgICAgICAgICB2YXIgc3RyYXRlZ2llczogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4gPSBbXHJcbiAgICAgICAgICAgICAgICBuZXcgQWRkQWN0dWFsSW52b2NhdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEV4dHJhY3RQcm94eUNhbGwoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFeGVjdXRlQ2FsbCgpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEludm9rZUJhc2UoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBIYW5kbGVNb2NrUmVjdXJzaW9uKClcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmF0ZWdpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRocm93VmVyaWZ5Q2FsbEV4Y2VwdGlvbihjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQsIHRpbWVzOiBUaW1lcykge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgY2FsbCwgXCJWZXJpZnlDYWxsIEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRocm93VmVyaWZ5RXhjZXB0aW9uKGZhaWx1cmVzOiBwcm94eS5JUHJveHlDYWxsPFQ+W10sIHRpbWVzOiBUaW1lcykge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgZmFpbHVyZXMsIFwiVmVyaWZ5IEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JTZXR1cDxUPiBpbXBsZW1lbnRzIFByb3h5LklDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdGVkQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG5cclxuICAgICAgICBnZXQgaW50ZXJjZXB0ZWRDYWxsKCkgeyByZXR1cm4gdGhpcy5faW50ZXJjZXB0ZWRDYWxsOyB9XHJcblxyXG4gICAgICAgIGludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ludGVyY2VwdGVkQ2FsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Nb3JlVGhhbk9uZVNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uLCBcIk1vcmVUaGFuT25lU2V0dXBFeHByZXNzaW9uIEV4Y2VwdGlvblwiLCBcIlNldHVwIHNob3VsZCBjb250YWluIG9ubHkgb25lIGV4cHJlc3Npb25cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdGVkQ2FsbCA9IGludm9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFkZEFjdHVhbEludm9jYXRpb248VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgY3R4LmFkZEludm9jYXRpb24oaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFeHRyYWN0UHJveHlDYWxsPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciByZXZlcnNlZE9yZGVyZWRDYWxscyA9IGN0eC5vcmRlcmVkQ2FsbHMoKS5zbGljZSgpLnJldmVyc2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsQ3R4LmNhbGwgPSBfLmZpbmQocmV2ZXJzZWRPcmRlcmVkQ2FsbHMsIGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMubWF0Y2hlcyhpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYWxDdHguY2FsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbEN0eC5jYWxsLmV2YWx1YXRlZFN1Y2Nlc3NmdWxseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGN0eC5iZWhhdmlvciA9PSBNb2NrQmVoYXZpb3IuU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLk5vU2V0dXAsIGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRXhlY3V0ZUNhbGw8VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBwcml2YXRlIF9jdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPjtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRDYWxsID0gbG9jYWxDdHguY2FsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2FsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2FsbC5leGVjdXRlKGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5TdG9wO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludm9rZUJhc2U8VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgaWYgKGN0eC5tb2NrLmNhbGxCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZvY2F0aW9uLmludm9rZUJhc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uU3RvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSGFuZGxlTW9ja1JlY3Vyc2lvbjxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICAvL1RPRE86IFxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSXQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBpc1ZhbHVlPFQ+KHg6IFQpOiBUIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaFZhbHVlKHgpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55T2JqZWN0PFQ+KHg6IEN0b3I8VD4pOiBUIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueU9iamVjdCh4KTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueSgpOiBhbnkge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55KCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnlTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueVN0cmluZygpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55TnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlOdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kQ2FsbDxULCBUUmVzdWx0PiBpbXBsZW1lbnRzIHByb3h5LklQcm94eUNhbGw8VD4sIGFwaS5JVmVyaWZpZXMge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9jYWxsQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2V4cGVjdGVkQ2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9pc09uY2U6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9zZXR1cENhbGxiYWNrOiBJQWN0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBfc2V0dXBDYWxsOiBwcm94eS5JQ2FsbENvbnRleHQ7XHJcbiAgICAgICAgcHJvdGVjdGVkIF90aHJvd25FeGNlcHRpb246IGVycm9yLkV4Y2VwdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2lzVmVyaWZpYWJsZTogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2V2YWx1YXRlZFN1Y2Nlc3NmdWxseTogYm9vbGVhbjtcclxuICAgICAgICBmYWlsTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIGlzSW52b2tlZDogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG1vY2s6IE1vY2s8VD4sIHByaXZhdGUgX3NldHVwRXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW50ZXJjZXB0b3IgPSBuZXcgSW50ZXJjZXB0b3JTZXR1cCgpO1xyXG4gICAgICAgICAgICB2YXIgcHJveHkgPSBNb2NrLnByb3h5RmFjdG9yeS5jcmVhdGVQcm94eTxUPihpbnRlcmNlcHRvciwgbW9jay5pbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICBfc2V0dXBFeHByZXNzaW9uKHByb3h5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnRlcmNlcHRvci5pbnRlcmNlcHRlZENhbGwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpYyA9IGludGVyY2VwdG9yLmludGVyY2VwdGVkQ2FsbDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3QXJncyA9IHRoaXMudHJhbnNmb3JtVG9NYXRjaGVycyhpYy5hcmdzKTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdBcmdzLCBcImNhbGxlZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogaWMuYXJncy5jYWxsZWUgfSk7XHJcbiAgICAgICAgICAgICAgICBpYy5hcmdzID0gPElBcmd1bWVudHM+PGFueT5uZXdBcmdzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwQ2FsbCA9IGljO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwRXhwcmVzc2lvbiwgXCJJbnZhbGlkU2V0dXBFeHByZXNzaW9uIEV4Y2VwdGlvblwiLCBcIkludmFsaWQgc2V0dXAgZXhwcmVzc2lvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZUlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNZXRob2RDYWxsPFwiICsgXy51bmlxdWVJZCgpICsgXCI+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRyYW5zZm9ybVRvTWF0Y2hlcnMoYXJnczogSUFyZ3VtZW50cyk6IEFycmF5PG1hdGNoLklNYXRjaD4ge1xyXG4gICAgICAgICAgICB2YXIgbmV3QXJnczogQXJyYXk8bWF0Y2guSU1hdGNoPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgXy5lYWNoKGFyZ3MsIGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzT2JqZWN0KGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld0FyZyA9IG5ldyBtYXRjaC5NYXRjaFZhbHVlKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaChuZXdBcmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGFbQ29ucy5JTUFUQ0hfTUFUQ0hFU19OQU1FXSkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIV8uaXNVbmRlZmluZWQoYVtDb25zLklNQVRDSF9JRF9OQU1FXSkgJiYgYVtDb25zLklNQVRDSF9JRF9OQU1FXSA9PT0gQ29ucy5JTUFUQ0hfSURfVkFMVUUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QXJncy5wdXNoKDxtYXRjaC5JTWF0Y2g+YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRNYXRjaGVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYSwgXCJJbnZhbGlkTWF0Y2hlciBFeGNlcHRpb25cIiwgXCJJbnZhbGlkIG1hdGNoIG9iamVjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ld0FyZ3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcbiAgICAgICAgZ2V0IGNhbGxDb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY2FsbENvdW50OyB9XHJcbiAgICAgICAgZ2V0IHNldHVwRXhwcmVzc2lvbigpOiBJQWN0aW9uMTxUPiB7IHJldHVybiB0aGlzLl9zZXR1cEV4cHJlc3Npb247IH1cclxuICAgICAgICBnZXQgc2V0dXBDYWxsKCk6IHByb3h5LklDYWxsQ29udGV4dCB7IHJldHVybiB0aGlzLl9zZXR1cENhbGw7IH1cclxuICAgICAgICBnZXQgaXNWZXJpZmlhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNWZXJpZmlhYmxlOyB9XHJcblxyXG4gICAgICAgIGV2YWx1YXRlZFN1Y2Nlc3NmdWxseSgpIHtcclxuICAgICAgICAgICAgdGhpcy5fZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElQcm94eUNhbGxcclxuXHJcbiAgICAgICAgbWF0Y2hlcyhjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsLnByb3BlcnR5ICYmIGNhbGwgJiYgY2FsbC5wcm9wZXJ0eSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsLnByb3BlcnR5Lm5hbWUgPT09IGNhbGwucHJvcGVydHkubmFtZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXR1cENhbGwuYXJncy5sZW5ndGggPT09IGNhbGwuYXJncy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zZXR1cENhbGwuYXJncywgKHgsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzZXR1cEFyZyA9IDxtYXRjaC5JTWF0Y2g+eDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNhbGxBcmcgPSBjYWxsLmFyZ3NbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmICFzZXR1cEFyZy5fX19tYXRjaGVzKGNhbGxBcmcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4ZWN1dGUoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNJbnZva2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR1cENhbGxiYWNrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwQ2FsbGJhY2suYXBwbHkodGhpcywgY2FsbC5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rocm93bkV4Y2VwdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0aGlzLl90aHJvd25FeGNlcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzT25jZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzID0gVGltZXMuYXRNb3N0T25jZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGltZXMudmVyaWZ5KHRoaXMuX2NhbGxDb3VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLk1vcmVUaGFuT25lQ2FsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcywgXCJNb3JlVGhhbk9uZUNhbGwgRXhjZXB0aW9uXCIsIHRpbWVzLmZhaWxNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2V4cGVjdGVkQ2FsbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZXMgPSBUaW1lcy5leGFjdGx5KHRoaXMuX2V4cGVjdGVkQ2FsbENvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeSh0aGlzLl9jYWxsQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Nb3JlVGhhbk5DYWxscyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcywgXCJNb3JlVGhhbk5DYWxscyBFeGNlcHRpb25cIiwgdGltZXMuZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJVGhyb3dzUmVzdWx0XHJcblxyXG4gICAgICAgIHZlcmlmaWFibGUoZmFpbE1lc3NhZ2U/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5faXNWZXJpZmlhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGZhaWxNZXNzYWdlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmZhaWxNZXNzYWdlID0gZmFpbE1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+IGV4dGVuZHMgTWV0aG9kQ2FsbDxULCBUUmVzdWx0PiBpbXBsZW1lbnRzIGFwaS5JU2V0dXA8VCwgVFJlc3VsdD4sIGFwaS5JUmV0dXJuc1Jlc3VsdDxUPiB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfcmV0dXJuVmFsdWVGdW5jOiBJRnVuY048YW55LCBUUmVzdWx0PjtcclxuICAgICAgICBoYXNSZXR1cm5WYWx1ZTogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2NhbGxCYXNlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihtb2NrOiBNb2NrPFQ+LCBzZXR1cEV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pikge1xyXG4gICAgICAgICAgICBzdXBlcihtb2NrLCBzZXR1cEV4cHJlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb3ZlcnJpZGVzXHJcblxyXG4gICAgICAgIGV4ZWN1dGUoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmV4ZWN1dGUoY2FsbCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fY2FsbEJhc2UpXHJcbiAgICAgICAgICAgICAgICBjYWxsLmludm9rZUJhc2UoKTtcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmhhc1JldHVyblZhbHVlKVxyXG4gICAgICAgICAgICAgICAgY2FsbC5yZXR1cm5WYWx1ZSA9IHRoaXMuX3JldHVyblZhbHVlRnVuYy5hcHBseSh0aGlzLCBjYWxsLmFyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVNldHVwXHJcblxyXG4gICAgICAgIGNhbGxiYWNrKGFjdGlvbjogSUFjdGlvbk48YW55Pik6IGFwaS5JUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NldHVwQ2FsbGJhY2sgPSBhY3Rpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3dzKGV4Y2VwdGlvbjogRXJyb3IpOiBhcGkuSVRocm93c1Jlc3VsdCB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Rocm93bkV4Y2VwdGlvbiA9IGV4Y2VwdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm5zKHZhbHVlRnVuYzogSUZ1bmNOPGFueSwgVFJlc3VsdD4pOiBhcGkuSVJldHVybnNSZXN1bHQ8VD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXR1cm5WYWx1ZUZ1bmMgPSB2YWx1ZUZ1bmM7XHJcbiAgICAgICAgICAgIHRoaXMuaGFzUmV0dXJuVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGxCYXNlKCk6IGFwaS5JUmV0dXJuc1Jlc3VsdDxUPiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxCYXNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJUmV0dXJuc1Jlc3VsdFxyXG5cclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBlbnVtIE1vY2tCZWhhdmlvciB7IExvb3NlLCBTdHJpY3QgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNb2NrPFQ+IGltcGxlbWVudHMgSU1vY2s8VD4ge1xyXG5cclxuICAgICAgICBzdGF0aWMgcHJveHlGYWN0b3J5OiBwcm94eS5JUHJveHlGYWN0b3J5ID0gbmV3IFR5cGVNb3EuUHJveHkuUHJveHlGYWN0b3J5KCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdG9yOiBJbnRlcmNlcHRvckV4ZWN1dGU8VD47XHJcbiAgICAgICAgcHJpdmF0ZSBfcHJveHk6IFQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfY2FsbEJhc2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpbnN0YW5jZTogVCwgcHJpdmF0ZSBfYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHRoaXMuZ2V0TmFtZU9mKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IgPSBuZXcgSW50ZXJjZXB0b3JFeGVjdXRlKHRoaXMuX2JlaGF2aW9yLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJveHkgPSBNb2NrLnByb3h5RmFjdG9yeS5jcmVhdGVQcm94eTxUPih0aGlzLl9pbnRlcmNlcHRvciwgaW5zdGFuY2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mSW5zdGFuY2U8VT4oaW5zdGFuY2U6IFUsIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKTogTW9jazxVPiB7XHJcbiAgICAgICAgICAgIHZhciBtb2NrID0gbmV3IE1vY2soaW5zdGFuY2UsIGJlaGF2aW9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UsIC4uLmN0b3JBcmdzOiBhbnlbXSk6IE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgbW9jazogTW9jazxVPiA9IE1vY2sub2ZUeXBlMihjdG9yLCBjdG9yQXJncywgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9jaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZlR5cGUyPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgY3RvckFyZ3M6IGFueVtdLCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2U6IFUgPSBVdGlscy5jb250aHVua3RvcihjdG9yLCBjdG9yQXJncyk7XHJcbiAgICAgICAgICAgIHZhciBtb2NrOiBNb2NrPFU+ID0gbmV3IE1vY2soaW5zdGFuY2UsIGJlaGF2aW9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgb2JqZWN0KCkgeyByZXR1cm4gdGhpcy5fcHJveHk7IH1cclxuXHJcbiAgICAgICAgZ2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLl9uYW1lOyB9XHJcbiAgICAgICAgZ2V0IGJlaGF2aW9yKCkgeyByZXR1cm4gdGhpcy5fYmVoYXZpb3I7IH1cclxuXHJcbiAgICAgICAgZ2V0IGNhbGxCYXNlKCkgeyByZXR1cm4gdGhpcy5fY2FsbEJhc2U7IH1cclxuICAgICAgICBzZXQgY2FsbEJhc2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5fY2FsbEJhc2UgPSB2YWx1ZTsgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdlbmVyYXRlSWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk1vY2s8XCIgKyBfLnVuaXF1ZUlkKCkgKyBcIj5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2V0TmFtZU9mKGluc3RhbmNlOiBUKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogc3RyaW5nO1xyXG5cclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFV0aWxzLmZ1bmN0aW9uTmFtZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoXy5pc09iamVjdChpbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdG9yID0gaW5zdGFuY2UuY29uc3RydWN0b3I7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBVdGlscy5mdW5jdGlvbk5hbWUoY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldHVwXHJcblxyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICB2YXIgY2FsbCA9IG5ldyBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+KHRoaXMsIGV4cHJlc3Npb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci5hZGRDYWxsKGNhbGwpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHZlcmlmeVxyXG5cclxuICAgICAgICB2ZXJpZnk8VFJlc3VsdD4oZXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+LCB0aW1lczogVGltZXMpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGNhbGwgPSBuZXcgTWV0aG9kQ2FsbDxULCBUUmVzdWx0Pih0aGlzLCBleHByZXNzaW9uKTtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IuYWRkQ2FsbChjYWxsKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLnZlcmlmeUNhbGwoY2FsbCwgdGltZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2ZXJpZnlBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci52ZXJpZnkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59IiwibW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBUaW1lcyB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIE5PX01BVENISU5HX0NBTExTX0VYQUNUTFlfTl9USU1FUyA9IFwiRXhwZWN0ZWQgaW52b2NhdGlvbiBvbiB0aGUgbW9jayA8JT0gbiAlPiB0aW1lcywgaW52b2tlZCA8JT0gbSAlPiB0aW1lc1wiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIE5PX01BVENISU5HX0NBTExTX0FUX0xFQVNUX09OQ0UgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgYXQgbGVhc3Qgb25jZVwiO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIE5PX01BVENISU5HX0NBTExTX0FUX01PU1RfT05DRSA9IFwiRXhwZWN0ZWQgaW52b2NhdGlvbiBvbiB0aGUgbW9jayBhdCBtb3N0IG9uY2VcIjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfbGFzdENhbGxDb3VudDtcclxuICAgICAgICBwcml2YXRlIF9mYWlsTWVzc2FnZTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29uZGl0aW9uOiBJRnVuYzI8bnVtYmVyLCBib29sZWFuPixcclxuICAgICAgICAgICAgcHJpdmF0ZSBfZnJvbTogbnVtYmVyLFxyXG4gICAgICAgICAgICBwcml2YXRlIF90bzogbnVtYmVyLFxyXG4gICAgICAgICAgICBmYWlsTWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZhaWxNZXNzYWdlID0gXy50ZW1wbGF0ZShmYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgZmFpbE1lc3NhZ2UoKSB7IHJldHVybiB0aGlzLl9mYWlsTWVzc2FnZSh7IG46IHRoaXMuX2Zyb20sIG06IHRoaXMuX2xhc3RDYWxsQ291bnQgfSk7IH1cclxuXHJcbiAgICAgICAgdmVyaWZ5KGNhbGxDb3VudDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xhc3RDYWxsQ291bnQgPSBjYWxsQ291bnQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25kaXRpb24oY2FsbENvdW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBleGFjdGx5KG46IG51bWJlcik6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lcyhjID0+IGMgPT09IG4sIG4sIG4sIFRpbWVzLk5PX01BVENISU5HX0NBTExTX0VYQUNUTFlfTl9USU1FUyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgbmV2ZXIoKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gVGltZXMuZXhhY3RseSgwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvbmNlKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbWVzLmV4YWN0bHkoMSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgYXRMZWFzdE9uY2UoKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzKGMgPT4gYyA+PSAxLCAxLCBOdW1iZXIuTUFYX1ZBTFVFLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19BVF9MRUFTVF9PTkNFKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBhdE1vc3RPbmNlKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lcyhjID0+IGMgPj0gMCAmJiBjIDw9IDEsIDAsIDEsIFRpbWVzLk5PX01BVENISU5HX0NBTExTX0FUX01PU1RfT05DRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC91bmRlcnNjb3JlL3VuZGVyc2NvcmUuZC50cycgLz4gXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdBcGkvX2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQ29tbW9uL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0Vycm9yL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01hdGNoL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3h5L19hbGwudHMnIC8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdDb25zdGFudHMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0N1cnJlbnRJbnRlcmNlcHRDb250ZXh0LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdHbG9iYWxNb2NrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdHbG9iYWxTY29wZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUdsb2JhbE1vY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lNb2NrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJbnRlcmNlcHRvckNvbnRleHQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludGVyY2VwdG9yRXhlY3V0ZS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSW50ZXJjZXB0b3JTZXR1cC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSW50ZXJjZXB0b3JTdHJhdGVnaWVzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJdC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTWV0aG9kQ2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTWV0aG9kQ2FsbFJldHVybi50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTW9jay50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nVGltZXMudHMnIC8+XHJcblxyXG5pbXBvcnQgYXBpICAgICA9IFR5cGVNb3EuQXBpO1xyXG5pbXBvcnQgZXJyb3IgICA9IFR5cGVNb3EuRXJyb3I7XHJcbmltcG9ydCBtYXRjaCAgID0gVHlwZU1vcS5NYXRjaDtcclxuaW1wb3J0IHByb3h5ICAgPSBUeXBlTW9xLlByb3h5OyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbFNjb3BlIGltcGxlbWVudHMgYXBpLklVc2luZ1Jlc3VsdCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FyZ3M6IElHbG9iYWxNb2NrPGFueT5bXSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHVzaW5nKC4uLmFyZ3M6IElHbG9iYWxNb2NrPGFueT5bXSk6IGFwaS5JVXNpbmdSZXN1bHQge1xyXG4gICAgICAgICAgICB2YXIgc2NvcGUgPSBuZXcgR2xvYmFsU2NvcGUoYXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY29wZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpdGgoYWN0aW9uOiBJQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBpbml0aWFsOiBBcnJheTxQcm9wZXJ0eURlc2NyaXB0b3I+ID0gW107XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuX2FyZ3MsIGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoYS5jb250YWluZXJbYS5uYW1lXSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJQcm9wcyA9IFByb3BlcnR5UmV0cmlldmVyLmdldE93bkFuZFByb3RvdHlwZUVudW1lcmFibGVzQW5kTm9uZW51bWVyYWJsZXMoYS5jb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcCA9IF8uZmluZChjb250YWluZXJQcm9wcywgcCA9PiBwLm5hbWUgPT09IGEubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsW2EubmFtZV0gPSBwcm9wLmRlc2M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGEudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5DbGFzczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJldHVybiBhIG5ldyBtb2NrIGV2ZXJ5IHRpbWUgd2l0aCBzYW1lIGludGVyY2VwdG9yIGFzIHRoZSBvbmUgdXNlZCBieSBtb2NrIHBhc3NlZCBpbiBhcyBhcmcgdG8gJ3VzaW5nJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICh0byBzdXBwb3J0IGRpZmZlcmVudCBjdG9yIGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlID0gKCkgPT4gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuRnVuY3Rpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy52YWx1ZSA9IGEubW9jay5vYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLlZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MuZ2V0ID0gKCkgPT4gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVW5rbm93bkdsb2JhbFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEsIFwiVW5rbm93bkdsb2JhbFR5cGUgRXhjZXB0aW9uXCIsIFwidW5rbm93biBnbG9iYWwgdHlwZTogXCIgKyBhLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEuY29udGFpbmVyLCBhLm5hbWUsIGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjE6IFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24uYXBwbHkodGhpcywgdGhpcy5fYXJncyk7XHJcblxyXG4gICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuX2FyZ3MsIGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChhLm1vY2suaW5zdGFuY2UpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0gaW5pdGlhbFthLm5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGEudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuQ2xhc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuRnVuY3Rpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuVmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MuY29uZmlndXJhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYS5jb250YWluZXIsIGEubmFtZSwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIyOiBcIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5pbnRlcmZhY2UgSVR5cGVNb3FTdGF0aWMge1xyXG4gICAgTW9jazogdHlwZW9mIFR5cGVNb3EuTW9jaztcclxuICAgIE1vY2tCZWhhdmlvcjogdHlwZW9mIFR5cGVNb3EuTW9ja0JlaGF2aW9yO1xyXG4gICAgSXQ6IHR5cGVvZiBUeXBlTW9xLkl0O1xyXG4gICAgVGltZXM6IHR5cGVvZiBUeXBlTW9xLlRpbWVzO1xyXG4gICAgR2xvYmFsTW9jazogdHlwZW9mIFR5cGVNb3EuR2xvYmFsTW9jaztcclxuICAgIEdsb2JhbFNjb3BlOiB0eXBlb2YgVHlwZU1vcS5HbG9iYWxTY29wZTtcclxuICAgIE1vY2tFeGNlcHRpb246IHR5cGVvZiBUeXBlTW9xLkVycm9yLk1vY2tFeGNlcHRpb247XHJcbn1cclxuXHJcbm1vZHVsZSBUeXBlTW9xU3RhdGljIHtcclxuICAgIGV4cG9ydCBpbXBvcnQgTW9jayA9IFR5cGVNb3EuTW9jaztcclxuICAgIGV4cG9ydCBpbXBvcnQgTW9ja0JlaGF2aW9yID0gVHlwZU1vcS5Nb2NrQmVoYXZpb3I7XHJcbiAgICBleHBvcnQgaW1wb3J0IEl0ID0gVHlwZU1vcS5JdDtcclxuICAgIGV4cG9ydCBpbXBvcnQgVGltZXMgPSBUeXBlTW9xLlRpbWVzO1xyXG4gICAgZXhwb3J0IGltcG9ydCBHbG9iYWxNb2NrID0gVHlwZU1vcS5HbG9iYWxNb2NrO1xyXG4gICAgZXhwb3J0IGltcG9ydCBHbG9iYWxTY29wZSA9IFR5cGVNb3EuR2xvYmFsU2NvcGU7XHJcbiAgICBleHBvcnQgaW1wb3J0IE1vY2tFeGNlcHRpb24gPSBUeXBlTW9xLkVycm9yLk1vY2tFeGNlcHRpb247XHJcbn1cclxuXHJcbmRlY2xhcmUgdmFyIHR5cGVtb3E6IElUeXBlTW9xU3RhdGljO1xyXG50eXBlbW9xID0gVHlwZU1vcVN0YXRpYzsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9ub2RlL25vZGUuZC50cycgLz4gXHJcblxyXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHZhciBfOiBVbmRlcnNjb3JlU3RhdGljID0gcmVxdWlyZShcInVuZGVyc2NvcmVcIik7XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlbW9xO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0cy50eXBlbW9xID0gdHlwZW1vcTtcclxufSBlbHNlIHtcclxuICAgIHRoaXMudHlwZW1vcSA9IHR5cGVtb3E7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
