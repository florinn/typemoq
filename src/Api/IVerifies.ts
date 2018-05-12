import { Times } from "./Times";
import { ExpectedCallType } from "./ExpectedCallType";

export interface IVerifies {
    verifiable(times?: Times, expectedCallType?: ExpectedCallType): void;
}
