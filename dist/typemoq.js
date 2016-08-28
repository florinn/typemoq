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
        GlobalMock.prototype.reset = function () {
            this.mock.reset();
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
            var ret = new (ctor.bind.apply(ctor, [void 0].concat(args)))();
            return ret;
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
            }
            Exception.prototype.toString = function () {
                var errMsg = this.message ? this.name + " - " + this.message : this.name;
                return errMsg;
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
            MockExceptionReason[MockExceptionReason["NoSetup"] = "no setup expression"] = "NoSetup";
            MockExceptionReason[MockExceptionReason["MoreThanOneSetup"] = "more than one setup expression"] = "MoreThanOneSetup";
            MockExceptionReason[MockExceptionReason["InvalidSetup"] = "invalid setup expression"] = "InvalidSetup";
            MockExceptionReason[MockExceptionReason["InvalidMatcher"] = "invalid matching expression"] = "InvalidMatcher";
            MockExceptionReason[MockExceptionReason["InvalidProxyArg"] = "invalid proxy argument"] = "InvalidProxyArg";
            MockExceptionReason[MockExceptionReason["UnknownGlobalType"] = "unknown global type"] = "UnknownGlobalType";
            MockExceptionReason[MockExceptionReason["VerificationFailed"] = "verification failed"] = "VerificationFailed";
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
            MockException.prototype.toString = function () {
                var errMsg = _super.prototype.toString.call(this) + " - " + this.reason;
                return errMsg;
            };
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
        var ValueGetterInvocation = (function () {
            function ValueGetterInvocation(_property, value) {
                this._property = _property;
                this.returnValue = value;
            }
            Object.defineProperty(ValueGetterInvocation.prototype, "args", {
                get: function () {
                    var args = [];
                    Object.defineProperty(args, "callee", { configurable: false, enumerable: true, writable: false, value: null });
                    return args;
                },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValueGetterInvocation.prototype, "property", {
                get: function () { return this._property; },
                enumerable: true,
                configurable: true
            });
            ValueGetterInvocation.prototype.invokeBase = function () {
                this.returnValue = this._property.obj[this._property.name];
            };
            return ValueGetterInvocation;
        }());
        Proxy.ValueGetterInvocation = ValueGetterInvocation;
        var ValueSetterInvocation = (function () {
            function ValueSetterInvocation(_property, _args) {
                this._property = _property;
                this._args = _args;
            }
            Object.defineProperty(ValueSetterInvocation.prototype, "args", {
                get: function () { return this._args; },
                set: function (value) { this._args = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ValueSetterInvocation.prototype, "property", {
                get: function () { return this._property; },
                enumerable: true,
                configurable: true
            });
            ValueSetterInvocation.prototype.invokeBase = function () {
                this._property.obj[this._property.name] = this._args[0];
                this.returnValue = this._property.obj[this._property.name];
            };
            return ValueSetterInvocation;
        }());
        Proxy.ValueSetterInvocation = ValueSetterInvocation;
        var MethodGetterInvocation = (function () {
            function MethodGetterInvocation(_property, _getter) {
                this._property = _property;
                this._getter = _getter;
            }
            Object.defineProperty(MethodGetterInvocation.prototype, "args", {
                get: function () {
                    var args = [];
                    Object.defineProperty(args, "callee", { configurable: false, enumerable: true, writable: false, value: null });
                    return args;
                },
                set: function (value) { },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MethodGetterInvocation.prototype, "property", {
                get: function () { return this._property; },
                enumerable: true,
                configurable: true
            });
            MethodGetterInvocation.prototype.invokeBase = function () {
                this.returnValue = this._property.obj[this._property.name];
            };
            return MethodGetterInvocation;
        }());
        Proxy.MethodGetterInvocation = MethodGetterInvocation;
        var MethodSetterInvocation = (function () {
            function MethodSetterInvocation(_property, _setter, _args) {
                this._property = _property;
                this._setter = _setter;
                this._args = _args;
            }
            Object.defineProperty(MethodSetterInvocation.prototype, "args", {
                get: function () { return this._args; },
                set: function (value) { this._args = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MethodSetterInvocation.prototype, "property", {
                get: function () { return this._property; },
                enumerable: true,
                configurable: true
            });
            MethodSetterInvocation.prototype.invokeBase = function () {
                this._property.obj[this._property.name] = this._args[0];
                this.returnValue = this._property.obj[this._property.name];
            };
            return MethodSetterInvocation;
        }());
        Proxy.MethodSetterInvocation = MethodSetterInvocation;
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
                            writable: prop.desc.writable
                        };
                        _this.defineMethodProxy(that, interceptor, instance, prop.name, propDesc);
                    }
                    else {
                        var propDesc = {
                            configurable: prop.desc.configurable,
                            enumerable: prop.desc.enumerable
                        };
                        if (prop.desc.value !== undefined)
                            _this.defineValuePropertyProxy(that, interceptor, instance, prop.name, prop.desc.value, propDesc);
                        else
                            _this.defineGetSetPropertyProxy(that, interceptor, instance, prop.name, prop.desc.get, prop.desc.set, propDesc);
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
                    throw new error.MockException(error.MockExceptionReason.InvalidProxyArg, instance, "InvalidProxyArgument Exception", "Argument should be a function or a non primitive object");
            };
            Proxy.prototype.check = function (instance) {
                Proxy.checkNotNull(instance);
                // allow only non primitive objects
                var ok = false;
                if (!_.isFunction(instance) &&
                    (_.isObject(instance) && !Proxy.isPrimitiveObject(instance)))
                    ok = true;
                if (!ok)
                    throw new error.MockException(error.MockExceptionReason.InvalidProxyArg, instance, "InvalidProxyArgument Exception", "Argument should be a non primitive object");
            };
            Proxy.checkNotNull = function (instance) {
                if (_.isNull(instance))
                    throw new error.MockException(error.MockExceptionReason.InvalidProxyArg, instance, "InvalidProxyArgument Exception", "Argument cannot be null");
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
            Proxy.prototype.defineValuePropertyProxy = function (that, interceptor, instance, propName, propValue, propDesc) {
                if (propDesc === void 0) { propDesc = { configurable: false, enumerable: true }; }
                function getProxy() {
                    var method = new Proxy_1.PropertyInfo(instance, propName);
                    var invocation = new Proxy_1.ValueGetterInvocation(method, propValue);
                    interceptor.intercept(invocation);
                    return invocation.returnValue;
                }
                propDesc.get = getProxy;
                function setProxy(v) {
                    var method = new Proxy_1.PropertyInfo(instance, propName);
                    var invocation = new Proxy_1.ValueSetterInvocation(method, arguments);
                    interceptor.intercept(invocation);
                }
                propDesc.set = setProxy;
                this.defineProperty(that, propName, propDesc);
            };
            Proxy.prototype.defineGetSetPropertyProxy = function (that, interceptor, instance, propName, get, set, propDesc) {
                if (propDesc === void 0) { propDesc = { configurable: false, enumerable: true }; }
                function getProxy() {
                    var method = new Proxy_1.PropertyInfo(instance, propName);
                    var invocation = new Proxy_1.MethodGetterInvocation(method, get);
                    interceptor.intercept(invocation);
                    return invocation.returnValue;
                }
                propDesc.get = getProxy;
                function setProxy(v) {
                    var method = new Proxy_1.PropertyInfo(instance, propName);
                    var invocation = new Proxy_1.MethodSetterInvocation(method, set, arguments);
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
                throw new error.MockException(error.MockExceptionReason.MoreThanOneSetup, invocation, "MoreThanOneSetupExpression Exception", "Setup should contain only one expression");
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
                throw new error.MockException(error.MockExceptionReason.InvalidSetup, this._setupExpression, "InvalidSetupExpression Exception", "Invalid setup expression");
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
            this.init();
        }
        Mock.prototype.init = function () {
            this._interceptor = new TypeMoqIntern.InterceptorExecute(this._behavior, this);
            this._proxy = Mock.proxyFactory.createProxy(this._interceptor, this.instance);
        };
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
        Mock.prototype.reset = function () {
            this.init();
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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJDb25zdHMudHMiLCJDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cyIsIkdsb2JhbE1vY2sudHMiLCJBcGkvSUNhbGxiYWNrLnRzIiwiQXBpL0lSZXR1cm5zLnRzIiwiQXBpL0lTZXR1cC50cyIsIkFwaS9JVGhyb3dzLnRzIiwiQXBpL0lVc2luZy50cyIsIkFwaS9JVmVyaWZpZXMudHMiLCJBcGkvX2FsbC50cyIsIkNvbW1vbi9DdG9yLnRzIiwiQ29tbW9uL0Z1bmMudHMiLCJDb21tb24vUHJvcGVydHlSZXRyaWV2ZXIudHMiLCJDb21tb24vVXRpbHMudHMiLCJDb21tb24vX2FsbC50cyIsIkVycm9yL0V4Y2VwdGlvbi50cyIsIkVycm9yL01vY2tFeGNlcHRpb24udHMiLCJFcnJvci9fYWxsLnRzIiwiTWF0Y2gvSU1hdGNoLnRzIiwiTWF0Y2gvTWF0Y2hBbnkudHMiLCJNYXRjaC9NYXRjaFByZWQudHMiLCJNYXRjaC9NYXRjaFZhbHVlLnRzIiwiTWF0Y2gvX2FsbC50cyIsIlByb3h5L0lDYWxsQ29udGV4dC50cyIsIlByb3h5L0lDYWxsSW50ZXJjZXB0b3IudHMiLCJQcm94eS9JbnZvY2F0aW9uLnRzIiwiUHJveHkvSVByb3h5Q2FsbC50cyIsIlByb3h5L0lQcm94eUZhY3RvcnkudHMiLCJQcm94eS9Qcm94eS50cyIsIlByb3h5L1Byb3h5RmFjdG9yeS50cyIsIlByb3h5L19hbGwudHMiLCJfYWxsLnRzIiwiR2xvYmFsU2NvcGUudHMiLCJJR2xvYmFsTW9jay50cyIsIklNb2NrLnRzIiwiSW50ZXJjZXB0b3JDb250ZXh0LnRzIiwiSW50ZXJjZXB0b3JFeGVjdXRlLnRzIiwiSW50ZXJjZXB0b3JTZXR1cC50cyIsIkludGVyY2VwdG9yU3RyYXRlZ2llcy50cyIsIkl0LnRzIiwiTWV0aG9kQ2FsbC50cyIsIk1ldGhvZENhbGxSZXR1cm4udHMiLCJNb2NrLnRzIiwiVGltZXMudHMiLCJfZXhwb3J0cy50cyIsIl9ub2RlLnRzIl0s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QUcsT0FBTyxDQUFDO0FBQzlCLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnN0cyB7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9WQUxVRSA9IFwiNDM4QTUxRDMtNjg2NC00OUQ3LUE2NTUtQ0ExMTUzQjg2OTY1XCI7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9OQU1FID0gXCJfX19pZFwiO1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfTUFUQ0hFU19OQU1FID0gXCJfX19tYXRjaGVzXCI7XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4ge1xyXG4gICAgICAgIGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD47XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBHbG9iYWxUeXBlIHsgQ2xhc3MsIEZ1bmN0aW9uLCBWYWx1ZSB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbE1vY2s8VD4gaW1wbGVtZW50cyBJR2xvYmFsTW9jazxUPiB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX3R5cGU6IEdsb2JhbFR5cGUsIHB1YmxpYyBjb250YWluZXI6IE9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gbW9jay5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mSW5zdGFuY2U8VT4oaW5zdGFuY2U6IFUsIGdsb2JhbE5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgPyBHbG9iYWxUeXBlLkZ1bmN0aW9uIDogR2xvYmFsVHlwZS5WYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHbG9iYWxNb2NrKG1vY2ssIGdsb2JhbE5hbWUsIHR5cGUsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlPFU+KGN0b3I6IEN0b3I8VT4sIGdsb2JhbE5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgY3RvcigpO1xyXG4gICAgICAgICAgICBsZXQgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdsb2JhbE1vY2sobW9jaywgZ2xvYmFsTmFtZSwgR2xvYmFsVHlwZS5DbGFzcywgY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLm1vY2sub2JqZWN0OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZSB8fCB0aGlzLm1vY2submFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMubW9jay5iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLm1vY2suY2FsbEJhc2U7IH1cclxuICAgICAgICBzZXQgY2FsbEJhc2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5tb2NrLmNhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblxyXG4gICAgICAgIC8vIHNldHVwXHJcblxyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2NrLnNldHVwKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vY2sudmVyaWZ5KGV4cHJlc3Npb24sIHRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrLnZlcmlmeUFsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubW9jay5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24pOiBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PjtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24xPFQ+KTogSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD47XHJcbiAgICB9XHJcbn0gICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm5zKHZhbHVlRnVuY3Rpb246IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICAgICAgY2FsbEJhc2UoKTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Jlc3VsdDxUPiBleHRlbmRzIElWZXJpZmllcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiBleHRlbmRzIElSZXR1cm5zPFQsIFRSZXN1bHQ+LCBJVGhyb3dzIHtcclxuICAgIH1cclxufSAgICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTZXR1cDxULCBUUmVzdWx0PiBleHRlbmRzIElDYWxsYmFjazxULCBUUmVzdWx0PiwgSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4sIElWZXJpZmllcyB7IH0gXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5BcGkge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93cyB7XHJcbiAgICAgICAgdGhyb3dzPFQgZXh0ZW5kcyBlcnJvci5FeGNlcHRpb24+KGV4Y2VwdGlvbjogVCk6IElUaHJvd3NSZXN1bHQ7XHJcblx0fVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93c1Jlc3VsdCBleHRlbmRzIElWZXJpZmllcyB7XHJcblx0fVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElVc2luZ1Jlc3VsdCB7XHJcbiAgICAgICAgd2l0aChhY3Rpb246IElBY3Rpb24pOiB2b2lkO1xyXG4gICAgfVxyXG59ICAgIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZlcmlmaWVzIHtcclxuICAgICAgICB2ZXJpZmlhYmxlKHRpbWVzPzogVGltZXMpOiB2b2lkO1xyXG4gICAgfVxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbGJhY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lSZXR1cm5zLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJU2V0dXAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lUaHJvd3MudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lVc2luZy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVZlcmlmaWVzLnRzJyAvPiAgIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IHR5cGUgQ3RvcjxUPiA9IHtcclxuICAgICAgICBuZXcgKCk6IFQ7XHJcbiAgICAgICAgcHJvdG90eXBlOiBPYmplY3Q7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdHlwZSBDdG9yV2l0aEFyZ3M8VD4gPSB7XHJcbiAgICAgICAgbmV3ICguLi5jdG9yQXJnczogYW55W10pOiBUO1xyXG4gICAgICAgIHByb3RvdHlwZTogT2JqZWN0O1xyXG4gICAgfVxyXG59IFxyXG4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcbiAgICBleHBvcnQgdHlwZSBJQWN0aW9uID0gKCkgPT4gdm9pZDtcclxuICAgIGV4cG9ydCB0eXBlIElBY3Rpb24xPFQ+ID0gKHg6IFQpID0+IHZvaWQ7XHJcbiAgICBleHBvcnQgdHlwZSBJQWN0aW9uTjxUPiA9ICguLi54OiBUW10pID0+IHZvaWQ7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgSUZ1bmMxPFRSZXN1bHQ+ID0gKCkgPT4gVFJlc3VsdDtcclxuICAgIGV4cG9ydCB0eXBlIElGdW5jMjxULCBUUmVzdWx0PiA9ICh4OiBUKSA9PiBUUmVzdWx0O1xyXG4gICAgZXhwb3J0IHR5cGUgSUZ1bmNOPFQsIFRSZXN1bHQ+ID0gKC4uLng6IFRbXSkgPT4gVFJlc3VsdDtcclxufSBcclxuIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5UmV0cmlldmVyIHtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldE93bkVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgZmFsc2UsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBjb3VsZCB1c2UgZm9yLi5pbiBmaWx0ZXJlZCB3aXRoIGhhc093blByb3BlcnR5IG9yIGp1c3QgdGhpczogcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duTm9uZW51bWVyYWJsZXMob2JqOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fbm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIGZhbHNlLCB0aGlzLl9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGp1c3QgdXNlOiByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9lbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVOb25lbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIHRydWUsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBjb3VsZCB1c2UgdW5maWx0ZXJlZCBmb3IuLmluXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duQW5kUHJvdG90eXBlTm9uZW51bWVyYWJsZXMob2JqOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUHJpdmF0ZSBzdGF0aWMgcHJvcGVydHkgY2hlY2tlciBjYWxsYmFja3NcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZW51bWVyYWJsZShvYmo6IGFueSwgcHJvcDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbm90RW51bWVyYWJsZShvYmo6IGFueSwgcHJvcDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAhb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlKHByb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKG9iajogYW55LCBwcm9wOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZ2V0UHJvcGVydHlOYW1lcyhcclxuICAgICAgICAgICAgb2JqOiBhbnksIGl0ZXJhdGVTZWxmQm9vbDogYm9vbGVhbiwgaXRlcmF0ZVByb3RvdHlwZUJvb2w6IGJvb2xlYW4sIGluY2x1ZGVQcm9wQ2I6IChvYmo6IGFueSwgcHJvcDogYW55KSA9PiBib29sZWFuKTpcclxuICAgICAgICAgICAgQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciB9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTx7IG5hbWU6IHN0cmluZzsgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yIH0+ID0gW107XHJcblxyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmF0ZVNlbGZCb29sKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHByb3BzLCBwcm9wID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZSA9IF8uZmluZChyZXN1bHQsIHAgPT4gcC5uYW1lID09PSBwcm9wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZHVwbGljYXRlICYmIGluY2x1ZGVQcm9wQ2Iob2JqLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBuYW1lOiBwcm9wLCBkZXNjOiBwcm9wRGVzYyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXRlcmF0ZVByb3RvdHlwZUJvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpdGVyYXRlU2VsZkJvb2wgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0VVVJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBsZXQgdXVpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBmdW5jdGlvbk5hbWUoZnVuOiBPYmplY3QpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmV0OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT5mdW4pLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9ICg8YW55PmZ1bikubmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXByID0gZnVuLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICByZXByID0gcmVwci5zdWJzdHIoJ2Z1bmN0aW9uICcubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHJldCA9IHJlcHIuc3Vic3RyKDAsIHJlcHIuaW5kZXhPZignKCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNvbnRodW5rdG9yPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgYXJnczogYW55W10pOiBVIHtcclxuICAgICAgICAgICAgbGV0IHJldDogVSA9IG5ldyBjdG9yKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdDdG9yLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdGdW5jLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm9wZXJ0eVJldHJpZXZlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nVXRpbHMudHMnIC8+IiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uRXJyb3Ige1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFeGNlcHRpb24gaW1wbGVtZW50cyBFcnJvciB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBlcnJNc2cgPSB0aGlzLm1lc3NhZ2UgPyBgJHt0aGlzLm5hbWV9IC0gJHt0aGlzLm1lc3NhZ2V9YCA6IHRoaXMubmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIGVyck1zZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uRXJyb3Ige1xyXG5cclxuICAgIGV4cG9ydCBlbnVtIE1vY2tFeGNlcHRpb25SZWFzb24ge1xyXG4gICAgICAgIE5vU2V0dXAgPSA8YW55Plwibm8gc2V0dXAgZXhwcmVzc2lvblwiLFxyXG4gICAgICAgIE1vcmVUaGFuT25lU2V0dXAgPSA8YW55PlwibW9yZSB0aGFuIG9uZSBzZXR1cCBleHByZXNzaW9uXCIsXHJcbiAgICAgICAgSW52YWxpZFNldHVwID0gPGFueT5cImludmFsaWQgc2V0dXAgZXhwcmVzc2lvblwiLFxyXG4gICAgICAgIEludmFsaWRNYXRjaGVyID0gPGFueT5cImludmFsaWQgbWF0Y2hpbmcgZXhwcmVzc2lvblwiLFxyXG4gICAgICAgIEludmFsaWRQcm94eUFyZyA9IDxhbnk+XCJpbnZhbGlkIHByb3h5IGFyZ3VtZW50XCIsXHJcbiAgICAgICAgVW5rbm93bkdsb2JhbFR5cGUgPSA8YW55PlwidW5rbm93biBnbG9iYWwgdHlwZVwiLFxyXG4gICAgICAgIFZlcmlmaWNhdGlvbkZhaWxlZCA9IDxhbnk+XCJ2ZXJpZmljYXRpb24gZmFpbGVkXCJcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTW9ja0V4Y2VwdGlvbiBleHRlbmRzIEV4Y2VwdGlvbiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgICAgIHB1YmxpYyByZWFzb246IE1vY2tFeGNlcHRpb25SZWFzb24sXHJcbiAgICAgICAgICAgIHB1YmxpYyBjdHg6IGFueSxcclxuICAgICAgICAgICAgbmFtZTogc3RyaW5nID0gJ01vY2sgRXhjZXB0aW9uJyxcclxuICAgICAgICAgICAgbWVzc2FnZT86IHN0cmluZykge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBlcnJNc2cgPSBgJHtzdXBlci50b1N0cmluZygpfSAtICR7dGhpcy5yZWFzb259YDtcclxuICAgICAgICAgICAgcmV0dXJuIGVyck1zZztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nRXhjZXB0aW9uLnRzJyAvPiBcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTW9ja0V4Y2VwdGlvbi50cycgLz4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWF0Y2gge1xyXG4gICAgICAgIF9fX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLk1hdGNoIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnlPYmplY3Q8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2N0b3I6IEN0b3I8VD4pIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnkgaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueVN0cmluZyBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcob2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnlOdW1iZXIgaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uTWF0Y2gge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaFByZWQ8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ByZWQ6IElGdW5jMjxULCBib29sZWFuPikge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZWQoPFQ+b2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoVmFsdWU8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZhbHVlOiBUKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0VxdWFsKHRoaXMuX3ZhbHVlLCBvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSU1hdGNoLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaEFueS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTWF0Y2hQcmVkLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaFZhbHVlLnRzJyAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgYXJnczogSUFyZ3VtZW50cztcclxuICAgICAgICBwcm9wZXJ0eTogSVByb3BlcnR5SW5mbztcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBpbnRlcmNlcHQoY29udGV4dDogSUNhbGxDb250ZXh0KTogdm9pZDtcclxuICAgIH1cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kSW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IE1ldGhvZEluZm8sIHByaXZhdGUgX2FyZ3M/OiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3MgfHwgeyBsZW5ndGg6IDAsIGNhbGxlZTogbnVsbCB9OyB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgdGhpcy5fYXJncyA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuX3Byb3BlcnR5LnRvRnVuYy5hcHBseSh0aGlzLl9wcm9wZXJ0eS5vYmosIHRoaXMuX2FyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFZhbHVlR2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHtcclxuICAgICAgICAgICAgbGV0IGFyZ3M6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcmdzLCBcImNhbGxlZVwiLFxyXG4gICAgICAgICAgICAgICAgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBudWxsIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5hcmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9ICg8YW55PnRoaXMuX3Byb3BlcnR5Lm9iailbdGhpcy5fcHJvcGVydHkubmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVmFsdWVTZXR0ZXJJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHlJbmZvLCBwcml2YXRlIF9hcmdzOiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3M7IH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB0aGlzLl9hcmdzID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzLl9wcm9wZXJ0eS5vYmopW3RoaXMuX3Byb3BlcnR5Lm5hbWVdID0gdGhpcy5fYXJnc1swXTtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9ICg8YW55PnRoaXMuX3Byb3BlcnR5Lm9iailbdGhpcy5fcHJvcGVydHkubmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kR2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgcHJpdmF0ZSBfZ2V0dGVyOiAoKSA9PiBhbnkpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMge1xyXG4gICAgICAgICAgICBsZXQgYXJnczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFyZ3MsIFwiY2FsbGVlXCIsXHJcbiAgICAgICAgICAgICAgICB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IG51bGwgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55PmFyZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBhcmdzKHZhbHVlOiBJQXJndW1lbnRzKSB7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gKDxhbnk+dGhpcy5fcHJvcGVydHkub2JqKVt0aGlzLl9wcm9wZXJ0eS5uYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RTZXR0ZXJJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHlJbmZvLCBwcml2YXRlIF9zZXR0ZXI6ICh2OiBhbnkpID0+IHZvaWQsIHByaXZhdGUgX2FyZ3M6IElBcmd1bWVudHMpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMgeyByZXR1cm4gdGhpcy5fYXJnczsgfVxyXG4gICAgICAgIHNldCBhcmdzKHZhbHVlOiBJQXJndW1lbnRzKSB7IHRoaXMuX2FyZ3MgPSB2YWx1ZTsgfVxyXG5cclxuICAgICAgICBnZXQgcHJvcGVydHkoKTogUHJvcGVydHlJbmZvIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnR5OyB9XHJcblxyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgICg8YW55PnRoaXMuX3Byb3BlcnR5Lm9iailbdGhpcy5fcHJvcGVydHkubmFtZV0gPSB0aGlzLl9hcmdzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gKDxhbnk+dGhpcy5fcHJvcGVydHkub2JqKVt0aGlzLl9wcm9wZXJ0eS5uYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RJbmZvIGltcGxlbWVudHMgSVByb3BlcnR5SW5mbyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG9iajogYW55LCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCB0b0Z1bmMoKTogRnVuY3Rpb24ge1xyXG4gICAgICAgICAgICBsZXQgZnVuYzogRnVuY3Rpb247XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5vYmopKVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IDxGdW5jdGlvbj50aGlzLm9iajtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IDxGdW5jdGlvbj50aGlzLm9ialt0aGlzLm5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5SW5mbyBpbXBsZW1lbnRzIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IE9iamVjdCwgcHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIG9iajogT2JqZWN0O1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJveHlDYWxsPFQ+IHtcclxuICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgIHNldHVwRXhwcmVzc2lvbjogSUFjdGlvbjE8VD47XHJcbiAgICAgICAgc2V0dXBDYWxsOiBwcm94eS5JQ2FsbENvbnRleHQ7XHJcbiAgICAgICAgaXNWZXJpZmlhYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGV4cGVjdGVkQ2FsbENvdW50OiBUaW1lcztcclxuICAgICAgICBpc0ludm9rZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgY2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIG1hdGNoZXMoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogYm9vbGVhbjtcclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb3h5RmFjdG9yeSB7XHJcbiAgICAgICAgY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKTogVDtcclxuICAgIH1cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm94eTxUPiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2soaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvcHMgPSBQcm9wZXJ0eVJldHJpZXZlci5nZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgXy5lYWNoKHByb3BzLCBwcm9wID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHByb3AuZGVzYy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBwcm9wLmRlc2MuY29uZmlndXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBwcm9wLmRlc2MuZW51bWVyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHByb3AuZGVzYy53cml0YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lTWV0aG9kUHJveHkodGhhdCwgaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wLm5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wRGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHByb3AuZGVzYy5jb25maWd1cmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHByb3AuZGVzYy5lbnVtZXJhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AuZGVzYy52YWx1ZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZVZhbHVlUHJvcGVydHlQcm94eSh0aGF0LCBpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3AubmFtZSwgcHJvcC5kZXNjLnZhbHVlLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZUdldFNldFByb3BlcnR5UHJveHkodGhhdCwgaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wLm5hbWUsIHByb3AuZGVzYy5nZXQsIHByb3AuZGVzYy5zZXQsIHByb3BEZXNjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mPFU+KGluc3RhbmNlOiBVLCBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcikge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVjayhpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBhbnk7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNOYW1lID0gVXRpbHMuZnVuY3Rpb25OYW1lKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFByb3h5Lm1ldGhvZFByb3h5VmFsdWUoaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBmdW5jTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgUHJveHkoaW50ZXJjZXB0b3IsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNoZWNrPFU+KGluc3RhbmNlOiBVKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFByb3h5LmNoZWNrTm90TnVsbChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhbGxvdyBvbmx5IHByaW1pdGl2ZSBvYmplY3RzIGFuZCBmdW5jdGlvbnNcclxuICAgICAgICAgICAgbGV0IG9rID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpIHx8XHJcbiAgICAgICAgICAgICAgICAoXy5pc09iamVjdChpbnN0YW5jZSkgJiYgIVByb3h5LmlzUHJpbWl0aXZlT2JqZWN0KGluc3RhbmNlKSkpXHJcbiAgICAgICAgICAgICAgICBvayA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIW9rKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmcsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgc2hvdWxkIGJlIGEgZnVuY3Rpb24gb3IgYSBub24gcHJpbWl0aXZlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2hlY2s8VT4oaW5zdGFuY2U6IFUpOiB2b2lkIHtcclxuICAgICAgICAgICAgUHJveHkuY2hlY2tOb3ROdWxsKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGFsbG93IG9ubHkgbm9uIHByaW1pdGl2ZSBvYmplY3RzXHJcbiAgICAgICAgICAgIGxldCBvayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihpbnN0YW5jZSkgJiZcclxuICAgICAgICAgICAgICAgIChfLmlzT2JqZWN0KGluc3RhbmNlKSAmJiAhUHJveHkuaXNQcmltaXRpdmVPYmplY3QoaW5zdGFuY2UpKSlcclxuICAgICAgICAgICAgICAgIG9rID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICghb2spXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLkludmFsaWRQcm94eUFyZyxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgXCJJbnZhbGlkUHJveHlBcmd1bWVudCBFeGNlcHRpb25cIiwgXCJBcmd1bWVudCBzaG91bGQgYmUgYSBub24gcHJpbWl0aXZlIG9iamVjdFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNoZWNrTm90TnVsbDxVPihpbnN0YW5jZTogVSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAoXy5pc051bGwoaW5zdGFuY2UpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmcsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpc1ByaW1pdGl2ZU9iamVjdChvYmo6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9iaikgfHxcclxuICAgICAgICAgICAgICAgIF8uaXNBcnJheShvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzRGF0ZShvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzTnVsbChvYmopKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZU1ldGhvZFByb3h5KFxyXG4gICAgICAgICAgICB0aGF0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVCxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlIH0pIHtcclxuXHJcbiAgICAgICAgICAgIHByb3BEZXNjLnZhbHVlID0gUHJveHkubWV0aG9kUHJveHlWYWx1ZShpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG1ldGhvZFByb3h5VmFsdWU8VT4oXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVSxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyk6ICgpID0+IGFueSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSBuZXcgTWV0aG9kSW5mbyhpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGludm9jYXRpb246IElDYWxsQ29udGV4dCA9IG5ldyBNZXRob2RJbnZvY2F0aW9uKG1ldGhvZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnZvY2F0aW9uLnJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm94eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lVmFsdWVQcm9wZXJ0eVByb3h5KFxyXG4gICAgICAgICAgICB0aGF0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVCxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvcFZhbHVlOiBhbnksXHJcbiAgICAgICAgICAgIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UHJveHkoKTogYW55IHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSBuZXcgUHJvcGVydHlJbmZvKGluc3RhbmNlLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW52b2NhdGlvbjogSUNhbGxDb250ZXh0ID0gbmV3IFZhbHVlR2V0dGVySW52b2NhdGlvbihtZXRob2QsIHByb3BWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5nZXQgPSBnZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFByb3h5KHY6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgVmFsdWVTZXR0ZXJJbnZvY2F0aW9uKG1ldGhvZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5zZXQgPSBzZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lR2V0U2V0UHJvcGVydHlQcm94eShcclxuICAgICAgICAgICAgdGhhdDogT2JqZWN0LFxyXG4gICAgICAgICAgICBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcixcclxuICAgICAgICAgICAgaW5zdGFuY2U6IFQsXHJcbiAgICAgICAgICAgIHByb3BOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIGdldD86ICgpID0+IGFueSxcclxuICAgICAgICAgICAgc2V0PzogKHY6IGFueSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQcm94eSgpOiBhbnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgTWV0aG9kR2V0dGVySW52b2NhdGlvbihtZXRob2QsIGdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5nZXQgPSBnZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFByb3h5KHY6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgTWV0aG9kU2V0dGVySW52b2NhdGlvbihtZXRob2QsIHNldCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5zZXQgPSBzZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lUHJvcGVydHkob2JqOiBPYmplY3QsIG5hbWU6IHN0cmluZywgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSBcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm94eUZhY3RvcnkgaW1wbGVtZW50cyBJUHJveHlGYWN0b3J5IHtcclxuICAgICAgICBjcmVhdGVQcm94eTxUPihpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvciwgaW5zdGFuY2U6IFQpOiBUIHtcclxuICAgICAgICAgICAgbGV0IHByb3h5OiBUID0gPFQ+PGFueT4gUHJveHkub2YoaW5zdGFuY2UsIGludGVyY2VwdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lDYWxsQ29udGV4dC50cycgLz4gXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lDYWxsSW50ZXJjZXB0b3IudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludm9jYXRpb24udHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lQcm94eUNhbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lQcm94eUZhY3RvcnkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3h5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eUZhY3RvcnkudHMnIC8+IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvdW5kZXJzY29yZS91bmRlcnNjb3JlLmQudHMnIC8+IFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQXBpL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0NvbW1vbi9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdFcnJvci9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaC9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eS9fYWxsLnRzJyAvPlxyXG5cclxuaW1wb3J0IGFwaSAgICAgPSBUeXBlTW9xSW50ZXJuLkFwaTtcclxuaW1wb3J0IGVycm9yICAgPSBUeXBlTW9xSW50ZXJuLkVycm9yO1xyXG5pbXBvcnQgbWF0Y2ggICA9IFR5cGVNb3FJbnRlcm4uTWF0Y2g7XHJcbmltcG9ydCBwcm94eSAgID0gVHlwZU1vcUludGVybi5Qcm94eTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHbG9iYWxTY29wZSBpbXBsZW1lbnRzIGFwaS5JVXNpbmdSZXN1bHQge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB1c2luZyguLi5hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pOiBhcGkuSVVzaW5nUmVzdWx0IHtcclxuICAgICAgICAgICAgbGV0IHNjb3BlID0gbmV3IEdsb2JhbFNjb3BlKGFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aXRoKGFjdGlvbjogSUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbDogUHJvcGVydHlEZXNjcmlwdG9yTWFwID0ge307XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuX2FyZ3MsIGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoYS5jb250YWluZXIuaGFzT3duUHJvcGVydHkoYS5uYW1lKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXJQcm9wcyA9IFByb3BlcnR5UmV0cmlldmVyLmdldE93bkFuZFByb3RvdHlwZUVudW1lcmFibGVzQW5kTm9uZW51bWVyYWJsZXMoYS5jb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcCA9IF8uZmluZChjb250YWluZXJQcm9wcywgcCA9PiBwLm5hbWUgPT09IGEubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsW2EubmFtZV0gPSBwcm9wLmRlc2M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGEudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5DbGFzczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJldHVybiBhIG5ldyBtb2NrIGV2ZXJ5IHRpbWUgd2l0aCBzYW1lIGludGVyY2VwdG9yIGFzIHRoZSBvbmUgdXNlZCBieSBtb2NrIHBhc3NlZCBpbiBhcyBhcmcgdG8gJ3VzaW5nJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICh0byBzdXBwb3J0IGRpZmZlcmVudCBjdG9yIGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlID0gKCkgPT4gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuRnVuY3Rpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy52YWx1ZSA9IGEubW9jay5vYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLlZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MuZ2V0ID0gKCkgPT4gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVW5rbm93bkdsb2JhbFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEsIFwiVW5rbm93bkdsb2JhbFR5cGUgRXhjZXB0aW9uXCIsIFwidW5rbm93biBnbG9iYWwgdHlwZTogXCIgKyBhLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEuY29udGFpbmVyLCBhLm5hbWUsIGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjE6IFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24uYXBwbHkodGhpcywgdGhpcy5fYXJncyk7XHJcblxyXG4gICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuX2FyZ3MsIGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChhLm1vY2suaW5zdGFuY2UpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0gaW5pdGlhbFthLm5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGEudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuQ2xhc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuRnVuY3Rpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuVmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MuY29uZmlndXJhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYS5jb250YWluZXIsIGEubmFtZSwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIyOiBcIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbE1vY2s8VD4gZXh0ZW5kcyBJTW9jazxUPiB7XHJcbiAgICAgICAgbW9jazogTW9jazxUPjtcclxuICAgICAgICB0eXBlOiBHbG9iYWxUeXBlO1xyXG4gICAgICAgIGNvbnRhaW5lcjogT2JqZWN0O1xyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vY2s8VD4ge1xyXG4gICAgICAgIG9iamVjdDogVDtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgYmVoYXZpb3I6IE1vY2tCZWhhdmlvcjtcclxuICAgICAgICBjYWxsQmFzZTogYm9vbGVhbjtcclxuICAgICAgICBzZXR1cDxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pOiBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+O1xyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQ7XHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQ7XHJcbiAgICAgICAgcmVzZXQoKTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuXHRleHBvcnQgZW51bSBJbnRlcmNlcHRpb25BY3Rpb24geyBDb250aW51ZSwgU3RvcCB9XHJcblxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHRcdGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsXHRjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPixcdGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbjtcclxuXHR9XHJcblxyXG5cdGV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvckNvbnRleHQ8VD4ge1xyXG5cdFx0cHJpdmF0ZSBfYWN0dWFsSW52b2NhdGlvbnM6IEFycmF5PHByb3h5LklDYWxsQ29udGV4dD4gPSBbXTtcclxuXHRcdHByaXZhdGUgX29yZGVyZWRDYWxsczogQXJyYXk8cHJveHkuSVByb3h5Q2FsbDxUPj4gPSBbXTtcclxuXHJcblx0XHRjb25zdHJ1Y3RvcihwdWJsaWMgYmVoYXZpb3I6IE1vY2tCZWhhdmlvciwgcHVibGljIG1vY2s6IElNb2NrPFQ+KSB7IH1cclxuXHJcblx0XHRhZGRJbnZvY2F0aW9uKGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCkgeyB0aGlzLl9hY3R1YWxJbnZvY2F0aW9ucy5wdXNoKGludm9jYXRpb24pOyB9XHJcblx0XHRhY3R1YWxJbnZvY2F0aW9ucygpIHsgcmV0dXJuIHRoaXMuX2FjdHVhbEludm9jYXRpb25zOyB9XHJcblx0XHRjbGVhckludm9jYXRpb25zKCkgeyB0aGlzLl9hY3R1YWxJbnZvY2F0aW9ucyA9IFtdOyB9XHJcblxyXG5cdFx0YWRkT3JkZXJlZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPikgeyB0aGlzLl9vcmRlcmVkQ2FsbHMucHVzaChjYWxsKTsgfVxyXG5cdFx0cmVtb3ZlT3JkZXJlZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPikge1xyXG5cdFx0XHRfLmZpbHRlcih0aGlzLl9vcmRlcmVkQ2FsbHMsICh4OiBwcm94eS5JUHJveHlDYWxsPFQ+KSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIHguaWQgIT09IGNhbGwuaWQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0b3JkZXJlZENhbGxzKCkgeyByZXR1cm4gdGhpcy5fb3JkZXJlZENhbGxzOyB9XHJcblx0fVxyXG5cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyY2VwdG9yRXhlY3V0ZTxUPiBpbXBsZW1lbnRzIFByb3h5LklDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdG9yQ29udGV4dDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihiZWhhdmlvcjogTW9ja0JlaGF2aW9yLCBtb2NrOiBJTW9jazxUPikge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQgPSBuZXcgSW50ZXJjZXB0b3JDb250ZXh0KGJlaGF2aW9yLCBtb2NrKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBpbnRlcmNlcHRvckNvbnRleHQoKTogSW50ZXJjZXB0b3JDb250ZXh0PFQ+IHsgcmV0dXJuIHRoaXMuX2ludGVyY2VwdG9yQ29udGV4dDsgfVxyXG5cclxuICAgICAgICBpbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGxldCBsb2NhbEN0eCA9IG5ldyBDdXJyZW50SW50ZXJjZXB0Q29udGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgXy5zb21lKHRoaXMuaW50ZXJjZXB0aW9uU3RyYXRlZ2llcygpLCAoc3RyYXRlZ3k6IElJbnRlcmNlcHRTdHJhdGVneTxUPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKEludGVyY2VwdGlvbkFjdGlvbi5TdG9wID09PSBzdHJhdGVneS5oYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbiwgdGhpcy5pbnRlcmNlcHRvckNvbnRleHQsIGxvY2FsQ3R4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZENhbGwoY2FsbDogcHJveHkuSVByb3h5Q2FsbDxUPik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQuYWRkT3JkZXJlZENhbGwoY2FsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2ZXJpZnlDYWxsPFQ+KGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgYWN0dWFsQ2FsbHM6IEFycmF5PHByb3h5LklDYWxsQ29udGV4dD4gPSB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQuYWN0dWFsSW52b2NhdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYWxsQ291bnQgPSBfLmZpbHRlcihhY3R1YWxDYWxscywgYyA9PiBjYWxsLm1hdGNoZXMoYykpLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGltZXMudmVyaWZ5KGNhbGxDb3VudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGhyb3dWZXJpZnlDYWxsRXhjZXB0aW9uKGNhbGwuc2V0dXBDYWxsLCB0aW1lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IG9yZGVyZWRDYWxsczogQXJyYXk8cHJveHkuSVByb3h5Q2FsbDxUPj4gPSB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQub3JkZXJlZENhbGxzKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmVyaWZpYWJsZXMgPSBfLmZpbHRlcihvcmRlcmVkQ2FsbHMsIGMgPT4gYy5pc1ZlcmlmaWFibGUpO1xyXG5cclxuICAgICAgICAgICAgXy5mb3JFYWNoKHZlcmlmaWFibGVzLCB2ID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVyaWZ5Q2FsbCh2LCB2LmV4cGVjdGVkQ2FsbENvdW50KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGludGVyY2VwdGlvblN0cmF0ZWdpZXMoKTogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4ge1xyXG4gICAgICAgICAgICBsZXQgc3RyYXRlZ2llczogXy5MaXN0PElJbnRlcmNlcHRTdHJhdGVneTxUPj4gPSBbXHJcbiAgICAgICAgICAgICAgICBuZXcgQWRkQWN0dWFsSW52b2NhdGlvbigpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEV4dHJhY3RQcm94eUNhbGwoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFeGVjdXRlQ2FsbCgpLFxyXG4gICAgICAgICAgICAgICAgbmV3IEludm9rZUJhc2UoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBIYW5kbGVNb2NrUmVjdXJzaW9uKClcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgcmV0dXJuIHN0cmF0ZWdpZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRocm93VmVyaWZ5Q2FsbEV4Y2VwdGlvbihjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQsIHRpbWVzOiBUaW1lcykge1xyXG4gICAgICAgICAgICBsZXQgZSA9IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVmVyaWZpY2F0aW9uRmFpbGVkLFxyXG4gICAgICAgICAgICAgICAgY2FsbCwgXCJWZXJpZnlDYWxsIEV4Y2VwdGlvblwiLCB0aW1lcy5mYWlsTWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JTZXR1cDxUPiBpbXBsZW1lbnRzIFByb3h5LklDYWxsSW50ZXJjZXB0b3Ige1xyXG4gICAgICAgIHByaXZhdGUgX2ludGVyY2VwdGVkQ2FsbDogcHJveHkuSUNhbGxDb250ZXh0O1xyXG5cclxuICAgICAgICBnZXQgaW50ZXJjZXB0ZWRDYWxsKCkgeyByZXR1cm4gdGhpcy5faW50ZXJjZXB0ZWRDYWxsOyB9XHJcblxyXG4gICAgICAgIGludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2ludGVyY2VwdGVkQ2FsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Nb3JlVGhhbk9uZVNldHVwLFxyXG4gICAgICAgICAgICAgICAgICAgIGludm9jYXRpb24sIFwiTW9yZVRoYW5PbmVTZXR1cEV4cHJlc3Npb24gRXhjZXB0aW9uXCIsIFwiU2V0dXAgc2hvdWxkIGNvbnRhaW4gb25seSBvbmUgZXhwcmVzc2lvblwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0ZWRDYWxsID0gaW52b2NhdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQWRkQWN0dWFsSW52b2NhdGlvbjxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICBjdHguYWRkSW52b2NhdGlvbihpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEV4dHJhY3RQcm94eUNhbGw8VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgbGV0IG9yZGVyZWRDYWxscyA9IGN0eC5vcmRlcmVkQ2FsbHMoKS5zbGljZSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpbmRDYWxsUHJlZCA9IDxUPihjOiBwcm94eS5JUHJveHlDYWxsPFQ+KSA9PiBjLm1hdGNoZXMoaW52b2NhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBsZXQgbWF0Y2hpbmdDYWxscyA9IF8uZmlsdGVyKG9yZGVyZWRDYWxscywgYyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZENhbGxQcmVkKGMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZ0NhbGxzLmxlbmd0aCA+IDEpICAgLy8gcmVjb3JkL3JlcGxheSBzY2VuYXJpbyBcclxuICAgICAgICAgICAgICAgIGZpbmRDYWxsUHJlZCA9IDxUPihjOiBwcm94eS5JUHJveHlDYWxsPFQ+KSA9PiAhYy5pc0ludm9rZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICBjLm1hdGNoZXMoaW52b2NhdGlvbik7XHJcblxyXG4gICAgICAgICAgICBsb2NhbEN0eC5jYWxsID0gXy5maW5kKG9yZGVyZWRDYWxscywgYyA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZENhbGxQcmVkKGMpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhbEN0eC5jYWxsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsQ3R4LmNhbGwuZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY3R4LmJlaGF2aW9yID09IE1vY2tCZWhhdmlvci5TdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uTm9TZXR1cCwgaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBFeGVjdXRlQ2FsbDxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2N0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+O1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudENhbGwgPSBsb2NhbEN0eC5jYWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRDYWxsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDYWxsLmV4ZWN1dGUoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLlN0b3A7XHJcbiAgICAgICAgICAgIH0gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSW52b2tlQmFzZTxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICBpZiAoY3R4Lm1vY2suY2FsbEJhc2UpIHtcclxuICAgICAgICAgICAgICAgIGludm9jYXRpb24uaW52b2tlQmFzZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5TdG9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBIYW5kbGVNb2NrUmVjdXJzaW9uPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIC8vVE9ETzogXHJcbiAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uQ29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJdCB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGlzVmFsdWU8VD4oeDogVCk6IFQge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoVmFsdWUoeCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnlPYmplY3Q8VD4oeDogQ3RvcjxUPik6IFQge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55T2JqZWN0KHgpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55KCk6IGFueSB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnkoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueVN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55U3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnlOdW1iZXIoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueU51bWJlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzPFQ+KHByZWRpY2F0ZTogSUZ1bmMyPFQsIGJvb2xlYW4+KTogVCB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hQcmVkKHByZWRpY2F0ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZENhbGw8VCwgVFJlc3VsdD4gaW1wbGVtZW50cyBwcm94eS5JUHJveHlDYWxsPFQ+LCBhcGkuSVZlcmlmaWVzIHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9pZDogc3RyaW5nO1xyXG4gICAgICAgIHByb3RlY3RlZCBfc2V0dXBDYWxsOiBwcm94eS5JQ2FsbENvbnRleHQ7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9zZXR1cENhbGxiYWNrOiBJQWN0aW9uO1xyXG4gICAgICAgIHByb3RlY3RlZCBfaXNWZXJpZmlhYmxlOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfZXhwZWN0ZWRDYWxsQ291bnQ6IFRpbWVzO1xyXG4gICAgICAgIHByb3RlY3RlZCBfaXNJbnZva2VkOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfY2FsbENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHByb3RlY3RlZCBfdGhyb3duRXhjZXB0aW9uOiBlcnJvci5FeGNlcHRpb247XHJcbiAgICAgICAgcHJvdGVjdGVkIF9ldmFsdWF0ZWRTdWNjZXNzZnVsbHk6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9zZXR1cEV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pikge1xyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGludGVyY2VwdG9yID0gbmV3IEludGVyY2VwdG9yU2V0dXAoKTtcclxuICAgICAgICAgICAgbGV0IHByb3h5ID0gTW9jay5wcm94eUZhY3RvcnkuY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3IsIG1vY2suaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgX3NldHVwRXhwcmVzc2lvbihwcm94eSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaW50ZXJjZXB0b3IuaW50ZXJjZXB0ZWRDYWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWMgPSBpbnRlcmNlcHRvci5pbnRlcmNlcHRlZENhbGw7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5ld0FyZ3MgPSB0aGlzLnRyYW5zZm9ybVRvTWF0Y2hlcnMoaWMuYXJncyk7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3QXJncywgXCJjYWxsZWVcIixcclxuICAgICAgICAgICAgICAgICAgICB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IGljLmFyZ3MuY2FsbGVlIH0pO1xyXG4gICAgICAgICAgICAgICAgaWMuYXJncyA9IDxJQXJndW1lbnRzPjxhbnk+bmV3QXJncztcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGwgPSBpYztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFNldHVwLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwRXhwcmVzc2lvbiwgXCJJbnZhbGlkU2V0dXBFeHByZXNzaW9uIEV4Y2VwdGlvblwiLCBcIkludmFsaWQgc2V0dXAgZXhwcmVzc2lvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZUlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNZXRob2RDYWxsPFwiICsgXy51bmlxdWVJZCgpICsgXCI+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRyYW5zZm9ybVRvTWF0Y2hlcnMoYXJnczogSUFyZ3VtZW50cyk6IEFycmF5PG1hdGNoLklNYXRjaD4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3QXJnczogQXJyYXk8bWF0Y2guSU1hdGNoPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgXy5lYWNoKGFyZ3MsIGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzT2JqZWN0KGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0FyZyA9IG5ldyBtYXRjaC5NYXRjaFZhbHVlKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaChuZXdBcmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGFbQ29uc3RzLklNQVRDSF9NQVRDSEVTX05BTUVdKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5pc1VuZGVmaW5lZChhW0NvbnN0cy5JTUFUQ0hfSURfTkFNRV0pICYmIGFbQ29uc3RzLklNQVRDSF9JRF9OQU1FXSA9PT0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2goPG1hdGNoLklNYXRjaD5hKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZE1hdGNoZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLCBcIkludmFsaWRNYXRjaGVyIEV4Y2VwdGlvblwiLCBcIkludmFsaWQgbWF0Y2ggb2JqZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3QXJncztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElQcm94eUNhbGxcclxuXHJcbiAgICAgICAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG4gICAgICAgIGdldCBzZXR1cEV4cHJlc3Npb24oKTogSUFjdGlvbjE8VD4geyByZXR1cm4gdGhpcy5fc2V0dXBFeHByZXNzaW9uOyB9XHJcbiAgICAgICAgZ2V0IHNldHVwQ2FsbCgpOiBwcm94eS5JQ2FsbENvbnRleHQgeyByZXR1cm4gdGhpcy5fc2V0dXBDYWxsOyB9XHJcbiAgICAgICAgZ2V0IGlzVmVyaWZpYWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzVmVyaWZpYWJsZTsgfVxyXG4gICAgICAgIGdldCBleHBlY3RlZENhbGxDb3VudCgpOiBUaW1lcyB7IHJldHVybiB0aGlzLl9leHBlY3RlZENhbGxDb3VudDsgfVxyXG4gICAgICAgIGdldCBpc0ludm9rZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0ludm9rZWQ7IH1cclxuICAgICAgICBnZXQgY2FsbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jYWxsQ291bnQ7IH1cclxuXHJcbiAgICAgICAgZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmFsdWF0ZWRTdWNjZXNzZnVsbHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWF0Y2hlcyhjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsLnByb3BlcnR5ICYmIGNhbGwgJiYgY2FsbC5wcm9wZXJ0eSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsLnByb3BlcnR5Lm5hbWUgPT09IGNhbGwucHJvcGVydHkubmFtZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXR1cENhbGwuYXJncy5sZW5ndGggPT09IGNhbGwuYXJncy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zZXR1cENhbGwuYXJncywgKHgsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXR1cEFyZyA9IDxtYXRjaC5JTWF0Y2g+eDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbGxBcmcgPSBjYWxsLmFyZ3NbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmICFzZXR1cEFyZy5fX19tYXRjaGVzKGNhbGxBcmcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4ZWN1dGUoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzSW52b2tlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGxiYWNrLmFwcGx5KHRoaXMsIGNhbGwuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aHJvd25FeGNlcHRpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGhpcy5fdGhyb3duRXhjZXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYWxsQ291bnQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElWZXJpZmllc1xyXG5cclxuICAgICAgICB2ZXJpZmlhYmxlKHRpbWVzOiBUaW1lcyA9IFRpbWVzLmF0TGVhc3RPbmNlKCkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5faXNWZXJpZmlhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fZXhwZWN0ZWRDYWxsQ291bnQgPSB0aW1lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4gZXh0ZW5kcyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+IGltcGxlbWVudHMgYXBpLklTZXR1cDxULCBUUmVzdWx0PiwgYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9yZXR1cm5WYWx1ZUZ1bmM6IElGdW5jTjxhbnksIFRSZXN1bHQ+O1xyXG4gICAgICAgIGhhc1JldHVyblZhbHVlOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfY2FsbEJhc2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG1vY2s6IE1vY2s8VD4sIHNldHVwRXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG1vY2ssIHNldHVwRXhwcmVzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvdmVycmlkZXNcclxuXHJcbiAgICAgICAgZXhlY3V0ZShjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuZXhlY3V0ZShjYWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsQmFzZSlcclxuICAgICAgICAgICAgICAgIGNhbGwuaW52b2tlQmFzZSgpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuaGFzUmV0dXJuVmFsdWUpXHJcbiAgICAgICAgICAgICAgICBjYWxsLnJldHVyblZhbHVlID0gdGhpcy5fcmV0dXJuVmFsdWVGdW5jLmFwcGx5KHRoaXMsIGNhbGwuYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJU2V0dXBcclxuXHJcbiAgICAgICAgY2FsbGJhY2soYWN0aW9uOiBJQWN0aW9uTjxhbnk+KTogYXBpLklSZXR1cm5zVGhyb3dzPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsYmFjayA9IGFjdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvd3MoZXhjZXB0aW9uOiBFcnJvcik6IGFwaS5JVGhyb3dzUmVzdWx0IHtcclxuICAgICAgICAgICAgdGhpcy5fdGhyb3duRXhjZXB0aW9uID0gZXhjZXB0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybnModmFsdWVGdW5jOiBJRnVuY048YW55LCBUUmVzdWx0Pik6IGFwaS5JUmV0dXJuc1Jlc3VsdDxUPiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JldHVyblZhbHVlRnVuYyA9IHZhbHVlRnVuYztcclxuICAgICAgICAgICAgdGhpcy5oYXNSZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsbEJhc2UoKTogYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbEJhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElSZXR1cm5zUmVzdWx0XHJcblxyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGVudW0gTW9ja0JlaGF2aW9yIHsgTG9vc2UsIFN0cmljdCB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vY2s8VD4gaW1wbGVtZW50cyBJTW9jazxUPiB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBwcm94eUZhY3Rvcnk6IHByb3h5LklQcm94eUZhY3RvcnkgPSBuZXcgVHlwZU1vcUludGVybi5Qcm94eS5Qcm94eUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBfaW50ZXJjZXB0b3I6IEludGVyY2VwdG9yRXhlY3V0ZTxUPjtcclxuICAgICAgICBwcml2YXRlIF9wcm94eTogVDtcclxuICAgICAgICBwcml2YXRlIF9jYWxsQmFzZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIGluc3RhbmNlOiBULCBwcml2YXRlIF9iZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gdGhpcy5nZXROYW1lT2YoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IgPSBuZXcgSW50ZXJjZXB0b3JFeGVjdXRlKHRoaXMuX2JlaGF2aW9yLCB0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5fcHJveHkgPSBNb2NrLnByb3h5RmFjdG9yeS5jcmVhdGVQcm94eTxUPih0aGlzLl9pbnRlcmNlcHRvciwgdGhpcy5pbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZJbnN0YW5jZTxVPihpbnN0YW5jZTogVSwgYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UpOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgbGV0IG1vY2sgPSBuZXcgTW9jayhpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9jaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZlR5cGU8VT4oY3RvcjogQ3RvcldpdGhBcmdzPFU+LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSwgLi4uY3RvckFyZ3M6IGFueVtdKTogTW9jazxVPiB7XHJcbiAgICAgICAgICAgIGxldCBtb2NrOiBNb2NrPFU+ID0gTW9jay5vZlR5cGUyKGN0b3IsIGN0b3JBcmdzLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mVHlwZTI8VT4oY3RvcjogQ3RvcldpdGhBcmdzPFU+LCBjdG9yQXJnczogYW55W10sIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKTogTW9jazxVPiB7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZTogVSA9IFV0aWxzLmNvbnRodW5rdG9yKGN0b3IsIGN0b3JBcmdzKTtcclxuICAgICAgICAgICAgbGV0IG1vY2s6IE1vY2s8VT4gPSBuZXcgTW9jayhpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9jaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLl9wcm94eTsgfVxyXG5cclxuICAgICAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cclxuICAgICAgICBnZXQgYmVoYXZpb3IoKSB7IHJldHVybiB0aGlzLl9iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLl9jYWxsQmFzZTsgfVxyXG4gICAgICAgIHNldCBjYWxsQmFzZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9jYWxsQmFzZSA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdGVJZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTW9jazxcIiArIF8udW5pcXVlSWQoKSArIFwiPlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXROYW1lT2YoaW5zdGFuY2U6IFQpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbHMuZnVuY3Rpb25OYW1lKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfLmlzT2JqZWN0KGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0b3IgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFV0aWxzLmZ1bmN0aW9uTmFtZShjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC50cmltKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0dXBcclxuXHJcbiAgICAgICAgc2V0dXA8VFJlc3VsdD4oZXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KTogTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIGxldCBjYWxsID0gbmV3IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4odGhpcywgZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLmFkZENhbGwoY2FsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgY2FsbCA9IG5ldyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+KHRoaXMsIGV4cHJlc3Npb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci5hZGRDYWxsKGNhbGwpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IudmVyaWZ5Q2FsbChjYWxsLCB0aW1lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLnZlcmlmeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVGltZXMge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgPCU9IG4gJT4gdGltZXMsIGludm9rZWQgPCU9IG0gJT4gdGltZXNcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9MRUFTVF9PTkNFID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIGF0IGxlYXN0IG9uY2VcIjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBOT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UgPSBcIkV4cGVjdGVkIGludm9jYXRpb24gb24gdGhlIG1vY2sgYXQgbW9zdCBvbmNlXCI7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX2xhc3RDYWxsQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9mYWlsTWVzc2FnZTogKC4uLmRhdGE6IGFueVtdKSA9PiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbmRpdGlvbjogSUZ1bmMyPG51bWJlciwgYm9vbGVhbj4sXHJcbiAgICAgICAgICAgIHByaXZhdGUgX2Zyb206IG51bWJlcixcclxuICAgICAgICAgICAgcHJpdmF0ZSBfdG86IG51bWJlcixcclxuICAgICAgICAgICAgZmFpbE1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLl9mYWlsTWVzc2FnZSA9IF8udGVtcGxhdGUoZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IGZhaWxNZXNzYWdlKCkgeyByZXR1cm4gdGhpcy5fZmFpbE1lc3NhZ2UoeyBuOiB0aGlzLl9mcm9tLCBtOiB0aGlzLl9sYXN0Q2FsbENvdW50IH0pOyB9XHJcblxyXG4gICAgICAgIHZlcmlmeShjYWxsQ291bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2FsbENvdW50ID0gY2FsbENvdW50O1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uKGNhbGxDb3VudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZXhhY3RseShuOiBudW1iZXIpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID09PSBuLCBuLCBuLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19FWEFDVExZX05fVElNRVMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG5ldmVyKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRpbWVzLmV4YWN0bHkoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW1lcy5leGFjdGx5KDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGF0TGVhc3RPbmNlKCk6IFRpbWVzIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lcyhjID0+IGMgPj0gMSwgMSwgTnVtYmVyLk1BWF9WQUxVRSwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTEVBU1RfT05DRSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgYXRNb3N0T25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID49IDAgJiYgYyA8PSAxLCAwLCAxLCBUaW1lcy5OT19NQVRDSElOR19DQUxMU19BVF9NT1NUX09OQ0UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbmludGVyZmFjZSBJVHlwZU1vcSB7XHJcbiAgICBNb2NrOiB0eXBlb2YgVHlwZU1vcUludGVybi5Nb2NrO1xyXG4gICAgTW9ja0JlaGF2aW9yOiB0eXBlb2YgVHlwZU1vcUludGVybi5Nb2NrQmVoYXZpb3I7XHJcbiAgICBJdDogdHlwZW9mIFR5cGVNb3FJbnRlcm4uSXQ7XHJcbiAgICBUaW1lczogdHlwZW9mIFR5cGVNb3FJbnRlcm4uVGltZXM7XHJcbiAgICBHbG9iYWxNb2NrOiB0eXBlb2YgVHlwZU1vcUludGVybi5HbG9iYWxNb2NrO1xyXG4gICAgR2xvYmFsU2NvcGU6IHR5cGVvZiBUeXBlTW9xSW50ZXJuLkdsb2JhbFNjb3BlO1xyXG4gICAgTW9ja0V4Y2VwdGlvbjogdHlwZW9mIFR5cGVNb3FJbnRlcm4uRXJyb3IuTW9ja0V4Y2VwdGlvbjtcclxufVxyXG5cclxubW9kdWxlIFR5cGVNb3Ege1xyXG4gICAgZXhwb3J0IGltcG9ydCBNb2NrID0gVHlwZU1vcUludGVybi5Nb2NrO1xyXG4gICAgZXhwb3J0IGltcG9ydCBNb2NrQmVoYXZpb3IgPSBUeXBlTW9xSW50ZXJuLk1vY2tCZWhhdmlvcjtcclxuICAgIGV4cG9ydCBpbXBvcnQgSXQgPSBUeXBlTW9xSW50ZXJuLkl0O1xyXG4gICAgZXhwb3J0IGltcG9ydCBUaW1lcyA9IFR5cGVNb3FJbnRlcm4uVGltZXM7XHJcbiAgICBleHBvcnQgaW1wb3J0IEdsb2JhbE1vY2sgPSBUeXBlTW9xSW50ZXJuLkdsb2JhbE1vY2s7XHJcbiAgICBleHBvcnQgaW1wb3J0IEdsb2JhbFNjb3BlID0gVHlwZU1vcUludGVybi5HbG9iYWxTY29wZTtcclxuICAgIGV4cG9ydCBpbXBvcnQgTW9ja0V4Y2VwdGlvbiA9IFR5cGVNb3FJbnRlcm4uRXJyb3IuTW9ja0V4Y2VwdGlvbjtcclxufVxyXG5cclxuZGVjbGFyZSBsZXQgdHlwZW1vcTogSVR5cGVNb3E7XHJcbnR5cGVtb3EgPSBUeXBlTW9xOyIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9Jy4uL2Jvd2VyX2NvbXBvbmVudHMvRGVmaW5pdGVseVR5cGVkL25vZGUvbm9kZS5kLnRzJyAvPiBcclxuXHJcbmlmICh0eXBlb2YgcmVxdWlyZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgdmFyIF86IFVuZGVyc2NvcmVTdGF0aWMgPSByZXF1aXJlKFwidW5kZXJzY29yZVwiKTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVtb3E7XHJcbiAgICB9XHJcbiAgICBleHBvcnRzLnR5cGVtb3EgPSB0eXBlbW9xO1xyXG59IGVsc2Uge1xyXG4gICAgdGhpcy50eXBlbW9xID0gdHlwZW1vcTtcclxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
