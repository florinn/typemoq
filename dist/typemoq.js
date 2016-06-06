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
            var orderedCalls = ctx.orderedCalls().slice();
            var findCallPred = function (c) { return c.matches(invocation); };
            var matchingCalls = _.filter(orderedCalls, function (c) {
                return findCallPred(c);
            });
            if (matchingCalls.length > 1)
                findCallPred = function (c) { return !c.isInvoked &&
                    c.matches(invocation); };
            localCtx.call = _.find(orderedCalls, function (c) {
                return findCallPred(c);
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJDb25zdGFudHMudHMiLCJDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cyIsIkdsb2JhbE1vY2sudHMiLCJBcGkvSUNhbGxiYWNrLnRzIiwiQXBpL0lSZXR1cm5zLnRzIiwiQXBpL0lTZXR1cC50cyIsIkFwaS9JVGhyb3dzLnRzIiwiQXBpL0lVc2luZy50cyIsIkFwaS9JVmVyaWZpZXMudHMiLCJBcGkvX2FsbC50cyIsIkNvbW1vbi9DdG9yLnRzIiwiQ29tbW9uL0Z1bmMudHMiLCJDb21tb24vUHJvcGVydHlSZXRyaWV2ZXIudHMiLCJDb21tb24vVXRpbHMudHMiLCJDb21tb24vX2FsbC50cyIsIkVycm9yL0V4Y2VwdGlvbi50cyIsIkVycm9yL01vY2tFeGNlcHRpb24udHMiLCJFcnJvci9fYWxsLnRzIiwiTWF0Y2gvSU1hdGNoLnRzIiwiTWF0Y2gvTWF0Y2hBbnkudHMiLCJNYXRjaC9NYXRjaFZhbHVlLnRzIiwiTWF0Y2gvX2FsbC50cyIsIlByb3h5L0lDYWxsQ29udGV4dC50cyIsIlByb3h5L0lDYWxsSW50ZXJjZXB0b3IudHMiLCJQcm94eS9JbnZvY2F0aW9uLnRzIiwiUHJveHkvSVByb3h5Q2FsbC50cyIsIlByb3h5L0lQcm94eUZhY3RvcnkudHMiLCJQcm94eS9Qcm94eS50cyIsIlByb3h5L1Byb3h5RmFjdG9yeS50cyIsIlByb3h5L19hbGwudHMiLCJJR2xvYmFsTW9jay50cyIsIklNb2NrLnRzIiwiSW50ZXJjZXB0b3JDb250ZXh0LnRzIiwiSW50ZXJjZXB0b3JFeGVjdXRlLnRzIiwiSW50ZXJjZXB0b3JTZXR1cC50cyIsIkludGVyY2VwdG9yU3RyYXRlZ2llcy50cyIsIkl0LnRzIiwiTWV0aG9kQ2FsbC50cyIsIk1ldGhvZENhbGxSZXR1cm4udHMiLCJNb2NrLnRzIiwiVGltZXMudHMiLCJfYWxsLnRzIiwiR2xvYmFsU2NvcGUudHMiLCJfZXhwb3J0cy50cyIsIl9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGlu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TyxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdkMsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzlCLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgVHlwZU1vcSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29ucyB7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9WQUxVRSA9IFwiNDM4QTUxRDMtNjg2NC00OUQ3LUE2NTUtQ0ExMTUzQjg2OTY1XCI7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9OQU1FID0gXCJfX19pZFwiO1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfTUFUQ0hFU19OQU1FID0gXCJfX19tYXRjaGVzXCI7XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPiB7XHJcbiAgICAgICAgY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPjtcclxuICAgIH1cclxuXHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBlbnVtIEdsb2JhbFR5cGUgeyBDbGFzcywgRnVuY3Rpb24sIFZhbHVlIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2xvYmFsTW9jazxUPiBpbXBsZW1lbnRzIElHbG9iYWxNb2NrPFQ+IHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG1vY2s6IE1vY2s8VD4sIHByaXZhdGUgX25hbWU6IHN0cmluZywgcHJpdmF0ZSBfdHlwZTogR2xvYmFsVHlwZSwgcHVibGljIGNvbnRhaW5lcjogT2JqZWN0KSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZJbnN0YW5jZTxVPihpbnN0YW5jZTogVSwgbmFtZT86IHN0cmluZywgY29udGFpbmVyOiBPYmplY3QgPSB3aW5kb3csIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKTogR2xvYmFsTW9jazxVPiB7XHJcbiAgICAgICAgICAgIHZhciBtb2NrID0gTW9jay5vZkluc3RhbmNlKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSA/IEdsb2JhbFR5cGUuRnVuY3Rpb24gOiBHbG9iYWxUeXBlLlZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdsb2JhbE1vY2sobW9jaywgbmFtZSwgdHlwZSwgY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZlR5cGU8VT4oY3RvcjogQ3RvcjxVPiwgbmFtZT86IHN0cmluZywgY29udGFpbmVyOiBPYmplY3QgPSB3aW5kb3csIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKTogR2xvYmFsTW9jazxVPiB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBjdG9yKCk7XHJcbiAgICAgICAgICAgIHZhciBtb2NrID0gTW9jay5vZkluc3RhbmNlKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR2xvYmFsTW9jayhtb2NrLCBuYW1lLCBHbG9iYWxUeXBlLkNsYXNzLCBjb250YWluZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IG9iamVjdCgpIHsgcmV0dXJuIHRoaXMubW9jay5vYmplY3Q7IH1cclxuXHJcbiAgICAgICAgZ2V0IG5hbWUoKSB7IHJldHVybiB0aGlzLl9uYW1lIHx8IHRoaXMubW9jay5uYW1lOyB9XHJcbiAgICAgICAgZ2V0IGJlaGF2aW9yKCkgeyByZXR1cm4gdGhpcy5tb2NrLmJlaGF2aW9yOyB9XHJcblxyXG4gICAgICAgIGdldCBjYWxsQmFzZSgpIHsgcmV0dXJuIHRoaXMubW9jay5jYWxsQmFzZTsgfVxyXG4gICAgICAgIHNldCBjYWxsQmFzZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLm1vY2suY2FsbEJhc2UgPSB2YWx1ZTsgfVxyXG5cclxuICAgICAgICBnZXQgdHlwZSgpIHsgcmV0dXJuIHRoaXMuX3R5cGU7IH1cclxuXHJcbiAgICAgICAgLy8gc2V0dXBcclxuXHJcbiAgICAgICAgc2V0dXA8VFJlc3VsdD4oZXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KTogTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vY2suc2V0dXAoZXhwcmVzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2ZXJpZnlcclxuXHJcbiAgICAgICAgdmVyaWZ5PFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0PiwgdGltZXM6IFRpbWVzKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubW9jay52ZXJpZnkoZXhwcmVzc2lvbiwgdGltZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vY2sudmVyaWZ5QWxsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCJtb2R1bGUgVHlwZU1vcS5BcGkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ2FsbGJhY2s8VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgIGNhbGxiYWNrKGFjdGlvbjogSUFjdGlvbik6IElSZXR1cm5zVGhyb3dzPFQsIFRSZXN1bHQ+O1xyXG4gICAgICAgIGNhbGxiYWNrKGFjdGlvbjogSUFjdGlvbjE8VD4pOiBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PjtcclxuICAgIH1cclxufSAgIiwibW9kdWxlIFR5cGVNb3EuQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVJldHVybnM8VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgIHJldHVybnModmFsdWVGdW5jdGlvbjogSUZ1bmNOPGFueSwgVFJlc3VsdD4pOiBJUmV0dXJuc1Jlc3VsdDxUPjtcclxuICAgICAgICBjYWxsQmFzZSgpOiBJUmV0dXJuc1Jlc3VsdDxUPjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zUmVzdWx0PFQ+IGV4dGVuZHMgSVZlcmlmaWVzIHtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zVGhyb3dzPFQsIFRSZXN1bHQ+IGV4dGVuZHMgSVJldHVybnM8VCwgVFJlc3VsdD4sIElUaHJvd3Mge1xyXG4gICAgfVxyXG59ICAgIiwibW9kdWxlIFR5cGVNb3EuQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVNldHVwPFQsIFRSZXN1bHQ+IGV4dGVuZHMgSUNhbGxiYWNrPFQsIFRSZXN1bHQ+LCBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiwgSVZlcmlmaWVzIHsgfSBcclxufSIsIm1vZHVsZSBUeXBlTW9xLkFwaSB7XHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVGhyb3dzIHtcclxuICAgICAgICB0aHJvd3M8VCBleHRlbmRzIGVycm9yLkV4Y2VwdGlvbj4oZXhjZXB0aW9uOiBUKTogSVRocm93c1Jlc3VsdDtcclxuXHR9XHJcblx0ZXhwb3J0IGludGVyZmFjZSBJVGhyb3dzUmVzdWx0IGV4dGVuZHMgSVZlcmlmaWVzIHtcclxuXHR9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3EuQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVVzaW5nUmVzdWx0IHtcclxuICAgICAgICB3aXRoKGFjdGlvbjogSUFjdGlvbik6IHZvaWQ7XHJcbiAgICB9XHJcbn0gICAiLCJtb2R1bGUgVHlwZU1vcS5BcGkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVmVyaWZpZXMge1xyXG4gICAgICAgIHZlcmlmaWFibGUoZmFpbE1lc3NhZ2U/OiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgfVxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbGJhY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lSZXR1cm5zLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJU2V0dXAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lUaHJvd3MudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lVc2luZy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVZlcmlmaWVzLnRzJyAvPiAgIiwibW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBDdG9yPFQ+IHtcclxuICAgICAgICBuZXcgKCk6IFQ7XHJcbiAgICAgICAgcHJvdG90eXBlO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBDdG9yV2l0aEFyZ3M8VD4ge1xyXG4gICAgICAgIG5ldyAoLi4uY3RvckFyZ3M6IGFueVtdKTogVDtcclxuICAgICAgICBwcm90b3R5cGU7XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQWN0aW9uIHtcclxuICAgICAgICAoKTogdm9pZDtcclxuICAgIH1cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbjE8VD4ge1xyXG4gICAgICAgICh4OiBUKTogdm9pZDtcclxuICAgIH1cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbk48VD4ge1xyXG4gICAgICAgICguLi54OiBUW10pOiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUZ1bmMxPFRSZXN1bHQ+IHtcclxuICAgICAgICAoKTogVFJlc3VsdDtcclxuICAgIH1cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUZ1bmMyPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICAoeDogVCk6IFRSZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGdW5jTjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgKC4uLng6IFRbXSk6IFRSZXN1bHQ7XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5UmV0cmlldmVyIHtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldE93bkVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIGZhbHNlLCB0aGlzLl9lbnVtZXJhYmxlKTtcclxuICAgICAgICAgICAgLy8gT3IgY291bGQgdXNlIGZvci4uaW4gZmlsdGVyZWQgd2l0aCBoYXNPd25Qcm9wZXJ0eSBvciBqdXN0IHRoaXM6IHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldE93bk5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIGZhbHNlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25FbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIGZhbHNlLCB0aGlzLl9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGp1c3QgdXNlOiByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCBmYWxzZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0UHJvdG90eXBlTm9uZW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX25vdEVudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldFByb3RvdHlwZUVudW1lcmFibGVzQW5kTm9uZW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCB0cnVlLCB0aGlzLl9lbnVtZXJhYmxlKTtcclxuICAgICAgICAgICAgLy8gT3IgY291bGQgdXNlIHVuZmlsdGVyZWQgZm9yLi5pblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldE93bkFuZFByb3RvdHlwZU5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIHRydWUsIHRoaXMuX25vdEVudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldE93bkFuZFByb3RvdHlwZUVudW1lcmFibGVzQW5kTm9uZW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUHJpdmF0ZSBzdGF0aWMgcHJvcGVydHkgY2hlY2tlciBjYWxsYmFja3NcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZW51bWVyYWJsZShvYmosIHByb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZShwcm9wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9ub3RFbnVtZXJhYmxlKG9iaiwgcHJvcCkge1xyXG4gICAgICAgICAgICByZXR1cm4gIW9iai5wcm9wZXJ0eUlzRW51bWVyYWJsZShwcm9wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZShvYmosIHByb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZ2V0UHJvcGVydHlOYW1lcyhvYmosIGl0ZXJhdGVTZWxmQm9vbCwgaXRlcmF0ZVByb3RvdHlwZUJvb2wsIGluY2x1ZGVQcm9wQ2IpOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yIH0+IHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciB9PiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhdGVTZWxmQm9vbCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChwcm9wcywgcHJvcCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdXBsaWNhdGUgPSBfLmZpbmQocmVzdWx0LCBwID0+IHAubmFtZSA9PT0gcHJvcCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWR1cGxpY2F0ZSAmJiBpbmNsdWRlUHJvcENiKG9iaiwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBwcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgbmFtZTogcHJvcCwgZGVzYzogcHJvcERlc2MgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZXJhdGVQcm90b3R5cGVCb29sKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaXRlcmF0ZVNlbGZCb29sID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIH0gd2hpbGUgKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSAiLCJtb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldFVVSUQoKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHZhciB1dWlkID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSAoZCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7XHJcbiAgICAgICAgICAgICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB1dWlkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGZ1bmN0aW9uTmFtZShmdW4pIHtcclxuICAgICAgICAgICAgdmFyIHJldCA9IGZ1bi50b1N0cmluZygpO1xyXG4gICAgICAgICAgICByZXQgPSByZXQuc3Vic3RyKCdmdW5jdGlvbiAnLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJldCA9IHJldC5zdWJzdHIoMCwgcmV0LmluZGV4T2YoJygnKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgY29udGh1bmt0b3I8VT4oY3RvcjogQ3RvcldpdGhBcmdzPFU+LCBhcmdzOiBhbnlbXSk6IFUge1xyXG4gICAgICAgICAgICByZXR1cm4gKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBUZW1wID0gKCkgPT4geyB9LCBpbnN0LCByZXQ7XHJcbiAgICAgICAgICAgICAgICBUZW1wLnByb3RvdHlwZSA9IGN0b3IucHJvdG90eXBlO1xyXG4gICAgICAgICAgICAgICAgaW5zdCA9IG5ldyBUZW1wKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGN0b3IpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGN0b3IuYXBwbHkoaW5zdCwgYXJncyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5pc09iamVjdChyZXQpID8gcmV0IDogaW5zdDtcclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nQ3Rvci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nRnVuYy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nUHJvcGVydHlSZXRyaWV2ZXIudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1V0aWxzLnRzJyAvPiIsIm1vZHVsZSBUeXBlTW9xLkVycm9yIHtcclxuICAgIGV4cG9ydCBjbGFzcyBFeGNlcHRpb24gaW1wbGVtZW50cyBFcnJvciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG5hbWU/OiBzdHJpbmcsIHB1YmxpYyBtZXNzYWdlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b1N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBUeXBlTW9xLkVycm9yIHtcclxuICAgIGV4cG9ydCBlbnVtIE1vY2tFeGNlcHRpb25SZWFzb24ge1xyXG4gICAgICAgIE5vU2V0dXAsXHJcbiAgICAgICAgTW9yZVRoYW5PbmVTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgSW52YWxpZFNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICBJbnZhbGlkTWF0Y2hlcixcclxuICAgICAgICBJbnZhbGlkUHJveHlBcmd1bWVudCxcclxuICAgICAgICBVbmtub3duR2xvYmFsVHlwZSxcclxuICAgICAgICBWZXJpZmljYXRpb25GYWlsZWQsXHJcbiAgICAgICAgTW9yZVRoYW5PbmVDYWxsLFxyXG4gICAgICAgIE1vcmVUaGFuTkNhbGxzXHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTW9ja0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFzb246IE1vY2tFeGNlcHRpb25SZWFzb24sXHJcbiAgICAgICAgICAgIHB1YmxpYyBjdHg6IGFueSxcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nID0gJ01vY2sgRXhjZXB0aW9uJyxcclxuICAgICAgICAgICAgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdFeGNlcHRpb24udHMnIC8+IFxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNb2NrRXhjZXB0aW9uLnRzJyAvPiIsIm1vZHVsZSBUeXBlTW9xLk1hdGNoIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElNYXRjaCB7XHJcbiAgICAgICAgX19faWQ6IHN0cmluZztcclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLk1hdGNoIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnlPYmplY3Q8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnMuSU1BVENIX0lEX1ZBTFVFO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jdG9yOiBDdG9yPFQ+KSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY3Rvci5wcm90b3R5cGUgPT09IG9iamVjdC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoQW55IGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoQW55U3RyaW5nIGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcob2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnlOdW1iZXIgaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnMuSU1BVENIX0lEX1ZBTFVFO1xyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc051bWJlcihvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoVmFsdWU8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnMuSU1BVENIX0lEX1ZBTFVFO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF92YWx1ZTogVCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNFcXVhbCh0aGlzLl92YWx1ZSwgb2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lNYXRjaC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTWF0Y2hBbnkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01hdGNoVmFsdWUudHMnIC8+IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICBhcmdzOiBJQXJndW1lbnRzO1xyXG4gICAgICAgIHByb3BlcnR5OiBJUHJvcGVydHlJbmZvO1xyXG4gICAgICAgIHJldHVyblZhbHVlOiBhbnk7XHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkO1xyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIGludGVyY2VwdChjb250ZXh0OiBJQ2FsbENvbnRleHQpOiB2b2lkO1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogTWV0aG9kSW5mbywgcHJpdmF0ZSBfYXJncz86IElBcmd1bWVudHMpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMgeyByZXR1cm4gdGhpcy5fYXJncyB8fCB7IGxlbmd0aDogMCwgY2FsbGVlOiBudWxsIH07IH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB0aGlzLl9hcmdzID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5fcHJvcGVydHkudG9GdW5jLmFwcGx5KHRoaXMuX3Byb3BlcnR5Lm9iaiwgdGhpcy5fYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGFyZ3MoKTogSUFyZ3VtZW50cyB7XHJcbiAgICAgICAgICAgIHZhciBhcmdzID0gW107XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcmdzLCBcImNhbGxlZVwiLFxyXG4gICAgICAgICAgICAgICAgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBudWxsIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5hcmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTZXR0ZXJJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHlJbmZvLCBwcml2YXRlIF9hcmdzOiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3M7IH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB0aGlzLl9hcmdzID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5fcHJvcGVydHkub2JqW3RoaXMuX3Byb3BlcnR5Lm5hbWVdID0gdGhpcy5fYXJnc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RJbmZvIGltcGxlbWVudHMgSVByb3BlcnR5SW5mbyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG9iajogT2JqZWN0LCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCB0b0Z1bmMoKTogRnVuY3Rpb24ge1xyXG4gICAgICAgICAgICB2YXIgZnVuYzogRnVuY3Rpb247XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5vYmopKVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IDxGdW5jdGlvbj50aGlzLm9iajtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IHRoaXMub2JqW3RoaXMubmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUHJvcGVydHlJbmZvIGltcGxlbWVudHMgSVByb3BlcnR5SW5mbyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG9iajogT2JqZWN0LCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb3BlcnR5SW5mbyB7XHJcbiAgICAgICAgb2JqOiBPYmplY3Q7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcS5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm94eUNhbGw8VD4ge1xyXG4gICAgICAgIGlkOiBzdHJpbmc7XHJcbiAgICAgICAgY2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgLy9pc0NvbmRpdGlvbmFsKCk6IGJvb2xlYW47XHJcbiAgICAgICAgZmFpbE1lc3NhZ2U6IHN0cmluZztcclxuICAgICAgICBpc0ludm9rZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgaXNWZXJpZmlhYmxlOiBib29sZWFuO1xyXG4gICAgICAgIHNldHVwRXhwcmVzc2lvbjogSUFjdGlvbjE8VD47XHJcbiAgICAgICAgc2V0dXBDYWxsOiBwcm94eS5JQ2FsbENvbnRleHQ7XHJcbiAgICAgICAgZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIG1hdGNoZXMoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogYm9vbGVhbjtcclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb3h5RmFjdG9yeSB7XHJcbiAgICAgICAgY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKTogVDtcclxuICAgIH1cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm94eTxUPiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2soaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICB2YXIgcHJvcHMgPSBQcm9wZXJ0eVJldHJpZXZlci5nZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgXy5lYWNoKHByb3BzLCBwcm9wID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHByb3AuZGVzYy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBwcm9wLmRlc2MuY29uZmlndXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBwcm9wLmRlc2MuZW51bWVyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHByb3AuZGVzYy53cml0YWJsZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZU1ldGhvZFByb3h5KHRoYXQsIGludGVyY2VwdG9yLCBpbnN0YW5jZSwgcHJvcC5uYW1lLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBwcm9wLmRlc2MuY29uZmlndXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBwcm9wLmRlc2MuZW51bWVyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZVByb3BlcnR5UHJveHkodGhhdCwgaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wLm5hbWUsIHByb3AuZGVzYy52YWx1ZSwgcHJvcERlc2MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2Y8VT4oaW5zdGFuY2U6IFUsIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yKSB7XHJcbiAgICAgICAgICAgIFByb3h5LmNoZWNrKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZ1bmNOYW1lID0gVXRpbHMuZnVuY3Rpb25OYW1lKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFByb3h5Lm1ldGhvZFByb3h5VmFsdWUoaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBmdW5jTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgUHJveHkoaW50ZXJjZXB0b3IsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNoZWNrPFU+KGluc3RhbmNlOiBVKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFByb3h5LmNoZWNrTm90TnVsbChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhbGxvdyBvbmx5IHByaW1pdGl2ZSBvYmplY3RzIGFuZCBmdW5jdGlvbnNcclxuICAgICAgICAgICAgdmFyIG9rID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpIHx8XHJcbiAgICAgICAgICAgICAgICAoXy5pc09iamVjdChpbnN0YW5jZSkgJiYgIVByb3h5LmlzUHJpbWl0aXZlT2JqZWN0KGluc3RhbmNlKSkpXHJcbiAgICAgICAgICAgICAgICBvayA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIW9rKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmd1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgXCJJbnZhbGlkUHJveHlBcmd1bWVudCBFeGNlcHRpb25cIiwgXCJBcmd1bWVudCBzaG91bGQgYmUgYSBmdW5jdGlvbiBvciBhIG5vbiBwcmltaXRpdmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjaGVjazxVPihpbnN0YW5jZTogVSk6IHZvaWQge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVja05vdE51bGwoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWxsb3cgb25seSBub24gcHJpbWl0aXZlIG9iamVjdHNcclxuICAgICAgICAgICAgdmFyIG9rID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSAmJlxyXG4gICAgICAgICAgICAgICAgKF8uaXNPYmplY3QoaW5zdGFuY2UpICYmICFQcm94eS5pc1ByaW1pdGl2ZU9iamVjdChpbnN0YW5jZSkpKVxyXG4gICAgICAgICAgICAgICAgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvaylcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgc2hvdWxkIGJlIGEgbm9uIHByaW1pdGl2ZSBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjaGVja05vdE51bGw8VT4oaW5zdGFuY2U6IFUpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKF8uaXNOdWxsKGluc3RhbmNlKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpc1ByaW1pdGl2ZU9iamVjdChvYmo6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9iaikgfHxcclxuICAgICAgICAgICAgICAgIF8uaXNBcnJheShvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzRGF0ZShvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzTnVsbChvYmopKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZU1ldGhvZFByb3h5KFxyXG4gICAgICAgICAgICB0aGF0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVCxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlIH0pIHtcclxuXHJcbiAgICAgICAgICAgIHByb3BEZXNjLnZhbHVlID0gUHJveHkubWV0aG9kUHJveHlWYWx1ZShpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG1ldGhvZFByb3h5VmFsdWU8VT4oXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVSxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyk6ICgpID0+IGFueSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBuZXcgTWV0aG9kSW5mbyhpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGludm9jYXRpb246IElDYWxsQ29udGV4dCA9IG5ldyBNZXRob2RJbnZvY2F0aW9uKG1ldGhvZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnZvY2F0aW9uLnJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm94eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lUHJvcGVydHlQcm94eShcclxuICAgICAgICAgICAgdGhhdDogT2JqZWN0LFxyXG4gICAgICAgICAgICBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcixcclxuICAgICAgICAgICAgaW5zdGFuY2U6IFQsXHJcbiAgICAgICAgICAgIHByb3BOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHByb3BWYWx1ZTogYW55LFxyXG4gICAgICAgICAgICBwcm9wRGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0geyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlIH0pIHtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFByb3h5KCk6IGFueSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbmV3IFByb3BlcnR5SW5mbyhpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGludm9jYXRpb246IElDYWxsQ29udGV4dCA9IG5ldyBHZXR0ZXJJbnZvY2F0aW9uKG1ldGhvZCwgcHJvcFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnZvY2F0aW9uLnJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb3BEZXNjLmdldCA9IGdldFByb3h5O1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0UHJveHkodjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbmV3IFByb3BlcnR5SW5mbyhpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGludm9jYXRpb246IElDYWxsQ29udGV4dCA9IG5ldyBTZXR0ZXJJbnZvY2F0aW9uKG1ldGhvZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5zZXQgPSBzZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lUHJvcGVydHkob2JqOiBPYmplY3QsIG5hbWU6IHN0cmluZywgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm94eUZhY3RvcnkgaW1wbGVtZW50cyBJUHJveHlGYWN0b3J5IHtcclxuICAgICAgICBjcmVhdGVQcm94eTxUPihpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvciwgaW5zdGFuY2U6IFQpOiBUIHtcclxuICAgICAgICAgICAgdmFyIHByb3h5OiBUID0gPFQ+PGFueT4gUHJveHkub2YoaW5zdGFuY2UsIGludGVyY2VwdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lDYWxsQ29udGV4dC50cycgLz4gXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lDYWxsSW50ZXJjZXB0b3IudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludm9jYXRpb24udHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lQcm94eUNhbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lQcm94eUZhY3RvcnkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3h5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eUZhY3RvcnkudHMnIC8+IiwibW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsTW9jazxUPiBleHRlbmRzIElNb2NrPFQ+IHtcclxuICAgICAgICBtb2NrOiBNb2NrPFQ+O1xyXG4gICAgICAgIHR5cGU6IEdsb2JhbFR5cGU7XHJcbiAgICAgICAgY29udGFpbmVyOiBPYmplY3Q7XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTW9jazxUPiB7XHJcbiAgICAgICAgb2JqZWN0OiBUO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBiZWhhdmlvcjogTW9ja0JlaGF2aW9yO1xyXG4gICAgICAgIGNhbGxCYXNlOiBib29sZWFuO1xyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD47XHJcbiAgICAgICAgdmVyaWZ5PFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0PiwgdGltZXM6IFRpbWVzKTogdm9pZDtcclxuICAgICAgICB2ZXJpZnlBbGwoKTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuXHRleHBvcnQgZW51bSBJbnRlcmNlcHRpb25BY3Rpb24geyBDb250aW51ZSwgU3RvcCB9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHRcdGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsXHRjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPixcdGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvckNvbnRleHQ8VD4ge1xyXG5cdFx0cHJpdmF0ZSBfYWN0dWFsSW52b2NhdGlvbnM6IEFycmF5PHByb3h5LklDYWxsQ29udGV4dD4gPSBbXTtcclxuXHRcdHByaXZhdGUgX29yZGVyZWRDYWxsczogQXJyYXk8cHJveHkuSVByb3h5Q2FsbDxUPj4gPSBbXTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihwdWJsaWMgYmVoYXZpb3I6IE1vY2tCZWhhdmlvciwgcHVibGljIG1vY2s6IElNb2NrPFQ+KSB7IH1cclxuXHJcblx0XHRhZGRJbnZvY2F0aW9uKGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCkgeyB0aGlzLl9hY3R1YWxJbnZvY2F0aW9ucy5wdXNoKGludm9jYXRpb24pOyB9XHJcblx0XHRhY3R1YWxJbnZvY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMuX2FjdHVhbEludm9jYXRpb25zOyB9XHJcblx0XHRjbGVhckludm9jYXRpb25zKCkgeyB0aGlzLl9hY3R1YWxJbnZvY2F0aW9ucyA9IFtdOyB9XHJcblxyXG5cdFx0YWRkT3JkZXJlZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPikgeyB0aGlzLl9vcmRlcmVkQ2FsbHMucHVzaChjYWxsKTsgfVxyXG5cdFx0cmVtb3ZlT3JkZXJlZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPikge1xyXG5cdFx0XHRfLmZpbHRlcih0aGlzLl9vcmRlcmVkQ2FsbHMsICh4OiBwcm94eS5JUHJveHlDYWxsPFQ+KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHguaWQgIT09IGNhbGwuaWQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0b3JkZXJlZENhbGxzKCkgeyByZXR1cm4gdGhpcy5fb3JkZXJlZENhbGxzOyB9XHJcblx0fVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyY2VwdG9yRXhlY3V0ZTxUPiBpbXBsZW1lbnRzIFByb3h5LklDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdG9yQ29udGV4dDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihiZWhhdmlvcjogTW9ja0JlaGF2aW9yLCBtb2NrOiBJTW9jazxUPikge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQgPSBuZXcgSW50ZXJjZXB0b3JDb250ZXh0KGJlaGF2aW9yLCBtb2NrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpbnRlcmNlcHRvckNvbnRleHQoKTogSW50ZXJjZXB0b3JDb250ZXh0PFQ+IHsgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9yQ29udGV4dDsgfVxyXG5cclxuICAgICAgICBpbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBsb2NhbEN0eCA9IG5ldyBDdXJyZW50SW50ZXJjZXB0Q29udGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgXy5zb21lKHRoaXMuaW50ZXJjZXB0aW9uU3RyYXRlZ2llcygpLCAoc3RyYXRlZ3k6IElJbnRlcmNlcHRTdHJhdGVneTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKEludGVyY2VwdGlvbkFjdGlvbi5TdG9wID09PSBzdHJhdGVneS5oYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbiwgdGhpcy5pbnRlcmNlcHRvckNvbnRleHQsIGxvY2FsQ3R4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQuYWRkT3JkZXJlZENhbGwoY2FsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2ZXJpZnlDYWxsPFQsIFRSZXN1bHQ+KGNhbGw6IE1ldGhvZENhbGw8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgYWN0dWFsQ2FsbHM6IEFycmF5PHByb3h5LklDYWxsQ29udGV4dD4gPSB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQuYWN0dWFsSW52b2NhdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYWxsQ291bnQgPSBfLmZpbHRlcihhY3R1YWxDYWxscywgYyA9PiBjYWxsLm1hdGNoZXMoYykpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGltZXMudmVyaWZ5KGNhbGxDb3VudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhyb3dWZXJpZnlDYWxsRXhjZXB0aW9uKGNhbGwuc2V0dXBDYWxsLCB0aW1lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIG9yZGVyZWRDYWxsczogQXJyYXk8cHJveHkuSVByb3h5Q2FsbDxUPj4gPSB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQub3JkZXJlZENhbGxzKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdmVyaWZpYWJsZXMgPSBfLmZpbHRlcihvcmRlcmVkQ2FsbHMsIGMgPT4gYy5pc1ZlcmlmaWFibGUpO1xyXG4gICAgICAgICAgICB2YXIgaW52b2tlcyA9IF8uZmlsdGVyKG9yZGVyZWRDYWxscywgYyA9PiBjLmlzVmVyaWZpYWJsZSAmJiBjLmlzSW52b2tlZCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGltZXMgPSBUaW1lcy5leGFjdGx5KHZlcmlmaWFibGVzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGlmICghdGltZXMudmVyaWZ5KGludm9rZXMubGVuZ3RoKSlcclxuICAgICAgICAgICAgICAgIHRoaXMudGhyb3dWZXJpZnlFeGNlcHRpb24odmVyaWZpYWJsZXMsIHRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW50ZXJjZXB0aW9uU3RyYXRlZ2llcygpOiBfLkxpc3Q8SUludGVyY2VwdFN0cmF0ZWd5PFQ+PiB7XHJcbiAgICAgICAgICAgIHZhciBzdHJhdGVnaWVzOiBfLkxpc3Q8SUludGVyY2VwdFN0cmF0ZWd5PFQ+PiA9IFtcclxuICAgICAgICAgICAgICAgIG5ldyBBZGRBY3R1YWxJbnZvY2F0aW9uKCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRXh0cmFjdFByb3h5Q2FsbCgpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEV4ZWN1dGVDYWxsKCksXHJcbiAgICAgICAgICAgICAgICBuZXcgSW52b2tlQmFzZSgpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEhhbmRsZU1vY2tSZWN1cnNpb24oKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICByZXR1cm4gc3RyYXRlZ2llcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGhyb3dWZXJpZnlDYWxsRXhjZXB0aW9uKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCwgdGltZXM6IFRpbWVzKSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5WZXJpZmljYXRpb25GYWlsZWQsXHJcbiAgICAgICAgICAgICAgICBjYWxsLCBcIlZlcmlmeUNhbGwgRXhjZXB0aW9uXCIsIHRpbWVzLmZhaWxNZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdGhyb3dWZXJpZnlFeGNlcHRpb24oZmFpbHVyZXM6IHByb3h5LklQcm94eUNhbGw8VD5bXSwgdGltZXM6IFRpbWVzKSB7XHJcbiAgICAgICAgICAgIHZhciBlID0gbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5WZXJpZmljYXRpb25GYWlsZWQsXHJcbiAgICAgICAgICAgICAgICBmYWlsdXJlcywgXCJWZXJpZnkgRXhjZXB0aW9uXCIsIHRpbWVzLmZhaWxNZXNzYWdlKTtcclxuICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvclNldHVwPFQ+IGltcGxlbWVudHMgUHJveHkuSUNhbGxJbnRlcmNlcHRvciB7XHJcbiAgICAgICAgcHJpdmF0ZSBfaW50ZXJjZXB0ZWRDYWxsOiBwcm94eS5JQ2FsbENvbnRleHQ7XHJcblxyXG4gICAgICAgIGdldCBpbnRlcmNlcHRlZENhbGwoKSB7IHJldHVybiB0aGlzLl9pbnRlcmNlcHRlZENhbGw7IH1cclxuXHJcbiAgICAgICAgaW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faW50ZXJjZXB0ZWRDYWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLk1vcmVUaGFuT25lU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGludm9jYXRpb24sIFwiTW9yZVRoYW5PbmVTZXR1cEV4cHJlc3Npb24gRXhjZXB0aW9uXCIsIFwiU2V0dXAgc2hvdWxkIGNvbnRhaW4gb25seSBvbmUgZXhwcmVzc2lvblwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0ZWRDYWxsID0gaW52b2NhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQWRkQWN0dWFsSW52b2NhdGlvbjxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICBjdHguYWRkSW52b2NhdGlvbihpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEV4dHJhY3RQcm94eUNhbGw8VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIG9yZGVyZWRDYWxscyA9IGN0eC5vcmRlcmVkQ2FsbHMoKS5zbGljZSgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpbmRDYWxsUHJlZCA9IGMgPT4gYy5tYXRjaGVzKGludm9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgdmFyIG1hdGNoaW5nQ2FsbHMgPSBfLmZpbHRlcihvcmRlcmVkQ2FsbHMsIGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRDYWxsUHJlZChjKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdDYWxscy5sZW5ndGggPiAxKSAgIC8vIHJlY29yZC9yZXBsYXkgc2NlbmFyaW8gXHJcbiAgICAgICAgICAgICAgICBmaW5kQ2FsbFByZWQgPSBjID0+ICFjLmlzSW52b2tlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGMubWF0Y2hlcyhpbnZvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsQ3R4LmNhbGwgPSBfLmZpbmQob3JkZXJlZENhbGxzLCBjID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kQ2FsbFByZWQoYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2FsQ3R4LmNhbGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxDdHguY2FsbC5ldmFsdWF0ZWRTdWNjZXNzZnVsbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjdHguYmVoYXZpb3IgPT0gTW9ja0JlaGF2aW9yLlN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Ob1NldHVwLCBpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEV4ZWN1dGVDYWxsPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD47XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICB0aGlzLl9jdHggPSBjdHg7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2FsbCA9IGxvY2FsQ3R4LmNhbGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudENhbGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENhbGwuZXhlY3V0ZShpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uU3RvcDtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnZva2VCYXNlPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIGlmIChjdHgubW9jay5jYWxsQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbi5pbnZva2VCYXNlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLlN0b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEhhbmRsZU1vY2tSZWN1cnNpb248VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgLy9UT0RPOiBcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEl0IHtcclxuICAgICAgICBcclxuICAgICAgICBzdGF0aWMgaXNWYWx1ZTxUPih4OiBUKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hWYWx1ZSh4KTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueU9iamVjdDxUPih4OiBDdG9yPFQ+KTogVCB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlPYmplY3QoeCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnkoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55U3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlTdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueU51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55TnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCJtb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZENhbGw8VCwgVFJlc3VsdD4gaW1wbGVtZW50cyBwcm94eS5JUHJveHlDYWxsPFQ+LCBhcGkuSVZlcmlmaWVzIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBfY2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9leHBlY3RlZENhbGxDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByb3RlY3RlZCBfaXNPbmNlOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfc2V0dXBDYWxsYmFjazogSUFjdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX3NldHVwQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG4gICAgICAgIHByb3RlY3RlZCBfdGhyb3duRXhjZXB0aW9uOiBlcnJvci5FeGNlcHRpb247XHJcbiAgICAgICAgcHJvdGVjdGVkIF9pc1ZlcmlmaWFibGU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9ldmFsdWF0ZWRTdWNjZXNzZnVsbHk6IGJvb2xlYW47XHJcbiAgICAgICAgZmFpbE1lc3NhZ2U6IHN0cmluZztcclxuICAgICAgICBpc0ludm9rZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9zZXR1cEV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pikge1xyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGludGVyY2VwdG9yID0gbmV3IEludGVyY2VwdG9yU2V0dXAoKTtcclxuICAgICAgICAgICAgdmFyIHByb3h5ID0gTW9jay5wcm94eUZhY3RvcnkuY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3IsIG1vY2suaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgX3NldHVwRXhwcmVzc2lvbihwcm94eSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW50ZXJjZXB0b3IuaW50ZXJjZXB0ZWRDYWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWMgPSBpbnRlcmNlcHRvci5pbnRlcmNlcHRlZENhbGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0FyZ3MgPSB0aGlzLnRyYW5zZm9ybVRvTWF0Y2hlcnMoaWMuYXJncyk7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3QXJncywgXCJjYWxsZWVcIixcclxuICAgICAgICAgICAgICAgICAgICB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IGljLmFyZ3MuY2FsbGVlIH0pO1xyXG4gICAgICAgICAgICAgICAgaWMuYXJncyA9IDxJQXJndW1lbnRzPjxhbnk+bmV3QXJncztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGwgPSBpYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cEV4cHJlc3Npb24sIFwiSW52YWxpZFNldHVwRXhwcmVzc2lvbiBFeGNlcHRpb25cIiwgXCJJbnZhbGlkIHNldHVwIGV4cHJlc3Npb25cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdGVJZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTWV0aG9kQ2FsbDxcIiArIF8udW5pcXVlSWQoKSArIFwiPlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2Zvcm1Ub01hdGNoZXJzKGFyZ3M6IElBcmd1bWVudHMpOiBBcnJheTxtYXRjaC5JTWF0Y2g+IHtcclxuICAgICAgICAgICAgdmFyIG5ld0FyZ3M6IEFycmF5PG1hdGNoLklNYXRjaD4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIF8uZWFjaChhcmdzLCBhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdBcmcgPSBuZXcgbWF0Y2guTWF0Y2hWYWx1ZShhKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2gobmV3QXJnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChhW0NvbnMuSU1BVENIX01BVENIRVNfTkFNRV0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmlzVW5kZWZpbmVkKGFbQ29ucy5JTUFUQ0hfSURfTkFNRV0pICYmIGFbQ29ucy5JTUFUQ0hfSURfTkFNRV0gPT09IENvbnMuSU1BVENIX0lEX1ZBTFVFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaCg8bWF0Y2guSU1hdGNoPmEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkTWF0Y2hlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEsIFwiSW52YWxpZE1hdGNoZXIgRXhjZXB0aW9uXCIsIFwiSW52YWxpZCBtYXRjaCBvYmplY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdBcmdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG4gICAgICAgIGdldCBjYWxsQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NhbGxDb3VudDsgfVxyXG4gICAgICAgIGdldCBzZXR1cEV4cHJlc3Npb24oKTogSUFjdGlvbjE8VD4geyByZXR1cm4gdGhpcy5fc2V0dXBFeHByZXNzaW9uOyB9XHJcbiAgICAgICAgZ2V0IHNldHVwQ2FsbCgpOiBwcm94eS5JQ2FsbENvbnRleHQgeyByZXR1cm4gdGhpcy5fc2V0dXBDYWxsOyB9XHJcbiAgICAgICAgZ2V0IGlzVmVyaWZpYWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzVmVyaWZpYWJsZTsgfVxyXG5cclxuICAgICAgICBldmFsdWF0ZWRTdWNjZXNzZnVsbHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2YWx1YXRlZFN1Y2Nlc3NmdWxseSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJUHJveHlDYWxsXHJcblxyXG4gICAgICAgIG1hdGNoZXMoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NldHVwQ2FsbC5wcm9wZXJ0eSAmJiBjYWxsICYmIGNhbGwucHJvcGVydHkgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwQ2FsbC5wcm9wZXJ0eS5uYW1lID09PSBjYWxsLnByb3BlcnR5Lm5hbWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsLmFyZ3MubGVuZ3RoID09PSBjYWxsLmFyZ3MubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuc2V0dXBDYWxsLmFyZ3MsICh4LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dXBBcmcgPSA8bWF0Y2guSU1hdGNoPng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsQXJnID0gY2FsbC5hcmdzW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiAhc2V0dXBBcmcuX19fbWF0Y2hlcyhjYWxsQXJnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW52b2tlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGxiYWNrLmFwcGx5KHRoaXMsIGNhbGwuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aHJvd25FeGNlcHRpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGhpcy5fdGhyb3duRXhjZXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYWxsQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc09uY2UpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lcyA9IFRpbWVzLmF0TW9zdE9uY2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeSh0aGlzLl9jYWxsQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Nb3JlVGhhbk9uZUNhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsIFwiTW9yZVRoYW5PbmVDYWxsIEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9leHBlY3RlZENhbGxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzID0gVGltZXMuZXhhY3RseSh0aGlzLl9leHBlY3RlZENhbGxDb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aW1lcy52ZXJpZnkodGhpcy5fY2FsbENvdW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uTW9yZVRoYW5OQ2FsbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsIFwiTW9yZVRoYW5OQ2FsbHMgRXhjZXB0aW9uXCIsIHRpbWVzLmZhaWxNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVRocm93c1Jlc3VsdFxyXG5cclxuICAgICAgICB2ZXJpZmlhYmxlKGZhaWxNZXNzYWdlPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVmVyaWZpYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChmYWlsTWVzc2FnZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWlsTWVzc2FnZSA9IGZhaWxNZXNzYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PiBleHRlbmRzIE1ldGhvZENhbGw8VCwgVFJlc3VsdD4gaW1wbGVtZW50cyBhcGkuSVNldHVwPFQsIFRSZXN1bHQ+LCBhcGkuSVJldHVybnNSZXN1bHQ8VD4ge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX3JldHVyblZhbHVlRnVuYzogSUZ1bmNOPGFueSwgVFJlc3VsdD47XHJcbiAgICAgICAgaGFzUmV0dXJuVmFsdWU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9jYWxsQmFzZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IobW9jazogTW9jazxUPiwgc2V0dXBFeHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pIHtcclxuICAgICAgICAgICAgc3VwZXIobW9jaywgc2V0dXBFeHByZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG92ZXJyaWRlc1xyXG5cclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5leGVjdXRlKGNhbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxCYXNlKVxyXG4gICAgICAgICAgICAgICAgY2FsbC5pbnZva2VCYXNlKCk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5oYXNSZXR1cm5WYWx1ZSlcclxuICAgICAgICAgICAgICAgIGNhbGwucmV0dXJuVmFsdWUgPSB0aGlzLl9yZXR1cm5WYWx1ZUZ1bmMuYXBwbHkodGhpcywgY2FsbC5hcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElTZXR1cFxyXG5cclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb25OPGFueT4pOiBhcGkuSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR1cENhbGxiYWNrID0gYWN0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93cyhleGNlcHRpb246IEVycm9yKTogYXBpLklUaHJvd3NSZXN1bHQge1xyXG4gICAgICAgICAgICB0aGlzLl90aHJvd25FeGNlcHRpb24gPSBleGNlcHRpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJucyh2YWx1ZUZ1bmM6IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmV0dXJuVmFsdWVGdW5jID0gdmFsdWVGdW5jO1xyXG4gICAgICAgICAgICB0aGlzLmhhc1JldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxsQmFzZSgpOiBhcGkuSVJldHVybnNSZXN1bHQ8VD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsQmFzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVJldHVybnNSZXN1bHRcclxuXHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBNb2NrQmVoYXZpb3IgeyBMb29zZSwgU3RyaWN0IH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9jazxUPiBpbXBsZW1lbnRzIElNb2NrPFQ+IHtcclxuXHJcbiAgICAgICAgc3RhdGljIHByb3h5RmFjdG9yeTogcHJveHkuSVByb3h5RmFjdG9yeSA9IG5ldyBUeXBlTW9xLlByb3h5LlByb3h5RmFjdG9yeSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRvcjogSW50ZXJjZXB0b3JFeGVjdXRlPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX3Byb3h5OiBUO1xyXG4gICAgICAgIHByaXZhdGUgX2NhbGxCYXNlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdGFuY2U6IFQsIHByaXZhdGUgX2JlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSB0aGlzLmdldE5hbWVPZihpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yID0gbmV3IEludGVyY2VwdG9yRXhlY3V0ZSh0aGlzLl9iZWhhdmlvciwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ID0gTW9jay5wcm94eUZhY3RvcnkuY3JlYXRlUHJveHk8VD4odGhpcy5faW50ZXJjZXB0b3IsIGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZkluc3RhbmNlPFU+KGluc3RhbmNlOiBVLCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IG5ldyBNb2NrKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mVHlwZTxVPihjdG9yOiBDdG9yV2l0aEFyZ3M8VT4sIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlLCAuLi5jdG9yQXJnczogYW55W10pOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgdmFyIG1vY2s6IE1vY2s8VT4gPSBNb2NrLm9mVHlwZTIoY3RvciwgY3RvckFyZ3MsIGJlaGF2aW9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlMjxVPihjdG9yOiBDdG9yV2l0aEFyZ3M8VT4sIGN0b3JBcmdzOiBhbnlbXSwgYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UpOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlOiBVID0gVXRpbHMuY29udGh1bmt0b3IoY3RvciwgY3RvckFyZ3MpO1xyXG4gICAgICAgICAgICB2YXIgbW9jazogTW9jazxVPiA9IG5ldyBNb2NrKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IG9iamVjdCgpIHsgcmV0dXJuIHRoaXMuX3Byb3h5OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMuX2JlaGF2aW9yOyB9XHJcblxyXG4gICAgICAgIGdldCBjYWxsQmFzZSgpIHsgcmV0dXJuIHRoaXMuX2NhbGxCYXNlOyB9XHJcbiAgICAgICAgc2V0IGNhbGxCYXNlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2NhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZUlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNb2NrPFwiICsgXy51bmlxdWVJZCgpICsgXCI+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldE5hbWVPZihpbnN0YW5jZTogVCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBVdGlscy5mdW5jdGlvbk5hbWUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF8uaXNPYmplY3QoaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3RvciA9IGluc3RhbmNlLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbHMuZnVuY3Rpb25OYW1lKGN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXR1cFxyXG5cclxuICAgICAgICBzZXR1cDxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pOiBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICAgICAgdmFyIGNhbGwgPSBuZXcgTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0Pih0aGlzLCBleHByZXNzaW9uKTtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IuYWRkQ2FsbChjYWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2ZXJpZnlcclxuXHJcbiAgICAgICAgdmVyaWZ5PFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0PiwgdGltZXM6IFRpbWVzKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsID0gbmV3IE1ldGhvZENhbGw8VCwgVFJlc3VsdD4odGhpcywgZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLmFkZENhbGwoY2FsbCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci52ZXJpZnlDYWxsKGNhbGwsIHRpbWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IudmVyaWZ5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGltZXMge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgPCU9IG4gJT4gdGltZXMsIGludm9rZWQgPCU9IG0gJT4gdGltZXNcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9MRUFTVF9PTkNFID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIGF0IGxlYXN0IG9uY2VcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgYXQgbW9zdCBvbmNlXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2xhc3RDYWxsQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfZmFpbE1lc3NhZ2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbmRpdGlvbjogSUZ1bmMyPG51bWJlciwgYm9vbGVhbj4sXHJcbiAgICAgICAgICAgIHByaXZhdGUgX2Zyb206IG51bWJlcixcclxuICAgICAgICAgICAgcHJpdmF0ZSBfdG86IG51bWJlcixcclxuICAgICAgICAgICAgZmFpbE1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9mYWlsTWVzc2FnZSA9IF8udGVtcGxhdGUoZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGZhaWxNZXNzYWdlKCkgeyByZXR1cm4gdGhpcy5fZmFpbE1lc3NhZ2UoeyBuOiB0aGlzLl9mcm9tLCBtOiB0aGlzLl9sYXN0Q2FsbENvdW50IH0pOyB9XHJcblxyXG4gICAgICAgIHZlcmlmeShjYWxsQ291bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2FsbENvdW50ID0gY2FsbENvdW50O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uKGNhbGxDb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZXhhY3RseShuOiBudW1iZXIpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID09PSBuLCBuLCBuLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG5ldmVyKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbWVzLmV4YWN0bHkoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW1lcy5leGFjdGx5KDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGF0TGVhc3RPbmNlKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lcyhjID0+IGMgPj0gMSwgMSwgTnVtYmVyLk1BWF9WQUxVRSwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTEVBU1RfT05DRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgYXRNb3N0T25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID49IDAgJiYgYyA8PSAxLCAwLCAxLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvdW5kZXJzY29yZS91bmRlcnNjb3JlLmQudHMnIC8+IFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQXBpL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0NvbW1vbi9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdFcnJvci9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaC9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eS9fYWxsLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQ29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nR2xvYmFsTW9jay50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nR2xvYmFsU2NvcGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lHbG9iYWxNb2NrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJTW9jay50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSW50ZXJjZXB0b3JDb250ZXh0LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJbnRlcmNlcHRvckV4ZWN1dGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludGVyY2VwdG9yU2V0dXAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludGVyY2VwdG9yU3RyYXRlZ2llcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSXQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01ldGhvZENhbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01ldGhvZENhbGxSZXR1cm4udHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01vY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1RpbWVzLnRzJyAvPlxyXG5cclxuaW1wb3J0IGFwaSAgICAgPSBUeXBlTW9xLkFwaTtcclxuaW1wb3J0IGVycm9yICAgPSBUeXBlTW9xLkVycm9yO1xyXG5pbXBvcnQgbWF0Y2ggICA9IFR5cGVNb3EuTWF0Y2g7XHJcbmltcG9ydCBwcm94eSAgID0gVHlwZU1vcS5Qcm94eTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHbG9iYWxTY29wZSBpbXBsZW1lbnRzIGFwaS5JVXNpbmdSZXN1bHQge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB1c2luZyguLi5hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pOiBhcGkuSVVzaW5nUmVzdWx0IHtcclxuICAgICAgICAgICAgdmFyIHNjb3BlID0gbmV3IEdsb2JhbFNjb3BlKGFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aXRoKGFjdGlvbjogSUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbDogQXJyYXk8UHJvcGVydHlEZXNjcmlwdG9yPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLl9hcmdzLCBhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGEuY29udGFpbmVyW2EubmFtZV0pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyUHJvcHMgPSBQcm9wZXJ0eVJldHJpZXZlci5nZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKGEuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3AgPSBfLmZpbmQoY29udGFpbmVyUHJvcHMsIHAgPT4gcC5uYW1lID09PSBhLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFthLm5hbWVdID0gcHJvcC5kZXNjO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhLnR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuQ2xhc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXR1cm4gYSBuZXcgbW9jayBldmVyeSB0aW1lIHdpdGggc2FtZSBpbnRlcmNlcHRvciBhcyB0aGUgb25lIHVzZWQgYnkgbW9jayBwYXNzZWQgaW4gYXMgYXJnIHRvICd1c2luZycgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAodG8gc3VwcG9ydCBkaWZmZXJlbnQgY3RvciBhcmd1bWVudHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy52YWx1ZSA9ICgpID0+IGEubW9jay5vYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLkZ1bmN0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MudmFsdWUgPSBhLm1vY2sub2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5WYWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLmdldCA9ICgpID0+IGEubW9jay5vYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLlVua25vd25HbG9iYWxUeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLCBcIlVua25vd25HbG9iYWxUeXBlIEV4Y2VwdGlvblwiLCBcInVua25vd24gZ2xvYmFsIHR5cGU6IFwiICsgYS50eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLmNvbnRhaW5lciwgYS5uYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIxOiBcIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmFwcGx5KHRoaXMsIHRoaXMuX2FyZ3MpO1xyXG5cclxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLl9hcmdzLCBhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoYS5tb2NrLmluc3RhbmNlKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IGluaXRpYWxbYS5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXNjKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhLnR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLkNsYXNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLkZ1bmN0aW9uOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLlZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLmNvbmZpZ3VyYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEuY29udGFpbmVyLCBhLm5hbWUsIGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMjogXCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxuaW50ZXJmYWNlIElUeXBlTW9xU3RhdGljIHtcclxuICAgIE1vY2s6IHR5cGVvZiBUeXBlTW9xLk1vY2s7XHJcbiAgICBNb2NrQmVoYXZpb3I6IHR5cGVvZiBUeXBlTW9xLk1vY2tCZWhhdmlvcjtcclxuICAgIEl0OiB0eXBlb2YgVHlwZU1vcS5JdDtcclxuICAgIFRpbWVzOiB0eXBlb2YgVHlwZU1vcS5UaW1lcztcclxuICAgIEdsb2JhbE1vY2s6IHR5cGVvZiBUeXBlTW9xLkdsb2JhbE1vY2s7XHJcbiAgICBHbG9iYWxTY29wZTogdHlwZW9mIFR5cGVNb3EuR2xvYmFsU2NvcGU7XHJcbiAgICBNb2NrRXhjZXB0aW9uOiB0eXBlb2YgVHlwZU1vcS5FcnJvci5Nb2NrRXhjZXB0aW9uO1xyXG59XHJcblxyXG5tb2R1bGUgVHlwZU1vcVN0YXRpYyB7XHJcbiAgICBleHBvcnQgaW1wb3J0IE1vY2sgPSBUeXBlTW9xLk1vY2s7XHJcbiAgICBleHBvcnQgaW1wb3J0IE1vY2tCZWhhdmlvciA9IFR5cGVNb3EuTW9ja0JlaGF2aW9yO1xyXG4gICAgZXhwb3J0IGltcG9ydCBJdCA9IFR5cGVNb3EuSXQ7XHJcbiAgICBleHBvcnQgaW1wb3J0IFRpbWVzID0gVHlwZU1vcS5UaW1lcztcclxuICAgIGV4cG9ydCBpbXBvcnQgR2xvYmFsTW9jayA9IFR5cGVNb3EuR2xvYmFsTW9jaztcclxuICAgIGV4cG9ydCBpbXBvcnQgR2xvYmFsU2NvcGUgPSBUeXBlTW9xLkdsb2JhbFNjb3BlO1xyXG4gICAgZXhwb3J0IGltcG9ydCBNb2NrRXhjZXB0aW9uID0gVHlwZU1vcS5FcnJvci5Nb2NrRXhjZXB0aW9uO1xyXG59XHJcblxyXG5kZWNsYXJlIHZhciB0eXBlbW9xOiBJVHlwZU1vcVN0YXRpYztcclxudHlwZW1vcSA9IFR5cGVNb3FTdGF0aWM7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvbm9kZS9ub2RlLmQudHMnIC8+IFxyXG5cclxuaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICB2YXIgXzogVW5kZXJzY29yZVN0YXRpYyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlXCIpO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW1vcTtcclxuICAgIH1cclxuICAgIGV4cG9ydHMudHlwZW1vcSA9IHR5cGVtb3E7XHJcbn0gZWxzZSB7XHJcbiAgICB0aGlzLnR5cGVtb3EgPSB0eXBlbW9xO1xyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
