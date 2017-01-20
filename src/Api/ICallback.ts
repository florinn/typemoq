import * as common from "../Common/_all";
import { IReturnsThrows } from "./IReturns";

export interface ICallback<T, TResult> {
    callback(action: common.IAction): IReturnsThrows<T, TResult>;
    callback(action: common.IAction1<T>): IReturnsThrows<T, TResult>;
}  