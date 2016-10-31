import * as all from "./_all";

export class It {

    static isValue<T>(x: T): T {
        let matcher: all.IMatch = new all.MatchValue(x);
        return <any>matcher;
    }

    static isAnyObject<T>(x: all.Ctor<T>): T {
        let matcher: all.IMatch = new all.MatchAnyObject(x);
        return <any>matcher;
    }

    static isAny(): any {
        let matcher: all.IMatch = new all.MatchAny();
        return <any>matcher;
    }

    static isAnyString(): string {
        let matcher: all.IMatch = new all.MatchAnyString();
        return <any>matcher;
    }

    static isAnyNumber(): number {
        let matcher: all.IMatch = new all.MatchAnyNumber();
        return <any>matcher;
    }

    static is<T>(predicate: all.IFunc2<T, boolean>): T {
        let matcher: all.IMatch = new all.MatchPred(predicate);
        return <any>matcher;
    }
}