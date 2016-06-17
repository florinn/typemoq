/// <reference path='_all.ts' />

namespace TypeMoqIntern.Match {

    export class MatchAnyObject<T> implements IMatch {

        ___id = Cons.IMATCH_ID_VALUE;

        constructor(private _ctor: Ctor<T>) {
        }

        ___matches(object: Object): boolean {
            let match = false;
            if (this._ctor.prototype === object.constructor.prototype)
                match = true;
            return match;
        }
    }

    export class MatchAny implements IMatch {

        ___id = Cons.IMATCH_ID_VALUE;

        ___matches(object: Object): boolean {
            let match = false;
            if (!_.isUndefined(object))
                match = true;
            return match;
        }
    }

    export class MatchAnyString implements IMatch {

        ___id = Cons.IMATCH_ID_VALUE;

        ___matches(object: Object): boolean {
            let match = false;
            if (_.isString(object))
                match = true;
            return match;
        }
    }

    export class MatchAnyNumber implements IMatch {

        ___id = Cons.IMATCH_ID_VALUE;

        ___matches(object: Object): boolean {
            let match = false;
            if (_.isNumber(object))
                match = true;
            return match;
        }
    }
} 