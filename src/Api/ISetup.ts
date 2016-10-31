import { ICallback } from "./ICallback";
import { IReturnsThrows } from "./IReturns";
import { IVerifies } from "./IVerifies";

export interface ISetup<T, TResult> extends ICallback<T, TResult>, IReturnsThrows<T, TResult>, IVerifies { }