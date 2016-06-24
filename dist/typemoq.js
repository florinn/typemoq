var TypeMoqIntern;
(function (TypeMoqIntern) {
    var Cons = (function () {
        function Cons() {
        }
        Cons.IMATCH_ID_VALUE = "438A51D3-6864-49D7-A655-CA1153B86965";
        Cons.IMATCH_ID_NAME = "___id";
        Cons.IMATCH_MATCHES_NAME = "___matches";
        return Cons;
    }());
    TypeMoqIntern.Cons = Cons;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    var CurrentInterceptContext = (function () {
        function CurrentInterceptContext() {
        }
        return CurrentInterceptContext;
    }());
    TypeMoqIntern.CurrentInterceptContext = CurrentInterceptContext;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    (function (GlobalType) {
        GlobalType[GlobalType["Class"] = 0] = "Class";
        GlobalType[GlobalType["Function"] = 1] = "Function";
        GlobalType[GlobalType["Value"] = 2] = "Value";
    })(TypeMoqIntern.GlobalType || (TypeMoqIntern.GlobalType = {}));
    var GlobalType = TypeMoqIntern.GlobalType;
    var GlobalMock = (function () {
        function GlobalMock(mock, _name, _type, container) {
            this.mock = mock;
            this._name = _name;
            this._type = _type;
            this.container = container;
        }
        GlobalMock.ofInstance = function (instance, name, container, behavior) {
            if (container === void 0) { container = window; }
            if (behavior === void 0) { behavior = TypeMoqIntern.MockBehavior.Loose; }
            var mock = TypeMoqIntern.Mock.ofInstance(instance, behavior);
            var type = _.isFunction(instance) ? GlobalType.Function : GlobalType.Value;
            return new GlobalMock(mock, name, type, container);
        };
        GlobalMock.ofType = function (ctor, name, container, behavior) {
            if (container === void 0) { container = window; }
            if (behavior === void 0) { behavior = TypeMoqIntern.MockBehavior.Loose; }
            var instance = new ctor();
            var mock = TypeMoqIntern.Mock.ofInstance(instance, behavior);
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
    TypeMoqIntern.GlobalMock = GlobalMock;
})(TypeMoqIntern || (TypeMoqIntern = {}));




























var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    TypeMoqIntern.PropertyRetriever = PropertyRetriever;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
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
                    ret = new (ctor.bind.apply(ctor, [void 0].concat(args)))();
                return _.isObject(ret) ? ret : inst;
            })();
        };
        return Utils;
    }());
    TypeMoqIntern.Utils = Utils;
})(TypeMoqIntern || (TypeMoqIntern = {}));




var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    })(Error = TypeMoqIntern.Error || (TypeMoqIntern.Error = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    })(Error = TypeMoqIntern.Error || (TypeMoqIntern.Error = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));







var TypeMoqIntern;
(function (TypeMoqIntern) {
    var Match;
    (function (Match) {
        var MatchAnyObject = (function () {
            function MatchAnyObject(_ctor) {
                this._ctor = _ctor;
                this.___id = TypeMoqIntern.Cons.IMATCH_ID_VALUE;
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
                this.___id = TypeMoqIntern.Cons.IMATCH_ID_VALUE;
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
                this.___id = TypeMoqIntern.Cons.IMATCH_ID_VALUE;
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
                this.___id = TypeMoqIntern.Cons.IMATCH_ID_VALUE;
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
    })(Match = TypeMoqIntern.Match || (TypeMoqIntern.Match = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    var Match;
    (function (Match) {
        var MatchValue = (function () {
            function MatchValue(_value) {
                this._value = _value;
                this.___id = TypeMoqIntern.Cons.IMATCH_ID_VALUE;
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
    })(Match = TypeMoqIntern.Match || (TypeMoqIntern.Match = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));








var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    })(Proxy = TypeMoqIntern.Proxy || (TypeMoqIntern.Proxy = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));






var TypeMoqIntern;
(function (TypeMoqIntern) {
    var Proxy;
    (function (Proxy_1) {
        var Proxy = (function () {
            function Proxy(interceptor, instance) {
                var _this = this;
                this.check(instance);
                var that = this;
                var props = TypeMoqIntern.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(instance);
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
                    var funcName = TypeMoqIntern.Utils.functionName(instance);
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
    })(Proxy = TypeMoqIntern.Proxy || (TypeMoqIntern.Proxy = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    })(Proxy = TypeMoqIntern.Proxy || (TypeMoqIntern.Proxy = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));










var TypeMoqIntern;
(function (TypeMoqIntern) {
    (function (InterceptionAction) {
        InterceptionAction[InterceptionAction["Continue"] = 0] = "Continue";
        InterceptionAction[InterceptionAction["Stop"] = 1] = "Stop";
    })(TypeMoqIntern.InterceptionAction || (TypeMoqIntern.InterceptionAction = {}));
    var InterceptionAction = TypeMoqIntern.InterceptionAction;
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
    TypeMoqIntern.InterceptorContext = InterceptorContext;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    var InterceptorExecute = (function () {
        function InterceptorExecute(behavior, mock) {
            this._interceptorContext = new TypeMoqIntern.InterceptorContext(behavior, mock);
        }
        Object.defineProperty(InterceptorExecute.prototype, "interceptorContext", {
            get: function () { return this._interceptorContext; },
            enumerable: true,
            configurable: true
        });
        InterceptorExecute.prototype.intercept = function (invocation) {
            var _this = this;
            var localCtx = new TypeMoqIntern.CurrentInterceptContext();
            _.some(this.interceptionStrategies(), function (strategy) {
                if (TypeMoqIntern.InterceptionAction.Stop === strategy.handleIntercept(invocation, _this.interceptorContext, localCtx)) {
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
            var times = TypeMoqIntern.Times.exactly(verifiables.length);
            if (!times.verify(invokes.length))
                this.throwVerifyException(verifiables, times);
        };
        InterceptorExecute.prototype.interceptionStrategies = function () {
            var strategies = [
                new TypeMoqIntern.AddActualInvocation(),
                new TypeMoqIntern.ExtractProxyCall(),
                new TypeMoqIntern.ExecuteCall(),
                new TypeMoqIntern.InvokeBase(),
                new TypeMoqIntern.HandleMockRecursion()
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
    TypeMoqIntern.InterceptorExecute = InterceptorExecute;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    TypeMoqIntern.InterceptorSetup = InterceptorSetup;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    var AddActualInvocation = (function () {
        function AddActualInvocation() {
        }
        AddActualInvocation.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            ctx.addInvocation(invocation);
            return TypeMoqIntern.InterceptionAction.Continue;
        };
        return AddActualInvocation;
    }());
    TypeMoqIntern.AddActualInvocation = AddActualInvocation;
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
            else if (ctx.behavior == TypeMoqIntern.MockBehavior.Strict) {
                throw new error.MockException(error.MockExceptionReason.NoSetup, invocation);
            }
            return TypeMoqIntern.InterceptionAction.Continue;
        };
        return ExtractProxyCall;
    }());
    TypeMoqIntern.ExtractProxyCall = ExtractProxyCall;
    var ExecuteCall = (function () {
        function ExecuteCall() {
        }
        ExecuteCall.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            this._ctx = ctx;
            var currentCall = localCtx.call;
            if (currentCall != null) {
                currentCall.execute(invocation);
                return TypeMoqIntern.InterceptionAction.Stop;
            }
            return TypeMoqIntern.InterceptionAction.Continue;
        };
        return ExecuteCall;
    }());
    TypeMoqIntern.ExecuteCall = ExecuteCall;
    var InvokeBase = (function () {
        function InvokeBase() {
        }
        InvokeBase.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            if (ctx.mock.callBase) {
                invocation.invokeBase();
                return TypeMoqIntern.InterceptionAction.Stop;
            }
            return TypeMoqIntern.InterceptionAction.Continue;
        };
        return InvokeBase;
    }());
    TypeMoqIntern.InvokeBase = InvokeBase;
    var HandleMockRecursion = (function () {
        function HandleMockRecursion() {
        }
        HandleMockRecursion.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            //TODO: 
            return TypeMoqIntern.InterceptionAction.Continue;
        };
        return HandleMockRecursion;
    }());
    TypeMoqIntern.HandleMockRecursion = HandleMockRecursion;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    TypeMoqIntern.It = It;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    var MethodCall = (function () {
        function MethodCall(mock, _setupExpression) {
            this.mock = mock;
            this._setupExpression = _setupExpression;
            this._id = this.generateId();
            var interceptor = new TypeMoqIntern.InterceptorSetup();
            var proxy = TypeMoqIntern.Mock.proxyFactory.createProxy(interceptor, mock.instance);
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
                    if (!_.isUndefined(a[TypeMoqIntern.Cons.IMATCH_MATCHES_NAME]) &&
                        !_.isUndefined(a[TypeMoqIntern.Cons.IMATCH_ID_NAME]) && a[TypeMoqIntern.Cons.IMATCH_ID_NAME] === TypeMoqIntern.Cons.IMATCH_ID_VALUE) {
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
                var times = TypeMoqIntern.Times.atMostOnce();
                if (!times.verify(this._callCount)) {
                    throw new error.MockException(error.MockExceptionReason.MoreThanOneCall, this, "MoreThanOneCall Exception", times.failMessage);
                }
            }
            if (this._expectedCallCount) {
                var times = TypeMoqIntern.Times.exactly(this._expectedCallCount);
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
    TypeMoqIntern.MethodCall = MethodCall;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    }(TypeMoqIntern.MethodCall));
    TypeMoqIntern.MethodCallReturn = MethodCallReturn;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    (function (MockBehavior) {
        MockBehavior[MockBehavior["Loose"] = 0] = "Loose";
        MockBehavior[MockBehavior["Strict"] = 1] = "Strict";
    })(TypeMoqIntern.MockBehavior || (TypeMoqIntern.MockBehavior = {}));
    var MockBehavior = TypeMoqIntern.MockBehavior;
    var Mock = (function () {
        function Mock(instance, _behavior) {
            if (_behavior === void 0) { _behavior = MockBehavior.Loose; }
            this.instance = instance;
            this._behavior = _behavior;
            this._id = this.generateId();
            this._name = this.getNameOf(instance);
            this._interceptor = new TypeMoqIntern.InterceptorExecute(this._behavior, this);
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
            var instance = TypeMoqIntern.Utils.conthunktor(ctor, ctorArgs);
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
                result = TypeMoqIntern.Utils.functionName(instance);
            }
            else if (_.isObject(instance)) {
                var ctor = instance.constructor;
                result = TypeMoqIntern.Utils.functionName(ctor);
            }
            if (result)
                result = result.trim();
            return result;
        };
        // setup
        Mock.prototype.setup = function (expression) {
            var call = new TypeMoqIntern.MethodCallReturn(this, expression);
            this._interceptor.addCall(call);
            return call;
        };
        // verify
        Mock.prototype.verify = function (expression, times) {
            var call = new TypeMoqIntern.MethodCall(this, expression);
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
        Mock.proxyFactory = new TypeMoqIntern.Proxy.ProxyFactory();
        return Mock;
    }());
    TypeMoqIntern.Mock = Mock;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
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
    TypeMoqIntern.Times = Times;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var error = TypeMoqIntern.Error;
var match = TypeMoqIntern.Match;
var proxy = TypeMoqIntern.Proxy;


var TypeMoqIntern;
(function (TypeMoqIntern) {
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
                        var containerProps = TypeMoqIntern.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(a.container);
                        var prop = _.find(containerProps, function (p) { return p.name === a.name; });
                        initial[a.name] = prop.desc;
                        var desc = {};
                        switch (a.type) {
                            case TypeMoqIntern.GlobalType.Class:
                                //TODO: return a new mock every time with same interceptor as the one used by mock passed in as arg to 'using' 
                                //      (to support different ctor arguments)
                                desc.value = function () { return a.mock.object; };
                                break;
                            case TypeMoqIntern.GlobalType.Function:
                                desc.value = a.mock.object;
                                break;
                            case TypeMoqIntern.GlobalType.Value:
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
                                case TypeMoqIntern.GlobalType.Class:
                                    break;
                                case TypeMoqIntern.GlobalType.Function:
                                    break;
                                case TypeMoqIntern.GlobalType.Value:
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
    TypeMoqIntern.GlobalScope = GlobalScope;
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoq;
(function (TypeMoq) {
    TypeMoq.Mock = TypeMoqIntern.Mock;
    TypeMoq.MockBehavior = TypeMoqIntern.MockBehavior;
    TypeMoq.It = TypeMoqIntern.It;
    TypeMoq.Times = TypeMoqIntern.Times;
    TypeMoq.GlobalMock = TypeMoqIntern.GlobalMock;
    TypeMoq.GlobalScope = TypeMoqIntern.GlobalScope;
    TypeMoq.MockException = TypeMoqIntern.Error.MockException;
})(TypeMoq || (TypeMoq = {}));
typemoq = TypeMoq;


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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJDb25zdGFudHMudHMiLCJDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cyIsIkdsb2JhbE1vY2sudHMiLCJBcGkvSUNhbGxiYWNrLnRzIiwiQXBpL0lSZXR1cm5zLnRzIiwiQXBpL0lTZXR1cC50cyIsIkFwaS9JVGhyb3dzLnRzIiwiQXBpL0lVc2luZy50cyIsIkFwaS9JVmVyaWZpZXMudHMiLCJBcGkvX2FsbC50cyIsIkNvbW1vbi9DdG9yLnRzIiwiQ29tbW9uL0Z1bmMudHMiLCJDb21tb24vUHJvcGVydHlSZXRyaWV2ZXIudHMiLCJDb21tb24vVXRpbHMudHMiLCJDb21tb24vX2FsbC50cyIsIkVycm9yL0V4Y2VwdGlvbi50cyIsIkVycm9yL01vY2tFeGNlcHRpb24udHMiLCJFcnJvci9fYWxsLnRzIiwiTWF0Y2gvSU1hdGNoLnRzIiwiTWF0Y2gvTWF0Y2hBbnkudHMiLCJNYXRjaC9NYXRjaFZhbHVlLnRzIiwiTWF0Y2gvX2FsbC50cyIsIlByb3h5L0lDYWxsQ29udGV4dC50cyIsIlByb3h5L0lDYWxsSW50ZXJjZXB0b3IudHMiLCJQcm94eS9JbnZvY2F0aW9uLnRzIiwiUHJveHkvSVByb3h5Q2FsbC50cyIsIlByb3h5L0lQcm94eUZhY3RvcnkudHMiLCJQcm94eS9Qcm94eS50cyIsIlByb3h5L1Byb3h5RmFjdG9yeS50cyIsIlByb3h5L19hbGwudHMiLCJJR2xvYmFsTW9jay50cyIsIklNb2NrLnRzIiwiSW50ZXJjZXB0b3JDb250ZXh0LnRzIiwiSW50ZXJjZXB0b3JFeGVjdXRlLnRzIiwiSW50ZXJjZXB0b3JTZXR1cC50cyIsIkludGVyY2VwdG9yU3RyYXRlZ2llcy50cyIsIkl0LnRzIiwiTWV0aG9kQ2FsbC50cyIsIk1ldGhvZENhbGxSZXR1cm4udHMiLCJNb2NrLnRzIiwiVGltZXMudHMiLCJfYWxsLnRzIiwiR2xvYmFsU2NvcGUudHMiLCJfZXhwb3J0cy50cyIsIl9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGlu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RSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUM5QixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbnMge1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfSURfVkFMVUUgPSBcIjQzOEE1MUQzLTY4NjQtNDlENy1BNjU1LUNBMTE1M0I4Njk2NVwiO1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfSURfTkFNRSA9IFwiX19faWRcIjtcclxuICAgICAgICBzdGF0aWMgSU1BVENIX01BVENIRVNfTkFNRSA9IFwiX19fbWF0Y2hlc1wiO1xyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4ge1xyXG4gICAgICAgIGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD47XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBHbG9iYWxUeXBlIHsgQ2xhc3MsIEZ1bmN0aW9uLCBWYWx1ZSB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbE1vY2s8VD4gaW1wbGVtZW50cyBJR2xvYmFsTW9jazxUPiB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX3R5cGU6IEdsb2JhbFR5cGUsIHB1YmxpYyBjb250YWluZXI6IE9iamVjdCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mSW5zdGFuY2U8VT4oaW5zdGFuY2U6IFUsIG5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgPyBHbG9iYWxUeXBlLkZ1bmN0aW9uIDogR2xvYmFsVHlwZS5WYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHbG9iYWxNb2NrKG1vY2ssIG5hbWUsIHR5cGUsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlPFU+KGN0b3I6IEN0b3I8VT4sIG5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgY3RvcigpO1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdsb2JhbE1vY2sobW9jaywgbmFtZSwgR2xvYmFsVHlwZS5DbGFzcywgY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLm1vY2sub2JqZWN0OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZSB8fCB0aGlzLm1vY2submFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMubW9jay5iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLm1vY2suY2FsbEJhc2U7IH1cclxuICAgICAgICBzZXQgY2FsbEJhc2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5tb2NrLmNhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblxyXG4gICAgICAgIC8vIHNldHVwXHJcblxyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2NrLnNldHVwKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vY2sudmVyaWZ5KGV4cHJlc3Npb24sIHRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrLnZlcmlmeUFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24pOiBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PjtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24xPFQ+KTogSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD47XHJcbiAgICB9XHJcbn0gICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm5zKHZhbHVlRnVuY3Rpb246IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICAgICAgY2FsbEJhc2UoKTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Jlc3VsdDxUPiBleHRlbmRzIElWZXJpZmllcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiBleHRlbmRzIElSZXR1cm5zPFQsIFRSZXN1bHQ+LCBJVGhyb3dzIHtcclxuICAgIH1cclxufSAgICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTZXR1cDxULCBUUmVzdWx0PiBleHRlbmRzIElDYWxsYmFjazxULCBUUmVzdWx0PiwgSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4sIElWZXJpZmllcyB7IH0gXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5BcGkge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93cyB7XHJcbiAgICAgICAgdGhyb3dzPFQgZXh0ZW5kcyBlcnJvci5FeGNlcHRpb24+KGV4Y2VwdGlvbjogVCk6IElUaHJvd3NSZXN1bHQ7XHJcblx0fVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93c1Jlc3VsdCBleHRlbmRzIElWZXJpZmllcyB7XHJcblx0fVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElVc2luZ1Jlc3VsdCB7XHJcbiAgICAgICAgd2l0aChhY3Rpb246IElBY3Rpb24pOiB2b2lkO1xyXG4gICAgfVxyXG59ICAgIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZlcmlmaWVzIHtcclxuICAgICAgICB2ZXJpZmlhYmxlKGZhaWxNZXNzYWdlPzogc3RyaW5nKTogdm9pZDtcclxuICAgIH1cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUNhbGxiYWNrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJUmV0dXJucy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVNldHVwLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJVGhyb3dzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJVXNpbmcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lWZXJpZmllcy50cycgLz4gICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ3RvcjxUPiB7XHJcbiAgICAgICAgbmV3ICgpOiBUO1xyXG4gICAgICAgIHByb3RvdHlwZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ3RvcldpdGhBcmdzPFQ+IHtcclxuICAgICAgICBuZXcgKC4uLmN0b3JBcmdzOiBhbnlbXSk6IFQ7XHJcbiAgICAgICAgcHJvdG90eXBlO1xyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbiB7XHJcbiAgICAgICAgKCk6IHZvaWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBY3Rpb24xPFQ+IHtcclxuICAgICAgICAoeDogVCk6IHZvaWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBY3Rpb25OPFQ+IHtcclxuICAgICAgICAoLi4ueDogVFtdKTogdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGdW5jMTxUUmVzdWx0PiB7XHJcbiAgICAgICAgKCk6IFRSZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGdW5jMjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgKHg6IFQpOiBUUmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRnVuY048VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICguLi54OiBUW10pOiBUUmVzdWx0O1xyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVJldHJpZXZlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25FbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fZW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGNvdWxkIHVzZSBmb3IuLmluIGZpbHRlcmVkIHdpdGggaGFzT3duUHJvcGVydHkgb3IganVzdCB0aGlzOiByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25Ob25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fbm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBqdXN0IHVzZTogcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0UHJvdG90eXBlRW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldFByb3RvdHlwZU5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duQW5kUHJvdG90eXBlRW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGNvdWxkIHVzZSB1bmZpbHRlcmVkIGZvci4uaW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVOb25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIHRydWUsIHRoaXMuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFByaXZhdGUgc3RhdGljIHByb3BlcnR5IGNoZWNrZXIgY2FsbGJhY2tzXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2VudW1lcmFibGUob2JqLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbm90RW51bWVyYWJsZShvYmosIHByb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuICFvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUob2JqLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2dldFByb3BlcnR5TmFtZXMob2JqLCBpdGVyYXRlU2VsZkJvb2wsIGl0ZXJhdGVQcm90b3R5cGVCb29sLCBpbmNsdWRlUHJvcENiKTogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciB9PiB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgfT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVyYXRlU2VsZkJvb2wpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocHJvcHMsIHByb3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVwbGljYXRlID0gXy5maW5kKHJlc3VsdCwgcCA9PiBwLm5hbWUgPT09IHByb3ApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGUgJiYgaW5jbHVkZVByb3BDYihvYmosIHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IG5hbWU6IHByb3AsIGRlc2M6IHByb3BEZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVyYXRlUHJvdG90eXBlQm9vbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGl0ZXJhdGVTZWxmQm9vbCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVdGlscyB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRVVUlEKCkge1xyXG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBmdW5jdGlvbk5hbWUoZnVuKSB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBmdW4udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0ID0gcmV0LnN1YnN0cignZnVuY3Rpb24gJy5sZW5ndGgpO1xyXG4gICAgICAgICAgICByZXQgPSByZXQuc3Vic3RyKDAsIHJldC5pbmRleE9mKCcoJykpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNvbnRodW5rdG9yPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgYXJnczogYW55W10pOiBVIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgVGVtcCA9ICgpID0+IHsgfSwgaW5zdCwgcmV0O1xyXG4gICAgICAgICAgICAgICAgVGVtcC5wcm90b3R5cGUgPSBjdG9yLnByb3RvdHlwZTtcclxuICAgICAgICAgICAgICAgIGluc3QgPSBuZXcgVGVtcCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjdG9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBjdG9yLmFwcGx5KGluc3QsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNPYmplY3QocmV0KSA/IHJldCA6IGluc3Q7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0N0b3IudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0Z1bmMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3BlcnR5UmV0cmlldmVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdVdGlscy50cycgLz4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5FcnJvciB7XHJcbiAgICBleHBvcnQgY2xhc3MgRXhjZXB0aW9uIGltcGxlbWVudHMgRXJyb3Ige1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lPzogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5FcnJvciB7XHJcbiAgICBleHBvcnQgZW51bSBNb2NrRXhjZXB0aW9uUmVhc29uIHtcclxuICAgICAgICBOb1NldHVwLFxyXG4gICAgICAgIE1vcmVUaGFuT25lU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgIEludmFsaWRTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgSW52YWxpZE1hdGNoZXIsXHJcbiAgICAgICAgSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgVW5rbm93bkdsb2JhbFR5cGUsXHJcbiAgICAgICAgVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgIE1vcmVUaGFuT25lQ2FsbCxcclxuICAgICAgICBNb3JlVGhhbk5DYWxsc1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1vY2tFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb24ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwdWJsaWMgcmVhc29uOiBNb2NrRXhjZXB0aW9uUmVhc29uLFxyXG4gICAgICAgICAgICBwdWJsaWMgY3R4OiBhbnksXHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZyA9ICdNb2NrIEV4Y2VwdGlvbicsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nRXhjZXB0aW9uLnRzJyAvPiBcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTW9ja0V4Y2VwdGlvbi50cycgLz4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWF0Y2gge1xyXG4gICAgICAgIF9fX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoQW55T2JqZWN0PFQ+IGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY3RvcjogQ3RvcjxUPikge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N0b3IucHJvdG90eXBlID09PSBvYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueSBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29ucy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueVN0cmluZyBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29ucy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoQW55TnVtYmVyIGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uTWF0Y2gge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaFZhbHVlPFQ+IGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmFsdWU6IFQpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRXF1YWwodGhpcy5fdmFsdWUsIG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJTWF0Y2gudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01hdGNoQW55LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaFZhbHVlLnRzJyAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgYXJnczogSUFyZ3VtZW50cztcclxuICAgICAgICBwcm9wZXJ0eTogSVByb3BlcnR5SW5mbztcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBpbnRlcmNlcHQoY29udGV4dDogSUNhbGxDb250ZXh0KTogdm9pZDtcclxuICAgIH1cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kSW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IE1ldGhvZEluZm8sIHByaXZhdGUgX2FyZ3M/OiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3MgfHwgeyBsZW5ndGg6IDAsIGNhbGxlZTogbnVsbCB9OyB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgdGhpcy5fYXJncyA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuX3Byb3BlcnR5LnRvRnVuYy5hcHBseSh0aGlzLl9wcm9wZXJ0eS5vYmosIHRoaXMuX2FyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdldHRlckludm9jYXRpb24gaW1wbGVtZW50cyBJQ2FsbENvbnRleHQge1xyXG4gICAgICAgIHJldHVyblZhbHVlOiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb3BlcnR5OiBQcm9wZXJ0eUluZm8sIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMge1xyXG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXJncywgXCJjYWxsZWVcIixcclxuICAgICAgICAgICAgICAgIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogbnVsbCB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+YXJncztcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgfVxyXG5cclxuICAgICAgICBnZXQgcHJvcGVydHkoKTogUHJvcGVydHlJbmZvIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnR5OyB9XHJcblxyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgcHJpdmF0ZSBfYXJnczogSUFyZ3VtZW50cykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGFyZ3MoKTogSUFyZ3VtZW50cyB7IHJldHVybiB0aGlzLl9hcmdzOyB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgdGhpcy5fYXJncyA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuX3Byb3BlcnR5Lm9ialt0aGlzLl9wcm9wZXJ0eS5uYW1lXSA9IHRoaXMuX2FyZ3NbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kSW5mbyBpbXBsZW1lbnRzIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IE9iamVjdCwgcHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgdG9GdW5jKCk6IEZ1bmN0aW9uIHtcclxuICAgICAgICAgICAgdmFyIGZ1bmM6IEZ1bmN0aW9uO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHRoaXMub2JqKSlcclxuICAgICAgICAgICAgICAgIGZ1bmMgPSA8RnVuY3Rpb24+dGhpcy5vYmo7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZ1bmMgPSB0aGlzLm9ialt0aGlzLm5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5SW5mbyBpbXBsZW1lbnRzIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IE9iamVjdCwgcHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIG9iajogT2JqZWN0O1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJveHlDYWxsPFQ+IHtcclxuICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgIGNhbGxDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIC8vaXNDb25kaXRpb25hbCgpOiBib29sZWFuO1xyXG4gICAgICAgIGZhaWxNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgaXNJbnZva2VkOiBib29sZWFuO1xyXG4gICAgICAgIGlzVmVyaWZpYWJsZTogYm9vbGVhbjtcclxuICAgICAgICBzZXR1cEV4cHJlc3Npb246IElBY3Rpb24xPFQ+O1xyXG4gICAgICAgIHNldHVwQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG4gICAgICAgIGV2YWx1YXRlZFN1Y2Nlc3NmdWxseSgpOiB2b2lkO1xyXG5cclxuICAgICAgICBtYXRjaGVzKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IGJvb2xlYW47XHJcbiAgICAgICAgZXhlY3V0ZShjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiB2b2lkO1xyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm94eUZhY3Rvcnkge1xyXG4gICAgICAgIGNyZWF0ZVByb3h5PFQ+KGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLCBpbnN0YW5jZTogVCk6IFQ7XHJcbiAgICB9XHJcbn0gICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgUHJveHk8VD4ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLCBpbnN0YW5jZTogVCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICAgICAgdmFyIHByb3BzID0gUHJvcGVydHlSZXRyaWV2ZXIuZ2V0T3duQW5kUHJvdG90eXBlRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIF8uZWFjaChwcm9wcywgcHJvcCA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihwcm9wLmRlc2MudmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogcHJvcC5kZXNjLmNvbmZpZ3VyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogcHJvcC5kZXNjLmVudW1lcmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiBwcm9wLmRlc2Mud3JpdGFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVNZXRob2RQcm94eSh0aGF0LCBpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3AubmFtZSwgcHJvcERlc2MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogcHJvcC5kZXNjLmNvbmZpZ3VyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogcHJvcC5kZXNjLmVudW1lcmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWZpbmVQcm9wZXJ0eVByb3h5KHRoYXQsIGludGVyY2VwdG9yLCBpbnN0YW5jZSwgcHJvcC5uYW1lLCBwcm9wLmRlc2MudmFsdWUsIHByb3BEZXNjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mPFU+KGluc3RhbmNlOiBVLCBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcikge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVjayhpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xyXG5cclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpbnN0YW5jZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmdW5jTmFtZSA9IFV0aWxzLmZ1bmN0aW9uTmFtZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBQcm94eS5tZXRob2RQcm94eVZhbHVlKGludGVyY2VwdG9yLCBpbnN0YW5jZSwgZnVuY05hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gbmV3IFByb3h5KGludGVyY2VwdG9yLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjaGVjazxVPihpbnN0YW5jZTogVSk6IHZvaWQge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVja05vdE51bGwoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWxsb3cgb25seSBwcmltaXRpdmUgb2JqZWN0cyBhbmQgZnVuY3Rpb25zXHJcbiAgICAgICAgICAgIHZhciBvayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSB8fFxyXG4gICAgICAgICAgICAgICAgKF8uaXNPYmplY3QoaW5zdGFuY2UpICYmICFQcm94eS5pc1ByaW1pdGl2ZU9iamVjdChpbnN0YW5jZSkpKVxyXG4gICAgICAgICAgICAgICAgb2sgPSB0cnVlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKCFvaylcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgc2hvdWxkIGJlIGEgZnVuY3Rpb24gb3IgYSBub24gcHJpbWl0aXZlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hlY2s8VT4oaW5zdGFuY2U6IFUpOiB2b2lkIHtcclxuICAgICAgICAgICAgUHJveHkuY2hlY2tOb3ROdWxsKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFsbG93IG9ubHkgbm9uIHByaW1pdGl2ZSBvYmplY3RzXHJcbiAgICAgICAgICAgIHZhciBvayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihpbnN0YW5jZSkgJiZcclxuICAgICAgICAgICAgICAgIChfLmlzT2JqZWN0KGluc3RhbmNlKSAmJiAhUHJveHkuaXNQcmltaXRpdmVPYmplY3QoaW5zdGFuY2UpKSlcclxuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb2spXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCBcIkludmFsaWRQcm94eUFyZ3VtZW50IEV4Y2VwdGlvblwiLCBcIkFyZ3VtZW50IHNob3VsZCBiZSBhIG5vbiBwcmltaXRpdmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY2hlY2tOb3ROdWxsPFU+KGluc3RhbmNlOiBVKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmIChfLmlzTnVsbChpbnN0YW5jZSkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCBcIkludmFsaWRQcm94eUFyZ3VtZW50IEV4Y2VwdGlvblwiLCBcIkFyZ3VtZW50IGNhbm5vdCBiZSBudWxsXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaXNQcmltaXRpdmVPYmplY3Qob2JqOiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzQXJyYXkob2JqKSB8fFxyXG4gICAgICAgICAgICAgICAgXy5pc0RhdGUob2JqKSB8fFxyXG4gICAgICAgICAgICAgICAgXy5pc051bGwob2JqKSlcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmVNZXRob2RQcm94eShcclxuICAgICAgICAgICAgdGhhdDogT2JqZWN0LFxyXG4gICAgICAgICAgICBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcixcclxuICAgICAgICAgICAgaW5zdGFuY2U6IFQsXHJcbiAgICAgICAgICAgIHByb3BOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSB9KSB7XHJcblxyXG4gICAgICAgICAgICBwcm9wRGVzYy52YWx1ZSA9IFByb3h5Lm1ldGhvZFByb3h5VmFsdWUoaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wTmFtZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmluZVByb3BlcnR5KHRoYXQsIHByb3BOYW1lLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBtZXRob2RQcm94eVZhbHVlPFU+KFxyXG4gICAgICAgICAgICBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcixcclxuICAgICAgICAgICAgaW5zdGFuY2U6IFUsXHJcbiAgICAgICAgICAgIHByb3BOYW1lOiBzdHJpbmcpOiAoKSA9PiBhbnkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcHJveHkoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbmV3IE1ldGhvZEluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgTWV0aG9kSW52b2NhdGlvbihtZXRob2QsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcHJveHk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZVByb3BlcnR5UHJveHkoXHJcbiAgICAgICAgICAgIHRoYXQ6IE9iamVjdCxcclxuICAgICAgICAgICAgaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgICAgIGluc3RhbmNlOiBULFxyXG4gICAgICAgICAgICBwcm9wTmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBwcm9wVmFsdWU6IGFueSxcclxuICAgICAgICAgICAgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQcm94eSgpOiBhbnkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgR2V0dGVySW52b2NhdGlvbihtZXRob2QsIHByb3BWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5nZXQgPSBnZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFByb3h5KHY6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgU2V0dGVySW52b2NhdGlvbihtZXRob2QsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvcERlc2Muc2V0ID0gc2V0UHJveHk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmRlZmluZVByb3BlcnR5KHRoYXQsIHByb3BOYW1lLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZVByb3BlcnR5KG9iajogT2JqZWN0LCBuYW1lOiBzdHJpbmcsIGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwgZGVzYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgUHJveHlGYWN0b3J5IGltcGxlbWVudHMgSVByb3h5RmFjdG9yeSB7XHJcbiAgICAgICAgY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBwcm94eTogVCA9IDxUPjxhbnk+IFByb3h5Lm9mKGluc3RhbmNlLCBpbnRlcmNlcHRvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm94eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbENvbnRleHQudHMnIC8+IFxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbEludGVyY2VwdG9yLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJbnZvY2F0aW9uLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJUHJveHlDYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJUHJveHlGYWN0b3J5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nUHJveHlGYWN0b3J5LnRzJyAvPiIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbE1vY2s8VD4gZXh0ZW5kcyBJTW9jazxUPiB7XHJcbiAgICAgICAgbW9jazogTW9jazxUPjtcclxuICAgICAgICB0eXBlOiBHbG9iYWxUeXBlO1xyXG4gICAgICAgIGNvbnRhaW5lcjogT2JqZWN0O1xyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vY2s8VD4ge1xyXG4gICAgICAgIG9iamVjdDogVDtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgYmVoYXZpb3I6IE1vY2tCZWhhdmlvcjtcclxuICAgICAgICBjYWxsQmFzZTogYm9vbGVhbjtcclxuICAgICAgICBzZXR1cDxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pOiBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+O1xyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQ7XHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcblx0ZXhwb3J0IGVudW0gSW50ZXJjZXB0aW9uQWN0aW9uIHsgQ29udGludWUsIFN0b3AgfVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblx0XHRoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LFx0Y3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sXHRsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb247XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JDb250ZXh0PFQ+IHtcclxuXHRcdHByaXZhdGUgX2FjdHVhbEludm9jYXRpb25zOiBBcnJheTxwcm94eS5JQ2FsbENvbnRleHQ+ID0gW107XHJcblx0XHRwcml2YXRlIF9vcmRlcmVkQ2FsbHM6IEFycmF5PHByb3h5LklQcm94eUNhbGw8VD4+ID0gW107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHVibGljIGJlaGF2aW9yOiBNb2NrQmVoYXZpb3IsIHB1YmxpYyBtb2NrOiBJTW9jazxUPikgeyB9XHJcblxyXG5cdFx0YWRkSW52b2NhdGlvbihpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHsgdGhpcy5fYWN0dWFsSW52b2NhdGlvbnMucHVzaChpbnZvY2F0aW9uKTsgfVxyXG5cdFx0YWN0dWFsSW52b2NhdGlvbnMoKSB7IHJldHVybiB0aGlzLl9hY3R1YWxJbnZvY2F0aW9uczsgfVxyXG5cdFx0Y2xlYXJJbnZvY2F0aW9ucygpIHsgdGhpcy5fYWN0dWFsSW52b2NhdGlvbnMgPSBbXTsgfVxyXG5cclxuXHRcdGFkZE9yZGVyZWRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pIHsgdGhpcy5fb3JkZXJlZENhbGxzLnB1c2goY2FsbCk7IH1cclxuXHRcdHJlbW92ZU9yZGVyZWRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pIHtcclxuXHRcdFx0Xy5maWx0ZXIodGhpcy5fb3JkZXJlZENhbGxzLCAoeDogcHJveHkuSVByb3h5Q2FsbDxUPikgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB4LmlkICE9PSBjYWxsLmlkO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdG9yZGVyZWRDYWxscygpIHsgcmV0dXJuIHRoaXMuX29yZGVyZWRDYWxsczsgfVxyXG5cdH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvckV4ZWN1dGU8VD4gaW1wbGVtZW50cyBQcm94eS5JQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRvckNvbnRleHQ6IEludGVyY2VwdG9yQ29udGV4dDxUPjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoYmVoYXZpb3I6IE1vY2tCZWhhdmlvciwgbW9jazogSU1vY2s8VD4pIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0ID0gbmV3IEludGVyY2VwdG9yQ29udGV4dChiZWhhdmlvciwgbW9jayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaW50ZXJjZXB0b3JDb250ZXh0KCk6IEludGVyY2VwdG9yQ29udGV4dDxUPiB7IHJldHVybiB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxDdHggPSBuZXcgQ3VycmVudEludGVyY2VwdENvbnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIF8uc29tZSh0aGlzLmludGVyY2VwdGlvblN0cmF0ZWdpZXMoKSwgKHN0cmF0ZWd5OiBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChJbnRlcmNlcHRpb25BY3Rpb24uU3RvcCA9PT0gc3RyYXRlZ3kuaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb24sIHRoaXMuaW50ZXJjZXB0b3JDb250ZXh0LCBsb2NhbEN0eCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0LmFkZE9yZGVyZWRDYWxsKGNhbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5Q2FsbDxULCBUUmVzdWx0PihjYWxsOiBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+LCB0aW1lczogVGltZXMpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGFjdHVhbENhbGxzOiBBcnJheTxwcm94eS5JQ2FsbENvbnRleHQ+ID0gdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0LmFjdHVhbEludm9jYXRpb25zKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2FsbENvdW50ID0gXy5maWx0ZXIoYWN0dWFsQ2FsbHMsIGMgPT4gY2FsbC5tYXRjaGVzKGMpKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeShjYWxsQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRocm93VmVyaWZ5Q2FsbEV4Y2VwdGlvbihjYWxsLnNldHVwQ2FsbCwgdGltZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2ZXJpZnkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBvcmRlcmVkQ2FsbHM6IEFycmF5PHByb3h5LklQcm94eUNhbGw8VD4+ID0gdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0Lm9yZGVyZWRDYWxscygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZlcmlmaWFibGVzID0gXy5maWx0ZXIob3JkZXJlZENhbGxzLCBjID0+IGMuaXNWZXJpZmlhYmxlKTtcclxuICAgICAgICAgICAgdmFyIGludm9rZXMgPSBfLmZpbHRlcihvcmRlcmVkQ2FsbHMsIGMgPT4gYy5pc1ZlcmlmaWFibGUgJiYgYy5pc0ludm9rZWQpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRpbWVzID0gVGltZXMuZXhhY3RseSh2ZXJpZmlhYmxlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeShpbnZva2VzLmxlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRocm93VmVyaWZ5RXhjZXB0aW9uKHZlcmlmaWFibGVzLCB0aW1lcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludGVyY2VwdGlvblN0cmF0ZWdpZXMoKTogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4ge1xyXG4gICAgICAgICAgICB2YXIgc3RyYXRlZ2llczogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4gPSBbXHJcbiAgICAgICAgICAgICAgICBuZXcgQWRkQWN0dWFsSW52b2NhdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEV4dHJhY3RQcm94eUNhbGwoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFeGVjdXRlQ2FsbCgpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEludm9rZUJhc2UoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBIYW5kbGVNb2NrUmVjdXJzaW9uKClcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmF0ZWdpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRocm93VmVyaWZ5Q2FsbEV4Y2VwdGlvbihjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQsIHRpbWVzOiBUaW1lcykge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgY2FsbCwgXCJWZXJpZnlDYWxsIEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRocm93VmVyaWZ5RXhjZXB0aW9uKGZhaWx1cmVzOiBwcm94eS5JUHJveHlDYWxsPFQ+W10sIHRpbWVzOiBUaW1lcykge1xyXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgZmFpbHVyZXMsIFwiVmVyaWZ5IEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JTZXR1cDxUPiBpbXBsZW1lbnRzIFByb3h5LklDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdGVkQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG5cclxuICAgICAgICBnZXQgaW50ZXJjZXB0ZWRDYWxsKCkgeyByZXR1cm4gdGhpcy5faW50ZXJjZXB0ZWRDYWxsOyB9XHJcblxyXG4gICAgICAgIGludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ludGVyY2VwdGVkQ2FsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Nb3JlVGhhbk9uZVNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uLCBcIk1vcmVUaGFuT25lU2V0dXBFeHByZXNzaW9uIEV4Y2VwdGlvblwiLCBcIlNldHVwIHNob3VsZCBjb250YWluIG9ubHkgb25lIGV4cHJlc3Npb25cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdGVkQ2FsbCA9IGludm9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFkZEFjdHVhbEludm9jYXRpb248VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgY3R4LmFkZEludm9jYXRpb24oaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFeHRyYWN0UHJveHlDYWxsPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBvcmRlcmVkQ2FsbHMgPSBjdHgub3JkZXJlZENhbGxzKCkuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaW5kQ2FsbFByZWQgPSBjID0+IGMubWF0Y2hlcyhpbnZvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ0NhbGxzID0gXy5maWx0ZXIob3JkZXJlZENhbGxzLCBjID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kQ2FsbFByZWQoYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nQ2FsbHMubGVuZ3RoID4gMSkgICAvLyByZWNvcmQvcmVwbGF5IHNjZW5hcmlvIFxyXG4gICAgICAgICAgICAgICAgZmluZENhbGxQcmVkID0gYyA9PiAhYy5pc0ludm9rZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICBjLm1hdGNoZXMoaW52b2NhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBsb2NhbEN0eC5jYWxsID0gXy5maW5kKG9yZGVyZWRDYWxscywgYyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZENhbGxQcmVkKGMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhbEN0eC5jYWxsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsQ3R4LmNhbGwuZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY3R4LmJlaGF2aW9yID09IE1vY2tCZWhhdmlvci5TdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uTm9TZXR1cCwgaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFeGVjdXRlQ2FsbDxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2N0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+O1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudENhbGwgPSBsb2NhbEN0eC5jYWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRDYWxsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDYWxsLmV4ZWN1dGUoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLlN0b3A7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW52b2tlQmFzZTxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICBpZiAoY3R4Lm1vY2suY2FsbEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb24uaW52b2tlQmFzZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5TdG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBIYW5kbGVNb2NrUmVjdXJzaW9uPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIC8vVE9ETzogXHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJdCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGlzVmFsdWU8VD4oeDogVCk6IFQge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoVmFsdWUoeCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnlPYmplY3Q8VD4oeDogQ3RvcjxUPik6IFQge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55T2JqZWN0KHgpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55KCk6IGFueSB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueVN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55U3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnlOdW1iZXIoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueU51bWJlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+IGltcGxlbWVudHMgcHJveHkuSVByb3h5Q2FsbDxUPiwgYXBpLklWZXJpZmllcyB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgX2NhbGxDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByb3RlY3RlZCBfZXhwZWN0ZWRDYWxsQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2lzT25jZTogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX3NldHVwQ2FsbGJhY2s6IElBY3Rpb247XHJcbiAgICAgICAgcHJvdGVjdGVkIF9zZXR1cENhbGw6IHByb3h5LklDYWxsQ29udGV4dDtcclxuICAgICAgICBwcm90ZWN0ZWQgX3Rocm93bkV4Y2VwdGlvbjogZXJyb3IuRXhjZXB0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBfaXNWZXJpZmlhYmxlOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5OiBib29sZWFuO1xyXG4gICAgICAgIGZhaWxNZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgaXNJbnZva2VkOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9jazogTW9jazxUPiwgcHJpdmF0ZSBfc2V0dXBFeHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pIHtcclxuICAgICAgICAgICAgdGhpcy5faWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbnRlcmNlcHRvciA9IG5ldyBJbnRlcmNlcHRvclNldHVwKCk7XHJcbiAgICAgICAgICAgIHZhciBwcm94eSA9IE1vY2sucHJveHlGYWN0b3J5LmNyZWF0ZVByb3h5PFQ+KGludGVyY2VwdG9yLCBtb2NrLmluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIF9zZXR1cEV4cHJlc3Npb24ocHJveHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGludGVyY2VwdG9yLmludGVyY2VwdGVkQ2FsbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGljID0gaW50ZXJjZXB0b3IuaW50ZXJjZXB0ZWRDYWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBuZXdBcmdzID0gdGhpcy50cmFuc2Zvcm1Ub01hdGNoZXJzKGljLmFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld0FyZ3MsIFwiY2FsbGVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBpYy5hcmdzLmNhbGxlZSB9KTtcclxuICAgICAgICAgICAgICAgIGljLmFyZ3MgPSA8SUFyZ3VtZW50cz48YW55Pm5ld0FyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsID0gaWM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBFeHByZXNzaW9uLCBcIkludmFsaWRTZXR1cEV4cHJlc3Npb24gRXhjZXB0aW9uXCIsIFwiSW52YWxpZCBzZXR1cCBleHByZXNzaW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdlbmVyYXRlSWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk1ldGhvZENhbGw8XCIgKyBfLnVuaXF1ZUlkKCkgKyBcIj5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdHJhbnNmb3JtVG9NYXRjaGVycyhhcmdzOiBJQXJndW1lbnRzKTogQXJyYXk8bWF0Y2guSU1hdGNoPiB7XHJcbiAgICAgICAgICAgIHZhciBuZXdBcmdzOiBBcnJheTxtYXRjaC5JTWF0Y2g+ID0gW107XHJcblxyXG4gICAgICAgICAgICBfLmVhY2goYXJncywgYSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNPYmplY3QoYSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3QXJnID0gbmV3IG1hdGNoLk1hdGNoVmFsdWUoYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJncy5wdXNoKG5ld0FyZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoYVtDb25zLklNQVRDSF9NQVRDSEVTX05BTUVdKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5pc1VuZGVmaW5lZChhW0NvbnMuSU1BVENIX0lEX05BTUVdKSAmJiBhW0NvbnMuSU1BVENIX0lEX05BTUVdID09PSBDb25zLklNQVRDSF9JRF9WQUxVRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2goPG1hdGNoLklNYXRjaD5hKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZE1hdGNoZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLCBcIkludmFsaWRNYXRjaGVyIEV4Y2VwdGlvblwiLCBcIkludmFsaWQgbWF0Y2ggb2JqZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3QXJncztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5faWQ7IH1cclxuICAgICAgICBnZXQgY2FsbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jYWxsQ291bnQ7IH1cclxuICAgICAgICBnZXQgc2V0dXBFeHByZXNzaW9uKCk6IElBY3Rpb24xPFQ+IHsgcmV0dXJuIHRoaXMuX3NldHVwRXhwcmVzc2lvbjsgfVxyXG4gICAgICAgIGdldCBzZXR1cENhbGwoKTogcHJveHkuSUNhbGxDb250ZXh0IHsgcmV0dXJuIHRoaXMuX3NldHVwQ2FsbDsgfVxyXG4gICAgICAgIGdldCBpc1ZlcmlmaWFibGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc1ZlcmlmaWFibGU7IH1cclxuXHJcbiAgICAgICAgZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmFsdWF0ZWRTdWNjZXNzZnVsbHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVByb3h5Q2FsbFxyXG5cclxuICAgICAgICBtYXRjaGVzKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR1cENhbGwucHJvcGVydHkgJiYgY2FsbCAmJiBjYWxsLnByb3BlcnR5ICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGwucHJvcGVydHkubmFtZSA9PT0gY2FsbC5wcm9wZXJ0eS5uYW1lKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NldHVwQ2FsbC5hcmdzLmxlbmd0aCA9PT0gY2FsbC5hcmdzLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnNldHVwQ2FsbC5hcmdzLCAoeCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNldHVwQXJnID0gPG1hdGNoLklNYXRjaD54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbEFyZyA9IGNhbGwuYXJnc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgIXNldHVwQXJnLl9fX21hdGNoZXMoY2FsbEFyZykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhlY3V0ZShjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5pc0ludm9rZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NldHVwQ2FsbGJhY2sgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsYmFjay5hcHBseSh0aGlzLCBjYWxsLmFyZ3MpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fdGhyb3duRXhjZXB0aW9uICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRoaXMuX3Rocm93bkV4Y2VwdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY2FsbENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNPbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGltZXMgPSBUaW1lcy5hdE1vc3RPbmNlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aW1lcy52ZXJpZnkodGhpcy5fY2FsbENvdW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uTW9yZVRoYW5PbmVDYWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLCBcIk1vcmVUaGFuT25lQ2FsbCBFeGNlcHRpb25cIiwgdGltZXMuZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZXhwZWN0ZWRDYWxsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lcyA9IFRpbWVzLmV4YWN0bHkodGhpcy5fZXhwZWN0ZWRDYWxsQ291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghdGltZXMudmVyaWZ5KHRoaXMuX2NhbGxDb3VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLk1vcmVUaGFuTkNhbGxzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLCBcIk1vcmVUaGFuTkNhbGxzIEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElUaHJvd3NSZXN1bHRcclxuXHJcbiAgICAgICAgdmVyaWZpYWJsZShmYWlsTWVzc2FnZT86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1ZlcmlmaWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZmFpbE1lc3NhZ2UgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFpbE1lc3NhZ2UgPSBmYWlsTWVzc2FnZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4gZXh0ZW5kcyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+IGltcGxlbWVudHMgYXBpLklTZXR1cDxULCBUUmVzdWx0PiwgYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9yZXR1cm5WYWx1ZUZ1bmM6IElGdW5jTjxhbnksIFRSZXN1bHQ+O1xyXG4gICAgICAgIGhhc1JldHVyblZhbHVlOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfY2FsbEJhc2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG1vY2s6IE1vY2s8VD4sIHNldHVwRXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG1vY2ssIHNldHVwRXhwcmVzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvdmVycmlkZXNcclxuXHJcbiAgICAgICAgZXhlY3V0ZShjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuZXhlY3V0ZShjYWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsQmFzZSlcclxuICAgICAgICAgICAgICAgIGNhbGwuaW52b2tlQmFzZSgpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuaGFzUmV0dXJuVmFsdWUpXHJcbiAgICAgICAgICAgICAgICBjYWxsLnJldHVyblZhbHVlID0gdGhpcy5fcmV0dXJuVmFsdWVGdW5jLmFwcGx5KHRoaXMsIGNhbGwuYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJU2V0dXBcclxuXHJcbiAgICAgICAgY2FsbGJhY2soYWN0aW9uOiBJQWN0aW9uTjxhbnk+KTogYXBpLklSZXR1cm5zVGhyb3dzPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsYmFjayA9IGFjdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvd3MoZXhjZXB0aW9uOiBFcnJvcik6IGFwaS5JVGhyb3dzUmVzdWx0IHtcclxuICAgICAgICAgICAgdGhpcy5fdGhyb3duRXhjZXB0aW9uID0gZXhjZXB0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybnModmFsdWVGdW5jOiBJRnVuY048YW55LCBUUmVzdWx0Pik6IGFwaS5JUmV0dXJuc1Jlc3VsdDxUPiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JldHVyblZhbHVlRnVuYyA9IHZhbHVlRnVuYztcclxuICAgICAgICAgICAgdGhpcy5oYXNSZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsbEJhc2UoKTogYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbEJhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElSZXR1cm5zUmVzdWx0XHJcblxyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGVudW0gTW9ja0JlaGF2aW9yIHsgTG9vc2UsIFN0cmljdCB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vY2s8VD4gaW1wbGVtZW50cyBJTW9jazxUPiB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBwcm94eUZhY3Rvcnk6IHByb3h5LklQcm94eUZhY3RvcnkgPSBuZXcgVHlwZU1vcUludGVybi5Qcm94eS5Qcm94eUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBfaW50ZXJjZXB0b3I6IEludGVyY2VwdG9yRXhlY3V0ZTxUPjtcclxuICAgICAgICBwcml2YXRlIF9wcm94eTogVDtcclxuICAgICAgICBwcml2YXRlIF9jYWxsQmFzZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIGluc3RhbmNlOiBULCBwcml2YXRlIF9iZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gdGhpcy5nZXROYW1lT2YoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvciA9IG5ldyBJbnRlcmNlcHRvckV4ZWN1dGUodGhpcy5fYmVoYXZpb3IsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm94eSA9IE1vY2sucHJveHlGYWN0b3J5LmNyZWF0ZVByb3h5PFQ+KHRoaXMuX2ludGVyY2VwdG9yLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZJbnN0YW5jZTxVPihpbnN0YW5jZTogVSwgYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UpOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgdmFyIG1vY2sgPSBuZXcgTW9jayhpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9jaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZlR5cGU8VT4oY3RvcjogQ3RvcldpdGhBcmdzPFU+LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSwgLi4uY3RvckFyZ3M6IGFueVtdKTogTW9jazxVPiB7XHJcbiAgICAgICAgICAgIHZhciBtb2NrOiBNb2NrPFU+ID0gTW9jay5vZlR5cGUyKGN0b3IsIGN0b3JBcmdzLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mVHlwZTI8VT4oY3RvcjogQ3RvcldpdGhBcmdzPFU+LCBjdG9yQXJnczogYW55W10sIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKTogTW9jazxVPiB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZTogVSA9IFV0aWxzLmNvbnRodW5rdG9yKGN0b3IsIGN0b3JBcmdzKTtcclxuICAgICAgICAgICAgdmFyIG1vY2s6IE1vY2s8VT4gPSBuZXcgTW9jayhpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9jaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLl9wcm94eTsgfVxyXG5cclxuICAgICAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cclxuICAgICAgICBnZXQgYmVoYXZpb3IoKSB7IHJldHVybiB0aGlzLl9iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLl9jYWxsQmFzZTsgfVxyXG4gICAgICAgIHNldCBjYWxsQmFzZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9jYWxsQmFzZSA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdGVJZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTW9jazxcIiArIF8udW5pcXVlSWQoKSArIFwiPlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXROYW1lT2YoaW5zdGFuY2U6IFQpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbHMuZnVuY3Rpb25OYW1lKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfLmlzT2JqZWN0KGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN0b3IgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFV0aWxzLmZ1bmN0aW9uTmFtZShjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC50cmltKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0dXBcclxuXHJcbiAgICAgICAgc2V0dXA8VFJlc3VsdD4oZXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KTogTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsID0gbmV3IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4odGhpcywgZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLmFkZENhbGwoY2FsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgY2FsbCA9IG5ldyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+KHRoaXMsIGV4cHJlc3Npb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci5hZGRDYWxsKGNhbGwpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IudmVyaWZ5Q2FsbChjYWxsLCB0aW1lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLnZlcmlmeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVzIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgTk9fTUFUQ0hJTkdfQ0FMTFNfRVhBQ1RMWV9OX1RJTUVTID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIDwlPSBuICU+IHRpbWVzLCBpbnZva2VkIDwlPSBtICU+IHRpbWVzXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTEVBU1RfT05DRSA9IFwiRXhwZWN0ZWQgaW52b2NhdGlvbiBvbiB0aGUgbW9jayBhdCBsZWFzdCBvbmNlXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTU9TVF9PTkNFID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIGF0IG1vc3Qgb25jZVwiO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9sYXN0Q2FsbENvdW50O1xyXG4gICAgICAgIHByaXZhdGUgX2ZhaWxNZXNzYWdlO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb25kaXRpb246IElGdW5jMjxudW1iZXIsIGJvb2xlYW4+LFxyXG4gICAgICAgICAgICBwcml2YXRlIF9mcm9tOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHByaXZhdGUgX3RvOiBudW1iZXIsXHJcbiAgICAgICAgICAgIGZhaWxNZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmFpbE1lc3NhZ2UgPSBfLnRlbXBsYXRlKGZhaWxNZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBmYWlsTWVzc2FnZSgpIHsgcmV0dXJuIHRoaXMuX2ZhaWxNZXNzYWdlKHsgbjogdGhpcy5fZnJvbSwgbTogdGhpcy5fbGFzdENhbGxDb3VudCB9KTsgfVxyXG5cclxuICAgICAgICB2ZXJpZnkoY2FsbENvdW50OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdENhbGxDb3VudCA9IGNhbGxDb3VudDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbihjYWxsQ291bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGV4YWN0bHkobjogbnVtYmVyKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzKGMgPT4gYyA9PT0gbiwgbiwgbiwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfRVhBQ1RMWV9OX1RJTUVTKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBuZXZlcigpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW1lcy5leGFjdGx5KDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9uY2UoKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gVGltZXMuZXhhY3RseSgxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBhdExlYXN0T25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID49IDEsIDEsIE51bWJlci5NQVhfVkFMVUUsIFRpbWVzLk5PX01BVENISU5HX0NBTExTX0FUX0xFQVNUX09OQ0UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGF0TW9zdE9uY2UoKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzKGMgPT4gYyA+PSAwICYmIGMgPD0gMSwgMCwgMSwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTU9TVF9PTkNFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL3VuZGVyc2NvcmUvdW5kZXJzY29yZS5kLnRzJyAvPiBcclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0FwaS9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdDb21tb24vX2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nRXJyb3IvX2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTWF0Y2gvX2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nUHJveHkvX2FsbC50cycgLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0NvbnN0YW50cy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQ3VycmVudEludGVyY2VwdENvbnRleHQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0dsb2JhbE1vY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0dsb2JhbFNjb3BlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJR2xvYmFsTW9jay50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSU1vY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludGVyY2VwdG9yQ29udGV4dC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSW50ZXJjZXB0b3JFeGVjdXRlLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJbnRlcmNlcHRvclNldHVwLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJbnRlcmNlcHRvclN0cmF0ZWdpZXMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0l0LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNZXRob2RDYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNZXRob2RDYWxsUmV0dXJuLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNb2NrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdUaW1lcy50cycgLz5cclxuXHJcbmltcG9ydCBhcGkgICAgID0gVHlwZU1vcUludGVybi5BcGk7XHJcbmltcG9ydCBlcnJvciAgID0gVHlwZU1vcUludGVybi5FcnJvcjtcclxuaW1wb3J0IG1hdGNoICAgPSBUeXBlTW9xSW50ZXJuLk1hdGNoO1xyXG5pbXBvcnQgcHJveHkgICA9IFR5cGVNb3FJbnRlcm4uUHJveHk7IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2xvYmFsU2NvcGUgaW1wbGVtZW50cyBhcGkuSVVzaW5nUmVzdWx0IHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfYXJnczogSUdsb2JhbE1vY2s8YW55PltdKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgdXNpbmcoLi4uYXJnczogSUdsb2JhbE1vY2s8YW55PltdKTogYXBpLklVc2luZ1Jlc3VsdCB7XHJcbiAgICAgICAgICAgIHZhciBzY29wZSA9IG5ldyBHbG9iYWxTY29wZShhcmdzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNjb3BlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2l0aChhY3Rpb246IElBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGluaXRpYWw6IEFycmF5PFByb3BlcnR5RGVzY3JpcHRvcj4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5fYXJncywgYSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChhLmNvbnRhaW5lclthLm5hbWVdKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lclByb3BzID0gUHJvcGVydHlSZXRyaWV2ZXIuZ2V0T3duQW5kUHJvdG90eXBlRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhhLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9wID0gXy5maW5kKGNvbnRhaW5lclByb3BzLCBwID0+IHAubmFtZSA9PT0gYS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxbYS5uYW1lXSA9IHByb3AuZGVzYztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYS50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLkNsYXNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmV0dXJuIGEgbmV3IG1vY2sgZXZlcnkgdGltZSB3aXRoIHNhbWUgaW50ZXJjZXB0b3IgYXMgdGhlIG9uZSB1c2VkIGJ5IG1vY2sgcGFzc2VkIGluIGFzIGFyZyB0byAndXNpbmcnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgKHRvIHN1cHBvcnQgZGlmZmVyZW50IGN0b3IgYXJndW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MudmFsdWUgPSAoKSA9PiBhLm1vY2sub2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5GdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlID0gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuVmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy5nZXQgPSAoKSA9PiBhLm1vY2sub2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Vbmtub3duR2xvYmFsVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSwgXCJVbmtub3duR2xvYmFsVHlwZSBFeGNlcHRpb25cIiwgXCJ1bmtub3duIGdsb2JhbCB0eXBlOiBcIiArIGEudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYS5jb250YWluZXIsIGEubmFtZSwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMTogXCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGlvbi5hcHBseSh0aGlzLCB0aGlzLl9hcmdzKTtcclxuXHJcbiAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5fYXJncywgYSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGEubW9jay5pbnN0YW5jZSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBpbml0aWFsW2EubmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYS50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5DbGFzczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5GdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5WYWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy5jb25maWd1cmFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLmNvbnRhaW5lciwgYS5uYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjI6IFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbmludGVyZmFjZSBJVHlwZU1vcSB7XHJcbiAgICBNb2NrOiB0eXBlb2YgVHlwZU1vcUludGVybi5Nb2NrO1xyXG4gICAgTW9ja0JlaGF2aW9yOiB0eXBlb2YgVHlwZU1vcUludGVybi5Nb2NrQmVoYXZpb3I7XHJcbiAgICBJdDogdHlwZW9mIFR5cGVNb3FJbnRlcm4uSXQ7XHJcbiAgICBUaW1lczogdHlwZW9mIFR5cGVNb3FJbnRlcm4uVGltZXM7XHJcbiAgICBHbG9iYWxNb2NrOiB0eXBlb2YgVHlwZU1vcUludGVybi5HbG9iYWxNb2NrO1xyXG4gICAgR2xvYmFsU2NvcGU6IHR5cGVvZiBUeXBlTW9xSW50ZXJuLkdsb2JhbFNjb3BlO1xyXG4gICAgTW9ja0V4Y2VwdGlvbjogdHlwZW9mIFR5cGVNb3FJbnRlcm4uRXJyb3IuTW9ja0V4Y2VwdGlvbjtcclxufVxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGltcG9ydCBNb2NrID0gVHlwZU1vcUludGVybi5Nb2NrO1xyXG4gICAgZXhwb3J0IGltcG9ydCBNb2NrQmVoYXZpb3IgPSBUeXBlTW9xSW50ZXJuLk1vY2tCZWhhdmlvcjtcclxuICAgIGV4cG9ydCBpbXBvcnQgSXQgPSBUeXBlTW9xSW50ZXJuLkl0O1xyXG4gICAgZXhwb3J0IGltcG9ydCBUaW1lcyA9IFR5cGVNb3FJbnRlcm4uVGltZXM7XHJcbiAgICBleHBvcnQgaW1wb3J0IEdsb2JhbE1vY2sgPSBUeXBlTW9xSW50ZXJuLkdsb2JhbE1vY2s7XHJcbiAgICBleHBvcnQgaW1wb3J0IEdsb2JhbFNjb3BlID0gVHlwZU1vcUludGVybi5HbG9iYWxTY29wZTtcclxuICAgIGV4cG9ydCBpbXBvcnQgTW9ja0V4Y2VwdGlvbiA9IFR5cGVNb3FJbnRlcm4uRXJyb3IuTW9ja0V4Y2VwdGlvbjtcclxufVxyXG5cclxuZGVjbGFyZSB2YXIgdHlwZW1vcTogSVR5cGVNb3E7XHJcbnR5cGVtb3EgPSBUeXBlTW9xOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL25vZGUvbm9kZS5kLnRzJyAvPiBcclxuXHJcbmlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgdmFyIF86IFVuZGVyc2NvcmVTdGF0aWMgPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVtb3E7XHJcbiAgICB9XHJcbiAgICBleHBvcnRzLnR5cGVtb3EgPSB0eXBlbW9xO1xyXG59IGVsc2Uge1xyXG4gICAgdGhpcy50eXBlbW9xID0gdHlwZW1vcTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
