var TypeMoqIntern;!function(e){var t=function(){function e(){}return e.IMATCH_ID_VALUE="438A51D3-6864-49D7-A655-CA1153B86965",e.IMATCH_ID_NAME="___id",e.IMATCH_MATCHES_NAME="___matches",e}();e.Consts=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function e(){}return e}();e.CurrentInterceptContext=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){!function(e){e[e.Class=0]="Class",e[e.Function=1]="Function",e[e.Value=2]="Value"}(e.GlobalType||(e.GlobalType={}));var t=e.GlobalType,n=function(){function n(e,t,n,r){this.mock=e,this._name=t,this._type=n,this.container=r,this._name||(this._name=e.name)}return n.ofInstance=function(r,o,i,c){void 0===i&&(i=window),void 0===c&&(c=e.MockBehavior.Loose);var a=e.Mock.ofInstance(r,c),u=_.isFunction(r)?t.Function:t.Value;return new n(a,o,u,i)},n.ofType=function(r,o,i,c){void 0===i&&(i=window),void 0===c&&(c=e.MockBehavior.Loose);var a=new r,u=e.Mock.ofInstance(a,c);return new n(u,o,t.Class,i)},Object.defineProperty(n.prototype,"object",{get:function(){return this.mock.object},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"name",{get:function(){return this._name||this.mock.name},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"behavior",{get:function(){return this.mock.behavior},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"callBase",{get:function(){return this.mock.callBase},set:function(e){this.mock.callBase=e},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"type",{get:function(){return this._type},enumerable:!0,configurable:!0}),n.prototype.setup=function(e){return this.mock.setup(e)},n.prototype.verify=function(e,t){this.mock.verify(e,t)},n.prototype.verifyAll=function(){this.mock.verifyAll()},n}();e.GlobalMock=n}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function e(){}return e.getOwnEnumerables=function(e){return this._getPropertyNames(e,!0,!1,this._enumerable)},e.getOwnNonenumerables=function(e){return this._getPropertyNames(e,!0,!1,this._notEnumerable)},e.getOwnEnumerablesAndNonenumerables=function(e){return this._getPropertyNames(e,!0,!1,this._enumerableAndNotEnumerable)},e.getPrototypeEnumerables=function(e){return this._getPropertyNames(e,!1,!0,this._enumerable)},e.getPrototypeNonenumerables=function(e){return this._getPropertyNames(e,!1,!0,this._notEnumerable)},e.getPrototypeEnumerablesAndNonenumerables=function(e){return this._getPropertyNames(e,!1,!0,this._enumerableAndNotEnumerable)},e.getOwnAndPrototypeEnumerables=function(e){return this._getPropertyNames(e,!0,!0,this._enumerable)},e.getOwnAndPrototypeNonenumerables=function(e){return this._getPropertyNames(e,!0,!0,this._notEnumerable)},e.getOwnAndPrototypeEnumerablesAndNonenumerables=function(e){return this._getPropertyNames(e,!0,!0,this._enumerableAndNotEnumerable)},e._enumerable=function(e,t){return e.propertyIsEnumerable(t)},e._notEnumerable=function(e,t){return!e.propertyIsEnumerable(t)},e._enumerableAndNotEnumerable=function(e,t){return!0},e._getPropertyNames=function(e,t,n,r){var o=[];do{if(t){var i=Object.getOwnPropertyNames(e);_.forEach(i,function(t){var n=_.find(o,function(e){return e.name===t});if(!n&&r(e,t)){var i=Object.getOwnPropertyDescriptor(e,t);o.push({name:t,desc:i})}})}if(!n)break;t=!0}while(e=Object.getPrototypeOf(e));return o},e}();e.PropertyRetriever=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function e(){}return e.getUUID=function(){var e=(new Date).getTime(),t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?n:3&n|8).toString(16)});return t},e.functionName=function(e){var t;if(e.name)t=e.name;else{var n=e.toString();n=n.substr("function ".length),t=n.substr(0,n.indexOf("("))}return t},e.conthunktor=function(e,t){var n=new(e.bind.apply(e,[void 0].concat(t)));return n},e}();e.Utils=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t;!function(e){var t=function(){function e(e,t){this.name=e,this.message=t,this.name=e}return e.prototype.toString=function(){return this.name},e}();e.Exception=t}(t=e.Error||(e.Error={}))}(TypeMoqIntern||(TypeMoqIntern={}));var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},TypeMoqIntern;!function(e){var t;!function(e){!function(e){e[e.NoSetup=0]="NoSetup",e[e.MoreThanOneSetupExpression=1]="MoreThanOneSetupExpression",e[e.InvalidSetupExpression=2]="InvalidSetupExpression",e[e.InvalidMatcher=3]="InvalidMatcher",e[e.InvalidProxyArgument=4]="InvalidProxyArgument",e[e.UnknownGlobalType=5]="UnknownGlobalType",e[e.VerificationFailed=6]="VerificationFailed"}(e.MockExceptionReason||(e.MockExceptionReason={}));var t=(e.MockExceptionReason,function(e){function t(t,n,r,o){void 0===r&&(r="Mock Exception"),e.call(this,r,o),this.reason=t,this.ctx=n}return __extends(t,e),t}(e.Exception));e.MockException=t}(t=e.Error||(e.Error={}))}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t;!function(t){var n=function(){function t(t){this._ctor=t,this.___id=e.Consts.IMATCH_ID_VALUE}return t.prototype.___matches=function(e){var t=!1;return this._ctor.prototype===e.constructor.prototype&&(t=!0),t},t}();t.MatchAnyObject=n;var r=function(){function t(){this.___id=e.Consts.IMATCH_ID_VALUE}return t.prototype.___matches=function(e){var t=!1;return _.isUndefined(e)||(t=!0),t},t}();t.MatchAny=r;var o=function(){function t(){this.___id=e.Consts.IMATCH_ID_VALUE}return t.prototype.___matches=function(e){var t=!1;return _.isString(e)&&(t=!0),t},t}();t.MatchAnyString=o;var i=function(){function t(){this.___id=e.Consts.IMATCH_ID_VALUE}return t.prototype.___matches=function(e){var t=!1;return _.isNumber(e)&&(t=!0),t},t}();t.MatchAnyNumber=i}(t=e.Match||(e.Match={}))}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t;!function(t){var n=function(){function t(t){this._pred=t,this.___id=e.Consts.IMATCH_ID_VALUE}return t.prototype.___matches=function(e){var t=!1;return this._pred(e)&&(t=!0),t},t}();t.MatchPred=n}(t=e.Match||(e.Match={}))}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t;!function(t){var n=function(){function t(t){this._value=t,this.___id=e.Consts.IMATCH_ID_VALUE}return t.prototype.___matches=function(e){var t=!1;return _.isEqual(this._value,e)&&(t=!0),t},t}();t.MatchValue=n}(t=e.Match||(e.Match={}))}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t;!function(e){var t=function(){function e(e,t){this._property=e,this._args=t}return Object.defineProperty(e.prototype,"args",{get:function(){return this._args||{length:0,callee:null}},set:function(e){this._args=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"property",{get:function(){return this._property},enumerable:!0,configurable:!0}),e.prototype.invokeBase=function(){this.returnValue=this._property.toFunc.apply(this._property.obj,this._args)},e}();e.MethodInvocation=t;var n=function(){function e(e,t){this._property=e,this.returnValue=t}return Object.defineProperty(e.prototype,"args",{get:function(){var e=[];return Object.defineProperty(e,"callee",{configurable:!1,enumerable:!0,writable:!1,value:null}),e},set:function(e){},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"property",{get:function(){return this._property},enumerable:!0,configurable:!0}),e.prototype.invokeBase=function(){this.returnValue=this._property.obj[this._property.name]},e}();e.ValueGetterInvocation=n;var r=function(){function e(e,t){this._property=e,this._args=t}return Object.defineProperty(e.prototype,"args",{get:function(){return this._args},set:function(e){this._args=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"property",{get:function(){return this._property},enumerable:!0,configurable:!0}),e.prototype.invokeBase=function(){this._property.obj[this._property.name]=this._args[0],this.returnValue=this._property.obj[this._property.name]},e}();e.ValueSetterInvocation=r;var o=function(){function e(e,t){this._property=e,this._getter=t}return Object.defineProperty(e.prototype,"args",{get:function(){var e=[];return Object.defineProperty(e,"callee",{configurable:!1,enumerable:!0,writable:!1,value:null}),e},set:function(e){},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"property",{get:function(){return this._property},enumerable:!0,configurable:!0}),e.prototype.invokeBase=function(){this.returnValue=this._property.obj[this._property.name]},e}();e.MethodGetterInvocation=o;var i=function(){function e(e,t,n){this._property=e,this._setter=t,this._args=n}return Object.defineProperty(e.prototype,"args",{get:function(){return this._args},set:function(e){this._args=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"property",{get:function(){return this._property},enumerable:!0,configurable:!0}),e.prototype.invokeBase=function(){this._property.obj[this._property.name]=this._args[0],this.returnValue=this._property.obj[this._property.name]},e}();e.MethodSetterInvocation=i;var c=function(){function e(e,t){this.obj=e,this.name=t}return Object.defineProperty(e.prototype,"toFunc",{get:function(){var e;return e=_.isFunction(this.obj)?this.obj:this.obj[this.name]},enumerable:!0,configurable:!0}),e}();e.MethodInfo=c;var a=function(){function e(e,t){this.obj=e,this.name=t}return e}();e.PropertyInfo=a}(t=e.Proxy||(e.Proxy={}))}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t;!function(t){var n=function(){function n(t,n){var r=this;this.check(n);var o=this,i=e.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(n);_.each(i,function(e){if(_.isFunction(e.desc.value)){var i={configurable:e.desc.configurable,enumerable:e.desc.enumerable,writable:e.desc.writable};r.defineMethodProxy(o,t,n,e.name,i)}else{var i={configurable:e.desc.configurable,enumerable:e.desc.enumerable};void 0!==e.desc.value?r.defineValuePropertyProxy(o,t,n,e.name,e.desc.value,i):r.defineGetSetPropertyProxy(o,t,n,e.name,e.desc.get,e.desc.set,i)}})}return n.of=function(t,r){n.check(t);var o;if(_.isFunction(t)){var i=e.Utils.functionName(t);o=n.methodProxyValue(r,t,i)}else o=new n(r,t);return o},n.check=function(e){n.checkNotNull(e);var t=!1;if((_.isFunction(e)||_.isObject(e)&&!n.isPrimitiveObject(e))&&(t=!0),!t)throw new error.MockException(error.MockExceptionReason.InvalidProxyArgument,e,"InvalidProxyArgument Exception","Argument should be a function or a non primitive object")},n.prototype.check=function(e){n.checkNotNull(e);var t=!1;if(_.isFunction(e)||!_.isObject(e)||n.isPrimitiveObject(e)||(t=!0),!t)throw new error.MockException(error.MockExceptionReason.InvalidProxyArgument,e,"InvalidProxyArgument Exception","Argument should be a non primitive object")},n.checkNotNull=function(e){if(_.isNull(e))throw new error.MockException(error.MockExceptionReason.InvalidProxyArgument,e,"InvalidProxyArgument Exception","Argument cannot be null")},n.isPrimitiveObject=function(e){var t=!1;return(_.isFunction(e)||_.isArray(e)||_.isDate(e)||_.isNull(e))&&(t=!0),t},n.prototype.defineMethodProxy=function(e,t,r,o,i){void 0===i&&(i={configurable:!1,enumerable:!0,writable:!1}),i.value=n.methodProxyValue(t,r,o),this.defineProperty(e,o,i)},n.methodProxyValue=function(e,n,r){function o(){var o=new t.MethodInfo(n,r),i=new t.MethodInvocation(o,arguments);return e.intercept(i),i.returnValue}return o},n.prototype.defineValuePropertyProxy=function(e,n,r,o,i,c){function a(){var e=new t.PropertyInfo(r,o),c=new t.ValueGetterInvocation(e,i);return n.intercept(c),c.returnValue}function u(e){var i=new t.PropertyInfo(r,o),c=new t.ValueSetterInvocation(i,arguments);n.intercept(c)}void 0===c&&(c={configurable:!1,enumerable:!0}),c.get=a,c.set=u,this.defineProperty(e,o,c)},n.prototype.defineGetSetPropertyProxy=function(e,n,r,o,i,c,a){function u(){var e=new t.PropertyInfo(r,o),c=new t.MethodGetterInvocation(e,i);return n.intercept(c),c.returnValue}function p(e){var i=new t.PropertyInfo(r,o),a=new t.MethodSetterInvocation(i,c,arguments);n.intercept(a)}void 0===a&&(a={configurable:!1,enumerable:!0}),a.get=u,a.set=p,this.defineProperty(e,o,a)},n.prototype.defineProperty=function(e,t,n){try{Object.defineProperty(e,t,n)}catch(r){console.log(r.message)}},n}();t.Proxy=n}(t=e.Proxy||(e.Proxy={}))}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t;!function(e){var t=function(){function t(){}return t.prototype.createProxy=function(t,n){var r=e.Proxy.of(n,t);return r},t}();e.ProxyFactory=t}(t=e.Proxy||(e.Proxy={}))}(TypeMoqIntern||(TypeMoqIntern={}));var error=TypeMoqIntern.Error,match=TypeMoqIntern.Match,proxy=TypeMoqIntern.Proxy,TypeMoqIntern;!function(e){var t=function(){function t(e){this._args=e}return t.using=function(){for(var e=[],n=0;n<arguments.length;n++)e[n-0]=arguments[n];var r=new t(e);return r},t.prototype["with"]=function(t){var n={};try{_.each(this._args,function(t){if(!_.isUndefined(t.container.hasOwnProperty(t.name))){var r=e.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(t.container),o=_.find(r,function(e){return e.name===t.name});n[t.name]=o.desc;var i={};switch(t.type){case e.GlobalType.Class:i.value=function(){return t.mock.object};break;case e.GlobalType.Function:i.value=t.mock.object;break;case e.GlobalType.Value:i.get=function(){return t.mock.object};break;default:throw new error.MockException(error.MockExceptionReason.UnknownGlobalType,t,"UnknownGlobalType Exception","unknown global type: "+t.type)}try{Object.defineProperty(t.container,t.name,i)}catch(c){console.log("1: "+c)}}}),t.apply(this,this._args)}finally{_.each(this._args,function(t){if(!_.isUndefined(t.mock.instance)){var r=n[t.name];if(r){switch(t.type){case e.GlobalType.Class:break;case e.GlobalType.Function:break;case e.GlobalType.Value:r.configurable=!0}try{Object.defineProperty(t.container,t.name,r)}catch(o){console.log("2: "+o)}}}})}},t}();e.GlobalScope=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){!function(e){e[e.Continue=0]="Continue",e[e.Stop=1]="Stop"}(e.InterceptionAction||(e.InterceptionAction={}));var t=(e.InterceptionAction,function(){function e(e,t){this.behavior=e,this.mock=t,this._actualInvocations=[],this._orderedCalls=[]}return e.prototype.addInvocation=function(e){this._actualInvocations.push(e)},e.prototype.actualInvocations=function(){return this._actualInvocations},e.prototype.clearInvocations=function(){this._actualInvocations=[]},e.prototype.addOrderedCall=function(e){this._orderedCalls.push(e)},e.prototype.removeOrderedCall=function(e){_.filter(this._orderedCalls,function(t){return t.id!==e.id})},e.prototype.orderedCalls=function(){return this._orderedCalls},e}());e.InterceptorContext=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function t(t,n){this._interceptorContext=new e.InterceptorContext(t,n)}return Object.defineProperty(t.prototype,"interceptorContext",{get:function(){return this._interceptorContext},enumerable:!0,configurable:!0}),t.prototype.intercept=function(t){var n=this,r=new e.CurrentInterceptContext;_.some(this.interceptionStrategies(),function(o){return e.InterceptionAction.Stop===o.handleIntercept(t,n.interceptorContext,r)?!0:void 0})},t.prototype.addCall=function(e){this._interceptorContext.addOrderedCall(e)},t.prototype.verifyCall=function(e,t){var n=this._interceptorContext.actualInvocations(),r=_.filter(n,function(t){return e.matches(t)}).length;t.verify(r)||this.throwVerifyCallException(e.setupCall,t)},t.prototype.verify=function(){var e=this,t=this._interceptorContext.orderedCalls(),n=_.filter(t,function(e){return e.isVerifiable});_.forEach(n,function(t){e.verifyCall(t,t.expectedCallCount)})},t.prototype.interceptionStrategies=function(){var t=[new e.AddActualInvocation,new e.ExtractProxyCall,new e.ExecuteCall,new e.InvokeBase,new e.HandleMockRecursion];return t},t.prototype.throwVerifyCallException=function(e,t){var n=new error.MockException(error.MockExceptionReason.VerificationFailed,e,"VerifyCall Exception",t.failMessage);throw n},t}();e.InterceptorExecute=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function e(){}return Object.defineProperty(e.prototype,"interceptedCall",{get:function(){return this._interceptedCall},enumerable:!0,configurable:!0}),e.prototype.intercept=function(e){if(this._interceptedCall)throw new error.MockException(error.MockExceptionReason.MoreThanOneSetupExpression,e,"MoreThanOneSetupExpression Exception","Setup should contain only one expression");this._interceptedCall=e},e}();e.InterceptorSetup=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function t(){}return t.prototype.handleIntercept=function(t,n,r){return n.addInvocation(t),e.InterceptionAction.Continue},t}();e.AddActualInvocation=t;var n=function(){function t(){}return t.prototype.handleIntercept=function(t,n,r){var o=n.orderedCalls().slice(),i=function(e){return e.matches(t)},c=_.filter(o,function(e){return i(e)});if(c.length>1&&(i=function(e){return!e.isInvoked&&e.matches(t)}),r.call=_.find(o,function(e){return i(e)}),null!=r.call)r.call.evaluatedSuccessfully();else if(n.behavior==e.MockBehavior.Strict)throw new error.MockException(error.MockExceptionReason.NoSetup,t);return e.InterceptionAction.Continue},t}();e.ExtractProxyCall=n;var r=function(){function t(){}return t.prototype.handleIntercept=function(t,n,r){this._ctx=n;var o=r.call;return null!=o?(o.execute(t),e.InterceptionAction.Stop):e.InterceptionAction.Continue},t}();e.ExecuteCall=r;var o=function(){function t(){}return t.prototype.handleIntercept=function(t,n,r){return n.mock.callBase?(t.invokeBase(),e.InterceptionAction.Stop):e.InterceptionAction.Continue},t}();e.InvokeBase=o;var i=function(){function t(){}return t.prototype.handleIntercept=function(t,n,r){return e.InterceptionAction.Continue},t}();e.HandleMockRecursion=i}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function e(){}return e.isValue=function(e){var t=new match.MatchValue(e);return t},e.isAnyObject=function(e){var t=new match.MatchAnyObject(e);return t},e.isAny=function(){var e=new match.MatchAny;return e},e.isAnyString=function(){var e=new match.MatchAnyString;return e},e.isAnyNumber=function(){var e=new match.MatchAnyNumber;return e},e.is=function(e){var t=new match.MatchPred(e);return t},e}();e.It=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function t(t,n){this.mock=t,this._setupExpression=n,this._callCount=0,this._id=this.generateId();var r=new e.InterceptorSetup,o=e.Mock.proxyFactory.createProxy(r,t.instance);if(n(o),!r.interceptedCall)throw new error.MockException(error.MockExceptionReason.InvalidSetupExpression,this._setupExpression,"InvalidSetupExpression Exception","Invalid setup expression");var i=r.interceptedCall,c=this.transformToMatchers(i.args);Object.defineProperty(c,"callee",{configurable:!1,enumerable:!0,writable:!1,value:i.args.callee}),i.args=c,this._setupCall=i}return t.prototype.generateId=function(){return"MethodCall<"+_.uniqueId()+">"},t.prototype.transformToMatchers=function(t){var n=[];return _.each(t,function(t){if(_.isObject(t)){if(_.isUndefined(t[e.Consts.IMATCH_MATCHES_NAME])||_.isUndefined(t[e.Consts.IMATCH_ID_NAME])||t[e.Consts.IMATCH_ID_NAME]!==e.Consts.IMATCH_ID_VALUE)throw new error.MockException(error.MockExceptionReason.InvalidMatcher,t,"InvalidMatcher Exception","Invalid match object");n.push(t)}else{var r=new match.MatchValue(t);n.push(r)}}),n},Object.defineProperty(t.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"setupExpression",{get:function(){return this._setupExpression},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"setupCall",{get:function(){return this._setupCall},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isVerifiable",{get:function(){return this._isVerifiable},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"expectedCallCount",{get:function(){return this._expectedCallCount},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isInvoked",{get:function(){return this._isInvoked},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"callCount",{get:function(){return this._callCount},enumerable:!0,configurable:!0}),t.prototype.evaluatedSuccessfully=function(){this._evaluatedSuccessfully=!0},t.prototype.matches=function(e){var t=!1;return this._setupCall.property&&e&&e.property&&this._setupCall.property.name===e.property.name&&this._setupCall.args.length===e.args.length&&(t=!0,_.each(this.setupCall.args,function(n,r){var o=n,i=e.args[r];t&&!o.___matches(i)&&(t=!1)})),t},t.prototype.execute=function(e){if(this._isInvoked=!0,null!=this._setupCallback&&this._setupCallback.apply(this,e.args),null!=this._thrownException)throw this._thrownException;this._callCount++},t.prototype.verifiable=function(t){void 0===t&&(t=e.Times.atLeastOnce()),this._isVerifiable=!0,this._expectedCallCount=t},t}();e.MethodCall=t}(TypeMoqIntern||(TypeMoqIntern={}));var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},TypeMoqIntern;!function(e){var t=function(e){function t(t,n){e.call(this,t,n)}return __extends(t,e),t.prototype.execute=function(t){e.prototype.execute.call(this,t),this._callBase?t.invokeBase():this.hasReturnValue&&(t.returnValue=this._returnValueFunc.apply(this,t.args))},t.prototype.callback=function(e){return this._setupCallback=e,this},t.prototype["throws"]=function(e){return this._thrownException=e,this},t.prototype.returns=function(e){return this._returnValueFunc=e,this.hasReturnValue=!0,this},t.prototype.callBase=function(){return this._callBase=!0,this},t}(e.MethodCall);e.MethodCallReturn=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){!function(e){e[e.Loose=0]="Loose",e[e.Strict=1]="Strict"}(e.MockBehavior||(e.MockBehavior={}));var t=e.MockBehavior,n=function(){function n(r,o){void 0===o&&(o=t.Loose),this.instance=r,this._behavior=o,this._id=this.generateId(),this._name=this.getNameOf(r),this._interceptor=new e.InterceptorExecute(this._behavior,this),this._proxy=n.proxyFactory.createProxy(this._interceptor,r)}return n.ofInstance=function(e,r){void 0===r&&(r=t.Loose);var o=new n(e,r);return o},n.ofType=function(e,r){void 0===r&&(r=t.Loose);for(var o=[],i=2;i<arguments.length;i++)o[i-2]=arguments[i];var c=n.ofType2(e,o,r);return c},n.ofType2=function(r,o,i){void 0===i&&(i=t.Loose);var c=e.Utils.conthunktor(r,o),a=new n(c,i);return a},Object.defineProperty(n.prototype,"object",{get:function(){return this._proxy},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"name",{get:function(){return this._name},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"behavior",{get:function(){return this._behavior},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"callBase",{get:function(){return this._callBase},set:function(e){this._callBase=e},enumerable:!0,configurable:!0}),n.prototype.generateId=function(){return"Mock<"+_.uniqueId()+">"},n.prototype.getNameOf=function(t){var n;if(_.isFunction(t))n=e.Utils.functionName(t);else if(_.isObject(t)){var r=t.constructor;n=e.Utils.functionName(r)}return n&&(n=n.trim()),n},n.prototype.setup=function(t){var n=new e.MethodCallReturn(this,t);return this._interceptor.addCall(n),n},n.prototype.verify=function(t,n){var r=new e.MethodCall(this,t);this._interceptor.addCall(r);try{this._interceptor.verifyCall(r,n)}catch(o){throw o}},n.prototype.verifyAll=function(){try{this._interceptor.verify()}catch(e){throw e}},n.proxyFactory=new e.Proxy.ProxyFactory,n}();e.Mock=n}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoqIntern;!function(e){var t=function(){function e(e,t,n,r){this._condition=e,this._from=t,this._to=n,this._failMessage=_.template(r)}return Object.defineProperty(e.prototype,"failMessage",{get:function(){return this._failMessage({n:this._from,m:this._lastCallCount})},enumerable:!0,configurable:!0}),e.prototype.verify=function(e){return this._lastCallCount=e,this._condition(e)},e.exactly=function(t){return new e(function(e){return e===t},t,t,e.NO_MATCHING_CALLS_EXACTLY_N_TIMES)},e.never=function(){return e.exactly(0)},e.once=function(){return e.exactly(1)},e.atLeastOnce=function(){return new e(function(e){return e>=1},1,Number.MAX_VALUE,e.NO_MATCHING_CALLS_AT_LEAST_ONCE)},e.atMostOnce=function(){return new e(function(e){return e>=0&&1>=e},0,1,e.NO_MATCHING_CALLS_AT_MOST_ONCE)},e.NO_MATCHING_CALLS_EXACTLY_N_TIMES="Expected invocation on the mock <%= n %> times, invoked <%= m %> times",e.NO_MATCHING_CALLS_AT_LEAST_ONCE="Expected invocation on the mock at least once",e.NO_MATCHING_CALLS_AT_MOST_ONCE="Expected invocation on the mock at most once",e}();e.Times=t}(TypeMoqIntern||(TypeMoqIntern={}));var TypeMoq;if(function(e){e.Mock=TypeMoqIntern.Mock,e.MockBehavior=TypeMoqIntern.MockBehavior,e.It=TypeMoqIntern.It,e.Times=TypeMoqIntern.Times,e.GlobalMock=TypeMoqIntern.GlobalMock,e.GlobalScope=TypeMoqIntern.GlobalScope,e.MockException=TypeMoqIntern.Error.MockException}(TypeMoq||(TypeMoq={})),typemoq=TypeMoq,"undefined"!=typeof require)var _=require("underscore");"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=typemoq),exports.typemoq=typemoq):this.typemoq=typemoq;