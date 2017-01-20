import * as common from "../Common/_all";
import { MethodCallReturn } from "../MethodCallReturn";
import { MockBehavior } from "./MockBehavior";
import { Times } from "./Times"; 

export interface IMock<T> {
    readonly object: T;
    readonly name: string;
    readonly behavior: MockBehavior;
    callBase: boolean;
    setup<TResult>(expression: common.IFunc2<T, TResult>): MethodCallReturn<T, TResult>;
    verify<TResult>(expression: common.IFunc2<T, TResult>, times: Times): void;
    verifyAll(): void;
    reset(): void;
}