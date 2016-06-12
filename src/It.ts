/// <reference path='_all.ts' />

namespace TypeMoqIntern {

    export class It {
        
        static isValue<T>(x: T): T {
            var matcher: match.IMatch = new match.MatchValue(x);
            return <any>matcher;
        }

        static isAnyObject<T>(x: Ctor<T>): T {
            var matcher: match.IMatch = new match.MatchAnyObject(x);
            return <any>matcher;
        }

        static isAny(): any {
            var matcher: match.IMatch = new match.MatchAny();
            return <any>matcher;
        }

        static isAnyString(): string {
            var matcher: match.IMatch = new match.MatchAnyString();
            return <any>matcher;
        }

        static isAnyNumber(): number {
            var matcher: match.IMatch = new match.MatchAnyNumber();
            return <any>matcher;
        }
    }

} 