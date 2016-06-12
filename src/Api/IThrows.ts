namespace TypeMoqIntern.Api {
	export interface IThrows {
        throws<T extends error.Exception>(exception: T): IThrowsResult;
	}
	export interface IThrowsResult extends IVerifies {
	}
} 