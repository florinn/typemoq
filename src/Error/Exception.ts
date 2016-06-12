namespace TypeMoqIntern.Error {
    export class Exception implements Error {
        constructor(public name?: string, public message?: string) {
            this.name = name;
        }

        toString(): string {
            return this.name;
        }
    }
}