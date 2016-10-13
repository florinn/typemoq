type GlobalError = Error;
const GlobalError: new (message?: string) => GlobalError = Error;

namespace TypeMoqIntern.Error {

    export class Exception extends GlobalError {
        constructor(public name: string, public message: string) {
            super(message);
        }

        toString(): string {
            let errMsg = this.message ? `${this.name} - ${this.message}` : this.name;
            return errMsg;
        }
    }

}