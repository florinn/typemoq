import * as _ from "lodash";
import { IMatch } from "./IMatch";
import { Consts } from "../Consts";
import { Utils } from "../Common/Utils";

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
        let valueName = Utils.argsName(<any>[this._value]);
        let res = `It.isObjectWith(${valueName})`;
        return res;
    }
}
