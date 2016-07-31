namespace TypeMoqIntern.Error {

    export class Exception implements Error {
        constructor(public name: string, public message?: string) {
        }

        toString(): string {
            let errMsg = this.message ? `${this.name} - ${this.message}` : this.name;
            return errMsg;
        }
    }

}