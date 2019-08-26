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

    ___matches(object: Object, value?: Object): boolean {
        const compare = (value || this._value) as any;
        const compareKeys = _.keys(compare);
        const partial = _.pick(object, compareKeys) as any;
        const partialKeys = _.keys(partial);

        if (compareKeys.length !== partialKeys.length) {
            return false;
        }

        for (const key of partialKeys) {
            const nested = partial[key];
            if (_.isArray(nested) || _.isObject(nested)) {
                if (!this.___matches(nested, compare[key])) {
                    return false;
                }
            } else if (!_.isEqual(nested, compare[key])) {
                console.log(nested, '=', compare[key]);
                return false;
            }
        }

        return true;
    }

    toString(): string {
        let valueName = Utils.argsName(<any>[this._value]);
        let res = `It.isObjectWith(${valueName})`;
        return res;
    }
}
