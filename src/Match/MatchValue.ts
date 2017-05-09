import * as _ from "lodash";
import { IMatch } from "./IMatch";
import { Consts } from "../Consts";
import { Utils } from "../Common/Utils";

export class MatchValue<T> implements IMatch {

    readonly ___id = Consts.IMATCH_ID_VALUE;

    private readonly _value: T;

    constructor(value: T) {
        this._value = <any>_.cloneDeep(value);
    }

    ___matches(object: any): boolean {
        let match = false;
        if (_.isEqual(this._value, object))
            match = true;
        return match;
    }

    toString(): string {
        let valueName = Utils.argsName(<any>[this._value]);
        let res = `It.isValue(${valueName})`;
        return res;
    }
}