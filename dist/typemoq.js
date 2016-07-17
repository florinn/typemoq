var TypeMoqIntern;
(function (TypeMoqIntern) {
    var Consts = (function () {
        function Consts() {
        }
        Consts.IMATCH_ID_VALUE = "438A51D3-6864-49D7-A655-CA1153B86965";
        Consts.IMATCH_ID_NAME = "___id";
        Consts.IMATCH_MATCHES_NAME = "___matches";
        return Consts;
    }());
    TypeMoqIntern.Consts = Consts;
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
            if (!this._name)
                this._name = mock.name;
        }
        GlobalMock.ofInstance = function (instance, globalName, container, behavior) {
            if (container === void 0) { container = window; }
            if (behavior === void 0) { behavior = TypeMoqIntern.MockBehavior.Loose; }
            var mock = TypeMoqIntern.Mock.ofInstance(instance, behavior);
            var type = _.isFunction(instance) ? GlobalType.Function : GlobalType.Value;
            return new GlobalMock(mock, globalName, type, container);
        };
        GlobalMock.ofType = function (ctor, globalName, container, behavior) {
            if (container === void 0) { container = window; }
            if (behavior === void 0) { behavior = TypeMoqIntern.MockBehavior.Loose; }
            var instance = new ctor();
            var mock = TypeMoqIntern.Mock.ofInstance(instance, behavior);
            return new GlobalMock(mock, globalName, GlobalType.Class, container);
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
            var ret;
            if (fun.name) {
                ret = fun.name;
            }
            else {
                var repr = fun.toString();
                repr = repr.substr('function '.length);
                ret = repr.substr(0, repr.indexOf('('));
            }
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
                this.___id = TypeMoqIntern.Consts.IMATCH_ID_VALUE;
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
                this.___id = TypeMoqIntern.Consts.IMATCH_ID_VALUE;
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
                this.___id = TypeMoqIntern.Consts.IMATCH_ID_VALUE;
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
                this.___id = TypeMoqIntern.Consts.IMATCH_ID_VALUE;
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
        var MatchPred = (function () {
            function MatchPred(_pred) {
                this._pred = _pred;
                this.___id = TypeMoqIntern.Consts.IMATCH_ID_VALUE;
            }
            MatchPred.prototype.___matches = function (object) {
                var match = false;
                if (this._pred(object))
                    match = true;
                return match;
            };
            return MatchPred;
        }());
        Match.MatchPred = MatchPred;
    })(Match = TypeMoqIntern.Match || (TypeMoqIntern.Match = {}));
})(TypeMoqIntern || (TypeMoqIntern = {}));


var TypeMoqIntern;
(function (TypeMoqIntern) {
    var Match;
    (function (Match) {
        var MatchValue = (function () {
            function MatchValue(_value) {
                this._value = _value;
                this.___id = TypeMoqIntern.Consts.IMATCH_ID_VALUE;
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
                Object.defineProperty(this._property.obj, this._property.name, { value: this._args[0] });
                this.returnValue = this._args[0];
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
            var initial = {};
            try {
                _.each(this._args, function (a) {
                    if (!_.isUndefined(a.container.hasOwnProperty(a.name))) {
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
            var _this = this;
            var orderedCalls = this._interceptorContext.orderedCalls();
            var verifiables = _.filter(orderedCalls, function (c) { return c.isVerifiable; });
            _.forEach(verifiables, function (v) {
                _this.verifyCall(v, v.expectedCallCount);
            });
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
        It.is = function (predicate) {
            var matcher = new match.MatchPred(predicate);
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
            this._callCount = 0;
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
                    if (!_.isUndefined(a[TypeMoqIntern.Consts.IMATCH_MATCHES_NAME]) &&
                        !_.isUndefined(a[TypeMoqIntern.Consts.IMATCH_ID_NAME]) && a[TypeMoqIntern.Consts.IMATCH_ID_NAME] === TypeMoqIntern.Consts.IMATCH_ID_VALUE) {
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
            // IProxyCall
            get: function () { return this._id; },
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
        Object.defineProperty(MethodCall.prototype, "expectedCallCount", {
            get: function () { return this._expectedCallCount; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "isInvoked", {
            get: function () { return this._isInvoked; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MethodCall.prototype, "callCount", {
            get: function () { return this._callCount; },
            enumerable: true,
            configurable: true
        });
        MethodCall.prototype.evaluatedSuccessfully = function () {
            this._evaluatedSuccessfully = true;
        };
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
            this._isInvoked = true;
            if (this._setupCallback != null) {
                this._setupCallback.apply(this, call.args);
            }
            if (this._thrownException != null) {
                throw this._thrownException;
            }
            this._callCount++;
        };
        // IVerifies
        MethodCall.prototype.verifiable = function (times) {
            if (times === void 0) { times = TypeMoqIntern.Times.atLeastOnce(); }
            this._isVerifiable = true;
            this._expectedCallCount = times;
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
    var _1 = require("underscore");
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJDb25zdHMudHMiLCJDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cyIsIkdsb2JhbE1vY2sudHMiLCJBcGkvSUNhbGxiYWNrLnRzIiwiQXBpL0lSZXR1cm5zLnRzIiwiQXBpL0lTZXR1cC50cyIsIkFwaS9JVGhyb3dzLnRzIiwiQXBpL0lVc2luZy50cyIsIkFwaS9JVmVyaWZpZXMudHMiLCJBcGkvX2FsbC50cyIsIkNvbW1vbi9DdG9yLnRzIiwiQ29tbW9uL0Z1bmMudHMiLCJDb21tb24vUHJvcGVydHlSZXRyaWV2ZXIudHMiLCJDb21tb24vVXRpbHMudHMiLCJDb21tb24vX2FsbC50cyIsIkVycm9yL0V4Y2VwdGlvbi50cyIsIkVycm9yL01vY2tFeGNlcHRpb24udHMiLCJFcnJvci9fYWxsLnRzIiwiTWF0Y2gvSU1hdGNoLnRzIiwiTWF0Y2gvTWF0Y2hBbnkudHMiLCJNYXRjaC9NYXRjaFByZWQudHMiLCJNYXRjaC9NYXRjaFZhbHVlLnRzIiwiTWF0Y2gvX2FsbC50cyIsIlByb3h5L0lDYWxsQ29udGV4dC50cyIsIlByb3h5L0lDYWxsSW50ZXJjZXB0b3IudHMiLCJQcm94eS9JbnZvY2F0aW9uLnRzIiwiUHJveHkvSVByb3h5Q2FsbC50cyIsIlByb3h5L0lQcm94eUZhY3RvcnkudHMiLCJQcm94eS9Qcm94eS50cyIsIlByb3h5L1Byb3h5RmFjdG9yeS50cyIsIlByb3h5L19hbGwudHMiLCJfYWxsLnRzIiwiR2xvYmFsU2NvcGUudHMiLCJJR2xvYmFsTW9jay50cyIsIklNb2NrLnRzIiwiSW50ZXJjZXB0b3JDb250ZXh0LnRzIiwiSW50ZXJjZXB0b3JFeGVjdXRlLnRzIiwiSW50ZXJjZXB0b3JTZXR1cC50cyIsIkludGVyY2VwdG9yU3RyYXRlZ2llcy50cyIsIkl0LnRzIiwiTWV0aG9kQ2FsbC50cyIsIk1ldGhvZENhbGxSZXR1cm4udHMiLCJNb2NrLnRzIiwiVGltZXMudHMiLCJfZXhwb3J0cy50cyIsIl9ub2RlLnRzIl0s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TyxRQVFiO0FBR0QsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7O0FDdkJsQiw0RUFBNEU7QUFFNUUsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxJQUFJLEVBQUMsR0FBcUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdkMsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzlCLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnN0cyB7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9WQUxVRSA9IFwiNDM4QTUxRDMtNjg2NC00OUQ3LUE2NTUtQ0ExMTUzQjg2OTY1XCI7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9OQU1FID0gXCJfX19pZFwiO1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfTUFUQ0hFU19OQU1FID0gXCJfX19tYXRjaGVzXCI7XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4ge1xyXG4gICAgICAgIGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD47XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBHbG9iYWxUeXBlIHsgQ2xhc3MsIEZ1bmN0aW9uLCBWYWx1ZSB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbE1vY2s8VD4gaW1wbGVtZW50cyBJR2xvYmFsTW9jazxUPiB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX3R5cGU6IEdsb2JhbFR5cGUsIHB1YmxpYyBjb250YWluZXI6IE9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gbW9jay5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mSW5zdGFuY2U8VT4oaW5zdGFuY2U6IFUsIGdsb2JhbE5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgPyBHbG9iYWxUeXBlLkZ1bmN0aW9uIDogR2xvYmFsVHlwZS5WYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHbG9iYWxNb2NrKG1vY2ssIGdsb2JhbE5hbWUsIHR5cGUsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlPFU+KGN0b3I6IEN0b3I8VT4sIGdsb2JhbE5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgY3RvcigpO1xyXG4gICAgICAgICAgICBsZXQgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdsb2JhbE1vY2sobW9jaywgZ2xvYmFsTmFtZSwgR2xvYmFsVHlwZS5DbGFzcywgY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLm1vY2sub2JqZWN0OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZSB8fCB0aGlzLm1vY2submFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMubW9jay5iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLm1vY2suY2FsbEJhc2U7IH1cclxuICAgICAgICBzZXQgY2FsbEJhc2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5tb2NrLmNhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblxyXG4gICAgICAgIC8vIHNldHVwXHJcblxyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2NrLnNldHVwKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vY2sudmVyaWZ5KGV4cHJlc3Npb24sIHRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrLnZlcmlmeUFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24pOiBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PjtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24xPFQ+KTogSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD47XHJcbiAgICB9XHJcbn0gICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm5zKHZhbHVlRnVuY3Rpb246IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICAgICAgY2FsbEJhc2UoKTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Jlc3VsdDxUPiBleHRlbmRzIElWZXJpZmllcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiBleHRlbmRzIElSZXR1cm5zPFQsIFRSZXN1bHQ+LCBJVGhyb3dzIHtcclxuICAgIH1cclxufSAgICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTZXR1cDxULCBUUmVzdWx0PiBleHRlbmRzIElDYWxsYmFjazxULCBUUmVzdWx0PiwgSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4sIElWZXJpZmllcyB7IH0gXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5BcGkge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93cyB7XHJcbiAgICAgICAgdGhyb3dzPFQgZXh0ZW5kcyBlcnJvci5FeGNlcHRpb24+KGV4Y2VwdGlvbjogVCk6IElUaHJvd3NSZXN1bHQ7XHJcblx0fVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93c1Jlc3VsdCBleHRlbmRzIElWZXJpZmllcyB7XHJcblx0fVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElVc2luZ1Jlc3VsdCB7XHJcbiAgICAgICAgd2l0aChhY3Rpb246IElBY3Rpb24pOiB2b2lkO1xyXG4gICAgfVxyXG59ICAgIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZlcmlmaWVzIHtcclxuICAgICAgICB2ZXJpZmlhYmxlKHRpbWVzPzogVGltZXMpOiB2b2lkO1xyXG4gICAgfVxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbGJhY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lSZXR1cm5zLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJU2V0dXAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lUaHJvd3MudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lVc2luZy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVZlcmlmaWVzLnRzJyAvPiAgIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IHR5cGUgQ3RvcjxUPiA9IHtcclxuICAgICAgICBuZXcgKCk6IFQ7XHJcbiAgICAgICAgcHJvdG90eXBlOiBPYmplY3Q7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdHlwZSBDdG9yV2l0aEFyZ3M8VD4gPSB7XHJcbiAgICAgICAgbmV3ICguLi5jdG9yQXJnczogYW55W10pOiBUO1xyXG4gICAgICAgIHByb3RvdHlwZTogT2JqZWN0O1xyXG4gICAgfVxyXG59IFxyXG4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcbiAgICBleHBvcnQgdHlwZSBJQWN0aW9uID0gKCkgPT4gdm9pZDtcclxuICAgIGV4cG9ydCB0eXBlIElBY3Rpb24xPFQ+ID0gKHg6IFQpID0+IHZvaWQ7XHJcbiAgICBleHBvcnQgdHlwZSBJQWN0aW9uTjxUPiA9ICguLi54OiBUW10pID0+IHZvaWQ7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgSUZ1bmMxPFRSZXN1bHQ+ID0gKCkgPT4gVFJlc3VsdDtcclxuICAgIGV4cG9ydCB0eXBlIElGdW5jMjxULCBUUmVzdWx0PiA9ICh4OiBUKSA9PiBUUmVzdWx0O1xyXG4gICAgZXhwb3J0IHR5cGUgSUZ1bmNOPFQsIFRSZXN1bHQ+ID0gKC4uLng6IFRbXSkgPT4gVFJlc3VsdDtcclxufSBcclxuIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5UmV0cmlldmVyIHtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldE93bkVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgZmFsc2UsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBjb3VsZCB1c2UgZm9yLi5pbiBmaWx0ZXJlZCB3aXRoIGhhc093blByb3BlcnR5IG9yIGp1c3QgdGhpczogcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duTm9uZW51bWVyYWJsZXMob2JqOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fbm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIGZhbHNlLCB0aGlzLl9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGp1c3QgdXNlOiByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9lbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVOb25lbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIHRydWUsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBjb3VsZCB1c2UgdW5maWx0ZXJlZCBmb3IuLmluXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duQW5kUHJvdG90eXBlTm9uZW51bWVyYWJsZXMob2JqOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUHJpdmF0ZSBzdGF0aWMgcHJvcGVydHkgY2hlY2tlciBjYWxsYmFja3NcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZW51bWVyYWJsZShvYmo6IGFueSwgcHJvcDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbm90RW51bWVyYWJsZShvYmo6IGFueSwgcHJvcDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAhb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlKHByb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKG9iajogYW55LCBwcm9wOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZ2V0UHJvcGVydHlOYW1lcyhcclxuICAgICAgICAgICAgb2JqOiBhbnksIGl0ZXJhdGVTZWxmQm9vbDogYm9vbGVhbiwgaXRlcmF0ZVByb3RvdHlwZUJvb2w6IGJvb2xlYW4sIGluY2x1ZGVQcm9wQ2I6IChvYmo6IGFueSwgcHJvcDogYW55KSA9PiBib29sZWFuKTpcclxuICAgICAgICAgICAgQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciB9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTx7IG5hbWU6IHN0cmluZzsgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yIH0+ID0gW107XHJcblxyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmF0ZVNlbGZCb29sKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHByb3BzLCBwcm9wID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZSA9IF8uZmluZChyZXN1bHQsIHAgPT4gcC5uYW1lID09PSBwcm9wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZHVwbGljYXRlICYmIGluY2x1ZGVQcm9wQ2Iob2JqLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBuYW1lOiBwcm9wLCBkZXNjOiBwcm9wRGVzYyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXRlcmF0ZVByb3RvdHlwZUJvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpdGVyYXRlU2VsZkJvb2wgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0VVVJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBsZXQgdXVpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBmdW5jdGlvbk5hbWUoZnVuOiBPYmplY3QpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmV0OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT5mdW4pLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9ICg8YW55PmZ1bikubmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXByID0gZnVuLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICByZXByID0gcmVwci5zdWJzdHIoJ2Z1bmN0aW9uICcubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHJldCA9IHJlcHIuc3Vic3RyKDAsIHJlcHIuaW5kZXhPZignKCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNvbnRodW5rdG9yPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgYXJnczogYW55W10pOiBVIHtcclxuICAgICAgICAgICAgcmV0dXJuICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgVGVtcDogYW55ID0gKCkgPT4geyB9LCBpbnN0OiBhbnksIHJldDogYW55O1xyXG4gICAgICAgICAgICAgICAgVGVtcC5wcm90b3R5cGUgPSBjdG9yLnByb3RvdHlwZTtcclxuICAgICAgICAgICAgICAgIGluc3QgPSBuZXcgVGVtcCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihjdG9yKSlcclxuICAgICAgICAgICAgICAgICAgICByZXQgPSBuZXcgKGN0b3IuYmluZC5hcHBseShjdG9yLCBbdm9pZCAwXS5jb25jYXQoYXJncykpKSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uaXNPYmplY3QocmV0KSA/IHJldCA6IGluc3Q7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0N0b3IudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0Z1bmMudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3BlcnR5UmV0cmlldmVyLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdVdGlscy50cycgLz4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5FcnJvciB7XHJcbiAgICBleHBvcnQgY2xhc3MgRXhjZXB0aW9uIGltcGxlbWVudHMgRXJyb3Ige1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lPzogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5FcnJvciB7XHJcbiAgICBleHBvcnQgZW51bSBNb2NrRXhjZXB0aW9uUmVhc29uIHtcclxuICAgICAgICBOb1NldHVwLFxyXG4gICAgICAgIE1vcmVUaGFuT25lU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgIEludmFsaWRTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgSW52YWxpZE1hdGNoZXIsXHJcbiAgICAgICAgSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgVW5rbm93bkdsb2JhbFR5cGUsXHJcbiAgICAgICAgVmVyaWZpY2F0aW9uRmFpbGVkXHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTW9ja0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFzb246IE1vY2tFeGNlcHRpb25SZWFzb24sXHJcbiAgICAgICAgICAgIHB1YmxpYyBjdHg6IGFueSxcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nID0gJ01vY2sgRXhjZXB0aW9uJyxcclxuICAgICAgICAgICAgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdFeGNlcHRpb24udHMnIC8+IFxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNb2NrRXhjZXB0aW9uLnRzJyAvPiIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLk1hdGNoIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElNYXRjaCB7XHJcbiAgICAgICAgX19faWQ6IHN0cmluZztcclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbjtcclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uTWF0Y2gge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueU9iamVjdDxUPiBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY3RvcjogQ3RvcjxUPikge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N0b3IucHJvdG90eXBlID09PSBvYmplY3QuY29uc3RydWN0b3IucHJvdG90eXBlKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueSBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoQW55U3RyaW5nIGltcGxlbWVudHMgSU1hdGNoIHtcclxuXHJcbiAgICAgICAgX19faWQgPSBDb25zdHMuSU1BVENIX0lEX1ZBTFVFO1xyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc1N0cmluZyhvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueU51bWJlciBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNOdW1iZXIob2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoUHJlZDxUPiBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJlZDogSUZ1bmMyPFQsIGJvb2xlYW4+KSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcHJlZCg8VD5vYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLk1hdGNoIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hWYWx1ZTxUPiBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmFsdWU6IFQpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRXF1YWwodGhpcy5fdmFsdWUsIG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJTWF0Y2gudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01hdGNoQW55LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaFByZWQudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01hdGNoVmFsdWUudHMnIC8+IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICBhcmdzOiBJQXJndW1lbnRzO1xyXG4gICAgICAgIHByb3BlcnR5OiBJUHJvcGVydHlJbmZvO1xyXG4gICAgICAgIHJldHVyblZhbHVlOiBhbnk7XHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkO1xyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIGludGVyY2VwdChjb250ZXh0OiBJQ2FsbENvbnRleHQpOiB2b2lkO1xyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogTWV0aG9kSW5mbywgcHJpdmF0ZSBfYXJncz86IElBcmd1bWVudHMpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMgeyByZXR1cm4gdGhpcy5fYXJncyB8fCB7IGxlbmd0aDogMCwgY2FsbGVlOiBudWxsIH07IH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB0aGlzLl9hcmdzID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5fcHJvcGVydHkudG9GdW5jLmFwcGx5KHRoaXMuX3Byb3BlcnR5Lm9iaiwgdGhpcy5fYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgR2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHtcclxuICAgICAgICAgICAgbGV0IGFyZ3M6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcmdzLCBcImNhbGxlZVwiLFxyXG4gICAgICAgICAgICAgICAgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBudWxsIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5hcmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTZXR0ZXJJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHlJbmZvLCBwcml2YXRlIF9hcmdzOiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3M7IH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB0aGlzLl9hcmdzID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5fcHJvcGVydHkub2JqLCB0aGlzLl9wcm9wZXJ0eS5uYW1lLCB7IHZhbHVlOiB0aGlzLl9hcmdzWzBdIH0pO1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdGhpcy5fYXJnc1swXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RJbmZvIGltcGxlbWVudHMgSVByb3BlcnR5SW5mbyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG9iajogYW55LCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCB0b0Z1bmMoKTogRnVuY3Rpb24ge1xyXG4gICAgICAgICAgICBsZXQgZnVuYzogRnVuY3Rpb247XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5vYmopKVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IDxGdW5jdGlvbj50aGlzLm9iajtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IDxGdW5jdGlvbj50aGlzLm9ialt0aGlzLm5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5SW5mbyBpbXBsZW1lbnRzIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IE9iamVjdCwgcHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIG9iajogT2JqZWN0O1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJveHlDYWxsPFQ+IHtcclxuICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgIHNldHVwRXhwcmVzc2lvbjogSUFjdGlvbjE8VD47XHJcbiAgICAgICAgc2V0dXBDYWxsOiBwcm94eS5JQ2FsbENvbnRleHQ7XHJcbiAgICAgICAgaXNWZXJpZmlhYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGV4cGVjdGVkQ2FsbENvdW50OiBUaW1lcztcclxuICAgICAgICBpc0ludm9rZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgY2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIG1hdGNoZXMoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogYm9vbGVhbjtcclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb3h5RmFjdG9yeSB7XHJcbiAgICAgICAgY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKTogVDtcclxuICAgIH1cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm94eTxUPiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2soaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvcHMgPSBQcm9wZXJ0eVJldHJpZXZlci5nZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgXy5lYWNoKHByb3BzLCBwcm9wID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHByb3AuZGVzYy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBwcm9wLmRlc2MuY29uZmlndXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBwcm9wLmRlc2MuZW51bWVyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHByb3AuZGVzYy53cml0YWJsZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZU1ldGhvZFByb3h5KHRoYXQsIGludGVyY2VwdG9yLCBpbnN0YW5jZSwgcHJvcC5uYW1lLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBwcm9wLmRlc2MuY29uZmlndXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBwcm9wLmRlc2MuZW51bWVyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZVByb3BlcnR5UHJveHkodGhhdCwgaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wLm5hbWUsIHByb3AuZGVzYy52YWx1ZSwgcHJvcERlc2MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2Y8VT4oaW5zdGFuY2U6IFUsIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yKSB7XHJcbiAgICAgICAgICAgIFByb3h5LmNoZWNrKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IGFueTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZnVuY05hbWUgPSBVdGlscy5mdW5jdGlvbk5hbWUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gUHJveHkubWV0aG9kUHJveHlWYWx1ZShpbnRlcmNlcHRvciwgaW5zdGFuY2UsIGZ1bmNOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBQcm94eShpbnRlcmNlcHRvciwgaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY2hlY2s8VT4oaW5zdGFuY2U6IFUpOiB2b2lkIHtcclxuICAgICAgICAgICAgUHJveHkuY2hlY2tOb3ROdWxsKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFsbG93IG9ubHkgcHJpbWl0aXZlIG9iamVjdHMgYW5kIGZ1bmN0aW9uc1xyXG4gICAgICAgICAgICBsZXQgb2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgfHxcclxuICAgICAgICAgICAgICAgIChfLmlzT2JqZWN0KGluc3RhbmNlKSAmJiAhUHJveHkuaXNQcmltaXRpdmVPYmplY3QoaW5zdGFuY2UpKSlcclxuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICghb2spXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlLCBcIkludmFsaWRQcm94eUFyZ3VtZW50IEV4Y2VwdGlvblwiLCBcIkFyZ3VtZW50IHNob3VsZCBiZSBhIGZ1bmN0aW9uIG9yIGEgbm9uIHByaW1pdGl2ZSBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGNoZWNrPFU+KGluc3RhbmNlOiBVKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFByb3h5LmNoZWNrTm90TnVsbChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhbGxvdyBvbmx5IG5vbiBwcmltaXRpdmUgb2JqZWN0c1xyXG4gICAgICAgICAgICBsZXQgb2sgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24oaW5zdGFuY2UpICYmXHJcbiAgICAgICAgICAgICAgICAoXy5pc09iamVjdChpbnN0YW5jZSkgJiYgIVByb3h5LmlzUHJpbWl0aXZlT2JqZWN0KGluc3RhbmNlKSkpXHJcbiAgICAgICAgICAgICAgICBvayA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW9rKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmd1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgXCJJbnZhbGlkUHJveHlBcmd1bWVudCBFeGNlcHRpb25cIiwgXCJBcmd1bWVudCBzaG91bGQgYmUgYSBub24gcHJpbWl0aXZlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNoZWNrTm90TnVsbDxVPihpbnN0YW5jZTogVSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoXy5pc051bGwoaW5zdGFuY2UpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmd1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgXCJJbnZhbGlkUHJveHlBcmd1bWVudCBFeGNlcHRpb25cIiwgXCJBcmd1bWVudCBjYW5ub3QgYmUgbnVsbFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGlzUHJpbWl0aXZlT2JqZWN0KG9iajogT2JqZWN0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24ob2JqKSB8fFxyXG4gICAgICAgICAgICAgICAgXy5pc0FycmF5KG9iaikgfHxcclxuICAgICAgICAgICAgICAgIF8uaXNEYXRlKG9iaikgfHxcclxuICAgICAgICAgICAgICAgIF8uaXNOdWxsKG9iaikpXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lTWV0aG9kUHJveHkoXHJcbiAgICAgICAgICAgIHRoYXQ6IE9iamVjdCxcclxuICAgICAgICAgICAgaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgICAgIGluc3RhbmNlOiBULFxyXG4gICAgICAgICAgICBwcm9wTmFtZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBwcm9wRGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0geyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UgfSkge1xyXG5cclxuICAgICAgICAgICAgcHJvcERlc2MudmFsdWUgPSBQcm94eS5tZXRob2RQcm94eVZhbHVlKGludGVyY2VwdG9yLCBpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZpbmVQcm9wZXJ0eSh0aGF0LCBwcm9wTmFtZSwgcHJvcERlc2MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbWV0aG9kUHJveHlWYWx1ZTxVPihcclxuICAgICAgICAgICAgaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsXHJcbiAgICAgICAgICAgIGluc3RhbmNlOiBVLFxyXG4gICAgICAgICAgICBwcm9wTmFtZTogc3RyaW5nKTogKCkgPT4gYW55IHtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHByb3h5KCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IG5ldyBNZXRob2RJbmZvKGluc3RhbmNlLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW52b2NhdGlvbjogSUNhbGxDb250ZXh0ID0gbmV3IE1ldGhvZEludm9jYXRpb24obWV0aG9kLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJjZXB0b3IuaW50ZXJjZXB0KGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludm9jYXRpb24ucmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmVQcm9wZXJ0eVByb3h5KFxyXG4gICAgICAgICAgICB0aGF0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVCxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvcFZhbHVlOiBhbnksXHJcbiAgICAgICAgICAgIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UHJveHkoKTogYW55IHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSBuZXcgUHJvcGVydHlJbmZvKGluc3RhbmNlLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW52b2NhdGlvbjogSUNhbGxDb250ZXh0ID0gbmV3IEdldHRlckludm9jYXRpb24obWV0aG9kLCBwcm9wVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJjZXB0b3IuaW50ZXJjZXB0KGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludm9jYXRpb24ucmV0dXJuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvcERlc2MuZ2V0ID0gZ2V0UHJveHk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRQcm94eSh2OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSBuZXcgUHJvcGVydHlJbmZvKGluc3RhbmNlLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW52b2NhdGlvbjogSUNhbGxDb250ZXh0ID0gbmV3IFNldHRlckludm9jYXRpb24obWV0aG9kLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgaW50ZXJjZXB0b3IuaW50ZXJjZXB0KGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb3BEZXNjLnNldCA9IHNldFByb3h5O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kZWZpbmVQcm9wZXJ0eSh0aGF0LCBwcm9wTmFtZSwgcHJvcERlc2MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkZWZpbmVQcm9wZXJ0eShvYmo6IE9iamVjdCwgbmFtZTogc3RyaW5nLCBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIGRlc2MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3h5RmFjdG9yeSBpbXBsZW1lbnRzIElQcm94eUZhY3Rvcnkge1xyXG4gICAgICAgIGNyZWF0ZVByb3h5PFQ+KGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLCBpbnN0YW5jZTogVCk6IFQge1xyXG4gICAgICAgICAgICBsZXQgcHJveHk6IFQgPSA8VD48YW55PiBQcm94eS5vZihpbnN0YW5jZSwgaW50ZXJjZXB0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gcHJveHk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUNhbGxDb250ZXh0LnRzJyAvPiBcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSUNhbGxJbnRlcmNlcHRvci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSW52b2NhdGlvbi50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVByb3h5Q2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVByb3h5RmFjdG9yeS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nUHJveHkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3h5RmFjdG9yeS50cycgLz4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC91bmRlcnNjb3JlL3VuZGVyc2NvcmUuZC50cycgLz4gXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdBcGkvX2FsbC50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQ29tbW9uL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0Vycm9yL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J01hdGNoL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3h5L19hbGwudHMnIC8+XHJcblxyXG5pbXBvcnQgYXBpICAgICA9IFR5cGVNb3FJbnRlcm4uQXBpO1xyXG5pbXBvcnQgZXJyb3IgICA9IFR5cGVNb3FJbnRlcm4uRXJyb3I7XHJcbmltcG9ydCBtYXRjaCAgID0gVHlwZU1vcUludGVybi5NYXRjaDtcclxuaW1wb3J0IHByb3h5ICAgPSBUeXBlTW9xSW50ZXJuLlByb3h5OyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbFNjb3BlIGltcGxlbWVudHMgYXBpLklVc2luZ1Jlc3VsdCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FyZ3M6IElHbG9iYWxNb2NrPGFueT5bXSkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIHVzaW5nKC4uLmFyZ3M6IElHbG9iYWxNb2NrPGFueT5bXSk6IGFwaS5JVXNpbmdSZXN1bHQge1xyXG4gICAgICAgICAgICBsZXQgc2NvcGUgPSBuZXcgR2xvYmFsU2NvcGUoYXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybiBzY29wZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpdGgoYWN0aW9uOiBJQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBpbml0aWFsOiBQcm9wZXJ0eURlc2NyaXB0b3JNYXAgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5fYXJncywgYSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChhLmNvbnRhaW5lci5oYXNPd25Qcm9wZXJ0eShhLm5hbWUpKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNvbnRhaW5lclByb3BzID0gUHJvcGVydHlSZXRyaWV2ZXIuZ2V0T3duQW5kUHJvdG90eXBlRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhhLmNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9wID0gXy5maW5kKGNvbnRhaW5lclByb3BzLCBwID0+IHAubmFtZSA9PT0gYS5uYW1lKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWxbYS5uYW1lXSA9IHByb3AuZGVzYztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYS50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLkNsYXNzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETzogcmV0dXJuIGEgbmV3IG1vY2sgZXZlcnkgdGltZSB3aXRoIHNhbWUgaW50ZXJjZXB0b3IgYXMgdGhlIG9uZSB1c2VkIGJ5IG1vY2sgcGFzc2VkIGluIGFzIGFyZyB0byAndXNpbmcnIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgKHRvIHN1cHBvcnQgZGlmZmVyZW50IGN0b3IgYXJndW1lbnRzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MudmFsdWUgPSAoKSA9PiBhLm1vY2sub2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5GdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlID0gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuVmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy5nZXQgPSAoKSA9PiBhLm1vY2sub2JqZWN0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Vbmtub3duR2xvYmFsVHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSwgXCJVbmtub3duR2xvYmFsVHlwZSBFeGNlcHRpb25cIiwgXCJ1bmtub3duIGdsb2JhbCB0eXBlOiBcIiArIGEudHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYS5jb250YWluZXIsIGEubmFtZSwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiMTogXCIgKyBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGFjdGlvbi5hcHBseSh0aGlzLCB0aGlzLl9hcmdzKTtcclxuXHJcbiAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5fYXJncywgYSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGEubW9jay5pbnN0YW5jZSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSBpbml0aWFsW2EubmFtZV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzYykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoYS50eXBlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5DbGFzczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5GdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5WYWx1ZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy5jb25maWd1cmFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhLmNvbnRhaW5lciwgYS5uYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjI6IFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsTW9jazxUPiBleHRlbmRzIElNb2NrPFQ+IHtcclxuICAgICAgICBtb2NrOiBNb2NrPFQ+O1xyXG4gICAgICAgIHR5cGU6IEdsb2JhbFR5cGU7XHJcbiAgICAgICAgY29udGFpbmVyOiBPYmplY3Q7XHJcbiAgICB9XHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTW9jazxUPiB7XHJcbiAgICAgICAgb2JqZWN0OiBUO1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgICAgICBiZWhhdmlvcjogTW9ja0JlaGF2aW9yO1xyXG4gICAgICAgIGNhbGxCYXNlOiBib29sZWFuO1xyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD47XHJcbiAgICAgICAgdmVyaWZ5PFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0PiwgdGltZXM6IFRpbWVzKTogdm9pZDtcclxuICAgICAgICB2ZXJpZnlBbGwoKTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuXHRleHBvcnQgZW51bSBJbnRlcmNlcHRpb25BY3Rpb24geyBDb250aW51ZSwgU3RvcCB9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHRcdGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsXHRjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPixcdGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvckNvbnRleHQ8VD4ge1xyXG5cdFx0cHJpdmF0ZSBfYWN0dWFsSW52b2NhdGlvbnM6IEFycmF5PHByb3h5LklDYWxsQ29udGV4dD4gPSBbXTtcclxuXHRcdHByaXZhdGUgX29yZGVyZWRDYWxsczogQXJyYXk8cHJveHkuSVByb3h5Q2FsbDxUPj4gPSBbXTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihwdWJsaWMgYmVoYXZpb3I6IE1vY2tCZWhhdmlvciwgcHVibGljIG1vY2s6IElNb2NrPFQ+KSB7IH1cclxuXHJcblx0XHRhZGRJbnZvY2F0aW9uKGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCkgeyB0aGlzLl9hY3R1YWxJbnZvY2F0aW9ucy5wdXNoKGludm9jYXRpb24pOyB9XHJcblx0XHRhY3R1YWxJbnZvY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMuX2FjdHVhbEludm9jYXRpb25zOyB9XHJcblx0XHRjbGVhckludm9jYXRpb25zKCkgeyB0aGlzLl9hY3R1YWxJbnZvY2F0aW9ucyA9IFtdOyB9XHJcblxyXG5cdFx0YWRkT3JkZXJlZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPikgeyB0aGlzLl9vcmRlcmVkQ2FsbHMucHVzaChjYWxsKTsgfVxyXG5cdFx0cmVtb3ZlT3JkZXJlZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPikge1xyXG5cdFx0XHRfLmZpbHRlcih0aGlzLl9vcmRlcmVkQ2FsbHMsICh4OiBwcm94eS5JUHJveHlDYWxsPFQ+KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHguaWQgIT09IGNhbGwuaWQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0b3JkZXJlZENhbGxzKCkgeyByZXR1cm4gdGhpcy5fb3JkZXJlZENhbGxzOyB9XHJcblx0fVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyY2VwdG9yRXhlY3V0ZTxUPiBpbXBsZW1lbnRzIFByb3h5LklDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdG9yQ29udGV4dDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihiZWhhdmlvcjogTW9ja0JlaGF2aW9yLCBtb2NrOiBJTW9jazxUPikge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQgPSBuZXcgSW50ZXJjZXB0b3JDb250ZXh0KGJlaGF2aW9yLCBtb2NrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpbnRlcmNlcHRvckNvbnRleHQoKTogSW50ZXJjZXB0b3JDb250ZXh0PFQ+IHsgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9yQ29udGV4dDsgfVxyXG5cclxuICAgICAgICBpbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbEN0eCA9IG5ldyBDdXJyZW50SW50ZXJjZXB0Q29udGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgXy5zb21lKHRoaXMuaW50ZXJjZXB0aW9uU3RyYXRlZ2llcygpLCAoc3RyYXRlZ3k6IElJbnRlcmNlcHRTdHJhdGVneTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKEludGVyY2VwdGlvbkFjdGlvbi5TdG9wID09PSBzdHJhdGVneS5oYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbiwgdGhpcy5pbnRlcmNlcHRvckNvbnRleHQsIGxvY2FsQ3R4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQuYWRkT3JkZXJlZENhbGwoY2FsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2ZXJpZnlDYWxsPFQ+KGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgYWN0dWFsQ2FsbHM6IEFycmF5PHByb3h5LklDYWxsQ29udGV4dD4gPSB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQuYWN0dWFsSW52b2NhdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYWxsQ291bnQgPSBfLmZpbHRlcihhY3R1YWxDYWxscywgYyA9PiBjYWxsLm1hdGNoZXMoYykpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGltZXMudmVyaWZ5KGNhbGxDb3VudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhyb3dWZXJpZnlDYWxsRXhjZXB0aW9uKGNhbGwuc2V0dXBDYWxsLCB0aW1lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IG9yZGVyZWRDYWxsczogQXJyYXk8cHJveHkuSVByb3h5Q2FsbDxUPj4gPSB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQub3JkZXJlZENhbGxzKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmVyaWZpYWJsZXMgPSBfLmZpbHRlcihvcmRlcmVkQ2FsbHMsIGMgPT4gYy5pc1ZlcmlmaWFibGUpO1xyXG5cclxuICAgICAgICAgICAgXy5mb3JFYWNoKHZlcmlmaWFibGVzLCB2ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVyaWZ5Q2FsbCh2LCB2LmV4cGVjdGVkQ2FsbENvdW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludGVyY2VwdGlvblN0cmF0ZWdpZXMoKTogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyYXRlZ2llczogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4gPSBbXHJcbiAgICAgICAgICAgICAgICBuZXcgQWRkQWN0dWFsSW52b2NhdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEV4dHJhY3RQcm94eUNhbGwoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFeGVjdXRlQ2FsbCgpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEludm9rZUJhc2UoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBIYW5kbGVNb2NrUmVjdXJzaW9uKClcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmF0ZWdpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRocm93VmVyaWZ5Q2FsbEV4Y2VwdGlvbihjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQsIHRpbWVzOiBUaW1lcykge1xyXG4gICAgICAgICAgICBsZXQgZSA9IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgY2FsbCwgXCJWZXJpZnlDYWxsIEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JTZXR1cDxUPiBpbXBsZW1lbnRzIFByb3h5LklDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdGVkQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG5cclxuICAgICAgICBnZXQgaW50ZXJjZXB0ZWRDYWxsKCkgeyByZXR1cm4gdGhpcy5faW50ZXJjZXB0ZWRDYWxsOyB9XHJcblxyXG4gICAgICAgIGludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ludGVyY2VwdGVkQ2FsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Nb3JlVGhhbk9uZVNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICAgICAgICAgICAgICBpbnZvY2F0aW9uLCBcIk1vcmVUaGFuT25lU2V0dXBFeHByZXNzaW9uIEV4Y2VwdGlvblwiLCBcIlNldHVwIHNob3VsZCBjb250YWluIG9ubHkgb25lIGV4cHJlc3Npb25cIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdGVkQ2FsbCA9IGludm9jYXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEFkZEFjdHVhbEludm9jYXRpb248VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgY3R4LmFkZEludm9jYXRpb24oaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFeHRyYWN0UHJveHlDYWxsPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIGxldCBvcmRlcmVkQ2FsbHMgPSBjdHgub3JkZXJlZENhbGxzKCkuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaW5kQ2FsbFByZWQgPSA8VD4oYzogcHJveHkuSVByb3h5Q2FsbDxUPikgPT4gYy5tYXRjaGVzKGludm9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1hdGNoaW5nQ2FsbHMgPSBfLmZpbHRlcihvcmRlcmVkQ2FsbHMsIGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRDYWxsUHJlZChjKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmdDYWxscy5sZW5ndGggPiAxKSAgIC8vIHJlY29yZC9yZXBsYXkgc2NlbmFyaW8gXHJcbiAgICAgICAgICAgICAgICBmaW5kQ2FsbFByZWQgPSA8VD4oYzogcHJveHkuSVByb3h5Q2FsbDxUPikgPT4gIWMuaXNJbnZva2VkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgYy5tYXRjaGVzKGludm9jYXRpb24pO1xyXG5cclxuICAgICAgICAgICAgbG9jYWxDdHguY2FsbCA9IF8uZmluZChvcmRlcmVkQ2FsbHMsIGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbmRDYWxsUHJlZChjKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYWxDdHguY2FsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbEN0eC5jYWxsLmV2YWx1YXRlZFN1Y2Nlc3NmdWxseSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGN0eC5iZWhhdmlvciA9PSBNb2NrQmVoYXZpb3IuU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLk5vU2V0dXAsIGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRXhlY3V0ZUNhbGw8VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBwcml2YXRlIF9jdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPjtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRDYWxsID0gbG9jYWxDdHguY2FsbDtcclxuXHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2FsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q2FsbC5leGVjdXRlKGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5TdG9wO1xyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludm9rZUJhc2U8VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgaWYgKGN0eC5tb2NrLmNhbGxCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICBpbnZvY2F0aW9uLmludm9rZUJhc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uU3RvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSGFuZGxlTW9ja1JlY3Vyc2lvbjxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICAvL1RPRE86IFxyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSXQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBpc1ZhbHVlPFQ+KHg6IFQpOiBUIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaFZhbHVlKHgpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55T2JqZWN0PFQ+KHg6IEN0b3I8VD4pOiBUIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueU9iamVjdCh4KTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueSgpOiBhbnkge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55KCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnlTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueVN0cmluZygpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55TnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlOdW1iZXIoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpczxUPihwcmVkaWNhdGU6IElGdW5jMjxULCBib29sZWFuPik6IFQge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoUHJlZChwcmVkaWNhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+IGltcGxlbWVudHMgcHJveHkuSVByb3h5Q2FsbDxUPiwgYXBpLklWZXJpZmllcyB7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcclxuICAgICAgICBwcm90ZWN0ZWQgX3NldHVwQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG4gICAgICAgIHByb3RlY3RlZCBfc2V0dXBDYWxsYmFjazogSUFjdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2lzVmVyaWZpYWJsZTogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2V4cGVjdGVkQ2FsbENvdW50OiBUaW1lcztcclxuICAgICAgICBwcm90ZWN0ZWQgX2lzSW52b2tlZDogYm9vbGVhbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2NhbGxDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICBwcm90ZWN0ZWQgX3Rocm93bkV4Y2VwdGlvbjogZXJyb3IuRXhjZXB0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBfZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5OiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbW9jazogTW9jazxUPiwgcHJpdmF0ZSBfc2V0dXBFeHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pIHtcclxuICAgICAgICAgICAgdGhpcy5faWQgPSB0aGlzLmdlbmVyYXRlSWQoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbnRlcmNlcHRvciA9IG5ldyBJbnRlcmNlcHRvclNldHVwKCk7XHJcbiAgICAgICAgICAgIGxldCBwcm94eSA9IE1vY2sucHJveHlGYWN0b3J5LmNyZWF0ZVByb3h5PFQ+KGludGVyY2VwdG9yLCBtb2NrLmluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIF9zZXR1cEV4cHJlc3Npb24ocHJveHkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGludGVyY2VwdG9yLmludGVyY2VwdGVkQ2FsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGljID0gaW50ZXJjZXB0b3IuaW50ZXJjZXB0ZWRDYWxsO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXdBcmdzID0gdGhpcy50cmFuc2Zvcm1Ub01hdGNoZXJzKGljLmFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5ld0FyZ3MsIFwiY2FsbGVlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBpYy5hcmdzLmNhbGxlZSB9KTtcclxuICAgICAgICAgICAgICAgIGljLmFyZ3MgPSA8SUFyZ3VtZW50cz48YW55Pm5ld0FyZ3M7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsID0gaWM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBFeHByZXNzaW9uLCBcIkludmFsaWRTZXR1cEV4cHJlc3Npb24gRXhjZXB0aW9uXCIsIFwiSW52YWxpZCBzZXR1cCBleHByZXNzaW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdlbmVyYXRlSWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk1ldGhvZENhbGw8XCIgKyBfLnVuaXF1ZUlkKCkgKyBcIj5cIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdHJhbnNmb3JtVG9NYXRjaGVycyhhcmdzOiBJQXJndW1lbnRzKTogQXJyYXk8bWF0Y2guSU1hdGNoPiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdBcmdzOiBBcnJheTxtYXRjaC5JTWF0Y2g+ID0gW107XHJcblxyXG4gICAgICAgICAgICBfLmVhY2goYXJncywgYSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV8uaXNPYmplY3QoYSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3QXJnID0gbmV3IG1hdGNoLk1hdGNoVmFsdWUoYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJncy5wdXNoKG5ld0FyZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoYVtDb25zdHMuSU1BVENIX01BVENIRVNfTkFNRV0pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFfLmlzVW5kZWZpbmVkKGFbQ29uc3RzLklNQVRDSF9JRF9OQU1FXSkgJiYgYVtDb25zdHMuSU1BVENIX0lEX05BTUVdID09PSBDb25zdHMuSU1BVENIX0lEX1ZBTFVFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaCg8bWF0Y2guSU1hdGNoPmEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkTWF0Y2hlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEsIFwiSW52YWxpZE1hdGNoZXIgRXhjZXB0aW9uXCIsIFwiSW52YWxpZCBtYXRjaCBvYmplY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXdBcmdzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVByb3h5Q2FsbFxyXG5cclxuICAgICAgICBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XHJcbiAgICAgICAgZ2V0IHNldHVwRXhwcmVzc2lvbigpOiBJQWN0aW9uMTxUPiB7IHJldHVybiB0aGlzLl9zZXR1cEV4cHJlc3Npb247IH1cclxuICAgICAgICBnZXQgc2V0dXBDYWxsKCk6IHByb3h5LklDYWxsQ29udGV4dCB7IHJldHVybiB0aGlzLl9zZXR1cENhbGw7IH1cclxuICAgICAgICBnZXQgaXNWZXJpZmlhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNWZXJpZmlhYmxlOyB9XHJcbiAgICAgICAgZ2V0IGV4cGVjdGVkQ2FsbENvdW50KCk6IFRpbWVzIHsgcmV0dXJuIHRoaXMuX2V4cGVjdGVkQ2FsbENvdW50OyB9XHJcbiAgICAgICAgZ2V0IGlzSW52b2tlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzSW52b2tlZDsgfVxyXG4gICAgICAgIGdldCBjYWxsQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2NhbGxDb3VudDsgfVxyXG5cclxuICAgICAgICBldmFsdWF0ZWRTdWNjZXNzZnVsbHkoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2YWx1YXRlZFN1Y2Nlc3NmdWxseSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtYXRjaGVzKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR1cENhbGwucHJvcGVydHkgJiYgY2FsbCAmJiBjYWxsLnByb3BlcnR5ICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGwucHJvcGVydHkubmFtZSA9PT0gY2FsbC5wcm9wZXJ0eS5uYW1lKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3NldHVwQ2FsbC5hcmdzLmxlbmd0aCA9PT0gY2FsbC5hcmdzLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIF8uZWFjaCh0aGlzLnNldHVwQ2FsbC5hcmdzLCAoeCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNldHVwQXJnID0gPG1hdGNoLklNYXRjaD54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FsbEFyZyA9IGNhbGwuYXJnc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2ggJiYgIXNldHVwQXJnLl9fX21hdGNoZXMoY2FsbEFyZykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXhlY3V0ZShjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5faXNJbnZva2VkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXR1cENhbGxiYWNrICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwQ2FsbGJhY2suYXBwbHkodGhpcywgY2FsbC5hcmdzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3Rocm93bkV4Y2VwdGlvbiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0aGlzLl90aHJvd25FeGNlcHRpb247XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbGxDb3VudCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVZlcmlmaWVzXHJcblxyXG4gICAgICAgIHZlcmlmaWFibGUodGltZXM6IFRpbWVzID0gVGltZXMuYXRMZWFzdE9uY2UoKSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1ZlcmlmaWFibGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9leHBlY3RlZENhbGxDb3VudCA9IHRpbWVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PiBleHRlbmRzIE1ldGhvZENhbGw8VCwgVFJlc3VsdD4gaW1wbGVtZW50cyBhcGkuSVNldHVwPFQsIFRSZXN1bHQ+LCBhcGkuSVJldHVybnNSZXN1bHQ8VD4ge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX3JldHVyblZhbHVlRnVuYzogSUZ1bmNOPGFueSwgVFJlc3VsdD47XHJcbiAgICAgICAgaGFzUmV0dXJuVmFsdWU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9jYWxsQmFzZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IobW9jazogTW9jazxUPiwgc2V0dXBFeHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pIHtcclxuICAgICAgICAgICAgc3VwZXIobW9jaywgc2V0dXBFeHByZXNzaW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG92ZXJyaWRlc1xyXG5cclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5leGVjdXRlKGNhbGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxCYXNlKVxyXG4gICAgICAgICAgICAgICAgY2FsbC5pbnZva2VCYXNlKCk7XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5oYXNSZXR1cm5WYWx1ZSlcclxuICAgICAgICAgICAgICAgIGNhbGwucmV0dXJuVmFsdWUgPSB0aGlzLl9yZXR1cm5WYWx1ZUZ1bmMuYXBwbHkodGhpcywgY2FsbC5hcmdzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElTZXR1cFxyXG5cclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb25OPGFueT4pOiBhcGkuSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zZXR1cENhbGxiYWNrID0gYWN0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93cyhleGNlcHRpb246IEVycm9yKTogYXBpLklUaHJvd3NSZXN1bHQge1xyXG4gICAgICAgICAgICB0aGlzLl90aHJvd25FeGNlcHRpb24gPSBleGNlcHRpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJucyh2YWx1ZUZ1bmM6IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fcmV0dXJuVmFsdWVGdW5jID0gdmFsdWVGdW5jO1xyXG4gICAgICAgICAgICB0aGlzLmhhc1JldHVyblZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYWxsQmFzZSgpOiBhcGkuSVJldHVybnNSZXN1bHQ8VD4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jYWxsQmFzZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSVJldHVybnNSZXN1bHRcclxuXHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBNb2NrQmVoYXZpb3IgeyBMb29zZSwgU3RyaWN0IH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9jazxUPiBpbXBsZW1lbnRzIElNb2NrPFQ+IHtcclxuXHJcbiAgICAgICAgc3RhdGljIHByb3h5RmFjdG9yeTogcHJveHkuSVByb3h5RmFjdG9yeSA9IG5ldyBUeXBlTW9xSW50ZXJuLlByb3h5LlByb3h5RmFjdG9yeSgpO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgX25hbWU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRvcjogSW50ZXJjZXB0b3JFeGVjdXRlPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX3Byb3h5OiBUO1xyXG4gICAgICAgIHByaXZhdGUgX2NhbGxCYXNlOiBib29sZWFuO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaW5zdGFuY2U6IFQsIHByaXZhdGUgX2JlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSB0aGlzLmdldE5hbWVPZihpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yID0gbmV3IEludGVyY2VwdG9yRXhlY3V0ZSh0aGlzLl9iZWhhdmlvciwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5ID0gTW9jay5wcm94eUZhY3RvcnkuY3JlYXRlUHJveHk8VD4odGhpcy5faW50ZXJjZXB0b3IsIGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZkluc3RhbmNlPFU+KGluc3RhbmNlOiBVLCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IE1vY2s8VT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9jayA9IG5ldyBNb2NrKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mVHlwZTxVPihjdG9yOiBDdG9yV2l0aEFyZ3M8VT4sIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlLCAuLi5jdG9yQXJnczogYW55W10pOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgbGV0IG1vY2s6IE1vY2s8VT4gPSBNb2NrLm9mVHlwZTIoY3RvciwgY3RvckFyZ3MsIGJlaGF2aW9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1vY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlMjxVPihjdG9yOiBDdG9yV2l0aEFyZ3M8VT4sIGN0b3JBcmdzOiBhbnlbXSwgYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UpOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgbGV0IGluc3RhbmNlOiBVID0gVXRpbHMuY29udGh1bmt0b3IoY3RvciwgY3RvckFyZ3MpO1xyXG4gICAgICAgICAgICBsZXQgbW9jazogTW9jazxVPiA9IG5ldyBNb2NrKGluc3RhbmNlLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IG9iamVjdCgpIHsgcmV0dXJuIHRoaXMuX3Byb3h5OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMuX2JlaGF2aW9yOyB9XHJcblxyXG4gICAgICAgIGdldCBjYWxsQmFzZSgpIHsgcmV0dXJuIHRoaXMuX2NhbGxCYXNlOyB9XHJcbiAgICAgICAgc2V0IGNhbGxCYXNlKHZhbHVlOiBib29sZWFuKSB7IHRoaXMuX2NhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZUlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNb2NrPFwiICsgXy51bmlxdWVJZCgpICsgXCI+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGdldE5hbWVPZihpbnN0YW5jZTogVCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IHN0cmluZztcclxuXHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBVdGlscy5mdW5jdGlvbk5hbWUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKF8uaXNPYmplY3QoaW5zdGFuY2UpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3RvciA9IGluc3RhbmNlLmNvbnN0cnVjdG9yO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbHMuZnVuY3Rpb25OYW1lKGN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZXR1cFxyXG5cclxuICAgICAgICBzZXR1cDxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pOiBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICAgICAgbGV0IGNhbGwgPSBuZXcgTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0Pih0aGlzLCBleHByZXNzaW9uKTtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IuYWRkQ2FsbChjYWxsKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2ZXJpZnlcclxuXHJcbiAgICAgICAgdmVyaWZ5PFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0PiwgdGltZXM6IFRpbWVzKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBjYWxsID0gbmV3IE1ldGhvZENhbGw8VCwgVFJlc3VsdD4odGhpcywgZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLmFkZENhbGwoY2FsbCk7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci52ZXJpZnlDYWxsKGNhbGwsIHRpbWVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IudmVyaWZ5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGltZXMge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgPCU9IG4gJT4gdGltZXMsIGludm9rZWQgPCU9IG0gJT4gdGltZXNcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9MRUFTVF9PTkNFID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIGF0IGxlYXN0IG9uY2VcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgYXQgbW9zdCBvbmNlXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2xhc3RDYWxsQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9mYWlsTWVzc2FnZTogKC4uLmRhdGE6IGFueVtdKSA9PiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbmRpdGlvbjogSUZ1bmMyPG51bWJlciwgYm9vbGVhbj4sXHJcbiAgICAgICAgICAgIHByaXZhdGUgX2Zyb206IG51bWJlcixcclxuICAgICAgICAgICAgcHJpdmF0ZSBfdG86IG51bWJlcixcclxuICAgICAgICAgICAgZmFpbE1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9mYWlsTWVzc2FnZSA9IF8udGVtcGxhdGUoZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGZhaWxNZXNzYWdlKCkgeyByZXR1cm4gdGhpcy5fZmFpbE1lc3NhZ2UoeyBuOiB0aGlzLl9mcm9tLCBtOiB0aGlzLl9sYXN0Q2FsbENvdW50IH0pOyB9XHJcblxyXG4gICAgICAgIHZlcmlmeShjYWxsQ291bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2FsbENvdW50ID0gY2FsbENvdW50O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uKGNhbGxDb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZXhhY3RseShuOiBudW1iZXIpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID09PSBuLCBuLCBuLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG5ldmVyKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbWVzLmV4YWN0bHkoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW1lcy5leGFjdGx5KDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGF0TGVhc3RPbmNlKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lcyhjID0+IGMgPj0gMSwgMSwgTnVtYmVyLk1BWF9WQUxVRSwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTEVBU1RfT05DRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgYXRNb3N0T25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID49IDAgJiYgYyA8PSAxLCAwLCAxLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbmludGVyZmFjZSBJVHlwZU1vcSB7XHJcbiAgICBNb2NrOiB0eXBlb2YgVHlwZU1vcUludGVybi5Nb2NrO1xyXG4gICAgTW9ja0JlaGF2aW9yOiB0eXBlb2YgVHlwZU1vcUludGVybi5Nb2NrQmVoYXZpb3I7XHJcbiAgICBJdDogdHlwZW9mIFR5cGVNb3FJbnRlcm4uSXQ7XHJcbiAgICBUaW1lczogdHlwZW9mIFR5cGVNb3FJbnRlcm4uVGltZXM7XHJcbiAgICBHbG9iYWxNb2NrOiB0eXBlb2YgVHlwZU1vcUludGVybi5HbG9iYWxNb2NrO1xyXG4gICAgR2xvYmFsU2NvcGU6IHR5cGVvZiBUeXBlTW9xSW50ZXJuLkdsb2JhbFNjb3BlO1xyXG4gICAgTW9ja0V4Y2VwdGlvbjogdHlwZW9mIFR5cGVNb3FJbnRlcm4uRXJyb3IuTW9ja0V4Y2VwdGlvbjtcclxufVxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGltcG9ydCBNb2NrID0gVHlwZU1vcUludGVybi5Nb2NrO1xyXG4gICAgZXhwb3J0IGltcG9ydCBNb2NrQmVoYXZpb3IgPSBUeXBlTW9xSW50ZXJuLk1vY2tCZWhhdmlvcjtcclxuICAgIGV4cG9ydCBpbXBvcnQgSXQgPSBUeXBlTW9xSW50ZXJuLkl0O1xyXG4gICAgZXhwb3J0IGltcG9ydCBUaW1lcyA9IFR5cGVNb3FJbnRlcm4uVGltZXM7XHJcbiAgICBleHBvcnQgaW1wb3J0IEdsb2JhbE1vY2sgPSBUeXBlTW9xSW50ZXJuLkdsb2JhbE1vY2s7XHJcbiAgICBleHBvcnQgaW1wb3J0IEdsb2JhbFNjb3BlID0gVHlwZU1vcUludGVybi5HbG9iYWxTY29wZTtcclxuICAgIGV4cG9ydCBpbXBvcnQgTW9ja0V4Y2VwdGlvbiA9IFR5cGVNb3FJbnRlcm4uRXJyb3IuTW9ja0V4Y2VwdGlvbjtcclxufVxyXG5cclxuZGVjbGFyZSBsZXQgdHlwZW1vcTogSVR5cGVNb3E7XHJcbnR5cGVtb3EgPSBUeXBlTW9xOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL25vZGUvbm9kZS5kLnRzJyAvPiBcclxuXHJcbmlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgbGV0IF86IFVuZGVyc2NvcmVTdGF0aWMgPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVtb3E7XHJcbiAgICB9XHJcbiAgICBleHBvcnRzLnR5cGVtb3EgPSB0eXBlbW9xO1xyXG59IGVsc2Uge1xyXG4gICAgdGhpcy50eXBlbW9xID0gdHlwZW1vcTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
