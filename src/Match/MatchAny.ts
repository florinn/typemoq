import * as _ from "lodash";
import * as common from "../Common/_all";
import { IMatch } from "./IMatch";
import { Consts } from "../Consts";

export class MatchAnyObject<T> implements IMatch {

    readonly ___id = Consts.IMATCH_ID_VALUE;

    constructor(private _ctor: common.Ctor<T>) {
    }

    ___matches(object: Object): boolean {
        let match = false;
        if (this._ctor.prototype === object.constructor.prototype)
            match = true;
        return match;
    }
}

export class MatchAny implements IMatch {

    readonly ___id = Consts.IMATCH_ID_VALUE;

    ___matches(object: Object): boolean {
        let match = false;
        if (!_.isUndefined(object))
            match = true;
        return match;
    }
}

export class MatchAnyString implements IMatch {

    readonly ___id = Consts.IMATCH_ID_VALUE;

    ___matches(object: Object): boolean {
        let match = false;
        if (_.isString(object))
            match = true;
        return match;
    }
}

export class MatchAnyNumber implements IMatch {

    readonly ___id = Consts.IMATCH_ID_VALUE;

    ___matches(object: Object): boolean {
        let match = false;
        if (_.isNumber(object))
            match = true;
        return match;
    }
}