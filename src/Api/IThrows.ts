import { IVerifies } from "./IVerifies";

export interface IThrows {
	throws<T extends Error>(exception: T): IThrowsResult;
}

export interface IThrowsResult extends IVerifies {
}
