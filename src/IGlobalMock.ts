module TypeMoq {
    export interface IGlobalMock<T> extends IMock<T> {
        mock: Mock<T>;
        container: Object;
    }
} 