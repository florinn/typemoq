namespace TypeMoqIntern {
    export interface IGlobalMock<T> extends IMock<T> {
        readonly mock: Mock<T>;
        readonly type: GlobalType;
        readonly container: Object;
    }
}