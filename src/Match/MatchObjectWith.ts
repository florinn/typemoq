import * as _ from "lodash";
import { IMatch } from "./IMatch";
import { Consts } from "../Consts";

export class MatchObjectWith<T> implements IMatch {

    readonly ___id = Consts.IMATCH_ID_VALUE;

    constructor(private _value: T) {
    }

    ___matches(object: Object): boolean {
        let match = false;
        let partial = _.pick(object, _.keys(this._value));
        if (_.isEqual(this._value, partial))
            match = true;
        return match;
    }

    toString(): string {
        let res = `It.isObjectWith(${this._value})`;
        return res;
    }
}
