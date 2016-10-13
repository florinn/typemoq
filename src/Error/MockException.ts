namespace TypeMoqIntern.Error {

    export enum MockExceptionReason {
        NoSetup = <any>"no setup expression",
        MoreThanOneSetup = <any>"more than one setup expression",
        InvalidSetup = <any>"invalid setup expression",
        InvalidMatcher = <any>"invalid matching expression",
        InvalidProxyArg = <any>"invalid proxy argument",
        UnknownGlobalType = <any>"unknown global type",
        VerificationFailed = <any>"verification failed"
    }

    export class MockException extends Exception {
        constructor(
            public reason: MockExceptionReason,
            public ctx: any,
            name: string = 'Mock Exception',
            message: string = '') {
            super(name, message);
        }

        toString(): string {
            let errMsg = `${super.toString()} - ${this.reason}`;
            return errMsg;
        }
    }

}