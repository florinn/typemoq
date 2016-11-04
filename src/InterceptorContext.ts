import * as _ from "lodash";
import * as all from "./_all";
import { CurrentInterceptContext } from "./CurrentInterceptContext";
import { IMock } from "./IMock";
import { MockBehavior } from "./Mock";

export enum InterceptionAction { Continue, Stop }

export interface IInterceptStrategy<T> {
	handleIntercept(invocation: all.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
}

export class InterceptorContext<T> {
	private _actualInvocations: Array<all.ICallContext> = [];
	private _orderedCalls: Array<all.IProxyCall<T>> = [];

	constructor(public behavior: MockBehavior, public mock: IMock<T>) { }

	addInvocation(invocation: all.ICallContext) { this._actualInvocations.push(invocation); }
	actualInvocations(): all.ICallContext[] { return this._actualInvocations; }
	private clearInvocations() { this._actualInvocations.splice(0, this._actualInvocations.length); }

	addOrderedCall(call: all.IProxyCall<T>) { this._orderedCalls.push(call); }
	removeOrderedCall(call: all.IProxyCall<T>) {
		_.filter(this._orderedCalls, (x: all.IProxyCall<T>) => {
			return x.id !== call.id;
		});
	}
	orderedCalls(): all.IProxyCall<T>[] { return this._orderedCalls; }
	private clearOrderedCalls() { this._orderedCalls.splice(0, this._orderedCalls.length); }
	
	reset(): void {
		this.clearInvocations();
		this.clearOrderedCalls();
	}
}