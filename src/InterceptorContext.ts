/// <reference path='_all.ts' />

namespace TypeMoqIntern {

	export enum InterceptionAction { Continue, Stop }

	export interface IInterceptStrategy<T> {
		handleIntercept(invocation: proxy.ICallContext,	ctx: InterceptorContext<T>,	localCtx: CurrentInterceptContext<T>): InterceptionAction;
	}

	export class InterceptorContext<T> {
		private _actualInvocations: Array<proxy.ICallContext> = [];
		private _orderedCalls: Array<proxy.IProxyCall<T>> = [];

		constructor(public behavior: MockBehavior, public mock: IMock<T>) { }

		addInvocation(invocation: proxy.ICallContext) { this._actualInvocations.push(invocation); }
		actualInvocations() { return this._actualInvocations; }
		clearInvocations() { this._actualInvocations = []; }

		addOrderedCall(call: proxy.IProxyCall<T>) { this._orderedCalls.push(call); }
		removeOrderedCall(call: proxy.IProxyCall<T>) {
			_.filter(this._orderedCalls, (x: proxy.IProxyCall<T>) => {
				return x.id !== call.id;
			});
		}
		orderedCalls() { return this._orderedCalls; }
	}

}