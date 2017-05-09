import * as common from "../Common/_all";
import * as api from "../Api/_all";
import { ICallContext } from "./ICallContext";

export interface IProxyCall<T> {
    id: string;
    setupExpression: common.IAction1<T>;
    setupCall: ICallContext;
    isVerifiable: boolean;
    isInSequence: boolean;
    expectedCallCount: api.Times;
    isInvoked: boolean;
    callCount: number;

    setVerifiable(
        times?: api.Times,
        expectedCallType?: api.ExpectedCallType): void;

    evaluatedSuccessfully(): void;

    matches(call: ICallContext): boolean;
    execute(call: ICallContext): void;
}
