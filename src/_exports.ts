/// <reference path='_all.ts' />

interface ITypeMoqStatic {
    Mock: typeof TypeMoq.Mock;
    MockBehavior: typeof TypeMoq.MockBehavior;
    It: typeof TypeMoq.It;
    Times: typeof TypeMoq.Times;
    GlobalMock: typeof TypeMoq.GlobalMock;
    GlobalScope: typeof TypeMoq.GlobalScope;
}

module TypeMoqStatic {
    export import Mock = TypeMoq.Mock;
    export import MockBehavior = TypeMoq.MockBehavior;
    export import It = TypeMoq.It;
    export import Times = TypeMoq.Times;
    export import GlobalMock = TypeMoq.GlobalMock;
    export import GlobalScope = TypeMoq.GlobalScope;
}

declare var typemoq: ITypeMoqStatic;
typemoq = TypeMoqStatic;