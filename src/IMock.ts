import * as all from "./_all";
import { MockBehavior } from "./Mock";
import { MethodCallReturn } from "./MethodCallReturn";
import { Times } from "./Times";

export interface IMock<T> {
    readonly object: T;
    readonly name: string;
    readonly behavior: MockBehavior;
    callBase: boolean;
    setup<TResult>(expression: all.IFunc2<T, TResult>): MethodCallReturn<T, TResult>;
    verify<TResult>(expression: all.IFunc2<T, TResult>, times: Times): void;
    verifyAll(): void;
    reset(): void;
}