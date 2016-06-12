namespace TypeMoqIntern {
    export interface IGlobalMock<T> extends IMock<T> {
        mock: Mock<T>;
        type: GlobalType;
        container: Object;
    }
} 