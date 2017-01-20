import * as error from "../Error/_all";
import { IVerifies } from "./IVerifies";

export interface IThrows {
	throws<T extends error.Exception>(exception: T): IThrowsResult;
}

export interface IThrowsResult extends IVerifies {
}