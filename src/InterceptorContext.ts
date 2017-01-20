import * as _ from "lodash";
import * as all from "./_all";
import { CurrentInterceptContext } from "./CurrentInterceptContext";

export enum InterceptionAction { Continue, Stop }

export interface IInterceptStrategy<T> {
	handleIntercept(invocation: all.ICallContext, ctx: InterceptorContext<T>, localCtx: CurrentInterceptContext<T>): InterceptionAction;
}

export class InterceptorContext<T> {
	private _actualInvocations: Array<all.ICallContext> = [];
	private _expectedCalls: Array<all.IProxyCall<T>> = [];

	constructor(public mock: all.IMock<T>) { }

	get behavior(): all.MockBehavior { return this.mock.behavior; } 

	addInvocation(invocation: all.ICallContext) { this._actualInvocations.push(invocation); }
	removeInvocation(invocation: all.ICallContext) {
		_.remove(this._actualInvocations, (x: all.ICallContext): boolean => {
			return x === invocation;
		});
	}
	actualInvocations(): all.ICallContext[] { return this._actualInvocations; }
	private clearInvocations() { this._actualInvocations.splice(0, this._actualInvocations.length); }

	addExpectedCall(call: all.IProxyCall<T>) { this._expectedCalls.push(call); }
	removeExpectedCall(call: all.IProxyCall<T>) {
		_.filter(this._expectedCalls, (x: all.IProxyCall<T>): boolean => {
			return x.id !== call.id;
		});
	}
	expectedCalls(): all.IProxyCall<T>[] { return this._expectedCalls; }
	private clearExpectedCalls() { this._expectedCalls.splice(0, this._expectedCalls.length); }
	
	reset(): void {
		this.clearInvocations();
		this.clearExpectedCalls();
	}
}