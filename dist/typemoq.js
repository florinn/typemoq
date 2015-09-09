var TypeMoq;
(function (TypeMoq) {
    var Cons = (function () {
        function Cons() {
        }
        Cons.IMATCH_ID_VALUE = "438A51D3-6864-49D7-A655-CA1153B86965";
        Cons.IMATCH_ID_NAME = "___id";
        Cons.IMATCH_MATCHES_NAME = "___matches";
        return Cons;
    })();
    TypeMoq.Cons = Cons;
})(TypeMoq || (TypeMoq = {}));


var TypeMoq;
(function (TypeMoq) {
    var CurrentInterceptContext = (function () {
        function CurrentInterceptContext() {
        }
        return CurrentInterceptContext;
    })();
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
            if (behavior === void 0) { behavior = 0 /* Loose */; }
            var mock = TypeMoq.Mock.ofInstance(instance, behavior);
            var type = _.isFunction(instance) ? 1 /* Function */ : 2 /* Value */;
            return new GlobalMock(mock, name, type, container);
        };
        GlobalMock.ofType = function (ctor, container, behavior) {
            if (container === void 0) { container = window; }
            if (behavior === void 0) { behavior = 0 /* Loose */; }
            var instance = new ctor();
            var mock = TypeMoq.Mock.ofInstance(instance, behavior);
            return new GlobalMock(mock, name, 0 /* Class */, container);
        };
        Object.defineProperty(GlobalMock.prototype, "object", {
            get: function () {
                return this.mock.object;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "name", {
            get: function () {
                return this._name || this.mock.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "behavior", {
            get: function () {
                return this.mock.behavior;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "callBase", {
            get: function () {
                return this.mock.callBase;
            },
            set: function (value) {
                this.mock.callBase = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GlobalMock.prototype, "type", {
            get: function () {
                return this._type;
            },
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
    })();
    TypeMoq.GlobalMock = GlobalMock;
})(TypeMoq || (TypeMoq = {}));




















/// <reference path='ICallback.ts' />
/// <reference path='IReturns.ts' />
/// <reference path='ISetup.ts' />
/// <reference path='IThrows.ts' />
/// <reference path='IUsing.ts' />
/// <reference path='IVerifies.ts' />   








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
    })();
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
                var Temp = function () {
                }, inst, ret;
                Temp.prototype = ctor.prototype;
                inst = new Temp();
                if (_.isFunction(ctor))
                    ret = ctor.apply(inst, args);
                return _.isObject(ret) ? ret : inst;
            })();
        };
        return Utils;
    })();
    TypeMoq.Utils = Utils;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='Ctor.ts' />
/// <reference path='Func.ts' />
/// <reference path='PropertyRetriever.ts' />
/// <reference path='Utils.ts' /> 


var TypeMoq;
(function (TypeMoq) {
    var Error;
    (function (Error) {
        var Exception = (function () {
            function Exception(name, message) {
                this.name = name;
                this.message = message;
            }
            Exception.prototype.toString = function () {
                return name;
            };
            return Exception;
        })();
        Error.Exception = Exception;
    })(Error = TypeMoq.Error || (TypeMoq.Error = {}));
})(TypeMoq || (TypeMoq = {}));


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
        })(Error.Exception);
        Error.MockException = MockException;
    })(Error = TypeMoq.Error || (TypeMoq.Error = {}));
})(TypeMoq || (TypeMoq = {}));


/// <reference path='Exception.ts' /> 
/// <reference path='MockException.ts' /> 





/// <reference path='_all.ts' />
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
        })();
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
        })();
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
        })();
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
        })();
        Match.MatchAnyNumber = MatchAnyNumber;
    })(Match = TypeMoq.Match || (TypeMoq.Match = {}));
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />
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
        })();
        Match.MatchValue = MatchValue;
    })(Match = TypeMoq.Match || (TypeMoq.Match = {}));
})(TypeMoq || (TypeMoq = {}));


/// <reference path='IMatch.ts' />
/// <reference path='MatchAny.ts' />
/// <reference path='MatchValue.ts' /> 


/// <reference path='_all.ts' />


/// <reference path='_all.ts' />


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
                get: function () {
                    return this._args || { length: 0, callee: null };
                },
                set: function (value) {
                    this._args = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MethodInvocation.prototype, "property", {
                get: function () {
                    return this._property;
                },
                enumerable: true,
                configurable: true
            });
            MethodInvocation.prototype.invokeBase = function () {
                this.returnValue = this._property.toFunc.apply(this._property.obj, this._args);
            };
            return MethodInvocation;
        })();
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
                set: function (value) {
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GetterInvocation.prototype, "property", {
                get: function () {
                    return this._property;
                },
                enumerable: true,
                configurable: true
            });
            GetterInvocation.prototype.invokeBase = function () {
            };
            return GetterInvocation;
        })();
        Proxy.GetterInvocation = GetterInvocation;
        var SetterInvocation = (function () {
            function SetterInvocation(_property, _args) {
                this._property = _property;
                this._args = _args;
            }
            Object.defineProperty(SetterInvocation.prototype, "args", {
                get: function () {
                    return this._args;
                },
                set: function (value) {
                    this._args = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SetterInvocation.prototype, "property", {
                get: function () {
                    return this._property;
                },
                enumerable: true,
                configurable: true
            });
            SetterInvocation.prototype.invokeBase = function () {
                this.returnValue = this._property.obj[this._property.name] = this._args[0];
            };
            return SetterInvocation;
        })();
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
        })();
        Proxy.MethodInfo = MethodInfo;
        var PropertyInfo = (function () {
            function PropertyInfo(obj, name) {
                this.obj = obj;
                this.name = name;
            }
            return PropertyInfo;
        })();
        Proxy.PropertyInfo = PropertyInfo;
    })(Proxy = TypeMoq.Proxy || (TypeMoq.Proxy = {}));
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />


/// <reference path='_all.ts' />


/// <reference path='_all.ts' />
var TypeMoq;
(function (TypeMoq) {
    var Proxy;
    (function (_Proxy) {
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
                if (_.isFunction(instance) || (_.isObject(instance) && !Proxy.isPrimitiveObject(instance)))
                    ok = true;
                if (!ok)
                    throw new error.MockException(4 /* InvalidProxyArgument */, instance, "InvalidProxyArgument Exception", "Argument should be a function or a non primitive object");
            };
            Proxy.prototype.check = function (instance) {
                Proxy.checkNotNull(instance);
                // allow only non primitive objects
                var ok = false;
                if (!_.isFunction(instance) && (_.isObject(instance) && !Proxy.isPrimitiveObject(instance)))
                    ok = true;
                if (!ok)
                    throw new error.MockException(4 /* InvalidProxyArgument */, instance, "InvalidProxyArgument Exception", "Argument should be a non primitive object");
            };
            Proxy.checkNotNull = function (instance) {
                if (_.isNull(instance))
                    throw new error.MockException(4 /* InvalidProxyArgument */, instance, "InvalidProxyArgument Exception", "Argument cannot be null");
            };
            Proxy.isPrimitiveObject = function (obj) {
                var result = false;
                if (_.isFunction(obj) || _.isArray(obj) || _.isDate(obj) || _.isNull(obj))
                    result = true;
                return result;
            };
            Proxy.prototype.defineMethodProxy = function (that, interceptor, instance, propName, propDesc) {
                if (propDesc === void 0) { propDesc = { configurable: false, enumerable: true, writable: false }; }
                propDesc.value = Proxy.methodProxyValue(interceptor, instance, propName);
                this.defineProperty(that, propName, propDesc);
            };
            Proxy.methodProxyValue = function (interceptor, instance, propName) {
                return function () {
                    var method = new _Proxy.MethodInfo(instance, propName);
                    var invocation = new _Proxy.MethodInvocation(method, arguments);
                    interceptor.intercept(invocation);
                    return invocation.returnValue;
                };
            };
            Proxy.prototype.definePropertyProxy = function (that, interceptor, instance, propName, propValue, propDesc) {
                if (propDesc === void 0) { propDesc = { configurable: false, enumerable: true }; }
                propDesc.get = function () {
                    var method = new _Proxy.PropertyInfo(instance, propName);
                    var invocation = new _Proxy.GetterInvocation(method, propValue);
                    interceptor.intercept(invocation);
                    return invocation.returnValue;
                };
                propDesc.set = function (v) {
                    var method = new _Proxy.PropertyInfo(instance, propName);
                    var invocation = new _Proxy.SetterInvocation(method, arguments);
                    interceptor.intercept(invocation);
                };
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
        })();
        _Proxy.Proxy = Proxy;
    })(Proxy = TypeMoq.Proxy || (TypeMoq.Proxy = {}));
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />
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
        })();
        Proxy.ProxyFactory = ProxyFactory;
    })(Proxy = TypeMoq.Proxy || (TypeMoq.Proxy = {}));
})(TypeMoq || (TypeMoq = {}));


/// <reference path='ICallContext.ts' /> 
/// <reference path='ICallInterceptor.ts' />
/// <reference path='Invocation.ts' />
/// <reference path='IProxyCall.ts' />
/// <reference path='IProxyFactory.ts' />
/// <reference path='Proxy.ts' />
/// <reference path='ProxyFactory.ts' /> 








/// <reference path='_all.ts' />
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
        InterceptorContext.prototype.addInvocation = function (invocation) {
            this._actualInvocations.push(invocation);
        };
        InterceptorContext.prototype.actualInvocations = function () {
            return this._actualInvocations;
        };
        InterceptorContext.prototype.clearInvocations = function () {
            this._actualInvocations = [];
        };
        InterceptorContext.prototype.addOrderedCall = function (call) {
            this._orderedCalls.push(call);
        };
        InterceptorContext.prototype.removeOrderedCall = function (call) {
            _.filter(this._orderedCalls, function (x) {
                return x.id !== call.id;
            });
        };
        InterceptorContext.prototype.orderedCalls = function () {
            return this._orderedCalls;
        };
        return InterceptorContext;
    })();
    TypeMoq.InterceptorContext = InterceptorContext;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />
var TypeMoq;
(function (TypeMoq) {
    var InterceptorExecute = (function () {
        function InterceptorExecute(behavior, mock) {
            this._interceptorContext = new TypeMoq.InterceptorContext(behavior, mock);
        }
        Object.defineProperty(InterceptorExecute.prototype, "interceptorContext", {
            get: function () {
                return this._interceptorContext;
            },
            enumerable: true,
            configurable: true
        });
        InterceptorExecute.prototype.intercept = function (invocation) {
            var _this = this;
            var localCtx = new TypeMoq.CurrentInterceptContext();
            _.some(this.interceptionStrategies(), function (strategy) {
                if (1 /* Stop */ === strategy.handleIntercept(invocation, _this.interceptorContext, localCtx)) {
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
            var e = new error.MockException(6 /* VerificationFailed */, call, "VerifyCall Exception", times.failMessage);
            throw e;
        };
        InterceptorExecute.prototype.throwVerifyException = function (failures, times) {
            var e = new error.MockException(6 /* VerificationFailed */, failures, "Verify Exception", times.failMessage);
            throw e;
        };
        return InterceptorExecute;
    })();
    TypeMoq.InterceptorExecute = InterceptorExecute;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />
var TypeMoq;
(function (TypeMoq) {
    var InterceptorSetup = (function () {
        function InterceptorSetup() {
        }
        Object.defineProperty(InterceptorSetup.prototype, "interceptedCall", {
            get: function () {
                return this._interceptedCall;
            },
            enumerable: true,
            configurable: true
        });
        InterceptorSetup.prototype.intercept = function (invocation) {
            if (this._interceptedCall) {
                throw new error.MockException(1 /* MoreThanOneSetupExpression */, invocation, "MoreThanOneSetupExpression Exception", "Setup should contain only one expression");
            }
            this._interceptedCall = invocation;
        };
        return InterceptorSetup;
    })();
    TypeMoq.InterceptorSetup = InterceptorSetup;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />
var TypeMoq;
(function (TypeMoq) {
    var AddActualInvocation = (function () {
        function AddActualInvocation() {
        }
        AddActualInvocation.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            ctx.addInvocation(invocation);
            return 0 /* Continue */;
        };
        return AddActualInvocation;
    })();
    TypeMoq.AddActualInvocation = AddActualInvocation;
    var ExtractProxyCall = (function () {
        function ExtractProxyCall() {
        }
        ExtractProxyCall.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            var reversedOrderedCalls = ctx.orderedCalls().reverse();
            localCtx.call = _.find(reversedOrderedCalls, function (c) {
                return c.matches(invocation);
            });
            if (localCtx.call != null) {
                localCtx.call.evaluatedSuccessfully();
            }
            else if (ctx.behavior == 1 /* Strict */) {
                throw new error.MockException(0 /* NoSetup */, invocation);
            }
            return 0 /* Continue */;
        };
        return ExtractProxyCall;
    })();
    TypeMoq.ExtractProxyCall = ExtractProxyCall;
    var ExecuteCall = (function () {
        function ExecuteCall() {
        }
        ExecuteCall.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            this._ctx = ctx;
            var currentCall = localCtx.call;
            if (currentCall != null) {
                currentCall.execute(invocation);
                return 1 /* Stop */;
            }
            return 0 /* Continue */;
        };
        return ExecuteCall;
    })();
    TypeMoq.ExecuteCall = ExecuteCall;
    var InvokeBase = (function () {
        function InvokeBase() {
        }
        InvokeBase.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            if (ctx.mock.callBase) {
                invocation.invokeBase();
                return 1 /* Stop */;
            }
            return 0 /* Continue */;
        };
        return InvokeBase;
    })();
    TypeMoq.InvokeBase = InvokeBase;
    var HandleMockRecursion = (function () {
        function HandleMockRecursion() {
        }
        HandleMockRecursion.prototype.handleIntercept = function (invocation, ctx, localCtx) {
            //TODO: 
            return 0 /* Continue */;
        };
        return HandleMockRecursion;
    })();
    TypeMoq.HandleMockRecursion = HandleMockRecursion;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />
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
    })();
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
                throw new error.MockException(2 /* InvalidSetupExpression */, this._setupExpression, "InvalidSetupExpression Exception", "Invalid setup expression");
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
                    if (!_.isUndefined(a[TypeMoq.Cons.IMATCH_MATCHES_NAME]) && !_.isUndefined(a[TypeMoq.Cons.IMATCH_ID_NAME]) && a[TypeMoq.Cons.IMATCH_ID_NAME] === TypeMoq.Cons.IMATCH_ID_VALUE) {
                        newArgs.push(a);
                    }
                    else {
                        throw new error.MockException(3 /* InvalidMatcher */, a, "InvalidMatcher Exception", "Invalid match object");
                    }
                }
            });
            return newArgs;
        };
        Object.defineProperty(MethodCall.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "callCount", {
            get: function () {
                return this._callCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "setupExpression", {
            get: function () {
                return this._setupExpression;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "setupCall", {
            get: function () {
                return this._setupCall;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "isVerifiable", {
            get: function () {
                return this._isVerifiable;
            },
            enumerable: true,
            configurable: true
        });
        MethodCall.prototype.evaluatedSuccessfully = function () {
            this._evaluatedSuccessfully = true;
        };
        // IProxyCall
        MethodCall.prototype.matches = function (call) {
            var match = false;
            if (this._setupCall.property && call && call.property && this._setupCall.property.name === call.property.name) {
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
                    throw new error.MockException(7 /* MoreThanOneCall */, this, "MoreThanOneCall Exception", times.failMessage);
                }
            }
            if (this._expectedCallCount) {
                var times = TypeMoq.Times.exactly(this._expectedCallCount);
                if (!times.verify(this._callCount)) {
                    throw new error.MockException(8 /* MoreThanNCalls */, this, "MoreThanNCalls Exception", times.failMessage);
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
    })();
    TypeMoq.MethodCall = MethodCall;
})(TypeMoq || (TypeMoq = {}));


var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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
    })(TypeMoq.MethodCall);
    TypeMoq.MethodCallReturn = MethodCallReturn;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='_all.ts' />
var TypeMoq;
(function (TypeMoq) {
    (function (MockBehavior) {
        MockBehavior[MockBehavior["Loose"] = 0] = "Loose";
        MockBehavior[MockBehavior["Strict"] = 1] = "Strict";
    })(TypeMoq.MockBehavior || (TypeMoq.MockBehavior = {}));
    var MockBehavior = TypeMoq.MockBehavior;
    var Mock = (function () {
        function Mock(instance, _behavior) {
            if (_behavior === void 0) { _behavior = 0 /* Loose */; }
            this.instance = instance;
            this._behavior = _behavior;
            this._id = this.generateId();
            this._name = this.getNameOf(instance);
            this._interceptor = new TypeMoq.InterceptorExecute(this._behavior, this);
            this._proxy = Mock.proxyFactory.createProxy(this._interceptor, instance);
        }
        Mock.ofInstance = function (instance, behavior) {
            if (behavior === void 0) { behavior = 0 /* Loose */; }
            var mock = new Mock(instance, behavior);
            return mock;
        };
        Mock.ofType = function (ctor, behavior) {
            if (behavior === void 0) { behavior = 0 /* Loose */; }
            var ctorArgs = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                ctorArgs[_i - 2] = arguments[_i];
            }
            var mock = Mock.ofType2(ctor, ctorArgs, behavior);
            return mock;
        };
        Mock.ofType2 = function (ctor, ctorArgs, behavior) {
            if (behavior === void 0) { behavior = 0 /* Loose */; }
            var instance = TypeMoq.Utils.conthunktor(ctor, ctorArgs);
            var mock = new Mock(instance, behavior);
            return mock;
        };
        Object.defineProperty(Mock.prototype, "object", {
            get: function () {
                return this._proxy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mock.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mock.prototype, "behavior", {
            get: function () {
                return this._behavior;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Mock.prototype, "callBase", {
            get: function () {
                return this._callBase;
            },
            set: function (value) {
                this._callBase = value;
            },
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
    })();
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
            get: function () {
                return this._failMessage({ n: this._from, m: this._lastCallCount });
            },
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
    })();
    TypeMoq.Times = Times;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='../bower_components/DefinitelyTyped/underscore/underscore.d.ts' /> 
var error = TypeMoq.Error;
var match = TypeMoq.Match;
var proxy = TypeMoq.Proxy;


/// <reference path='_all.ts' />
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
                            case 0 /* Class */:
                                //TODO: return a new mock every time with same interceptor as the one used by mock passed in as arg to using 
                                //      (to support different ctor arguments)
                                desc.value = function () { return a.mock.object; };
                                break;
                            case 1 /* Function */:
                                desc.value = a.mock.object;
                                break;
                            case 2 /* Value */:
                                desc.get = function () { return a.mock.object; };
                                break;
                            default:
                                throw new error.MockException(5 /* UnknownGlobalType */, a, "UnknownGlobalType Exception", "unknown global type: " + a.type);
                        }
                        //try {
                        Object.defineProperty(a.container, a.name, desc);
                    }
                });
                action.apply(this, this._args);
            }
            finally {
                _.each(this._args, function (a) {
                    if (!_.isUndefined(a.mock.instance)) {
                        var desc = initial[a.name];
                        switch (a.type) {
                            case 0 /* Class */:
                                break;
                            case 1 /* Function */:
                                break;
                            case 2 /* Value */:
                                desc.configurable = true;
                                break;
                            default:
                        }
                        //try {
                        Object.defineProperty(a.container, a.name, desc);
                    }
                });
            }
        };
        return GlobalScope;
    })();
    TypeMoq.GlobalScope = GlobalScope;
})(TypeMoq || (TypeMoq = {}));


/// <reference path='../bower_components/DefinitelyTyped/node/node.d.ts' /> 
if (typeof require !== "undefined") {
    var _ = require("underscore");
}
if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
        exports = module.exports = TypeMoq;
    }
    exports.TypeMoq = TypeMoq;
}
else {
    this.TypeMoq = TypeMoq;
}



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJFOi90ZnNfRVUvdHlwZW1vcS9Db25zdGFudHMudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9DdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0dsb2JhbE1vY2sudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9BcGkvSUNhbGxiYWNrLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvQXBpL0lSZXR1cm5zLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvQXBpL0lTZXR1cC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0FwaS9JVGhyb3dzLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvQXBpL0lVc2luZy50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0FwaS9JVmVyaWZpZXMudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9BcGkvX2FsbC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0NvbW1vbi9DdG9yLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvQ29tbW9uL0Z1bmMudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9Db21tb24vUHJvcGVydHlSZXRyaWV2ZXIudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9Db21tb24vVXRpbHMudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9Db21tb24vX2FsbC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0Vycm9yL0V4Y2VwdGlvbi50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0Vycm9yL01vY2tFeGNlcHRpb24udHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9FcnJvci9fYWxsLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvTWF0Y2gvSU1hdGNoLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvTWF0Y2gvTWF0Y2hBbnkudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9NYXRjaC9NYXRjaFZhbHVlLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvTWF0Y2gvX2FsbC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL1Byb3h5L0lDYWxsQ29udGV4dC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL1Byb3h5L0lDYWxsSW50ZXJjZXB0b3IudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9Qcm94eS9JbnZvY2F0aW9uLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvUHJveHkvSVByb3h5Q2FsbC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL1Byb3h5L0lQcm94eUZhY3RvcnkudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9Qcm94eS9Qcm94eS50cyIsIkU6L3Rmc19FVS90eXBlbW9xL1Byb3h5L1Byb3h5RmFjdG9yeS50cyIsIkU6L3Rmc19FVS90eXBlbW9xL1Byb3h5L19hbGwudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9JR2xvYmFsTW9jay50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0lNb2NrLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvSW50ZXJjZXB0b3JDb250ZXh0LnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvSW50ZXJjZXB0b3JFeGVjdXRlLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvSW50ZXJjZXB0b3JTZXR1cC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0ludGVyY2VwdG9yU3RyYXRlZ2llcy50cyIsIkU6L3Rmc19FVS90eXBlbW9xL0l0LnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvTWV0aG9kQ2FsbC50cyIsIkU6L3Rmc19FVS90eXBlbW9xL01ldGhvZENhbGxSZXR1cm4udHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9Nb2NrLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvVGltZXMudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9fYWxsLnRzIiwiRTovdGZzX0VVL3R5cGVtb3EvR2xvYmFsU2NvcGUudHMiLCJFOi90ZnNfRVUvdHlwZW1vcS9fbm9kZS50cyJdLCJuYW1lcyI6WyJUeXBlTW9xIiwiVHlwZU1vcS5Db25zIiwiVHlwZU1vcS5Db25zLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5DdXJyZW50SW50ZXJjZXB0Q29udGV4dCIsIlR5cGVNb3EuQ3VycmVudEludGVyY2VwdENvbnRleHQuY29uc3RydWN0b3IiLCJUeXBlTW9xLkdsb2JhbFR5cGUiLCJUeXBlTW9xLkdsb2JhbE1vY2siLCJUeXBlTW9xLkdsb2JhbE1vY2suY29uc3RydWN0b3IiLCJUeXBlTW9xLkdsb2JhbE1vY2sub2ZJbnN0YW5jZSIsIlR5cGVNb3EuR2xvYmFsTW9jay5vZlR5cGUiLCJUeXBlTW9xLkdsb2JhbE1vY2sub2JqZWN0IiwiVHlwZU1vcS5HbG9iYWxNb2NrLm5hbWUiLCJUeXBlTW9xLkdsb2JhbE1vY2suYmVoYXZpb3IiLCJUeXBlTW9xLkdsb2JhbE1vY2suY2FsbEJhc2UiLCJUeXBlTW9xLkdsb2JhbE1vY2sudHlwZSIsIlR5cGVNb3EuR2xvYmFsTW9jay5zZXR1cCIsIlR5cGVNb3EuR2xvYmFsTW9jay52ZXJpZnkiLCJUeXBlTW9xLkdsb2JhbE1vY2sudmVyaWZ5QWxsIiwiVHlwZU1vcS5Qcm9wZXJ0eVJldHJpZXZlciIsIlR5cGVNb3EuUHJvcGVydHlSZXRyaWV2ZXIuY29uc3RydWN0b3IiLCJUeXBlTW9xLlByb3BlcnR5UmV0cmlldmVyLmdldE93bkVudW1lcmFibGVzIiwiVHlwZU1vcS5Qcm9wZXJ0eVJldHJpZXZlci5nZXRPd25Ob25lbnVtZXJhYmxlcyIsIlR5cGVNb3EuUHJvcGVydHlSZXRyaWV2ZXIuZ2V0T3duRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyIsIlR5cGVNb3EuUHJvcGVydHlSZXRyaWV2ZXIuZ2V0UHJvdG90eXBlRW51bWVyYWJsZXMiLCJUeXBlTW9xLlByb3BlcnR5UmV0cmlldmVyLmdldFByb3RvdHlwZU5vbmVudW1lcmFibGVzIiwiVHlwZU1vcS5Qcm9wZXJ0eVJldHJpZXZlci5nZXRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzIiwiVHlwZU1vcS5Qcm9wZXJ0eVJldHJpZXZlci5nZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlcyIsIlR5cGVNb3EuUHJvcGVydHlSZXRyaWV2ZXIuZ2V0T3duQW5kUHJvdG90eXBlTm9uZW51bWVyYWJsZXMiLCJUeXBlTW9xLlByb3BlcnR5UmV0cmlldmVyLmdldE93bkFuZFByb3RvdHlwZUVudW1lcmFibGVzQW5kTm9uZW51bWVyYWJsZXMiLCJUeXBlTW9xLlByb3BlcnR5UmV0cmlldmVyLl9lbnVtZXJhYmxlIiwiVHlwZU1vcS5Qcm9wZXJ0eVJldHJpZXZlci5fbm90RW51bWVyYWJsZSIsIlR5cGVNb3EuUHJvcGVydHlSZXRyaWV2ZXIuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlIiwiVHlwZU1vcS5Qcm9wZXJ0eVJldHJpZXZlci5fZ2V0UHJvcGVydHlOYW1lcyIsIlR5cGVNb3EuVXRpbHMiLCJUeXBlTW9xLlV0aWxzLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5VdGlscy5nZXRVVUlEIiwiVHlwZU1vcS5VdGlscy5mdW5jdGlvbk5hbWUiLCJUeXBlTW9xLlV0aWxzLmNvbnRodW5rdG9yIiwiVHlwZU1vcS5FcnJvciIsIlR5cGVNb3EuRXJyb3IuRXhjZXB0aW9uIiwiVHlwZU1vcS5FcnJvci5FeGNlcHRpb24uY29uc3RydWN0b3IiLCJUeXBlTW9xLkVycm9yLkV4Y2VwdGlvbi50b1N0cmluZyIsIlR5cGVNb3EuRXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbiIsIlR5cGVNb3EuRXJyb3IuTW9ja0V4Y2VwdGlvbiIsIlR5cGVNb3EuRXJyb3IuTW9ja0V4Y2VwdGlvbi5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuTWF0Y2giLCJUeXBlTW9xLk1hdGNoLk1hdGNoQW55T2JqZWN0IiwiVHlwZU1vcS5NYXRjaC5NYXRjaEFueU9iamVjdC5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuTWF0Y2guTWF0Y2hBbnlPYmplY3QuX19fX21hdGNoZXMiLCJUeXBlTW9xLk1hdGNoLk1hdGNoQW55IiwiVHlwZU1vcS5NYXRjaC5NYXRjaEFueS5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuTWF0Y2guTWF0Y2hBbnkuX19fX21hdGNoZXMiLCJUeXBlTW9xLk1hdGNoLk1hdGNoQW55U3RyaW5nIiwiVHlwZU1vcS5NYXRjaC5NYXRjaEFueVN0cmluZy5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuTWF0Y2guTWF0Y2hBbnlTdHJpbmcuX19fX21hdGNoZXMiLCJUeXBlTW9xLk1hdGNoLk1hdGNoQW55TnVtYmVyIiwiVHlwZU1vcS5NYXRjaC5NYXRjaEFueU51bWJlci5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuTWF0Y2guTWF0Y2hBbnlOdW1iZXIuX19fX21hdGNoZXMiLCJUeXBlTW9xLk1hdGNoLk1hdGNoVmFsdWUiLCJUeXBlTW9xLk1hdGNoLk1hdGNoVmFsdWUuY29uc3RydWN0b3IiLCJUeXBlTW9xLk1hdGNoLk1hdGNoVmFsdWUuX19fX21hdGNoZXMiLCJUeXBlTW9xLlByb3h5IiwiVHlwZU1vcS5Qcm94eS5NZXRob2RJbnZvY2F0aW9uIiwiVHlwZU1vcS5Qcm94eS5NZXRob2RJbnZvY2F0aW9uLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5Qcm94eS5NZXRob2RJbnZvY2F0aW9uLmFyZ3MiLCJUeXBlTW9xLlByb3h5Lk1ldGhvZEludm9jYXRpb24ucHJvcGVydHkiLCJUeXBlTW9xLlByb3h5Lk1ldGhvZEludm9jYXRpb24uaW52b2tlQmFzZSIsIlR5cGVNb3EuUHJveHkuR2V0dGVySW52b2NhdGlvbiIsIlR5cGVNb3EuUHJveHkuR2V0dGVySW52b2NhdGlvbi5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuUHJveHkuR2V0dGVySW52b2NhdGlvbi5hcmdzIiwiVHlwZU1vcS5Qcm94eS5HZXR0ZXJJbnZvY2F0aW9uLnByb3BlcnR5IiwiVHlwZU1vcS5Qcm94eS5HZXR0ZXJJbnZvY2F0aW9uLmludm9rZUJhc2UiLCJUeXBlTW9xLlByb3h5LlNldHRlckludm9jYXRpb24iLCJUeXBlTW9xLlByb3h5LlNldHRlckludm9jYXRpb24uY29uc3RydWN0b3IiLCJUeXBlTW9xLlByb3h5LlNldHRlckludm9jYXRpb24uYXJncyIsIlR5cGVNb3EuUHJveHkuU2V0dGVySW52b2NhdGlvbi5wcm9wZXJ0eSIsIlR5cGVNb3EuUHJveHkuU2V0dGVySW52b2NhdGlvbi5pbnZva2VCYXNlIiwiVHlwZU1vcS5Qcm94eS5NZXRob2RJbmZvIiwiVHlwZU1vcS5Qcm94eS5NZXRob2RJbmZvLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5Qcm94eS5NZXRob2RJbmZvLnRvRnVuYyIsIlR5cGVNb3EuUHJveHkuUHJvcGVydHlJbmZvIiwiVHlwZU1vcS5Qcm94eS5Qcm9wZXJ0eUluZm8uY29uc3RydWN0b3IiLCJUeXBlTW9xLlByb3h5LlByb3h5IiwiVHlwZU1vcS5Qcm94eS5Qcm94eS5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuUHJveHkuUHJveHkub2YiLCJUeXBlTW9xLlByb3h5LlByb3h5LmNoZWNrIiwiVHlwZU1vcS5Qcm94eS5Qcm94eS5jaGVja05vdE51bGwiLCJUeXBlTW9xLlByb3h5LlByb3h5LmlzUHJpbWl0aXZlT2JqZWN0IiwiVHlwZU1vcS5Qcm94eS5Qcm94eS5kZWZpbmVNZXRob2RQcm94eSIsIlR5cGVNb3EuUHJveHkuUHJveHkubWV0aG9kUHJveHlWYWx1ZSIsIlR5cGVNb3EuUHJveHkuUHJveHkuZGVmaW5lUHJvcGVydHlQcm94eSIsIlR5cGVNb3EuUHJveHkuUHJveHkuZGVmaW5lUHJvcGVydHkiLCJUeXBlTW9xLlByb3h5LlByb3h5RmFjdG9yeSIsIlR5cGVNb3EuUHJveHkuUHJveHlGYWN0b3J5LmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5Qcm94eS5Qcm94eUZhY3RvcnkuY3JlYXRlUHJveHkiLCJUeXBlTW9xLkludGVyY2VwdGlvbkFjdGlvbiIsIlR5cGVNb3EuSW50ZXJjZXB0b3JDb250ZXh0IiwiVHlwZU1vcS5JbnRlcmNlcHRvckNvbnRleHQuY29uc3RydWN0b3IiLCJUeXBlTW9xLkludGVyY2VwdG9yQ29udGV4dC5hZGRJbnZvY2F0aW9uIiwiVHlwZU1vcS5JbnRlcmNlcHRvckNvbnRleHQuYWN0dWFsSW52b2NhdGlvbnMiLCJUeXBlTW9xLkludGVyY2VwdG9yQ29udGV4dC5jbGVhckludm9jYXRpb25zIiwiVHlwZU1vcS5JbnRlcmNlcHRvckNvbnRleHQuYWRkT3JkZXJlZENhbGwiLCJUeXBlTW9xLkludGVyY2VwdG9yQ29udGV4dC5yZW1vdmVPcmRlcmVkQ2FsbCIsIlR5cGVNb3EuSW50ZXJjZXB0b3JDb250ZXh0Lm9yZGVyZWRDYWxscyIsIlR5cGVNb3EuSW50ZXJjZXB0b3JFeGVjdXRlIiwiVHlwZU1vcS5JbnRlcmNlcHRvckV4ZWN1dGUuY29uc3RydWN0b3IiLCJUeXBlTW9xLkludGVyY2VwdG9yRXhlY3V0ZS5pbnRlcmNlcHRvckNvbnRleHQiLCJUeXBlTW9xLkludGVyY2VwdG9yRXhlY3V0ZS5pbnRlcmNlcHQiLCJUeXBlTW9xLkludGVyY2VwdG9yRXhlY3V0ZS5hZGRDYWxsIiwiVHlwZU1vcS5JbnRlcmNlcHRvckV4ZWN1dGUudmVyaWZ5Q2FsbCIsIlR5cGVNb3EuSW50ZXJjZXB0b3JFeGVjdXRlLnZlcmlmeSIsIlR5cGVNb3EuSW50ZXJjZXB0b3JFeGVjdXRlLmludGVyY2VwdGlvblN0cmF0ZWdpZXMiLCJUeXBlTW9xLkludGVyY2VwdG9yRXhlY3V0ZS50aHJvd1ZlcmlmeUNhbGxFeGNlcHRpb24iLCJUeXBlTW9xLkludGVyY2VwdG9yRXhlY3V0ZS50aHJvd1ZlcmlmeUV4Y2VwdGlvbiIsIlR5cGVNb3EuSW50ZXJjZXB0b3JTZXR1cCIsIlR5cGVNb3EuSW50ZXJjZXB0b3JTZXR1cC5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuSW50ZXJjZXB0b3JTZXR1cC5pbnRlcmNlcHRlZENhbGwiLCJUeXBlTW9xLkludGVyY2VwdG9yU2V0dXAuaW50ZXJjZXB0IiwiVHlwZU1vcS5BZGRBY3R1YWxJbnZvY2F0aW9uIiwiVHlwZU1vcS5BZGRBY3R1YWxJbnZvY2F0aW9uLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5BZGRBY3R1YWxJbnZvY2F0aW9uLmhhbmRsZUludGVyY2VwdCIsIlR5cGVNb3EuRXh0cmFjdFByb3h5Q2FsbCIsIlR5cGVNb3EuRXh0cmFjdFByb3h5Q2FsbC5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuRXh0cmFjdFByb3h5Q2FsbC5oYW5kbGVJbnRlcmNlcHQiLCJUeXBlTW9xLkV4ZWN1dGVDYWxsIiwiVHlwZU1vcS5FeGVjdXRlQ2FsbC5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuRXhlY3V0ZUNhbGwuaGFuZGxlSW50ZXJjZXB0IiwiVHlwZU1vcS5JbnZva2VCYXNlIiwiVHlwZU1vcS5JbnZva2VCYXNlLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5JbnZva2VCYXNlLmhhbmRsZUludGVyY2VwdCIsIlR5cGVNb3EuSGFuZGxlTW9ja1JlY3Vyc2lvbiIsIlR5cGVNb3EuSGFuZGxlTW9ja1JlY3Vyc2lvbi5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuSGFuZGxlTW9ja1JlY3Vyc2lvbi5oYW5kbGVJbnRlcmNlcHQiLCJUeXBlTW9xLkl0IiwiVHlwZU1vcS5JdC5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuSXQuaXNWYWx1ZSIsIlR5cGVNb3EuSXQuaXNBbnlPYmplY3QiLCJUeXBlTW9xLkl0LmlzQW55IiwiVHlwZU1vcS5JdC5pc0FueVN0cmluZyIsIlR5cGVNb3EuSXQuaXNBbnlOdW1iZXIiLCJUeXBlTW9xLk1ldGhvZENhbGwiLCJUeXBlTW9xLk1ldGhvZENhbGwuY29uc3RydWN0b3IiLCJUeXBlTW9xLk1ldGhvZENhbGwuZ2VuZXJhdGVJZCIsIlR5cGVNb3EuTWV0aG9kQ2FsbC50cmFuc2Zvcm1Ub01hdGNoZXJzIiwiVHlwZU1vcS5NZXRob2RDYWxsLmlkIiwiVHlwZU1vcS5NZXRob2RDYWxsLmNhbGxDb3VudCIsIlR5cGVNb3EuTWV0aG9kQ2FsbC5zZXR1cEV4cHJlc3Npb24iLCJUeXBlTW9xLk1ldGhvZENhbGwuc2V0dXBDYWxsIiwiVHlwZU1vcS5NZXRob2RDYWxsLmlzVmVyaWZpYWJsZSIsIlR5cGVNb3EuTWV0aG9kQ2FsbC5ldmFsdWF0ZWRTdWNjZXNzZnVsbHkiLCJUeXBlTW9xLk1ldGhvZENhbGwubWF0Y2hlcyIsIlR5cGVNb3EuTWV0aG9kQ2FsbC5leGVjdXRlIiwiVHlwZU1vcS5NZXRob2RDYWxsLnZlcmlmaWFibGUiLCJUeXBlTW9xLk1ldGhvZENhbGxSZXR1cm4iLCJUeXBlTW9xLk1ldGhvZENhbGxSZXR1cm4uY29uc3RydWN0b3IiLCJUeXBlTW9xLk1ldGhvZENhbGxSZXR1cm4uZXhlY3V0ZSIsIlR5cGVNb3EuTWV0aG9kQ2FsbFJldHVybi5jYWxsYmFjayIsIlR5cGVNb3EuTWV0aG9kQ2FsbFJldHVybi50aHJvd3MiLCJUeXBlTW9xLk1ldGhvZENhbGxSZXR1cm4ucmV0dXJucyIsIlR5cGVNb3EuTWV0aG9kQ2FsbFJldHVybi5jYWxsQmFzZSIsIlR5cGVNb3EuTW9ja0JlaGF2aW9yIiwiVHlwZU1vcS5Nb2NrIiwiVHlwZU1vcS5Nb2NrLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5Nb2NrLm9mSW5zdGFuY2UiLCJUeXBlTW9xLk1vY2sub2ZUeXBlIiwiVHlwZU1vcS5Nb2NrLm9mVHlwZTIiLCJUeXBlTW9xLk1vY2sub2JqZWN0IiwiVHlwZU1vcS5Nb2NrLm5hbWUiLCJUeXBlTW9xLk1vY2suYmVoYXZpb3IiLCJUeXBlTW9xLk1vY2suY2FsbEJhc2UiLCJUeXBlTW9xLk1vY2suZ2VuZXJhdGVJZCIsIlR5cGVNb3EuTW9jay5nZXROYW1lT2YiLCJUeXBlTW9xLk1vY2suc2V0dXAiLCJUeXBlTW9xLk1vY2sudmVyaWZ5IiwiVHlwZU1vcS5Nb2NrLnZlcmlmeUFsbCIsIlR5cGVNb3EuVGltZXMiLCJUeXBlTW9xLlRpbWVzLmNvbnN0cnVjdG9yIiwiVHlwZU1vcS5UaW1lcy5mYWlsTWVzc2FnZSIsIlR5cGVNb3EuVGltZXMudmVyaWZ5IiwiVHlwZU1vcS5UaW1lcy5leGFjdGx5IiwiVHlwZU1vcS5UaW1lcy5uZXZlciIsIlR5cGVNb3EuVGltZXMub25jZSIsIlR5cGVNb3EuVGltZXMuYXRMZWFzdE9uY2UiLCJUeXBlTW9xLlRpbWVzLmF0TW9zdE9uY2UiLCJUeXBlTW9xLkdsb2JhbFNjb3BlIiwiVHlwZU1vcS5HbG9iYWxTY29wZS5jb25zdHJ1Y3RvciIsIlR5cGVNb3EuR2xvYmFsU2NvcGUudXNpbmciLCJUeXBlTW9xLkdsb2JhbFNjb3BlLndpdGgiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sT0FBTyxDQU1iO0FBTkQs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QUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDakMsSUFBSSxDQUFDLEdBQXFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRUQsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbEQsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3ZDLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUM5QixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDSixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbnMge1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfSURfVkFMVUUgPSBcIjQzOEE1MUQzLTY4NjQtNDlENy1BNjU1LUNBMTE1M0I4Njk2NVwiO1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfSURfTkFNRSA9IFwiX19faWRcIjtcclxuICAgICAgICBzdGF0aWMgSU1BVENIX01BVENIRVNfTkFNRSA9IFwiX19fbWF0Y2hlc1wiO1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4ge1xyXG4gICAgICAgIGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD47XHJcbiAgICB9XHJcblxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBHbG9iYWxUeXBlIHsgQ2xhc3MsIEZ1bmN0aW9uLCBWYWx1ZSB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbE1vY2s8VD4gaW1wbGVtZW50cyBJR2xvYmFsTW9jazxUPiB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX3R5cGU6IEdsb2JhbFR5cGUsIHB1YmxpYyBjb250YWluZXI6IE9iamVjdCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mSW5zdGFuY2U8VT4oaW5zdGFuY2U6IFUsIG5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgPyBHbG9iYWxUeXBlLkZ1bmN0aW9uIDogR2xvYmFsVHlwZS5WYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHbG9iYWxNb2NrKG1vY2ssIG5hbWUsIHR5cGUsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlPFU+KGN0b3I6IEN0b3I8VT4sIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgY3RvcigpO1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdsb2JhbE1vY2sobW9jaywgbmFtZSwgR2xvYmFsVHlwZS5DbGFzcywgY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLm1vY2sub2JqZWN0OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZSB8fCB0aGlzLm1vY2submFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMubW9jay5iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLm1vY2suY2FsbEJhc2U7IH1cclxuICAgICAgICBzZXQgY2FsbEJhc2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5tb2NrLmNhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblxyXG4gICAgICAgIC8vIHNldHVwXHJcblxyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2NrLnNldHVwKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vY2sudmVyaWZ5KGV4cHJlc3Npb24sIHRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrLnZlcmlmeUFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibW9kdWxlIFR5cGVNb3EuQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24pOiBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PjtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24xPFQ+KTogSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD47XHJcbiAgICB9XHJcbn0gICIsIm1vZHVsZSBUeXBlTW9xLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm5zKHZhbHVlRnVuY3Rpb246IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICAgICAgY2FsbEJhc2UoKTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Jlc3VsdDxUPiBleHRlbmRzIElWZXJpZmllcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiBleHRlbmRzIElSZXR1cm5zPFQsIFRSZXN1bHQ+LCBJVGhyb3dzIHtcclxuICAgIH1cclxufSAgICIsIm1vZHVsZSBUeXBlTW9xLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTZXR1cDxULCBUUmVzdWx0PiBleHRlbmRzIElDYWxsYmFjazxULCBUUmVzdWx0PiwgSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4sIElWZXJpZmllcyB7IH0gXHJcbn0iLCJtb2R1bGUgVHlwZU1vcS5BcGkge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93cyB7XHJcbiAgICAgICAgdGhyb3dzPFQgZXh0ZW5kcyBlcnJvci5FeGNlcHRpb24+KGV4Y2VwdGlvbjogVCk6IElUaHJvd3NSZXN1bHQ7XHJcblx0fVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93c1Jlc3VsdCBleHRlbmRzIElWZXJpZmllcyB7XHJcblx0fVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElVc2luZ1Jlc3VsdCB7XHJcbiAgICAgICAgd2l0aChhY3Rpb246IElBY3Rpb24pOiB2b2lkO1xyXG4gICAgfVxyXG59ICAgIiwibW9kdWxlIFR5cGVNb3EuQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZlcmlmaWVzIHtcclxuICAgICAgICB2ZXJpZmlhYmxlKGZhaWxNZXNzYWdlPzogc3RyaW5nKTogdm9pZDtcclxuICAgIH1cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUNhbGxiYWNrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJUmV0dXJucy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVNldHVwLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJVGhyb3dzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJVXNpbmcudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lWZXJpZmllcy50cycgLz4gICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ3RvcjxUPiB7XHJcbiAgICAgICAgbmV3ICgpOiBUO1xyXG4gICAgICAgIHByb3RvdHlwZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQ3RvcldpdGhBcmdzPFQ+IHtcclxuICAgICAgICBuZXcgKC4uLmN0b3JBcmdzOiBhbnlbXSk6IFQ7XHJcbiAgICAgICAgcHJvdG90eXBlO1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUFjdGlvbiB7XHJcbiAgICAgICAgKCk6IHZvaWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBY3Rpb24xPFQ+IHtcclxuICAgICAgICAoeDogVCk6IHZvaWQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElBY3Rpb25OPFQ+IHtcclxuICAgICAgICAoLi4ueDogVFtdKTogdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGdW5jMTxUUmVzdWx0PiB7XHJcbiAgICAgICAgKCk6IFRSZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGdW5jMjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgKHg6IFQpOiBUUmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRnVuY048VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICguLi54OiBUW10pOiBUUmVzdWx0O1xyXG4gICAgfVxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eVJldHJpZXZlciB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25FbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fZW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGNvdWxkIHVzZSBmb3IuLmluIGZpbHRlcmVkIHdpdGggaGFzT3duUHJvcGVydHkgb3IganVzdCB0aGlzOiByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25Ob25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fbm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBqdXN0IHVzZTogcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0UHJvdG90eXBlRW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldFByb3RvdHlwZU5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duQW5kUHJvdG90eXBlRW51bWVyYWJsZXMob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGNvdWxkIHVzZSB1bmZpbHRlcmVkIGZvci4uaW5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVOb25lbnVtZXJhYmxlcyhvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIHRydWUsIHRoaXMuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFByaXZhdGUgc3RhdGljIHByb3BlcnR5IGNoZWNrZXIgY2FsbGJhY2tzXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2VudW1lcmFibGUob2JqLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbm90RW51bWVyYWJsZShvYmosIHByb3ApIHtcclxuICAgICAgICAgICAgcmV0dXJuICFvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUob2JqLCBwcm9wKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2dldFByb3BlcnR5TmFtZXMob2JqLCBpdGVyYXRlU2VsZkJvb2wsIGl0ZXJhdGVQcm90b3R5cGVCb29sLCBpbmNsdWRlUHJvcENiKTogQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciB9PiB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgfT4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVyYXRlU2VsZkJvb2wpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocHJvcHMsIHByb3AgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVwbGljYXRlID0gXy5maW5kKHJlc3VsdCwgcCA9PiBwLm5hbWUgPT09IHByb3ApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkdXBsaWNhdGUgJiYgaW5jbHVkZVByb3BDYihvYmosIHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgcHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh7IG5hbWU6IHByb3AsIGRlc2M6IHByb3BEZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVyYXRlUHJvdG90eXBlQm9vbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGl0ZXJhdGVTZWxmQm9vbCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB9IHdoaWxlIChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBVdGlscyB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRVVUlEKCkge1xyXG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICB2YXIgdXVpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBmdW5jdGlvbk5hbWUoZnVuKSB7XHJcbiAgICAgICAgICAgIHZhciByZXQgPSBmdW4udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0ID0gcmV0LnN1YnN0cignZnVuY3Rpb24gJy5sZW5ndGgpO1xyXG4gICAgICAgICAgICByZXQgPSByZXQuc3Vic3RyKDAsIHJldC5pbmRleE9mKCcoJykpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNvbnRodW5rdG9yPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgYXJnczogYW55W10pOiBVIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgVGVtcCA9ICgpID0+IHsgfSwgaW5zdCwgcmV0O1xyXG4gICAgICAgICAgICAgICAgVGVtcC5wcm90b3R5cGUgPSBjdG9yLnByb3RvdHlwZTtcclxuICAgICAgICAgICAgICAgIGluc3QgPSBuZXcgVGVtcCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjdG9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBjdG9yLmFwcGx5KGluc3QsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNPYmplY3QocmV0KSA/IHJldCA6IGluc3Q7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0N0b3IudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0Z1bmMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3BlcnR5UmV0cmlldmVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdVdGlscy50cycgLz4iLCJtb2R1bGUgVHlwZU1vcS5FcnJvciB7XHJcbiAgICBleHBvcnQgY2xhc3MgRXhjZXB0aW9uIGltcGxlbWVudHMgRXJyb3Ige1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lPzogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIFR5cGVNb3EuRXJyb3Ige1xyXG4gICAgZXhwb3J0IGVudW0gTW9ja0V4Y2VwdGlvblJlYXNvbiB7XHJcbiAgICAgICAgTm9TZXR1cCxcclxuICAgICAgICBNb3JlVGhhbk9uZVNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICBJbnZhbGlkU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgIEludmFsaWRNYXRjaGVyLFxyXG4gICAgICAgIEludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgIFVua25vd25HbG9iYWxUeXBlLFxyXG4gICAgICAgIFZlcmlmaWNhdGlvbkZhaWxlZCxcclxuICAgICAgICBNb3JlVGhhbk9uZUNhbGwsXHJcbiAgICAgICAgTW9yZVRoYW5OQ2FsbHNcclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBNb2NrRXhjZXB0aW9uIGV4dGVuZHMgRXhjZXB0aW9uIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHVibGljIHJlYXNvbjogTW9ja0V4Y2VwdGlvblJlYXNvbixcclxuICAgICAgICAgICAgcHVibGljIGN0eDogYW55LFxyXG4gICAgICAgICAgICBuYW1lOiBzdHJpbmcgPSAnTW9jayBFeGNlcHRpb24nLFxyXG4gICAgICAgICAgICBtZXNzYWdlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG5hbWUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0V4Y2VwdGlvbi50cycgLz4gXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01vY2tFeGNlcHRpb24udHMnIC8+IiwibW9kdWxlIFR5cGVNb3EuTWF0Y2gge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1hdGNoIHtcclxuICAgICAgICBfX19pZDogc3RyaW5nO1xyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuO1xyXG4gICAgfVxyXG5cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuTWF0Y2gge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueU9iamVjdDxUPiBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29ucy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2N0b3I6IEN0b3I8VD4pIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnkgaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnMuSU1BVENIX0lEX1ZBTFVFO1xyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQob2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnlTdHJpbmcgaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnMuSU1BVENIX0lEX1ZBTFVFO1xyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueU51bWJlciBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29ucy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLk1hdGNoIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hWYWx1ZTxUPiBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29ucy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZhbHVlOiBUKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0VxdWFsKHRoaXMuX3ZhbHVlLCBvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSU1hdGNoLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaEFueS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTWF0Y2hWYWx1ZS50cycgLz4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ2FsbENvbnRleHQge1xyXG4gICAgICAgIGFyZ3M6IElBcmd1bWVudHM7XHJcbiAgICAgICAgcHJvcGVydHk6IElQcm9wZXJ0eUluZm87XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxJbnRlcmNlcHRvciB7XHJcbiAgICAgICAgaW50ZXJjZXB0KGNvbnRleHQ6IElDYWxsQ29udGV4dCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwibW9kdWxlIFR5cGVNb3EuUHJveHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZEludm9jYXRpb24gaW1wbGVtZW50cyBJQ2FsbENvbnRleHQge1xyXG4gICAgICAgIHJldHVyblZhbHVlOiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb3BlcnR5OiBNZXRob2RJbmZvLCBwcml2YXRlIF9hcmdzPzogSUFyZ3VtZW50cykge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGFyZ3MoKTogSUFyZ3VtZW50cyB7IHJldHVybiB0aGlzLl9hcmdzIHx8IHsgbGVuZ3RoOiAwLCBjYWxsZWU6IG51bGwgfTsgfVxyXG4gICAgICAgIHNldCBhcmdzKHZhbHVlOiBJQXJndW1lbnRzKSB7IHRoaXMuX2FyZ3MgPSB2YWx1ZTsgfVxyXG5cclxuICAgICAgICBnZXQgcHJvcGVydHkoKTogUHJvcGVydHlJbmZvIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnR5OyB9XHJcblxyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLl9wcm9wZXJ0eS50b0Z1bmMuYXBwbHkodGhpcy5fcHJvcGVydHkub2JqLCB0aGlzLl9hcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHZXR0ZXJJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHlJbmZvLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFyZ3MsIFwiY2FsbGVlXCIsXHJcbiAgICAgICAgICAgICAgICB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IG51bGwgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55PmFyZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBhcmdzKHZhbHVlOiBJQXJndW1lbnRzKSB7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNldHRlckludm9jYXRpb24gaW1wbGVtZW50cyBJQ2FsbENvbnRleHQge1xyXG4gICAgICAgIHJldHVyblZhbHVlOiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Byb3BlcnR5OiBQcm9wZXJ0eUluZm8sIHByaXZhdGUgX2FyZ3M6IElBcmd1bWVudHMpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMgeyByZXR1cm4gdGhpcy5fYXJnczsgfVxyXG4gICAgICAgIHNldCBhcmdzKHZhbHVlOiBJQXJndW1lbnRzKSB7IHRoaXMuX2FyZ3MgPSB2YWx1ZTsgfVxyXG5cclxuICAgICAgICBnZXQgcHJvcGVydHkoKTogUHJvcGVydHlJbmZvIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnR5OyB9XHJcblxyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucmV0dXJuVmFsdWUgPSB0aGlzLl9wcm9wZXJ0eS5vYmpbdGhpcy5fcHJvcGVydHkubmFtZV0gPSB0aGlzLl9hcmdzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZEluZm8gaW1wbGVtZW50cyBJUHJvcGVydHlJbmZvIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb2JqOiBPYmplY3QsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IHRvRnVuYygpOiBGdW5jdGlvbiB7XHJcbiAgICAgICAgICAgIHZhciBmdW5jOiBGdW5jdGlvbjtcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbih0aGlzLm9iaikpXHJcbiAgICAgICAgICAgICAgICBmdW5jID0gPEZ1bmN0aW9uPnRoaXMub2JqO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBmdW5jID0gdGhpcy5vYmpbdGhpcy5uYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQcm9wZXJ0eUluZm8gaW1wbGVtZW50cyBJUHJvcGVydHlJbmZvIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgb2JqOiBPYmplY3QsIHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJvcGVydHlJbmZvIHtcclxuICAgICAgICBvYmo6IE9iamVjdDtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb3h5Q2FsbDxUPiB7XHJcbiAgICAgICAgaWQ6IHN0cmluZztcclxuICAgICAgICBjYWxsQ291bnQ6IG51bWJlcjtcclxuICAgICAgICAvL2lzQ29uZGl0aW9uYWwoKTogYm9vbGVhbjtcclxuICAgICAgICBmYWlsTWVzc2FnZTogc3RyaW5nO1xyXG4gICAgICAgIGlzSW52b2tlZDogYm9vbGVhbjtcclxuICAgICAgICBpc1ZlcmlmaWFibGU6IGJvb2xlYW47XHJcbiAgICAgICAgc2V0dXBFeHByZXNzaW9uOiBJQWN0aW9uMTxUPjtcclxuICAgICAgICBzZXR1cENhbGw6IHByb3h5LklDYWxsQ29udGV4dDtcclxuICAgICAgICBldmFsdWF0ZWRTdWNjZXNzZnVsbHkoKTogdm9pZDtcclxuXHJcbiAgICAgICAgbWF0Y2hlcyhjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiBib29sZWFuO1xyXG4gICAgICAgIGV4ZWN1dGUoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJveHlGYWN0b3J5IHtcclxuICAgICAgICBjcmVhdGVQcm94eTxUPihpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvciwgaW5zdGFuY2U6IFQpOiBUO1xyXG4gICAgfVxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuUHJveHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3h5PFQ+IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvciwgaW5zdGFuY2U6IFQpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVjayhpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgICAgIHZhciBwcm9wcyA9IFByb3BlcnR5UmV0cmlldmVyLmdldE93bkFuZFByb3RvdHlwZUVudW1lcmFibGVzQW5kTm9uZW51bWVyYWJsZXMoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBfLmVhY2gocHJvcHMsIHByb3AgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24ocHJvcC5kZXNjLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wRGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHByb3AuZGVzYy5jb25maWd1cmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHByb3AuZGVzYy5lbnVtZXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogcHJvcC5kZXNjLndyaXRhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lTWV0aG9kUHJveHkodGhhdCwgaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wLm5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9wRGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHByb3AuZGVzYy5jb25maWd1cmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHByb3AuZGVzYy5lbnVtZXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHlQcm94eSh0aGF0LCBpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3AubmFtZSwgcHJvcC5kZXNjLnZhbHVlLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZjxVPihpbnN0YW5jZTogVSwgaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IpIHtcclxuICAgICAgICAgICAgUHJveHkuY2hlY2soaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZnVuY05hbWUgPSBVdGlscy5mdW5jdGlvbk5hbWUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gUHJveHkubWV0aG9kUHJveHlWYWx1ZShpbnRlcmNlcHRvciwgaW5zdGFuY2UsIGZ1bmNOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBQcm94eShpbnRlcmNlcHRvciwgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY2hlY2s8VT4oaW5zdGFuY2U6IFUpOiB2b2lkIHtcclxuICAgICAgICAgICAgUHJveHkuY2hlY2tOb3ROdWxsKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFsbG93IG9ubHkgcHJpbWl0aXZlIG9iamVjdHMgYW5kIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICB2YXIgb2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgfHxcclxuICAgICAgICAgICAgICAgIChfLmlzT2JqZWN0KGluc3RhbmNlKSAmJiAhUHJveHkuaXNQcmltaXRpdmVPYmplY3QoaW5zdGFuY2UpKSlcclxuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghb2spXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCBcIkludmFsaWRQcm94eUFyZ3VtZW50IEV4Y2VwdGlvblwiLCBcIkFyZ3VtZW50IHNob3VsZCBiZSBhIGZ1bmN0aW9uIG9yIGEgbm9uIHByaW1pdGl2ZSBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNoZWNrPFU+KGluc3RhbmNlOiBVKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFByb3h5LmNoZWNrTm90TnVsbChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhbGxvdyBvbmx5IG5vbiBwcmltaXRpdmUgb2JqZWN0c1xyXG4gICAgICAgICAgICB2YXIgb2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24oaW5zdGFuY2UpICYmXHJcbiAgICAgICAgICAgICAgICAoXy5pc09iamVjdChpbnN0YW5jZSkgJiYgIVByb3h5LmlzUHJpbWl0aXZlT2JqZWN0KGluc3RhbmNlKSkpXHJcbiAgICAgICAgICAgICAgICBvayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW9rKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmd1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgXCJJbnZhbGlkUHJveHlBcmd1bWVudCBFeGNlcHRpb25cIiwgXCJBcmd1bWVudCBzaG91bGQgYmUgYSBub24gcHJpbWl0aXZlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNoZWNrTm90TnVsbDxVPihpbnN0YW5jZTogVSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoXy5pc051bGwoaW5zdGFuY2UpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmd1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgXCJJbnZhbGlkUHJveHlBcmd1bWVudCBFeGNlcHRpb25cIiwgXCJBcmd1bWVudCBjYW5ub3QgYmUgbnVsbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGlzUHJpbWl0aXZlT2JqZWN0KG9iajogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24ob2JqKSB8fFxyXG4gICAgICAgICAgICAgICAgXy5pc0FycmF5KG9iaikgfHxcclxuICAgICAgICAgICAgICAgIF8uaXNEYXRlKG9iaikgfHxcclxuICAgICAgICAgICAgICAgIF8uaXNOdWxsKG9iaikpXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lTWV0aG9kUHJveHkoXHJcbiAgICAgICAgICAgIHRoYXQ6IE9iamVjdCxcclxuICAgICAgICAgICAgaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgICAgIGluc3RhbmNlOiBULFxyXG4gICAgICAgICAgICBwcm9wTmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBwcm9wRGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0geyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UgfSkge1xyXG5cclxuICAgICAgICAgICAgcHJvcERlc2MudmFsdWUgPSBQcm94eS5tZXRob2RQcm94eVZhbHVlKGludGVyY2VwdG9yLCBpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZpbmVQcm9wZXJ0eSh0aGF0LCBwcm9wTmFtZSwgcHJvcERlc2MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbWV0aG9kUHJveHlWYWx1ZTxVPihcclxuICAgICAgICAgICAgaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgICAgIGluc3RhbmNlOiBVLFxyXG4gICAgICAgICAgICBwcm9wTmFtZTogc3RyaW5nKTogKCkgPT4gYW55IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbmV3IE1ldGhvZEluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgTWV0aG9kSW52b2NhdGlvbihtZXRob2QsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmVQcm9wZXJ0eVByb3h5KFxyXG4gICAgICAgICAgICB0aGF0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVCxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvcFZhbHVlOiBhbnksXHJcbiAgICAgICAgICAgIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSkge1xyXG5cclxuICAgICAgICAgICAgcHJvcERlc2MuZ2V0ID0gKCk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbmV3IFByb3BlcnR5SW5mbyhpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGludm9jYXRpb246IElDYWxsQ29udGV4dCA9IG5ldyBHZXR0ZXJJbnZvY2F0aW9uKG1ldGhvZCwgcHJvcFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnZvY2F0aW9uLnJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcm9wRGVzYy5zZXQgPSAodjogYW55KTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gbmV3IFByb3BlcnR5SW5mbyhpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGludm9jYXRpb246IElDYWxsQ29udGV4dCA9IG5ldyBTZXR0ZXJJbnZvY2F0aW9uKG1ldGhvZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZpbmVQcm9wZXJ0eSh0aGF0LCBwcm9wTmFtZSwgcHJvcERlc2MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmVQcm9wZXJ0eShvYmo6IE9iamVjdCwgbmFtZTogc3RyaW5nLCBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIGRlc2MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3EuUHJveHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3h5RmFjdG9yeSBpbXBsZW1lbnRzIElQcm94eUZhY3Rvcnkge1xyXG4gICAgICAgIGNyZWF0ZVByb3h5PFQ+KGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLCBpbnN0YW5jZTogVCk6IFQge1xyXG4gICAgICAgICAgICB2YXIgcHJveHk6IFQgPSA8VD48YW55PiBQcm94eS5vZihpbnN0YW5jZSwgaW50ZXJjZXB0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJveHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUNhbGxDb250ZXh0LnRzJyAvPiBcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUNhbGxJbnRlcmNlcHRvci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSW52b2NhdGlvbi50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVByb3h5Q2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVByb3h5RmFjdG9yeS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nUHJveHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3h5RmFjdG9yeS50cycgLz4iLCJtb2R1bGUgVHlwZU1vcSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElHbG9iYWxNb2NrPFQ+IGV4dGVuZHMgSU1vY2s8VD4ge1xyXG4gICAgICAgIG1vY2s6IE1vY2s8VD47XHJcbiAgICAgICAgdHlwZTogR2xvYmFsVHlwZTtcclxuICAgICAgICBjb250YWluZXI6IE9iamVjdDtcclxuICAgIH1cclxufSAiLCJtb2R1bGUgVHlwZU1vcSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElNb2NrPFQ+IHtcclxuICAgICAgICBvYmplY3Q6IFQ7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGJlaGF2aW9yOiBNb2NrQmVoYXZpb3I7XHJcbiAgICAgICAgY2FsbEJhc2U6IGJvb2xlYW47XHJcbiAgICAgICAgc2V0dXA8VFJlc3VsdD4oZXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KTogTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PjtcclxuICAgICAgICB2ZXJpZnk8VFJlc3VsdD4oZXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+LCB0aW1lczogVGltZXMpOiB2b2lkO1xyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkO1xyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcSB7XHJcblxyXG5cdGV4cG9ydCBlbnVtIEludGVyY2VwdGlvbkFjdGlvbiB7IENvbnRpbnVlLCBTdG9wIH1cclxuXHJcblx0ZXhwb3J0IGludGVyZmFjZSBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cdFx0aGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCxcdGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LFx0bG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uO1xyXG5cdH1cclxuXHJcblx0ZXhwb3J0IGNsYXNzIEludGVyY2VwdG9yQ29udGV4dDxUPiB7XHJcblx0XHRwcml2YXRlIF9hY3R1YWxJbnZvY2F0aW9uczogQXJyYXk8cHJveHkuSUNhbGxDb250ZXh0PiA9IFtdO1xyXG5cdFx0cHJpdmF0ZSBfb3JkZXJlZENhbGxzOiBBcnJheTxwcm94eS5JUHJveHlDYWxsPFQ+PiA9IFtdO1xyXG5cclxuXHRcdGNvbnN0cnVjdG9yKHB1YmxpYyBiZWhhdmlvcjogTW9ja0JlaGF2aW9yLCBwdWJsaWMgbW9jazogSU1vY2s8VD4pIHsgfVxyXG5cclxuXHRcdGFkZEludm9jYXRpb24oaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0KSB7IHRoaXMuX2FjdHVhbEludm9jYXRpb25zLnB1c2goaW52b2NhdGlvbik7IH1cclxuXHRcdGFjdHVhbEludm9jYXRpb25zKCkgeyByZXR1cm4gdGhpcy5fYWN0dWFsSW52b2NhdGlvbnM7IH1cclxuXHRcdGNsZWFySW52b2NhdGlvbnMoKSB7IHRoaXMuX2FjdHVhbEludm9jYXRpb25zID0gW107IH1cclxuXHJcblx0XHRhZGRPcmRlcmVkQ2FsbChjYWxsOiBwcm94eS5JUHJveHlDYWxsPFQ+KSB7IHRoaXMuX29yZGVyZWRDYWxscy5wdXNoKGNhbGwpOyB9XHJcblx0XHRyZW1vdmVPcmRlcmVkQ2FsbChjYWxsOiBwcm94eS5JUHJveHlDYWxsPFQ+KSB7XHJcblx0XHRcdF8uZmlsdGVyKHRoaXMuX29yZGVyZWRDYWxscywgKHg6IHByb3h5LklQcm94eUNhbGw8VD4pID0+IHtcclxuXHRcdFx0XHRyZXR1cm4geC5pZCAhPT0gY2FsbC5pZDtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRvcmRlcmVkQ2FsbHMoKSB7IHJldHVybiB0aGlzLl9vcmRlcmVkQ2FsbHM7IH1cclxuXHR9XHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JFeGVjdXRlPFQ+IGltcGxlbWVudHMgUHJveHkuSUNhbGxJbnRlcmNlcHRvciB7XHJcbiAgICAgICAgcHJpdmF0ZSBfaW50ZXJjZXB0b3JDb250ZXh0OiBJbnRlcmNlcHRvckNvbnRleHQ8VD47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGJlaGF2aW9yOiBNb2NrQmVoYXZpb3IsIG1vY2s6IElNb2NrPFQ+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yQ29udGV4dCA9IG5ldyBJbnRlcmNlcHRvckNvbnRleHQoYmVoYXZpb3IsIG1vY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGludGVyY2VwdG9yQ29udGV4dCgpOiBJbnRlcmNlcHRvckNvbnRleHQ8VD4geyByZXR1cm4gdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0OyB9XHJcblxyXG4gICAgICAgIGludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGxvY2FsQ3R4ID0gbmV3IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBfLnNvbWUodGhpcy5pbnRlcmNlcHRpb25TdHJhdGVnaWVzKCksIChzdHJhdGVneTogSUludGVyY2VwdFN0cmF0ZWd5PFQ+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoSW50ZXJjZXB0aW9uQWN0aW9uLlN0b3AgPT09IHN0cmF0ZWd5LmhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uLCB0aGlzLmludGVyY2VwdG9yQ29udGV4dCwgbG9jYWxDdHgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWRkQ2FsbChjYWxsOiBwcm94eS5JUHJveHlDYWxsPFQ+KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yQ29udGV4dC5hZGRPcmRlcmVkQ2FsbChjYWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUNhbGw8VCwgVFJlc3VsdD4oY2FsbDogTWV0aG9kQ2FsbDxULCBUUmVzdWx0PiwgdGltZXM6IFRpbWVzKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBhY3R1YWxDYWxsczogQXJyYXk8cHJveHkuSUNhbGxDb250ZXh0PiA9IHRoaXMuX2ludGVyY2VwdG9yQ29udGV4dC5hY3R1YWxJbnZvY2F0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhbGxDb3VudCA9IF8uZmlsdGVyKGFjdHVhbENhbGxzLCBjID0+IGNhbGwubWF0Y2hlcyhjKSkubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aW1lcy52ZXJpZnkoY2FsbENvdW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50aHJvd1ZlcmlmeUNhbGxFeGNlcHRpb24oY2FsbC5zZXR1cENhbGwsIHRpbWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgb3JkZXJlZENhbGxzOiBBcnJheTxwcm94eS5JUHJveHlDYWxsPFQ+PiA9IHRoaXMuX2ludGVyY2VwdG9yQ29udGV4dC5vcmRlcmVkQ2FsbHMoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2ZXJpZmlhYmxlcyA9IF8uZmlsdGVyKG9yZGVyZWRDYWxscywgYyA9PiBjLmlzVmVyaWZpYWJsZSk7XHJcbiAgICAgICAgICAgIHZhciBpbnZva2VzID0gXy5maWx0ZXIob3JkZXJlZENhbGxzLCBjID0+IGMuaXNWZXJpZmlhYmxlICYmIGMuaXNJbnZva2VkKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0aW1lcyA9IFRpbWVzLmV4YWN0bHkodmVyaWZpYWJsZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKCF0aW1lcy52ZXJpZnkoaW52b2tlcy5sZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy50aHJvd1ZlcmlmeUV4Y2VwdGlvbih2ZXJpZmlhYmxlcywgdGltZXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcmNlcHRpb25TdHJhdGVnaWVzKCk6IF8uTGlzdDxJSW50ZXJjZXB0U3RyYXRlZ3k8VD4+IHtcclxuICAgICAgICAgICAgdmFyIHN0cmF0ZWdpZXM6IF8uTGlzdDxJSW50ZXJjZXB0U3RyYXRlZ3k8VD4+ID0gW1xyXG4gICAgICAgICAgICAgICAgbmV3IEFkZEFjdHVhbEludm9jYXRpb24oKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFeHRyYWN0UHJveHlDYWxsKCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRXhlY3V0ZUNhbGwoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBJbnZva2VCYXNlKCksXHJcbiAgICAgICAgICAgICAgICBuZXcgSGFuZGxlTW9ja1JlY3Vyc2lvbigpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJhdGVnaWVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aHJvd1ZlcmlmeUNhbGxFeGNlcHRpb24oY2FsbDogcHJveHkuSUNhbGxDb250ZXh0LCB0aW1lczogVGltZXMpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLlZlcmlmaWNhdGlvbkZhaWxlZCxcclxuICAgICAgICAgICAgICAgIGNhbGwsIFwiVmVyaWZ5Q2FsbCBFeGNlcHRpb25cIiwgdGltZXMuZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aHJvd1ZlcmlmeUV4Y2VwdGlvbihmYWlsdXJlczogcHJveHkuSVByb3h5Q2FsbDxUPltdLCB0aW1lczogVGltZXMpIHtcclxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLlZlcmlmaWNhdGlvbkZhaWxlZCxcclxuICAgICAgICAgICAgICAgIGZhaWx1cmVzLCBcIlZlcmlmeSBFeGNlcHRpb25cIiwgdGltZXMuZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyY2VwdG9yU2V0dXA8VD4gaW1wbGVtZW50cyBQcm94eS5JQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRlZENhbGw6IHByb3h5LklDYWxsQ29udGV4dDtcclxuXHJcbiAgICAgICAgZ2V0IGludGVyY2VwdGVkQ2FsbCgpIHsgcmV0dXJuIHRoaXMuX2ludGVyY2VwdGVkQ2FsbDsgfVxyXG5cclxuICAgICAgICBpbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnRlcmNlcHRlZENhbGwpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uTW9yZVRoYW5PbmVTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaW52b2NhdGlvbiwgXCJNb3JlVGhhbk9uZVNldHVwRXhwcmVzc2lvbiBFeGNlcHRpb25cIiwgXCJTZXR1cCBzaG91bGQgY29udGFpbiBvbmx5IG9uZSBleHByZXNzaW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRlZENhbGwgPSBpbnZvY2F0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBZGRBY3R1YWxJbnZvY2F0aW9uPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIGN0eC5hZGRJbnZvY2F0aW9uKGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRXh0cmFjdFByb3h5Q2FsbDxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICB2YXIgcmV2ZXJzZWRPcmRlcmVkQ2FsbHMgPSBjdHgub3JkZXJlZENhbGxzKCkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICBsb2NhbEN0eC5jYWxsID0gXy5maW5kKHJldmVyc2VkT3JkZXJlZENhbGxzLCBjID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjLm1hdGNoZXMoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2FsQ3R4LmNhbGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxDdHguY2FsbC5ldmFsdWF0ZWRTdWNjZXNzZnVsbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjdHguYmVoYXZpb3IgPT0gTW9ja0JlaGF2aW9yLlN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Ob1NldHVwLCBpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEV4ZWN1dGVDYWxsPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD47XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICB0aGlzLl9jdHggPSBjdHg7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q2FsbCA9IGxvY2FsQ3R4LmNhbGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudENhbGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENhbGwuZXhlY3V0ZShpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uU3RvcDtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnZva2VCYXNlPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIGlmIChjdHgubW9jay5jYWxsQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbi5pbnZva2VCYXNlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLlN0b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEhhbmRsZU1vY2tSZWN1cnNpb248VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgLy9UT0RPOiBcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5tb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEl0IHtcclxuICAgICAgICBcclxuICAgICAgICBzdGF0aWMgaXNWYWx1ZTxUPih4OiBUKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hWYWx1ZSh4KTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueU9iamVjdDxUPih4OiBDdG9yPFQ+KTogVCB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlPYmplY3QoeCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnkoKTogYW55IHtcclxuICAgICAgICAgICAgdmFyIG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55U3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlTdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueU51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55TnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCJtb2R1bGUgVHlwZU1vcSB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZENhbGw8VCwgVFJlc3VsdD4gaW1wbGVtZW50cyBwcm94eS5JUHJveHlDYWxsPFQ+LCBhcGkuSVZlcmlmaWVzIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBfY2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9leHBlY3RlZENhbGxDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByb3RlY3RlZCBfaXNPbmNlOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfc2V0dXBDYWxsYmFjazogSUFjdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX3NldHVwQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG4gICAgICAgIHByb3RlY3RlZCBfdGhyb3duRXhjZXB0aW9uOiBlcnJvci5FeGNlcHRpb247XHJcbiAgICAgICAgcHJvdGVjdGVkIF9pc1ZlcmlmaWFibGU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9ldmFsdWF0ZWRTdWNjZXNzZnVsbHk6IGJvb2xlYW47XHJcbiAgICAgICAgZmFpbE1lc3NhZ2U6IHN0cmluZztcclxuICAgICAgICBpc0ludm9rZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9zZXR1cEV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pikge1xyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGludGVyY2VwdG9yID0gbmV3IEludGVyY2VwdG9yU2V0dXAoKTtcclxuICAgICAgICAgICAgdmFyIHByb3h5ID0gTW9jay5wcm94eUZhY3RvcnkuY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3IsIG1vY2suaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgX3NldHVwRXhwcmVzc2lvbihwcm94eSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW50ZXJjZXB0b3IuaW50ZXJjZXB0ZWRDYWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWMgPSBpbnRlcmNlcHRvci5pbnRlcmNlcHRlZENhbGw7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG5ld0FyZ3MgPSB0aGlzLnRyYW5zZm9ybVRvTWF0Y2hlcnMoaWMuYXJncyk7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3QXJncywgXCJjYWxsZWVcIixcclxuICAgICAgICAgICAgICAgICAgICB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IGljLmFyZ3MuY2FsbGVlIH0pO1xyXG4gICAgICAgICAgICAgICAgaWMuYXJncyA9IDxJQXJndW1lbnRzPjxhbnk+bmV3QXJncztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGwgPSBpYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cEV4cHJlc3Npb24sIFwiSW52YWxpZFNldHVwRXhwcmVzc2lvbiBFeGNlcHRpb25cIiwgXCJJbnZhbGlkIHNldHVwIGV4cHJlc3Npb25cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdGVJZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTWV0aG9kQ2FsbDxcIiArIF8udW5pcXVlSWQoKSArIFwiPlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0cmFuc2Zvcm1Ub01hdGNoZXJzKGFyZ3M6IElBcmd1bWVudHMpOiBBcnJheTxtYXRjaC5JTWF0Y2g+IHtcclxuICAgICAgICAgICAgdmFyIG5ld0FyZ3M6IEFycmF5PG1hdGNoLklNYXRjaD4gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIF8uZWFjaChhcmdzLCBhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghXy5pc09iamVjdChhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdBcmcgPSBuZXcgbWF0Y2guTWF0Y2hWYWx1ZShhKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2gobmV3QXJnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChhW0NvbnMuSU1BVENIX01BVENIRVNfTkFNRV0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmlzVW5kZWZpbmVkKGFbQ29ucy5JTUFUQ0hfSURfTkFNRV0pICYmIGFbQ29ucy5JTUFUQ0hfSURfTkFNRV0gPT09IENvbnMuSU1BVENIX0lEX1ZBTFVFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaCg8bWF0Y2guSU1hdGNoPmEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkTWF0Y2hlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEsIFwiSW52YWxpZE1hdGNoZXIgRXhjZXB0aW9uXCIsIFwiSW52YWxpZCBtYXRjaCBvYmplY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdBcmdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG4gICAgICAgIGdldCBjYWxsQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NhbGxDb3VudDsgfVxyXG4gICAgICAgIGdldCBzZXR1cEV4cHJlc3Npb24oKTogSUFjdGlvbjE8VD4geyByZXR1cm4gdGhpcy5fc2V0dXBFeHByZXNzaW9uOyB9XHJcbiAgICAgICAgZ2V0IHNldHVwQ2FsbCgpOiBwcm94eS5JQ2FsbENvbnRleHQgeyByZXR1cm4gdGhpcy5fc2V0dXBDYWxsOyB9XHJcbiAgICAgICAgZ2V0IGlzVmVyaWZpYWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzVmVyaWZpYWJsZTsgfVxyXG5cclxuICAgICAgICBldmFsdWF0ZWRTdWNjZXNzZnVsbHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2YWx1YXRlZFN1Y2Nlc3NmdWxseSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJUHJveHlDYWxsXHJcblxyXG4gICAgICAgIG1hdGNoZXMoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3NldHVwQ2FsbC5wcm9wZXJ0eSAmJiBjYWxsICYmIGNhbGwucHJvcGVydHkgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwQ2FsbC5wcm9wZXJ0eS5uYW1lID09PSBjYWxsLnByb3BlcnR5Lm5hbWUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsLmFyZ3MubGVuZ3RoID09PSBjYWxsLmFyZ3MubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuc2V0dXBDYWxsLmFyZ3MsICh4LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2V0dXBBcmcgPSA8bWF0Y2guSU1hdGNoPng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjYWxsQXJnID0gY2FsbC5hcmdzW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiAhc2V0dXBBcmcuX19fbWF0Y2hlcyhjYWxsQXJnKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmlzSW52b2tlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGxiYWNrLmFwcGx5KHRoaXMsIGNhbGwuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aHJvd25FeGNlcHRpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGhpcy5fdGhyb3duRXhjZXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYWxsQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc09uY2UpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0aW1lcyA9IFRpbWVzLmF0TW9zdE9uY2UoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeSh0aGlzLl9jYWxsQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Nb3JlVGhhbk9uZUNhbGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsIFwiTW9yZVRoYW5PbmVDYWxsIEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9leHBlY3RlZENhbGxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpbWVzID0gVGltZXMuZXhhY3RseSh0aGlzLl9leHBlY3RlZENhbGxDb3VudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aW1lcy52ZXJpZnkodGhpcy5fY2FsbENvdW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uTW9yZVRoYW5OQ2FsbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMsIFwiTW9yZVRoYW5OQ2FsbHMgRXhjZXB0aW9uXCIsIHRpbWVzLmZhaWxNZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVRocm93c1Jlc3VsdFxyXG5cclxuICAgICAgICB2ZXJpZmlhYmxlKGZhaWxNZXNzYWdlPzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVmVyaWZpYWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChmYWlsTWVzc2FnZSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mYWlsTWVzc2FnZSA9IGZhaWxNZXNzYWdlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59ICIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PiBleHRlbmRzIE1ldGhvZENhbGw8VCwgVFJlc3VsdD4gaW1wbGVtZW50cyBhcGkuSVNldHVwPFQsIFRSZXN1bHQ+LCBhcGkuSVJldHVybnNSZXN1bHQ8VD4ge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX3JldHVyblZhbHVlRnVuYzogSUZ1bmNOPGFueSwgVFJlc3VsdD47XHJcbiAgICAgICAgaGFzUmV0dXJuVmFsdWU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9jYWxsQmFzZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IobW9jazogTW9jazxUPiwgc2V0dXBFeHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pIHtcclxuICAgICAgICAgICAgc3VwZXIobW9jaywgc2V0dXBFeHByZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG92ZXJyaWRlc1xyXG5cclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5leGVjdXRlKGNhbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxCYXNlKVxyXG4gICAgICAgICAgICAgICAgY2FsbC5pbnZva2VCYXNlKCk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5oYXNSZXR1cm5WYWx1ZSlcclxuICAgICAgICAgICAgICAgIGNhbGwucmV0dXJuVmFsdWUgPSB0aGlzLl9yZXR1cm5WYWx1ZUZ1bmMuYXBwbHkodGhpcywgY2FsbC5hcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElTZXR1cFxyXG5cclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb25OPGFueT4pOiBhcGkuSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR1cENhbGxiYWNrID0gYWN0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93cyhleGNlcHRpb246IEVycm9yKTogYXBpLklUaHJvd3NSZXN1bHQge1xyXG4gICAgICAgICAgICB0aGlzLl90aHJvd25FeGNlcHRpb24gPSBleGNlcHRpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJucyh2YWx1ZUZ1bmM6IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmV0dXJuVmFsdWVGdW5jID0gdmFsdWVGdW5jO1xyXG4gICAgICAgICAgICB0aGlzLmhhc1JldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxsQmFzZSgpOiBhcGkuSVJldHVybnNSZXN1bHQ8VD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsQmFzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVJldHVybnNSZXN1bHRcclxuXHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBNb2NrQmVoYXZpb3IgeyBMb29zZSwgU3RyaWN0IH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9jazxUPiBpbXBsZW1lbnRzIElNb2NrPFQ+IHtcclxuXHJcbiAgICAgICAgc3RhdGljIHByb3h5RmFjdG9yeTogcHJveHkuSVByb3h5RmFjdG9yeSA9IG5ldyBUeXBlTW9xLlByb3h5LlByb3h5RmFjdG9yeSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRvcjogSW50ZXJjZXB0b3JFeGVjdXRlPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX3Byb3h5OiBUO1xyXG4gICAgICAgIHByaXZhdGUgX2NhbGxCYXNlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdGFuY2U6IFQsIHByaXZhdGUgX2JlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSB0aGlzLmdldE5hbWVPZihpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yID0gbmV3IEludGVyY2VwdG9yRXhlY3V0ZSh0aGlzLl9iZWhhdmlvciwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ID0gTW9jay5wcm94eUZhY3RvcnkuY3JlYXRlUHJveHk8VD4odGhpcy5faW50ZXJjZXB0b3IsIGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZkluc3RhbmNlPFU+KGluc3RhbmNlOiBVLCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IE1vY2s8VT4ge1xyXG4gICAgICAgICAgICB2YXIgbW9jayA9IG5ldyBNb2NrKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mVHlwZTxVPihjdG9yOiBDdG9yV2l0aEFyZ3M8VT4sIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlLCAuLi5jdG9yQXJnczogYW55W10pOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgdmFyIG1vY2s6IE1vY2s8VT4gPSBNb2NrLm9mVHlwZTIoY3RvciwgY3RvckFyZ3MsIGJlaGF2aW9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlMjxVPihjdG9yOiBDdG9yV2l0aEFyZ3M8VT4sIGN0b3JBcmdzOiBhbnlbXSwgYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UpOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgdmFyIGluc3RhbmNlOiBVID0gVXRpbHMuY29udGh1bmt0b3IoY3RvciwgY3RvckFyZ3MpO1xyXG4gICAgICAgICAgICB2YXIgbW9jazogTW9jazxVPiA9IG5ldyBNb2NrKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IG9iamVjdCgpIHsgcmV0dXJuIHRoaXMuX3Byb3h5OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMuX2JlaGF2aW9yOyB9XHJcblxyXG4gICAgICAgIGdldCBjYWxsQmFzZSgpIHsgcmV0dXJuIHRoaXMuX2NhbGxCYXNlOyB9XHJcbiAgICAgICAgc2V0IGNhbGxCYXNlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2NhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZUlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNb2NrPFwiICsgXy51bmlxdWVJZCgpICsgXCI+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldE5hbWVPZihpbnN0YW5jZTogVCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBVdGlscy5mdW5jdGlvbk5hbWUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF8uaXNPYmplY3QoaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3RvciA9IGluc3RhbmNlLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbHMuZnVuY3Rpb25OYW1lKGN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXR1cFxyXG5cclxuICAgICAgICBzZXR1cDxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pOiBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICAgICAgdmFyIGNhbGwgPSBuZXcgTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0Pih0aGlzLCBleHByZXNzaW9uKTtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IuYWRkQ2FsbChjYWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2ZXJpZnlcclxuXHJcbiAgICAgICAgdmVyaWZ5PFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0PiwgdGltZXM6IFRpbWVzKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBjYWxsID0gbmV3IE1ldGhvZENhbGw8VCwgVFJlc3VsdD4odGhpcywgZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLmFkZENhbGwoY2FsbCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci52ZXJpZnlDYWxsKGNhbGwsIHRpbWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IudmVyaWZ5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIm1vZHVsZSBUeXBlTW9xIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGltZXMge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgPCU9IG4gJT4gdGltZXMsIGludm9rZWQgPCU9IG0gJT4gdGltZXNcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9MRUFTVF9PTkNFID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIGF0IGxlYXN0IG9uY2VcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgYXQgbW9zdCBvbmNlXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2xhc3RDYWxsQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfZmFpbE1lc3NhZ2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbmRpdGlvbjogSUZ1bmMyPG51bWJlciwgYm9vbGVhbj4sXHJcbiAgICAgICAgICAgIHByaXZhdGUgX2Zyb206IG51bWJlcixcclxuICAgICAgICAgICAgcHJpdmF0ZSBfdG86IG51bWJlcixcclxuICAgICAgICAgICAgZmFpbE1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9mYWlsTWVzc2FnZSA9IF8udGVtcGxhdGUoZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGZhaWxNZXNzYWdlKCkgeyByZXR1cm4gdGhpcy5fZmFpbE1lc3NhZ2UoeyBuOiB0aGlzLl9mcm9tLCBtOiB0aGlzLl9sYXN0Q2FsbENvdW50IH0pOyB9XHJcblxyXG4gICAgICAgIHZlcmlmeShjYWxsQ291bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2FsbENvdW50ID0gY2FsbENvdW50O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uKGNhbGxDb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZXhhY3RseShuOiBudW1iZXIpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID09PSBuLCBuLCBuLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG5ldmVyKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbWVzLmV4YWN0bHkoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW1lcy5leGFjdGx5KDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGF0TGVhc3RPbmNlKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lcyhjID0+IGMgPj0gMSwgMSwgTnVtYmVyLk1BWF9WQUxVRSwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTEVBU1RfT05DRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgYXRNb3N0T25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID49IDAgJiYgYyA8PSAxLCAwLCAxLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvdW5kZXJzY29yZS91bmRlcnNjb3JlLmQudHMnIC8+IFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQXBpL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0NvbW1vbi9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdFcnJvci9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaC9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eS9fYWxsLnRzJyAvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQ29uc3RhbnRzLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nR2xvYmFsTW9jay50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nR2xvYmFsU2NvcGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lHbG9iYWxNb2NrLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJTW9jay50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSW50ZXJjZXB0b3JDb250ZXh0LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJbnRlcmNlcHRvckV4ZWN1dGUudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludGVyY2VwdG9yU2V0dXAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludGVyY2VwdG9yU3RyYXRlZ2llcy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSXQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01ldGhvZENhbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01ldGhvZENhbGxSZXR1cm4udHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01vY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1RpbWVzLnRzJyAvPlxyXG5cclxuaW1wb3J0IGFwaSAgICAgPSBUeXBlTW9xLkFwaTtcclxuaW1wb3J0IGVycm9yICAgPSBUeXBlTW9xLkVycm9yO1xyXG5pbXBvcnQgbWF0Y2ggICA9IFR5cGVNb3EuTWF0Y2g7XHJcbmltcG9ydCBwcm94eSAgID0gVHlwZU1vcS5Qcm94eTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHbG9iYWxTY29wZSBpbXBsZW1lbnRzIGFwaS5JVXNpbmdSZXN1bHQge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB1c2luZyguLi5hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pOiBhcGkuSVVzaW5nUmVzdWx0IHtcclxuICAgICAgICAgICAgdmFyIHNjb3BlID0gbmV3IEdsb2JhbFNjb3BlKGFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aXRoKGFjdGlvbjogSUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgaW5pdGlhbDogQXJyYXk8UHJvcGVydHlEZXNjcmlwdG9yPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLl9hcmdzLCBhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGEuY29udGFpbmVyW2EubmFtZV0pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyUHJvcHMgPSBQcm9wZXJ0eVJldHJpZXZlci5nZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKGEuY29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3AgPSBfLmZpbmQoY29udGFpbmVyUHJvcHMsIHAgPT4gcC5uYW1lID09PSBhLm5hbWUpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFthLm5hbWVdID0gcHJvcC5kZXNjO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChhLnR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuQ2xhc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UT0RPOiByZXR1cm4gYSBuZXcgbW9jayBldmVyeSB0aW1lIHdpdGggc2FtZSBpbnRlcmNlcHRvciBhcyB0aGUgb25lIHVzZWQgYnkgbW9jayBwYXNzZWQgaW4gYXMgYXJnIHRvIHVzaW5nIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgKHRvIHN1cHBvcnQgZGlmZmVyZW50IGN0b3IgYXJndW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MudmFsdWUgPSAoKSA9PiBhLm1vY2sub2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5GdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlID0gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuVmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy5nZXQgPSAoKSA9PiBhLm1vY2sub2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Vbmtub3duR2xvYmFsVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSwgXCJVbmtub3duR2xvYmFsVHlwZSBFeGNlcHRpb25cIiwgXCJ1bmtub3duIGdsb2JhbCB0eXBlOiBcIiArIGEudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLmNvbnRhaW5lciwgYS5uYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiMTogXCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWN0aW9uLmFwcGx5KHRoaXMsIHRoaXMuX2FyZ3MpO1xyXG5cclxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLl9hcmdzLCBhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoYS5tb2NrLmluc3RhbmNlKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IGluaXRpYWxbYS5uYW1lXTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYS50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLkNsYXNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5GdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuVmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy5jb25maWd1cmFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLmNvbnRhaW5lciwgYS5uYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgIGNvbnNvbGUubG9nKFwiMjogXCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL25vZGUvbm9kZS5kLnRzJyAvPiBcblxuaWYgKHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIF86IFVuZGVyc2NvcmVTdGF0aWMgPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcbn1cblxuaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gVHlwZU1vcTtcbiAgICB9XG4gICAgZXhwb3J0cy5UeXBlTW9xID0gVHlwZU1vcTtcbn0gZWxzZSB7XG4gICAgdGhpcy5UeXBlTW9xID0gVHlwZU1vcTtcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=