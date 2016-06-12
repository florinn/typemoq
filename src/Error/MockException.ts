namespace TypeMoqIntern.Error {
    export enum MockExceptionReason {
        NoSetup,
        MoreThanOneSetupExpression,
        InvalidSetupExpression,
        InvalidMatcher,
        InvalidProxyArgument,
        UnknownGlobalType,
        VerificationFailed,
        MoreThanOneCall,
        MoreThanNCalls
    }
    export class MockException extends Exception {
        constructor(
            public reason: MockExceptionReason,
            public ctx: any,
            name: string = 'Mock Exception',
            message?: string) {
            super(name, message);
        }
    }
}