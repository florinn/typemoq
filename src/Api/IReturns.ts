import * as common from "../Common/_all";
import { IVerifies } from "./IVerifies";
import { IThrows } from "./IThrows";

export interface IReturns<T, TResult> {
    returns(valueFunction: common.IFuncN<any, TResult>): IReturnsResult<T>;
    callBase(): IReturnsResult<T>;
}

export interface IReturnsResult<T> extends IVerifies {
}

export interface IReturnsThrows<T, TResult> extends IReturns<T, TResult>, IVerifies, IThrows {
}