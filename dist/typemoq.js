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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0LmpzIiwic291cmNlcyI6WyJDb25zdHMudHMiLCJDdXJyZW50SW50ZXJjZXB0Q29udGV4dC50cyIsIkdsb2JhbE1vY2sudHMiLCJBcGkvSUNhbGxiYWNrLnRzIiwiQXBpL0lSZXR1cm5zLnRzIiwiQXBpL0lTZXR1cC50cyIsIkFwaS9JVGhyb3dzLnRzIiwiQXBpL0lVc2luZy50cyIsIkFwaS9JVmVyaWZpZXMudHMiLCJBcGkvX2FsbC50cyIsIkNvbW1vbi9DdG9yLnRzIiwiQ29tbW9uL0Z1bmMudHMiLCJDb21tb24vUHJvcGVydHlSZXRyaWV2ZXIudHMiLCJDb21tb24vVXRpbHMudHMiLCJDb21tb24vX2FsbC50cyIsIkVycm9yL0V4Y2VwdGlvbi50cyIsIkVycm9yL01vY2tFeGNlcHRpb24udHMiLCJFcnJvci9fYWxsLnRzIiwiTWF0Y2gvSU1hdGNoLnRzIiwiTWF0Y2gvTWF0Y2hBbnkudHMiLCJNYXRjaC9NYXRjaFByZWQudHMiLCJNYXRjaC9NYXRjaFZhbHVlLnRzIiwiTWF0Y2gvX2FsbC50cyIsIlByb3h5L0lDYWxsQ29udGV4dC50cyIsIlByb3h5L0lDYWxsSW50ZXJjZXB0b3IudHMiLCJQcm94eS9JbnZvY2F0aW9uLnRzIiwiUHJveHkvSVByb3h5Q2FsbC50cyIsIlByb3h5L0lQcm94eUZhY3RvcnkudHMiLCJQcm94eS9Qcm94eS50cyIsIlByb3h5L1Byb3h5RmFjdG9yeS50cyIsIlByb3h5L19hbGwudHMiLCJfYWxsLnRzIiwiR2xvYmFsU2NvcGUudHMiLCJJR2xvYmFsTW9jay50cyIsIklNb2NrLnRzIiwiSW50ZXJjZXB0b3JDb250ZXh0LnRzIiwiSW50ZXJjZXB0b3JFeGVjdXRlLnRzIiwiSW50ZXJjZXB0b3JTZXR1cC50cyIsIkludGVyY2VwdG9yU3RyYXRlZ2llcy50cyIsIkl0LnRzIiwiTWV0aG9kQ2FsbC50cyIsIk1ldGhvZENhbGxSZXR1cm4udHMiLCJNb2NrLnRzIiwiVGltZXMudHMiLCJfZXhwb3J0cy50cyIsIl9ub2RlLnRzIl0s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QUFDO0lBQ3RDLG1CQUFXLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUN4QyxxQkFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQ3BFLENBQUMsRUFSTSxPQUFPLEtBQVAsT0FBTyxRQVFiO0FBR0QsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7O0FDdkJsQiw0RUFBNEU7QUFFNUUsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUMsR0FBcUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BELENBQUM7QUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDdkMsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzlCLENBQUM7QUFBQyxJQUFJLENBQUMsQ0FBQztJQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIENvbnN0cyB7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9WQUxVRSA9IFwiNDM4QTUxRDMtNjg2NC00OUQ3LUE2NTUtQ0ExMTUzQjg2OTY1XCI7XHJcbiAgICAgICAgc3RhdGljIElNQVRDSF9JRF9OQU1FID0gXCJfX19pZFwiO1xyXG4gICAgICAgIHN0YXRpYyBJTUFUQ0hfTUFUQ0hFU19OQU1FID0gXCJfX19tYXRjaGVzXCI7XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4ge1xyXG4gICAgICAgIGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD47XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgZW51bSBHbG9iYWxUeXBlIHsgQ2xhc3MsIEZ1bmN0aW9uLCBWYWx1ZSB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEdsb2JhbE1vY2s8VD4gaW1wbGVtZW50cyBJR2xvYmFsTW9jazxUPiB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtb2NrOiBNb2NrPFQ+LCBwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX3R5cGU6IEdsb2JhbFR5cGUsIHB1YmxpYyBjb250YWluZXI6IE9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uYW1lID0gbW9jay5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mSW5zdGFuY2U8VT4oaW5zdGFuY2U6IFUsIGdsb2JhbE5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICBsZXQgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICBsZXQgdHlwZSA9IF8uaXNGdW5jdGlvbihpbnN0YW5jZSkgPyBHbG9iYWxUeXBlLkZ1bmN0aW9uIDogR2xvYmFsVHlwZS5WYWx1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHbG9iYWxNb2NrKG1vY2ssIGdsb2JhbE5hbWUsIHR5cGUsIGNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZUeXBlPFU+KGN0b3I6IEN0b3I8VT4sIGdsb2JhbE5hbWU/OiBzdHJpbmcsIGNvbnRhaW5lcjogT2JqZWN0ID0gd2luZG93LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSk6IEdsb2JhbE1vY2s8VT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5zdGFuY2UgPSBuZXcgY3RvcigpO1xyXG4gICAgICAgICAgICBsZXQgbW9jayA9IE1vY2sub2ZJbnN0YW5jZShpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdsb2JhbE1vY2sobW9jaywgZ2xvYmFsTmFtZSwgR2xvYmFsVHlwZS5DbGFzcywgY29udGFpbmVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLm1vY2sub2JqZWN0OyB9XHJcblxyXG4gICAgICAgIGdldCBuYW1lKCkgeyByZXR1cm4gdGhpcy5fbmFtZSB8fCB0aGlzLm1vY2submFtZTsgfVxyXG4gICAgICAgIGdldCBiZWhhdmlvcigpIHsgcmV0dXJuIHRoaXMubW9jay5iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLm1vY2suY2FsbEJhc2U7IH1cclxuICAgICAgICBzZXQgY2FsbEJhc2UodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5tb2NrLmNhbGxCYXNlID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHR5cGUoKSB7IHJldHVybiB0aGlzLl90eXBlOyB9XHJcblxyXG4gICAgICAgIC8vIHNldHVwXHJcblxyXG4gICAgICAgIHNldHVwPFRSZXN1bHQ+KGV4cHJlc3Npb246IElGdW5jMjxULCBUUmVzdWx0Pik6IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2NrLnNldHVwKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1vY2sudmVyaWZ5KGV4cHJlc3Npb24sIHRpbWVzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tb2NrLnZlcmlmeUFsbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUNhbGxiYWNrPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24pOiBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PjtcclxuICAgICAgICBjYWxsYmFjayhhY3Rpb246IElBY3Rpb24xPFQ+KTogSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD47XHJcbiAgICB9XHJcbn0gICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElSZXR1cm5zPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICByZXR1cm5zKHZhbHVlRnVuY3Rpb246IElGdW5jTjxhbnksIFRSZXN1bHQ+KTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICAgICAgY2FsbEJhc2UoKTogSVJldHVybnNSZXN1bHQ8VD47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Jlc3VsdDxUPiBleHRlbmRzIElWZXJpZmllcyB7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUmV0dXJuc1Rocm93czxULCBUUmVzdWx0PiBleHRlbmRzIElSZXR1cm5zPFQsIFRSZXN1bHQ+LCBJVGhyb3dzIHtcclxuICAgIH1cclxufSAgICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTZXR1cDxULCBUUmVzdWx0PiBleHRlbmRzIElDYWxsYmFjazxULCBUUmVzdWx0PiwgSVJldHVybnNUaHJvd3M8VCwgVFJlc3VsdD4sIElWZXJpZmllcyB7IH0gXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5BcGkge1xyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93cyB7XHJcbiAgICAgICAgdGhyb3dzPFQgZXh0ZW5kcyBlcnJvci5FeGNlcHRpb24+KGV4Y2VwdGlvbjogVCk6IElUaHJvd3NSZXN1bHQ7XHJcblx0fVxyXG5cdGV4cG9ydCBpbnRlcmZhY2UgSVRocm93c1Jlc3VsdCBleHRlbmRzIElWZXJpZmllcyB7XHJcblx0fVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLkFwaSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElVc2luZ1Jlc3VsdCB7XHJcbiAgICAgICAgd2l0aChhY3Rpb246IElBY3Rpb24pOiB2b2lkO1xyXG4gICAgfVxyXG59ICAgIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uQXBpIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZlcmlmaWVzIHtcclxuICAgICAgICB2ZXJpZmlhYmxlKHRpbWVzPzogVGltZXMpOiB2b2lkO1xyXG4gICAgfVxyXG59ICAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdJQ2FsbGJhY2sudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lSZXR1cm5zLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdJU2V0dXAudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lUaHJvd3MudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lVc2luZy50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nSVZlcmlmaWVzLnRzJyAvPiAgIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IHR5cGUgQ3RvcjxUPiA9IHtcclxuICAgICAgICBuZXcgKCk6IFQ7XHJcbiAgICAgICAgcHJvdG90eXBlOiBPYmplY3Q7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdHlwZSBDdG9yV2l0aEFyZ3M8VD4gPSB7XHJcbiAgICAgICAgbmV3ICguLi5jdG9yQXJnczogYW55W10pOiBUO1xyXG4gICAgICAgIHByb3RvdHlwZTogT2JqZWN0O1xyXG4gICAgfVxyXG59IFxyXG4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcbiAgICBleHBvcnQgdHlwZSBJQWN0aW9uID0gKCkgPT4gdm9pZDtcclxuICAgIGV4cG9ydCB0eXBlIElBY3Rpb24xPFQ+ID0gKHg6IFQpID0+IHZvaWQ7XHJcbiAgICBleHBvcnQgdHlwZSBJQWN0aW9uTjxUPiA9ICguLi54OiBUW10pID0+IHZvaWQ7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgSUZ1bmMxPFRSZXN1bHQ+ID0gKCkgPT4gVFJlc3VsdDtcclxuICAgIGV4cG9ydCB0eXBlIElGdW5jMjxULCBUUmVzdWx0PiA9ICh4OiBUKSA9PiBUUmVzdWx0O1xyXG4gICAgZXhwb3J0IHR5cGUgSUZ1bmNOPFQsIFRSZXN1bHQ+ID0gKC4uLng6IFRbXSkgPT4gVFJlc3VsdDtcclxufSBcclxuIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5UmV0cmlldmVyIHtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldE93bkVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgZmFsc2UsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBjb3VsZCB1c2UgZm9yLi5pbiBmaWx0ZXJlZCB3aXRoIGhhc093blByb3BlcnR5IG9yIGp1c3QgdGhpczogcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duTm9uZW51bWVyYWJsZXMob2JqOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCBmYWxzZSwgdGhpcy5fbm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duRW51bWVyYWJsZXNBbmROb25lbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIGZhbHNlLCB0aGlzLl9lbnVtZXJhYmxlQW5kTm90RW51bWVyYWJsZSk7XHJcbiAgICAgICAgICAgIC8vIE9yIGp1c3QgdXNlOiByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9lbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVOb25lbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIGZhbHNlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgZmFsc2UsIHRydWUsIHRoaXMuX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlcyhvYmo6IGFueSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0UHJvcGVydHlOYW1lcyhvYmosIHRydWUsIHRydWUsIHRoaXMuX2VudW1lcmFibGUpO1xyXG4gICAgICAgICAgICAvLyBPciBjb3VsZCB1c2UgdW5maWx0ZXJlZCBmb3IuLmluXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0T3duQW5kUHJvdG90eXBlTm9uZW51bWVyYWJsZXMob2JqOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFByb3BlcnR5TmFtZXMob2JqLCB0cnVlLCB0cnVlLCB0aGlzLl9ub3RFbnVtZXJhYmxlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKG9iajogYW55KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRQcm9wZXJ0eU5hbWVzKG9iaiwgdHJ1ZSwgdHJ1ZSwgdGhpcy5fZW51bWVyYWJsZUFuZE5vdEVudW1lcmFibGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUHJpdmF0ZSBzdGF0aWMgcHJvcGVydHkgY2hlY2tlciBjYWxsYmFja3NcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZW51bWVyYWJsZShvYmo6IGFueSwgcHJvcDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmoucHJvcGVydHlJc0VudW1lcmFibGUocHJvcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfbm90RW51bWVyYWJsZShvYmo6IGFueSwgcHJvcDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiAhb2JqLnByb3BlcnR5SXNFbnVtZXJhYmxlKHByb3ApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2VudW1lcmFibGVBbmROb3RFbnVtZXJhYmxlKG9iajogYW55LCBwcm9wOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZ2V0UHJvcGVydHlOYW1lcyhcclxuICAgICAgICAgICAgb2JqOiBhbnksIGl0ZXJhdGVTZWxmQm9vbDogYm9vbGVhbiwgaXRlcmF0ZVByb3RvdHlwZUJvb2w6IGJvb2xlYW4sIGluY2x1ZGVQcm9wQ2I6IChvYmo6IGFueSwgcHJvcDogYW55KSA9PiBib29sZWFuKTpcclxuICAgICAgICAgICAgQXJyYXk8eyBuYW1lOiBzdHJpbmc7IGRlc2M6IFByb3BlcnR5RGVzY3JpcHRvciB9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTx7IG5hbWU6IHN0cmluZzsgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yIH0+ID0gW107XHJcblxyXG4gICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmF0ZVNlbGZCb29sKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHByb3BzLCBwcm9wID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGR1cGxpY2F0ZSA9IF8uZmluZChyZXN1bHQsIHAgPT4gcC5uYW1lID09PSBwcm9wKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZHVwbGljYXRlICYmIGluY2x1ZGVQcm9wQ2Iob2JqLCBwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHByb3ApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goeyBuYW1lOiBwcm9wLCBkZXNjOiBwcm9wRGVzYyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghaXRlcmF0ZVByb3RvdHlwZUJvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpdGVyYXRlU2VsZkJvb2wgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgfSB3aGlsZSAob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVXRpbHMge1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0VVVJRCgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBsZXQgdXVpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwO1xyXG4gICAgICAgICAgICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdXVpZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBmdW5jdGlvbk5hbWUoZnVuOiBPYmplY3QpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmV0OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT5mdW4pLm5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHJldCA9ICg8YW55PmZ1bikubmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXByID0gZnVuLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICByZXByID0gcmVwci5zdWJzdHIoJ2Z1bmN0aW9uICcubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHJldCA9IHJlcHIuc3Vic3RyKDAsIHJlcHIuaW5kZXhPZignKCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGNvbnRodW5rdG9yPFU+KGN0b3I6IEN0b3JXaXRoQXJnczxVPiwgYXJnczogYW55W10pOiBVIHtcclxuICAgICAgICAgICAgbGV0IHJldDogVSA9IG5ldyBjdG9yKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdDdG9yLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdGdW5jLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm9wZXJ0eVJldHJpZXZlci50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nVXRpbHMudHMnIC8+IiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uRXJyb3Ige1xyXG4gICAgZXhwb3J0IGNsYXNzIEV4Y2VwdGlvbiBpbXBsZW1lbnRzIEVycm9yIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZT86IHN0cmluZywgcHVibGljIG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uRXJyb3Ige1xyXG4gICAgZXhwb3J0IGVudW0gTW9ja0V4Y2VwdGlvblJlYXNvbiB7XHJcbiAgICAgICAgTm9TZXR1cCxcclxuICAgICAgICBNb3JlVGhhbk9uZVNldHVwRXhwcmVzc2lvbixcclxuICAgICAgICBJbnZhbGlkU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgIEludmFsaWRNYXRjaGVyLFxyXG4gICAgICAgIEludmFsaWRQcm94eUFyZ3VtZW50LFxyXG4gICAgICAgIFVua25vd25HbG9iYWxUeXBlLFxyXG4gICAgICAgIFZlcmlmaWNhdGlvbkZhaWxlZFxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1vY2tFeGNlcHRpb24gZXh0ZW5kcyBFeGNlcHRpb24ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwdWJsaWMgcmVhc29uOiBNb2NrRXhjZXB0aW9uUmVhc29uLFxyXG4gICAgICAgICAgICBwdWJsaWMgY3R4OiBhbnksXHJcbiAgICAgICAgICAgIG5hbWU6IHN0cmluZyA9ICdNb2NrIEV4Y2VwdGlvbicsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U/OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nRXhjZXB0aW9uLnRzJyAvPiBcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTW9ja0V4Y2VwdGlvbi50cycgLz4iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJTWF0Y2gge1xyXG4gICAgICAgIF9fX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLk1hdGNoIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnlPYmplY3Q8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2N0b3I6IEN0b3I8VD4pIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdG9yLnByb3RvdHlwZSA9PT0gb2JqZWN0LmNvbnN0cnVjdG9yLnByb3RvdHlwZSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnkgaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaEFueVN0cmluZyBpbXBsZW1lbnRzIElNYXRjaCB7XHJcblxyXG4gICAgICAgIF9fX2lkID0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRTtcclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcob2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWF0Y2hBbnlOdW1iZXIgaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIF9fX21hdGNoZXMob2JqZWN0OiBPYmplY3QpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzTnVtYmVyKG9iamVjdCkpXHJcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0gIiwibmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uTWF0Y2gge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNYXRjaFByZWQ8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ByZWQ6IElGdW5jMjxULCBib29sZWFuPikge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX19fbWF0Y2hlcyhvYmplY3Q6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3ByZWQoPFQ+b2JqZWN0KSlcclxuICAgICAgICAgICAgICAgIG1hdGNoID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5NYXRjaCB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1hdGNoVmFsdWU8VD4gaW1wbGVtZW50cyBJTWF0Y2gge1xyXG5cclxuICAgICAgICBfX19pZCA9IENvbnN0cy5JTUFUQ0hfSURfVkFMVUU7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZhbHVlOiBUKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfX19tYXRjaGVzKG9iamVjdDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoXy5pc0VxdWFsKHRoaXMuX3ZhbHVlLCBvYmplY3QpKVxyXG4gICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0Y2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nSU1hdGNoLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaEFueS50cycgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nTWF0Y2hQcmVkLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaFZhbHVlLnRzJyAvPiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgYXJnczogSUFyZ3VtZW50cztcclxuICAgICAgICBwcm9wZXJ0eTogSVByb3BlcnR5SW5mbztcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZDtcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBpbnRlcmNlcHQoY29udGV4dDogSUNhbGxDb250ZXh0KTogdm9pZDtcclxuICAgIH1cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybi5Qcm94eSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kSW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IE1ldGhvZEluZm8sIHByaXZhdGUgX2FyZ3M/OiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3MgfHwgeyBsZW5ndGg6IDAsIGNhbGxlZTogbnVsbCB9OyB9XHJcbiAgICAgICAgc2V0IGFyZ3ModmFsdWU6IElBcmd1bWVudHMpIHsgdGhpcy5fYXJncyA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9IHRoaXMuX3Byb3BlcnR5LnRvRnVuYy5hcHBseSh0aGlzLl9wcm9wZXJ0eS5vYmosIHRoaXMuX2FyZ3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFZhbHVlR2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHtcclxuICAgICAgICAgICAgbGV0IGFyZ3M6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcmdzLCBcImNhbGxlZVwiLFxyXG4gICAgICAgICAgICAgICAgeyBjb25maWd1cmFibGU6IGZhbHNlLCBlbnVtZXJhYmxlOiB0cnVlLCB3cml0YWJsZTogZmFsc2UsIHZhbHVlOiBudWxsIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5hcmdzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB9XHJcblxyXG4gICAgICAgIGdldCBwcm9wZXJ0eSgpOiBQcm9wZXJ0eUluZm8geyByZXR1cm4gdGhpcy5fcHJvcGVydHk7IH1cclxuXHJcbiAgICAgICAgaW52b2tlQmFzZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9ICg8YW55PnRoaXMuX3Byb3BlcnR5Lm9iailbdGhpcy5fcHJvcGVydHkubmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgVmFsdWVTZXR0ZXJJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHlJbmZvLCBwcml2YXRlIF9hcmdzOiBJQXJndW1lbnRzKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgYXJncygpOiBJQXJndW1lbnRzIHsgcmV0dXJuIHRoaXMuX2FyZ3M7IH1cclxuICAgICAgICBzZXQgYXJncyh2YWx1ZTogSUFyZ3VtZW50cykgeyB0aGlzLl9hcmdzID0gdmFsdWU7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAoPGFueT50aGlzLl9wcm9wZXJ0eS5vYmopW3RoaXMuX3Byb3BlcnR5Lm5hbWVdID0gdGhpcy5fYXJnc1swXTtcclxuICAgICAgICAgICAgdGhpcy5yZXR1cm5WYWx1ZSA9ICg8YW55PnRoaXMuX3Byb3BlcnR5Lm9iailbdGhpcy5fcHJvcGVydHkubmFtZV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kR2V0dGVySW52b2NhdGlvbiBpbXBsZW1lbnRzIElDYWxsQ29udGV4dCB7XHJcbiAgICAgICAgcmV0dXJuVmFsdWU6IGFueTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcHJvcGVydHk6IFByb3BlcnR5SW5mbywgcHJpdmF0ZSBfZ2V0dGVyOiAoKSA9PiBhbnkpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMge1xyXG4gICAgICAgICAgICBsZXQgYXJnczogYW55W10gPSBbXTtcclxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFyZ3MsIFwiY2FsbGVlXCIsXHJcbiAgICAgICAgICAgICAgICB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiBmYWxzZSwgdmFsdWU6IG51bGwgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55PmFyZ3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBhcmdzKHZhbHVlOiBJQXJndW1lbnRzKSB7IH1cclxuXHJcbiAgICAgICAgZ2V0IHByb3BlcnR5KCk6IFByb3BlcnR5SW5mbyB7IHJldHVybiB0aGlzLl9wcm9wZXJ0eTsgfVxyXG5cclxuICAgICAgICBpbnZva2VCYXNlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gKDxhbnk+dGhpcy5fcHJvcGVydHkub2JqKVt0aGlzLl9wcm9wZXJ0eS5uYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RTZXR0ZXJJbnZvY2F0aW9uIGltcGxlbWVudHMgSUNhbGxDb250ZXh0IHtcclxuICAgICAgICByZXR1cm5WYWx1ZTogYW55O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wcm9wZXJ0eTogUHJvcGVydHlJbmZvLCBwcml2YXRlIF9zZXR0ZXI6ICh2OiBhbnkpID0+IHZvaWQsIHByaXZhdGUgX2FyZ3M6IElBcmd1bWVudHMpIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBhcmdzKCk6IElBcmd1bWVudHMgeyByZXR1cm4gdGhpcy5fYXJnczsgfVxyXG4gICAgICAgIHNldCBhcmdzKHZhbHVlOiBJQXJndW1lbnRzKSB7IHRoaXMuX2FyZ3MgPSB2YWx1ZTsgfVxyXG5cclxuICAgICAgICBnZXQgcHJvcGVydHkoKTogUHJvcGVydHlJbmZvIHsgcmV0dXJuIHRoaXMuX3Byb3BlcnR5OyB9XHJcblxyXG4gICAgICAgIGludm9rZUJhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgICg8YW55PnRoaXMuX3Byb3BlcnR5Lm9iailbdGhpcy5fcHJvcGVydHkubmFtZV0gPSB0aGlzLl9hcmdzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnJldHVyblZhbHVlID0gKDxhbnk+dGhpcy5fcHJvcGVydHkub2JqKVt0aGlzLl9wcm9wZXJ0eS5uYW1lXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXRob2RJbmZvIGltcGxlbWVudHMgSVByb3BlcnR5SW5mbyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG9iajogYW55LCBwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCB0b0Z1bmMoKTogRnVuY3Rpb24ge1xyXG4gICAgICAgICAgICBsZXQgZnVuYzogRnVuY3Rpb247XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24odGhpcy5vYmopKVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IDxGdW5jdGlvbj50aGlzLm9iajtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZnVuYyA9IDxGdW5jdGlvbj50aGlzLm9ialt0aGlzLm5hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuYztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByb3BlcnR5SW5mbyBpbXBsZW1lbnRzIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvYmo6IE9iamVjdCwgcHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm9wZXJ0eUluZm8ge1xyXG4gICAgICAgIG9iajogT2JqZWN0O1xyXG4gICAgICAgIG5hbWU6IHN0cmluZztcclxuICAgIH1cclxufSAiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4uUHJveHkge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJveHlDYWxsPFQ+IHtcclxuICAgICAgICBpZDogc3RyaW5nO1xyXG4gICAgICAgIHNldHVwRXhwcmVzc2lvbjogSUFjdGlvbjE8VD47XHJcbiAgICAgICAgc2V0dXBDYWxsOiBwcm94eS5JQ2FsbENvbnRleHQ7XHJcbiAgICAgICAgaXNWZXJpZmlhYmxlOiBib29sZWFuO1xyXG4gICAgICAgIGV4cGVjdGVkQ2FsbENvdW50OiBUaW1lcztcclxuICAgICAgICBpc0ludm9rZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgY2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIG1hdGNoZXMoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogYm9vbGVhbjtcclxuICAgICAgICBleGVjdXRlKGNhbGw6IHByb3h5LklDYWxsQ29udGV4dCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVByb3h5RmFjdG9yeSB7XHJcbiAgICAgICAgY3JlYXRlUHJveHk8VD4oaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKTogVDtcclxuICAgIH1cclxufSAgIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm94eTxUPiB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoaW50ZXJjZXB0b3I6IElDYWxsSW50ZXJjZXB0b3IsIGluc3RhbmNlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2soaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgcHJvcHMgPSBQcm9wZXJ0eVJldHJpZXZlci5nZXRPd25BbmRQcm90b3R5cGVFbnVtZXJhYmxlc0FuZE5vbmVudW1lcmFibGVzKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgXy5lYWNoKHByb3BzLCBwcm9wID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKHByb3AuZGVzYy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiBwcm9wLmRlc2MuY29uZmlndXJhYmxlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBwcm9wLmRlc2MuZW51bWVyYWJsZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHByb3AuZGVzYy53cml0YWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVmaW5lTWV0aG9kUHJveHkodGhhdCwgaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wLm5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwcm9wRGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHByb3AuZGVzYy5jb25maWd1cmFibGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IHByb3AuZGVzYy5lbnVtZXJhYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AuZGVzYy52YWx1ZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZVZhbHVlUHJvcGVydHlQcm94eSh0aGF0LCBpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3AubmFtZSwgcHJvcC5kZXNjLnZhbHVlLCBwcm9wRGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlZmluZUdldFNldFByb3BlcnR5UHJveHkodGhhdCwgaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBwcm9wLm5hbWUsIHByb3AuZGVzYy5nZXQsIHByb3AuZGVzYy5zZXQsIHByb3BEZXNjKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mPFU+KGluc3RhbmNlOiBVLCBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcikge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVjayhpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBhbnk7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZ1bmNOYW1lID0gVXRpbHMuZnVuY3Rpb25OYW1lKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFByb3h5Lm1ldGhvZFByb3h5VmFsdWUoaW50ZXJjZXB0b3IsIGluc3RhbmNlLCBmdW5jTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgUHJveHkoaW50ZXJjZXB0b3IsIGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNoZWNrPFU+KGluc3RhbmNlOiBVKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFByb3h5LmNoZWNrTm90TnVsbChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBhbGxvdyBvbmx5IHByaW1pdGl2ZSBvYmplY3RzIGFuZCBmdW5jdGlvbnNcclxuICAgICAgICAgICAgbGV0IG9rID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oaW5zdGFuY2UpIHx8XHJcbiAgICAgICAgICAgICAgICAoXy5pc09iamVjdChpbnN0YW5jZSkgJiYgIVByb3h5LmlzUHJpbWl0aXZlT2JqZWN0KGluc3RhbmNlKSkpXHJcbiAgICAgICAgICAgICAgICBvayA9IHRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoIW9rKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkUHJveHlBcmd1bWVudCxcclxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSwgXCJJbnZhbGlkUHJveHlBcmd1bWVudCBFeGNlcHRpb25cIiwgXCJBcmd1bWVudCBzaG91bGQgYmUgYSBmdW5jdGlvbiBvciBhIG5vbiBwcmltaXRpdmUgb2JqZWN0XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjaGVjazxVPihpbnN0YW5jZTogVSk6IHZvaWQge1xyXG4gICAgICAgICAgICBQcm94eS5jaGVja05vdE51bGwoaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgLy8gYWxsb3cgb25seSBub24gcHJpbWl0aXZlIG9iamVjdHNcclxuICAgICAgICAgICAgbGV0IG9rID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSAmJlxyXG4gICAgICAgICAgICAgICAgKF8uaXNPYmplY3QoaW5zdGFuY2UpICYmICFQcm94eS5pc1ByaW1pdGl2ZU9iamVjdChpbnN0YW5jZSkpKVxyXG4gICAgICAgICAgICAgICAgb2sgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFvaylcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgc2hvdWxkIGJlIGEgbm9uIHByaW1pdGl2ZSBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjaGVja05vdE51bGw8VT4oaW5zdGFuY2U6IFUpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKF8uaXNOdWxsKGluc3RhbmNlKSlcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZFByb3h5QXJndW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UsIFwiSW52YWxpZFByb3h5QXJndW1lbnQgRXhjZXB0aW9uXCIsIFwiQXJndW1lbnQgY2Fubm90IGJlIG51bGxcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpc1ByaW1pdGl2ZU9iamVjdChvYmo6IE9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9iaikgfHxcclxuICAgICAgICAgICAgICAgIF8uaXNBcnJheShvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzRGF0ZShvYmopIHx8XHJcbiAgICAgICAgICAgICAgICBfLmlzTnVsbChvYmopKVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIGRlZmluZU1ldGhvZFByb3h5KFxyXG4gICAgICAgICAgICB0aGF0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVCxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlIH0pIHtcclxuXHJcbiAgICAgICAgICAgIHByb3BEZXNjLnZhbHVlID0gUHJveHkubWV0aG9kUHJveHlWYWx1ZShpbnRlcmNlcHRvciwgaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG1ldGhvZFByb3h5VmFsdWU8VT4oXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVSxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyk6ICgpID0+IGFueSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwcm94eSgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSBuZXcgTWV0aG9kSW5mbyhpbnN0YW5jZSwgcHJvcE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGludm9jYXRpb246IElDYWxsQ29udGV4dCA9IG5ldyBNZXRob2RJbnZvY2F0aW9uKG1ldGhvZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnZvY2F0aW9uLnJldHVyblZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwcm94eTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lVmFsdWVQcm9wZXJ0eVByb3h5KFxyXG4gICAgICAgICAgICB0aGF0OiBPYmplY3QsXHJcbiAgICAgICAgICAgIGludGVyY2VwdG9yOiBJQ2FsbEludGVyY2VwdG9yLFxyXG4gICAgICAgICAgICBpbnN0YW5jZTogVCxcclxuICAgICAgICAgICAgcHJvcE5hbWU6IHN0cmluZyxcclxuICAgICAgICAgICAgcHJvcFZhbHVlOiBhbnksXHJcbiAgICAgICAgICAgIHByb3BEZXNjOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7IGNvbmZpZ3VyYWJsZTogZmFsc2UsIGVudW1lcmFibGU6IHRydWUgfSkge1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UHJveHkoKTogYW55IHtcclxuICAgICAgICAgICAgICAgIGxldCBtZXRob2QgPSBuZXcgUHJvcGVydHlJbmZvKGluc3RhbmNlLCBwcm9wTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW52b2NhdGlvbjogSUNhbGxDb250ZXh0ID0gbmV3IFZhbHVlR2V0dGVySW52b2NhdGlvbihtZXRob2QsIHByb3BWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5nZXQgPSBnZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFByb3h5KHY6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgVmFsdWVTZXR0ZXJJbnZvY2F0aW9uKG1ldGhvZCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5zZXQgPSBzZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lR2V0U2V0UHJvcGVydHlQcm94eShcclxuICAgICAgICAgICAgdGhhdDogT2JqZWN0LFxyXG4gICAgICAgICAgICBpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvcixcclxuICAgICAgICAgICAgaW5zdGFuY2U6IFQsXHJcbiAgICAgICAgICAgIHByb3BOYW1lOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIGdldD86ICgpID0+IGFueSxcclxuICAgICAgICAgICAgc2V0PzogKHY6IGFueSkgPT4gdm9pZCxcclxuICAgICAgICAgICAgcHJvcERlc2M6IFByb3BlcnR5RGVzY3JpcHRvciA9IHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSB9KSB7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRQcm94eSgpOiBhbnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgTWV0aG9kR2V0dGVySW52b2NhdGlvbihtZXRob2QsIGdldCk7XHJcbiAgICAgICAgICAgICAgICBpbnRlcmNlcHRvci5pbnRlcmNlcHQoaW52b2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW52b2NhdGlvbi5yZXR1cm5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5nZXQgPSBnZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldFByb3h5KHY6IGFueSk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1ldGhvZCA9IG5ldyBQcm9wZXJ0eUluZm8oaW5zdGFuY2UsIHByb3BOYW1lKTtcclxuICAgICAgICAgICAgICAgIGxldCBpbnZvY2F0aW9uOiBJQ2FsbENvbnRleHQgPSBuZXcgTWV0aG9kU2V0dGVySW52b2NhdGlvbihtZXRob2QsIHNldCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGludGVyY2VwdG9yLmludGVyY2VwdChpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9wRGVzYy5zZXQgPSBzZXRQcm94eTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lUHJvcGVydHkodGhhdCwgcHJvcE5hbWUsIHByb3BEZXNjKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZGVmaW5lUHJvcGVydHkob2JqOiBPYmplY3QsIG5hbWU6IHN0cmluZywgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCBkZXNjKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSBcclxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuLlByb3h5IHtcclxuICAgIGV4cG9ydCBjbGFzcyBQcm94eUZhY3RvcnkgaW1wbGVtZW50cyBJUHJveHlGYWN0b3J5IHtcclxuICAgICAgICBjcmVhdGVQcm94eTxUPihpbnRlcmNlcHRvcjogSUNhbGxJbnRlcmNlcHRvciwgaW5zdGFuY2U6IFQpOiBUIHtcclxuICAgICAgICAgICAgbGV0IHByb3h5OiBUID0gPFQ+PGFueT4gUHJveHkub2YoaW5zdGFuY2UsIGludGVyY2VwdG9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lDYWxsQ29udGV4dC50cycgLz4gXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lDYWxsSW50ZXJjZXB0b3IudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0ludm9jYXRpb24udHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lQcm94eUNhbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0lQcm94eUZhY3RvcnkudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J1Byb3h5LnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eUZhY3RvcnkudHMnIC8+IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nLi4vYm93ZXJfY29tcG9uZW50cy9EZWZpbml0ZWx5VHlwZWQvdW5kZXJzY29yZS91bmRlcnNjb3JlLmQudHMnIC8+IFxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD0nQXBpL19hbGwudHMnIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9J0NvbW1vbi9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdFcnJvci9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdNYXRjaC9fYWxsLnRzJyAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPSdQcm94eS9fYWxsLnRzJyAvPlxyXG5cclxuaW1wb3J0IGFwaSAgICAgPSBUeXBlTW9xSW50ZXJuLkFwaTtcclxuaW1wb3J0IGVycm9yICAgPSBUeXBlTW9xSW50ZXJuLkVycm9yO1xyXG5pbXBvcnQgbWF0Y2ggICA9IFR5cGVNb3FJbnRlcm4uTWF0Y2g7XHJcbmltcG9ydCBwcm94eSAgID0gVHlwZU1vcUludGVybi5Qcm94eTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBHbG9iYWxTY29wZSBpbXBsZW1lbnRzIGFwaS5JVXNpbmdSZXN1bHQge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pIHtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB1c2luZyguLi5hcmdzOiBJR2xvYmFsTW9jazxhbnk+W10pOiBhcGkuSVVzaW5nUmVzdWx0IHtcclxuICAgICAgICAgICAgbGV0IHNjb3BlID0gbmV3IEdsb2JhbFNjb3BlKGFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2NvcGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aXRoKGFjdGlvbjogSUFjdGlvbik6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgaW5pdGlhbDogUHJvcGVydHlEZXNjcmlwdG9yTWFwID0ge307XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuX2FyZ3MsIGEgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIV8uaXNVbmRlZmluZWQoYS5jb250YWluZXIuaGFzT3duUHJvcGVydHkoYS5uYW1lKSkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb250YWluZXJQcm9wcyA9IFByb3BlcnR5UmV0cmlldmVyLmdldE93bkFuZFByb3RvdHlwZUVudW1lcmFibGVzQW5kTm9uZW51bWVyYWJsZXMoYS5jb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJvcCA9IF8uZmluZChjb250YWluZXJQcm9wcywgcCA9PiBwLm5hbWUgPT09IGEubmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsW2EubmFtZV0gPSBwcm9wLmRlc2M7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0ge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGEudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgR2xvYmFsVHlwZS5DbGFzczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RPRE86IHJldHVybiBhIG5ldyBtb2NrIGV2ZXJ5IHRpbWUgd2l0aCBzYW1lIGludGVyY2VwdG9yIGFzIHRoZSBvbmUgdXNlZCBieSBtb2NrIHBhc3NlZCBpbiBhcyBhcmcgdG8gJ3VzaW5nJyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICh0byBzdXBwb3J0IGRpZmZlcmVudCBjdG9yIGFyZ3VtZW50cylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlID0gKCkgPT4gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuRnVuY3Rpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzYy52YWx1ZSA9IGEubW9jay5vYmplY3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBHbG9iYWxUeXBlLlZhbHVlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MuZ2V0ID0gKCkgPT4gYS5tb2NrLm9iamVjdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uVW5rbm93bkdsb2JhbFR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEsIFwiVW5rbm93bkdsb2JhbFR5cGUgRXhjZXB0aW9uXCIsIFwidW5rbm93biBnbG9iYWwgdHlwZTogXCIgKyBhLnR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGEuY29udGFpbmVyLCBhLm5hbWUsIGRlc2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIjE6IFwiICsgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBhY3Rpb24uYXBwbHkodGhpcywgdGhpcy5fYXJncyk7XHJcblxyXG4gICAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgXy5lYWNoKHRoaXMuX2FyZ3MsIGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghXy5pc1VuZGVmaW5lZChhLm1vY2suaW5zdGFuY2UpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGVzYzogUHJvcGVydHlEZXNjcmlwdG9yID0gaW5pdGlhbFthLm5hbWVdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGEudHlwZSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuQ2xhc3M6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuRnVuY3Rpb246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEdsb2JhbFR5cGUuVmFsdWU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2MuY29uZmlndXJhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYS5jb250YWluZXIsIGEubmFtZSwgZGVzYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIyOiBcIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbE1vY2s8VD4gZXh0ZW5kcyBJTW9jazxUPiB7XHJcbiAgICAgICAgbW9jazogTW9jazxUPjtcclxuICAgICAgICB0eXBlOiBHbG9iYWxUeXBlO1xyXG4gICAgICAgIGNvbnRhaW5lcjogT2JqZWN0O1xyXG4gICAgfVxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1vY2s8VD4ge1xyXG4gICAgICAgIG9iamVjdDogVDtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgYmVoYXZpb3I6IE1vY2tCZWhhdmlvcjtcclxuICAgICAgICBjYWxsQmFzZTogYm9vbGVhbjtcclxuICAgICAgICBzZXR1cDxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4pOiBNZXRob2RDYWxsUmV0dXJuPFQsIFRSZXN1bHQ+O1xyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQ7XHJcbiAgICAgICAgdmVyaWZ5QWxsKCk6IHZvaWQ7XHJcbiAgICB9XHJcbn0gIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD0nX2FsbC50cycgLz5cclxuXHJcbm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcblx0ZXhwb3J0IGVudW0gSW50ZXJjZXB0aW9uQWN0aW9uIHsgQ29udGludWUsIFN0b3AgfVxyXG5cclxuXHRleHBvcnQgaW50ZXJmYWNlIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblx0XHRoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LFx0Y3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sXHRsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb247XHJcblx0fVxyXG5cclxuXHRleHBvcnQgY2xhc3MgSW50ZXJjZXB0b3JDb250ZXh0PFQ+IHtcclxuXHRcdHByaXZhdGUgX2FjdHVhbEludm9jYXRpb25zOiBBcnJheTxwcm94eS5JQ2FsbENvbnRleHQ+ID0gW107XHJcblx0XHRwcml2YXRlIF9vcmRlcmVkQ2FsbHM6IEFycmF5PHByb3h5LklQcm94eUNhbGw8VD4+ID0gW107XHJcblxyXG5cdFx0Y29uc3RydWN0b3IocHVibGljIGJlaGF2aW9yOiBNb2NrQmVoYXZpb3IsIHB1YmxpYyBtb2NrOiBJTW9jazxUPikgeyB9XHJcblxyXG5cdFx0YWRkSW52b2NhdGlvbihpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQpIHsgdGhpcy5fYWN0dWFsSW52b2NhdGlvbnMucHVzaChpbnZvY2F0aW9uKTsgfVxyXG5cdFx0YWN0dWFsSW52b2NhdGlvbnMoKSB7IHJldHVybiB0aGlzLl9hY3R1YWxJbnZvY2F0aW9uczsgfVxyXG5cdFx0Y2xlYXJJbnZvY2F0aW9ucygpIHsgdGhpcy5fYWN0dWFsSW52b2NhdGlvbnMgPSBbXTsgfVxyXG5cclxuXHRcdGFkZE9yZGVyZWRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pIHsgdGhpcy5fb3JkZXJlZENhbGxzLnB1c2goY2FsbCk7IH1cclxuXHRcdHJlbW92ZU9yZGVyZWRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pIHtcclxuXHRcdFx0Xy5maWx0ZXIodGhpcy5fb3JkZXJlZENhbGxzLCAoeDogcHJveHkuSVByb3h5Q2FsbDxUPikgPT4ge1xyXG5cdFx0XHRcdHJldHVybiB4LmlkICE9PSBjYWxsLmlkO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdG9yZGVyZWRDYWxscygpIHsgcmV0dXJuIHRoaXMuX29yZGVyZWRDYWxsczsgfVxyXG5cdH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcmNlcHRvckV4ZWN1dGU8VD4gaW1wbGVtZW50cyBQcm94eS5JQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRvckNvbnRleHQ6IEludGVyY2VwdG9yQ29udGV4dDxUPjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoYmVoYXZpb3I6IE1vY2tCZWhhdmlvciwgbW9jazogSU1vY2s8VD4pIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0ID0gbmV3IEludGVyY2VwdG9yQ29udGV4dChiZWhhdmlvciwgbW9jayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgaW50ZXJjZXB0b3JDb250ZXh0KCk6IEludGVyY2VwdG9yQ29udGV4dDxUPiB7IHJldHVybiB0aGlzLl9pbnRlcmNlcHRvckNvbnRleHQ7IH1cclxuXHJcbiAgICAgICAgaW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCkge1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxDdHggPSBuZXcgQ3VycmVudEludGVyY2VwdENvbnRleHQoKTtcclxuXHJcbiAgICAgICAgICAgIF8uc29tZSh0aGlzLmludGVyY2VwdGlvblN0cmF0ZWdpZXMoKSwgKHN0cmF0ZWd5OiBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4pID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChJbnRlcmNlcHRpb25BY3Rpb24uU3RvcCA9PT0gc3RyYXRlZ3kuaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb24sIHRoaXMuaW50ZXJjZXB0b3JDb250ZXh0LCBsb2NhbEN0eCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDYWxsKGNhbGw6IHByb3h5LklQcm94eUNhbGw8VD4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0LmFkZE9yZGVyZWRDYWxsKGNhbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmVyaWZ5Q2FsbDxUPihjYWxsOiBwcm94eS5JUHJveHlDYWxsPFQ+LCB0aW1lczogVGltZXMpOiB2b2lkIHtcclxuICAgICAgICAgICAgbGV0IGFjdHVhbENhbGxzOiBBcnJheTxwcm94eS5JQ2FsbENvbnRleHQ+ID0gdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0LmFjdHVhbEludm9jYXRpb25zKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2FsbENvdW50ID0gXy5maWx0ZXIoYWN0dWFsQ2FsbHMsIGMgPT4gY2FsbC5tYXRjaGVzKGMpKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXRpbWVzLnZlcmlmeShjYWxsQ291bnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRocm93VmVyaWZ5Q2FsbEV4Y2VwdGlvbihjYWxsLnNldHVwQ2FsbCwgdGltZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2ZXJpZnkoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGxldCBvcmRlcmVkQ2FsbHM6IEFycmF5PHByb3h5LklQcm94eUNhbGw8VD4+ID0gdGhpcy5faW50ZXJjZXB0b3JDb250ZXh0Lm9yZGVyZWRDYWxscygpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZlcmlmaWFibGVzID0gXy5maWx0ZXIob3JkZXJlZENhbGxzLCBjID0+IGMuaXNWZXJpZmlhYmxlKTtcclxuXHJcbiAgICAgICAgICAgIF8uZm9yRWFjaCh2ZXJpZmlhYmxlcywgdiA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlcmlmeUNhbGwodiwgdi5leHBlY3RlZENhbGxDb3VudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcmNlcHRpb25TdHJhdGVnaWVzKCk6IF8uTGlzdDxJSW50ZXJjZXB0U3RyYXRlZ3k8VD4+IHtcclxuICAgICAgICAgICAgbGV0IHN0cmF0ZWdpZXM6IF8uTGlzdDxJSW50ZXJjZXB0U3RyYXRlZ3k8VD4+ID0gW1xyXG4gICAgICAgICAgICAgICAgbmV3IEFkZEFjdHVhbEludm9jYXRpb24oKSxcclxuICAgICAgICAgICAgICAgIG5ldyBFeHRyYWN0UHJveHlDYWxsKCksXHJcbiAgICAgICAgICAgICAgICBuZXcgRXhlY3V0ZUNhbGwoKSxcclxuICAgICAgICAgICAgICAgIG5ldyBJbnZva2VCYXNlKCksXHJcbiAgICAgICAgICAgICAgICBuZXcgSGFuZGxlTW9ja1JlY3Vyc2lvbigpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIHJldHVybiBzdHJhdGVnaWVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB0aHJvd1ZlcmlmeUNhbGxFeGNlcHRpb24oY2FsbDogcHJveHkuSUNhbGxDb250ZXh0LCB0aW1lczogVGltZXMpIHtcclxuICAgICAgICAgICAgbGV0IGUgPSBuZXcgZXJyb3IuTW9ja0V4Y2VwdGlvbihlcnJvci5Nb2NrRXhjZXB0aW9uUmVhc29uLlZlcmlmaWNhdGlvbkZhaWxlZCxcclxuICAgICAgICAgICAgICAgIGNhbGwsIFwiVmVyaWZ5Q2FsbCBFeGNlcHRpb25cIiwgdGltZXMuZmFpbE1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEludGVyY2VwdG9yU2V0dXA8VD4gaW1wbGVtZW50cyBQcm94eS5JQ2FsbEludGVyY2VwdG9yIHtcclxuICAgICAgICBwcml2YXRlIF9pbnRlcmNlcHRlZENhbGw6IHByb3h5LklDYWxsQ29udGV4dDtcclxuXHJcbiAgICAgICAgZ2V0IGludGVyY2VwdGVkQ2FsbCgpIHsgcmV0dXJuIHRoaXMuX2ludGVyY2VwdGVkQ2FsbDsgfVxyXG5cclxuICAgICAgICBpbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnRlcmNlcHRlZENhbGwpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uTW9yZVRoYW5PbmVTZXR1cEV4cHJlc3Npb24sXHJcbiAgICAgICAgICAgICAgICAgICAgaW52b2NhdGlvbiwgXCJNb3JlVGhhbk9uZVNldHVwRXhwcmVzc2lvbiBFeGNlcHRpb25cIiwgXCJTZXR1cCBzaG91bGQgY29udGFpbiBvbmx5IG9uZSBleHByZXNzaW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRlZENhbGwgPSBpbnZvY2F0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPSdfYWxsLnRzJyAvPlxyXG5cclxubmFtZXNwYWNlIFR5cGVNb3FJbnRlcm4ge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBBZGRBY3R1YWxJbnZvY2F0aW9uPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIGN0eC5hZGRJbnZvY2F0aW9uKGludm9jYXRpb24pO1xyXG4gICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLkNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRXh0cmFjdFByb3h5Q2FsbDxUPiBpbXBsZW1lbnRzIElJbnRlcmNlcHRTdHJhdGVneTxUPiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICBsZXQgb3JkZXJlZENhbGxzID0gY3R4Lm9yZGVyZWRDYWxscygpLnNsaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZmluZENhbGxQcmVkID0gPFQ+KGM6IHByb3h5LklQcm94eUNhbGw8VD4pID0+IGMubWF0Y2hlcyhpbnZvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBtYXRjaGluZ0NhbGxzID0gXy5maWx0ZXIob3JkZXJlZENhbGxzLCBjID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kQ2FsbFByZWQoYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nQ2FsbHMubGVuZ3RoID4gMSkgICAvLyByZWNvcmQvcmVwbGF5IHNjZW5hcmlvIFxyXG4gICAgICAgICAgICAgICAgZmluZENhbGxQcmVkID0gPFQ+KGM6IHByb3h5LklQcm94eUNhbGw8VD4pID0+ICFjLmlzSW52b2tlZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGMubWF0Y2hlcyhpbnZvY2F0aW9uKTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsQ3R4LmNhbGwgPSBfLmZpbmQob3JkZXJlZENhbGxzLCBjID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kQ2FsbFByZWQoYyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2FsQ3R4LmNhbGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxDdHguY2FsbC5ldmFsdWF0ZWRTdWNjZXNzZnVsbHkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjdHguYmVoYXZpb3IgPT0gTW9ja0JlaGF2aW9yLlN0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5Ob1NldHVwLCBpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEV4ZWN1dGVDYWxsPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD47XHJcblxyXG4gICAgICAgIGhhbmRsZUludGVyY2VwdChpbnZvY2F0aW9uOiBwcm94eS5JQ2FsbENvbnRleHQsIGN0eDogSW50ZXJjZXB0b3JDb250ZXh0PFQ+LCBsb2NhbEN0eDogQ3VycmVudEludGVyY2VwdENvbnRleHQ8VD4pOiBJbnRlcmNlcHRpb25BY3Rpb24ge1xyXG4gICAgICAgICAgICB0aGlzLl9jdHggPSBjdHg7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q2FsbCA9IGxvY2FsQ3R4LmNhbGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoY3VycmVudENhbGwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENhbGwuZXhlY3V0ZShpbnZvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbnRlcmNlcHRpb25BY3Rpb24uU3RvcDtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBJbnZva2VCYXNlPFQ+IGltcGxlbWVudHMgSUludGVyY2VwdFN0cmF0ZWd5PFQ+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW50ZXJjZXB0KGludm9jYXRpb246IHByb3h5LklDYWxsQ29udGV4dCwgY3R4OiBJbnRlcmNlcHRvckNvbnRleHQ8VD4sIGxvY2FsQ3R4OiBDdXJyZW50SW50ZXJjZXB0Q29udGV4dDxUPik6IEludGVyY2VwdGlvbkFjdGlvbiB7XHJcbiAgICAgICAgICAgIGlmIChjdHgubW9jay5jYWxsQmFzZSkge1xyXG4gICAgICAgICAgICAgICAgaW52b2NhdGlvbi5pbnZva2VCYXNlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSW50ZXJjZXB0aW9uQWN0aW9uLlN0b3A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEhhbmRsZU1vY2tSZWN1cnNpb248VD4gaW1wbGVtZW50cyBJSW50ZXJjZXB0U3RyYXRlZ3k8VD4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbnRlcmNlcHQoaW52b2NhdGlvbjogcHJveHkuSUNhbGxDb250ZXh0LCBjdHg6IEludGVyY2VwdG9yQ29udGV4dDxUPiwgbG9jYWxDdHg6IEN1cnJlbnRJbnRlcmNlcHRDb250ZXh0PFQ+KTogSW50ZXJjZXB0aW9uQWN0aW9uIHtcclxuICAgICAgICAgICAgLy9UT0RPOiBcclxuICAgICAgICAgICAgcmV0dXJuIEludGVyY2VwdGlvbkFjdGlvbi5Db250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEl0IHtcclxuICAgICAgICBcclxuICAgICAgICBzdGF0aWMgaXNWYWx1ZTxUPih4OiBUKTogVCB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hWYWx1ZSh4KTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueU9iamVjdDxUPih4OiBDdG9yPFQ+KTogVCB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlPYmplY3QoeCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXNBbnkoKTogYW55IHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaEFueSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gPGFueT5tYXRjaGVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGlzQW55U3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBtYXRjaGVyOiBtYXRjaC5JTWF0Y2ggPSBuZXcgbWF0Y2guTWF0Y2hBbnlTdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBpc0FueU51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBsZXQgbWF0Y2hlcjogbWF0Y2guSU1hdGNoID0gbmV3IG1hdGNoLk1hdGNoQW55TnVtYmVyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiA8YW55Pm1hdGNoZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgaXM8VD4ocHJlZGljYXRlOiBJRnVuYzI8VCwgYm9vbGVhbj4pOiBUIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoZXI6IG1hdGNoLklNYXRjaCA9IG5ldyBtYXRjaC5NYXRjaFByZWQocHJlZGljYXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuIDxhbnk+bWF0Y2hlcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIm5hbWVzcGFjZSBUeXBlTW9xSW50ZXJuIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWV0aG9kQ2FsbDxULCBUUmVzdWx0PiBpbXBsZW1lbnRzIHByb3h5LklQcm94eUNhbGw8VD4sIGFwaS5JVmVyaWZpZXMge1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX2lkOiBzdHJpbmc7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9zZXR1cENhbGw6IHByb3h5LklDYWxsQ29udGV4dDtcclxuICAgICAgICBwcm90ZWN0ZWQgX3NldHVwQ2FsbGJhY2s6IElBY3Rpb247XHJcbiAgICAgICAgcHJvdGVjdGVkIF9pc1ZlcmlmaWFibGU6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9leHBlY3RlZENhbGxDb3VudDogVGltZXM7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9pc0ludm9rZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgcHJvdGVjdGVkIF9jYWxsQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICAgICAgcHJvdGVjdGVkIF90aHJvd25FeGNlcHRpb246IGVycm9yLkV4Y2VwdGlvbjtcclxuICAgICAgICBwcm90ZWN0ZWQgX2V2YWx1YXRlZFN1Y2Nlc3NmdWxseTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIG1vY2s6IE1vY2s8VD4sIHByaXZhdGUgX3NldHVwRXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lkID0gdGhpcy5nZW5lcmF0ZUlkKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW50ZXJjZXB0b3IgPSBuZXcgSW50ZXJjZXB0b3JTZXR1cCgpO1xyXG4gICAgICAgICAgICBsZXQgcHJveHkgPSBNb2NrLnByb3h5RmFjdG9yeS5jcmVhdGVQcm94eTxUPihpbnRlcmNlcHRvciwgbW9jay5pbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICBfc2V0dXBFeHByZXNzaW9uKHByb3h5KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbnRlcmNlcHRvci5pbnRlcmNlcHRlZENhbGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpYyA9IGludGVyY2VwdG9yLmludGVyY2VwdGVkQ2FsbDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV3QXJncyA9IHRoaXMudHJhbnNmb3JtVG9NYXRjaGVycyhpYy5hcmdzKTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdBcmdzLCBcImNhbGxlZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHsgY29uZmlndXJhYmxlOiBmYWxzZSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IGZhbHNlLCB2YWx1ZTogaWMuYXJncy5jYWxsZWUgfSk7XHJcbiAgICAgICAgICAgICAgICBpYy5hcmdzID0gPElBcmd1bWVudHM+PGFueT5uZXdBcmdzO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwQ2FsbCA9IGljO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IGVycm9yLk1vY2tFeGNlcHRpb24oZXJyb3IuTW9ja0V4Y2VwdGlvblJlYXNvbi5JbnZhbGlkU2V0dXBFeHByZXNzaW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NldHVwRXhwcmVzc2lvbiwgXCJJbnZhbGlkU2V0dXBFeHByZXNzaW9uIEV4Y2VwdGlvblwiLCBcIkludmFsaWQgc2V0dXAgZXhwcmVzc2lvblwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZW5lcmF0ZUlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNZXRob2RDYWxsPFwiICsgXy51bmlxdWVJZCgpICsgXCI+XCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHRyYW5zZm9ybVRvTWF0Y2hlcnMoYXJnczogSUFyZ3VtZW50cyk6IEFycmF5PG1hdGNoLklNYXRjaD4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3QXJnczogQXJyYXk8bWF0Y2guSU1hdGNoPiA9IFtdO1xyXG5cclxuICAgICAgICAgICAgXy5lYWNoKGFyZ3MsIGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfLmlzT2JqZWN0KGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0FyZyA9IG5ldyBtYXRjaC5NYXRjaFZhbHVlKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0FyZ3MucHVzaChuZXdBcmcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFfLmlzVW5kZWZpbmVkKGFbQ29uc3RzLklNQVRDSF9NQVRDSEVTX05BTUVdKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAhXy5pc1VuZGVmaW5lZChhW0NvbnN0cy5JTUFUQ0hfSURfTkFNRV0pICYmIGFbQ29uc3RzLklNQVRDSF9JRF9OQU1FXSA9PT0gQ29uc3RzLklNQVRDSF9JRF9WQUxVRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBcmdzLnB1c2goPG1hdGNoLklNYXRjaD5hKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBlcnJvci5Nb2NrRXhjZXB0aW9uKGVycm9yLk1vY2tFeGNlcHRpb25SZWFzb24uSW52YWxpZE1hdGNoZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhLCBcIkludmFsaWRNYXRjaGVyIEV4Y2VwdGlvblwiLCBcIkludmFsaWQgbWF0Y2ggb2JqZWN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3QXJncztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElQcm94eUNhbGxcclxuXHJcbiAgICAgICAgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9pZDsgfVxyXG4gICAgICAgIGdldCBzZXR1cEV4cHJlc3Npb24oKTogSUFjdGlvbjE8VD4geyByZXR1cm4gdGhpcy5fc2V0dXBFeHByZXNzaW9uOyB9XHJcbiAgICAgICAgZ2V0IHNldHVwQ2FsbCgpOiBwcm94eS5JQ2FsbENvbnRleHQgeyByZXR1cm4gdGhpcy5fc2V0dXBDYWxsOyB9XHJcbiAgICAgICAgZ2V0IGlzVmVyaWZpYWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzVmVyaWZpYWJsZTsgfVxyXG4gICAgICAgIGdldCBleHBlY3RlZENhbGxDb3VudCgpOiBUaW1lcyB7IHJldHVybiB0aGlzLl9leHBlY3RlZENhbGxDb3VudDsgfVxyXG4gICAgICAgIGdldCBpc0ludm9rZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc0ludm9rZWQ7IH1cclxuICAgICAgICBnZXQgY2FsbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jYWxsQ291bnQ7IH1cclxuXHJcbiAgICAgICAgZXZhbHVhdGVkU3VjY2Vzc2Z1bGx5KCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ldmFsdWF0ZWRTdWNjZXNzZnVsbHkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWF0Y2hlcyhjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsLnByb3BlcnR5ICYmIGNhbGwgJiYgY2FsbC5wcm9wZXJ0eSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsLnByb3BlcnR5Lm5hbWUgPT09IGNhbGwucHJvcGVydHkubmFtZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zZXR1cENhbGwuYXJncy5sZW5ndGggPT09IGNhbGwuYXJncy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfLmVhY2godGhpcy5zZXR1cENhbGwuYXJncywgKHgsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXR1cEFyZyA9IDxtYXRjaC5JTWF0Y2g+eDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhbGxBcmcgPSBjYWxsLmFyZ3NbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoICYmICFzZXR1cEFyZy5fX19tYXRjaGVzKGNhbGxBcmcpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBtYXRjaDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4ZWN1dGUoY2FsbDogcHJveHkuSUNhbGxDb250ZXh0KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzSW52b2tlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5fc2V0dXBDYWxsYmFjayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cENhbGxiYWNrLmFwcGx5KHRoaXMsIGNhbGwuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90aHJvd25FeGNlcHRpb24gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGhpcy5fdGhyb3duRXhjZXB0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYWxsQ291bnQrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElWZXJpZmllc1xyXG5cclxuICAgICAgICB2ZXJpZmlhYmxlKHRpbWVzOiBUaW1lcyA9IFRpbWVzLmF0TGVhc3RPbmNlKCkpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5faXNWZXJpZmlhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fZXhwZWN0ZWRDYWxsQ291bnQgPSB0aW1lcztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSAiLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4gZXh0ZW5kcyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+IGltcGxlbWVudHMgYXBpLklTZXR1cDxULCBUUmVzdWx0PiwgYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9yZXR1cm5WYWx1ZUZ1bmM6IElGdW5jTjxhbnksIFRSZXN1bHQ+O1xyXG4gICAgICAgIGhhc1JldHVyblZhbHVlOiBib29sZWFuO1xyXG4gICAgICAgIHByb3RlY3RlZCBfY2FsbEJhc2U6IGJvb2xlYW47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG1vY2s6IE1vY2s8VD4sIHNldHVwRXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG1vY2ssIHNldHVwRXhwcmVzc2lvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvdmVycmlkZXNcclxuXHJcbiAgICAgICAgZXhlY3V0ZShjYWxsOiBwcm94eS5JQ2FsbENvbnRleHQpOiB2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuZXhlY3V0ZShjYWxsKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jYWxsQmFzZSlcclxuICAgICAgICAgICAgICAgIGNhbGwuaW52b2tlQmFzZSgpO1xyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMuaGFzUmV0dXJuVmFsdWUpXHJcbiAgICAgICAgICAgICAgICBjYWxsLnJldHVyblZhbHVlID0gdGhpcy5fcmV0dXJuVmFsdWVGdW5jLmFwcGx5KHRoaXMsIGNhbGwuYXJncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJU2V0dXBcclxuXHJcbiAgICAgICAgY2FsbGJhY2soYWN0aW9uOiBJQWN0aW9uTjxhbnk+KTogYXBpLklSZXR1cm5zVGhyb3dzPFQsIFRSZXN1bHQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2V0dXBDYWxsYmFjayA9IGFjdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aHJvd3MoZXhjZXB0aW9uOiBFcnJvcik6IGFwaS5JVGhyb3dzUmVzdWx0IHtcclxuICAgICAgICAgICAgdGhpcy5fdGhyb3duRXhjZXB0aW9uID0gZXhjZXB0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybnModmFsdWVGdW5jOiBJRnVuY048YW55LCBUUmVzdWx0Pik6IGFwaS5JUmV0dXJuc1Jlc3VsdDxUPiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JldHVyblZhbHVlRnVuYyA9IHZhbHVlRnVuYztcclxuICAgICAgICAgICAgdGhpcy5oYXNSZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsbEJhc2UoKTogYXBpLklSZXR1cm5zUmVzdWx0PFQ+IHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbEJhc2UgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElSZXR1cm5zUmVzdWx0XHJcblxyXG4gICAgfVxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5uYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGVudW0gTW9ja0JlaGF2aW9yIHsgTG9vc2UsIFN0cmljdCB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1vY2s8VD4gaW1wbGVtZW50cyBJTW9jazxUPiB7XHJcblxyXG4gICAgICAgIHN0YXRpYyBwcm94eUZhY3Rvcnk6IHByb3h5LklQcm94eUZhY3RvcnkgPSBuZXcgVHlwZU1vcUludGVybi5Qcm94eS5Qcm94eUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfaWQ6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIF9uYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBfaW50ZXJjZXB0b3I6IEludGVyY2VwdG9yRXhlY3V0ZTxUPjtcclxuICAgICAgICBwcml2YXRlIF9wcm94eTogVDtcclxuICAgICAgICBwcml2YXRlIF9jYWxsQmFzZTogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHVibGljIGluc3RhbmNlOiBULCBwcml2YXRlIF9iZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pZCA9IHRoaXMuZ2VuZXJhdGVJZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gdGhpcy5nZXROYW1lT2YoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvciA9IG5ldyBJbnRlcmNlcHRvckV4ZWN1dGUodGhpcy5fYmVoYXZpb3IsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9wcm94eSA9IE1vY2sucHJveHlGYWN0b3J5LmNyZWF0ZVByb3h5PFQ+KHRoaXMuX2ludGVyY2VwdG9yLCBpbnN0YW5jZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgb2ZJbnN0YW5jZTxVPihpbnN0YW5jZTogVSwgYmVoYXZpb3IgPSBNb2NrQmVoYXZpb3IuTG9vc2UpOiBNb2NrPFU+IHtcclxuICAgICAgICAgICAgbGV0IG1vY2sgPSBuZXcgTW9jayhpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9jaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBvZlR5cGU8VT4oY3RvcjogQ3RvcldpdGhBcmdzPFU+LCBiZWhhdmlvciA9IE1vY2tCZWhhdmlvci5Mb29zZSwgLi4uY3RvckFyZ3M6IGFueVtdKTogTW9jazxVPiB7XHJcbiAgICAgICAgICAgIGxldCBtb2NrOiBNb2NrPFU+ID0gTW9jay5vZlR5cGUyKGN0b3IsIGN0b3JBcmdzLCBiZWhhdmlvcik7XHJcbiAgICAgICAgICAgIHJldHVybiBtb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9mVHlwZTI8VT4oY3RvcjogQ3RvcldpdGhBcmdzPFU+LCBjdG9yQXJnczogYW55W10sIGJlaGF2aW9yID0gTW9ja0JlaGF2aW9yLkxvb3NlKTogTW9jazxVPiB7XHJcbiAgICAgICAgICAgIGxldCBpbnN0YW5jZTogVSA9IFV0aWxzLmNvbnRodW5rdG9yKGN0b3IsIGN0b3JBcmdzKTtcclxuICAgICAgICAgICAgbGV0IG1vY2s6IE1vY2s8VT4gPSBuZXcgTW9jayhpbnN0YW5jZSwgYmVoYXZpb3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gbW9jaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBvYmplY3QoKSB7IHJldHVybiB0aGlzLl9wcm94eTsgfVxyXG5cclxuICAgICAgICBnZXQgbmFtZSgpIHsgcmV0dXJuIHRoaXMuX25hbWU7IH1cclxuICAgICAgICBnZXQgYmVoYXZpb3IoKSB7IHJldHVybiB0aGlzLl9iZWhhdmlvcjsgfVxyXG5cclxuICAgICAgICBnZXQgY2FsbEJhc2UoKSB7IHJldHVybiB0aGlzLl9jYWxsQmFzZTsgfVxyXG4gICAgICAgIHNldCBjYWxsQmFzZSh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLl9jYWxsQmFzZSA9IHZhbHVlOyB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgZ2VuZXJhdGVJZCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTW9jazxcIiArIF8udW5pcXVlSWQoKSArIFwiPlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBnZXROYW1lT2YoaW5zdGFuY2U6IFQpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmc7XHJcblxyXG4gICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gVXRpbHMuZnVuY3Rpb25OYW1lKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfLmlzT2JqZWN0KGluc3RhbmNlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN0b3IgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcjtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IFV0aWxzLmZ1bmN0aW9uTmFtZShjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3VsdClcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC50cmltKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2V0dXBcclxuXHJcbiAgICAgICAgc2V0dXA8VFJlc3VsdD4oZXhwcmVzc2lvbjogSUZ1bmMyPFQsIFRSZXN1bHQ+KTogTWV0aG9kQ2FsbFJldHVybjxULCBUUmVzdWx0PiB7XHJcbiAgICAgICAgICAgIGxldCBjYWxsID0gbmV3IE1ldGhvZENhbGxSZXR1cm48VCwgVFJlc3VsdD4odGhpcywgZXhwcmVzc2lvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLmFkZENhbGwoY2FsbCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyaWZ5XHJcblxyXG4gICAgICAgIHZlcmlmeTxUUmVzdWx0PihleHByZXNzaW9uOiBJRnVuYzI8VCwgVFJlc3VsdD4sIHRpbWVzOiBUaW1lcyk6IHZvaWQge1xyXG4gICAgICAgICAgICBsZXQgY2FsbCA9IG5ldyBNZXRob2RDYWxsPFQsIFRSZXN1bHQ+KHRoaXMsIGV4cHJlc3Npb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9pbnRlcmNlcHRvci5hZGRDYWxsKGNhbGwpO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJjZXB0b3IudmVyaWZ5Q2FsbChjYWxsLCB0aW1lcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZlcmlmeUFsbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVyY2VwdG9yLnZlcmlmeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2UgVHlwZU1vcUludGVybiB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFRpbWVzIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgTk9fTUFUQ0hJTkdfQ0FMTFNfRVhBQ1RMWV9OX1RJTUVTID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIDwlPSBuICU+IHRpbWVzLCBpbnZva2VkIDwlPSBtICU+IHRpbWVzXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTEVBU1RfT05DRSA9IFwiRXhwZWN0ZWQgaW52b2NhdGlvbiBvbiB0aGUgbW9jayBhdCBsZWFzdCBvbmNlXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTU9TVF9PTkNFID0gXCJFeHBlY3RlZCBpbnZvY2F0aW9uIG9uIHRoZSBtb2NrIGF0IG1vc3Qgb25jZVwiO1xyXG5cclxuICAgICAgICBwcml2YXRlIF9sYXN0Q2FsbENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfZmFpbE1lc3NhZ2U6ICguLi5kYXRhOiBhbnlbXSkgPT4gc3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb25kaXRpb246IElGdW5jMjxudW1iZXIsIGJvb2xlYW4+LFxyXG4gICAgICAgICAgICBwcml2YXRlIF9mcm9tOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHByaXZhdGUgX3RvOiBudW1iZXIsXHJcbiAgICAgICAgICAgIGZhaWxNZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fZmFpbE1lc3NhZ2UgPSBfLnRlbXBsYXRlKGZhaWxNZXNzYWdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBmYWlsTWVzc2FnZSgpIHsgcmV0dXJuIHRoaXMuX2ZhaWxNZXNzYWdlKHsgbjogdGhpcy5fZnJvbSwgbTogdGhpcy5fbGFzdENhbGxDb3VudCB9KTsgfVxyXG5cclxuICAgICAgICB2ZXJpZnkoY2FsbENvdW50OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdGhpcy5fbGFzdENhbGxDb3VudCA9IGNhbGxDb3VudDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbihjYWxsQ291bnQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGV4YWN0bHkobjogbnVtYmVyKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzKGMgPT4gYyA9PT0gbiwgbiwgbiwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfRVhBQ1RMWV9OX1RJTUVTKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBuZXZlcigpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBUaW1lcy5leGFjdGx5KDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIG9uY2UoKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gVGltZXMuZXhhY3RseSgxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBhdExlYXN0T25jZSgpOiBUaW1lcyB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVGltZXMoYyA9PiBjID49IDEsIDEsIE51bWJlci5NQVhfVkFMVUUsIFRpbWVzLk5PX01BVENISU5HX0NBTExTX0FUX0xFQVNUX09OQ0UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGF0TW9zdE9uY2UoKTogVGltZXMge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWVzKGMgPT4gYyA+PSAwICYmIGMgPD0gMSwgMCwgMSwgVGltZXMuTk9fTUFUQ0hJTkdfQ0FMTFNfQVRfTU9TVF9PTkNFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59ICIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9J19hbGwudHMnIC8+XHJcblxyXG5pbnRlcmZhY2UgSVR5cGVNb3Ege1xyXG4gICAgTW9jazogdHlwZW9mIFR5cGVNb3FJbnRlcm4uTW9jaztcclxuICAgIE1vY2tCZWhhdmlvcjogdHlwZW9mIFR5cGVNb3FJbnRlcm4uTW9ja0JlaGF2aW9yO1xyXG4gICAgSXQ6IHR5cGVvZiBUeXBlTW9xSW50ZXJuLkl0O1xyXG4gICAgVGltZXM6IHR5cGVvZiBUeXBlTW9xSW50ZXJuLlRpbWVzO1xyXG4gICAgR2xvYmFsTW9jazogdHlwZW9mIFR5cGVNb3FJbnRlcm4uR2xvYmFsTW9jaztcclxuICAgIEdsb2JhbFNjb3BlOiB0eXBlb2YgVHlwZU1vcUludGVybi5HbG9iYWxTY29wZTtcclxuICAgIE1vY2tFeGNlcHRpb246IHR5cGVvZiBUeXBlTW9xSW50ZXJuLkVycm9yLk1vY2tFeGNlcHRpb247XHJcbn1cclxuXHJcbm1vZHVsZSBUeXBlTW9xIHtcclxuICAgIGV4cG9ydCBpbXBvcnQgTW9jayA9IFR5cGVNb3FJbnRlcm4uTW9jaztcclxuICAgIGV4cG9ydCBpbXBvcnQgTW9ja0JlaGF2aW9yID0gVHlwZU1vcUludGVybi5Nb2NrQmVoYXZpb3I7XHJcbiAgICBleHBvcnQgaW1wb3J0IEl0ID0gVHlwZU1vcUludGVybi5JdDtcclxuICAgIGV4cG9ydCBpbXBvcnQgVGltZXMgPSBUeXBlTW9xSW50ZXJuLlRpbWVzO1xyXG4gICAgZXhwb3J0IGltcG9ydCBHbG9iYWxNb2NrID0gVHlwZU1vcUludGVybi5HbG9iYWxNb2NrO1xyXG4gICAgZXhwb3J0IGltcG9ydCBHbG9iYWxTY29wZSA9IFR5cGVNb3FJbnRlcm4uR2xvYmFsU2NvcGU7XHJcbiAgICBleHBvcnQgaW1wb3J0IE1vY2tFeGNlcHRpb24gPSBUeXBlTW9xSW50ZXJuLkVycm9yLk1vY2tFeGNlcHRpb247XHJcbn1cclxuXHJcbmRlY2xhcmUgbGV0IHR5cGVtb3E6IElUeXBlTW9xO1xyXG50eXBlbW9xID0gVHlwZU1vcTsiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPScuLi9ib3dlcl9jb21wb25lbnRzL0RlZmluaXRlbHlUeXBlZC9ub2RlL25vZGUuZC50cycgLz4gXHJcblxyXG5pZiAodHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHZhciBfOiBVbmRlcnNjb3JlU3RhdGljID0gcmVxdWlyZShcInVuZGVyc2NvcmVcIik7XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlbW9xO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0cy50eXBlbW9xID0gdHlwZW1vcTtcclxufSBlbHNlIHtcclxuICAgIHRoaXMudHlwZW1vcSA9IHR5cGVtb3E7XHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
