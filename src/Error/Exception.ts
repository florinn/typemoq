module TypeMoq.Error {
    export class Exception implements Error {
        constructor(public name?: string, public message?: string) {
        }

        toString(): string {
            return name;
        }
    }
}