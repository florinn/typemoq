import * as common from "../Common/_all";
import { ICallContext } from "./ICallContext";
import { Times } from "../Times";

export enum ExpectedCallType { InAnyOrder, InSequence }

export interface IProxyCall<T> {
    id: string;
    setupExpression: common.IAction1<T>;
    setupCall: ICallContext;
    isVerifiable: boolean;
    isInSequence: boolean;
    expectedCallCount: Times;
    isInvoked: boolean;
    callCount: number;
    evaluatedSuccessfully(): void;

    matches(call: ICallContext): boolean;
    execute(call: ICallContext): void;
}