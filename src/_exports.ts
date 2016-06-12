/// <reference path='_all.ts' />

interface ITypeMoq {
    Mock: typeof TypeMoqIntern.Mock;
    MockBehavior: typeof TypeMoqIntern.MockBehavior;
    It: typeof TypeMoqIntern.It;
    Times: typeof TypeMoqIntern.Times;
    GlobalMock: typeof TypeMoqIntern.GlobalMock;
    GlobalScope: typeof TypeMoqIntern.GlobalScope;
    MockException: typeof TypeMoqIntern.Error.MockException;
}

module TypeMoq {
    export import Mock = TypeMoqIntern.Mock;
    export import MockBehavior = TypeMoqIntern.MockBehavior;
    export import It = TypeMoqIntern.It;
    export import Times = TypeMoqIntern.Times;
    export import GlobalMock = TypeMoqIntern.GlobalMock;
    export import GlobalScope = TypeMoqIntern.GlobalScope;
    export import MockException = TypeMoqIntern.Error.MockException;
}

declare var typemoq: ITypeMoq;
typemoq = TypeMoq;