import * as _ from "lodash";
import { IMatch } from "./IMatch";
import { Consts } from "../Consts";
import { Utils } from "../Common/Utils";

export class MatchObjectWith<T> implements IMatch {
    
    readonly ___id = Consts.IMATCH_ID_VALUE;
    
    private readonly _value: T;

    constructor(value: T) {
        this._value = <any>_.cloneDeep(value);
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
