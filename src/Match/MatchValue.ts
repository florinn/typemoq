/// <reference path='_all.ts' />

namespace TypeMoqIntern.Match {

    export class MatchValue<T> implements IMatch {

        ___id = Cons.IMATCH_ID_VALUE;

        constructor(private _value: T) {
        }

        ___matches(object: any): boolean {
            let match = false;
            if (_.isEqual(this._value, object))
                match = true;
            return match;
        }
    }

}  