import * as _ from "lodash";
import { Consts } from "../Consts";

export class Match {

    static isMatcher(x: any): boolean {
        return !_.isNil(x) &&
            !_.isUndefined(x[Consts.IMATCH_MATCHES_NAME]) &&
            !_.isUndefined(x[Consts.IMATCH_ID_NAME]) &&
            x[Consts.IMATCH_ID_NAME] === Consts.IMATCH_ID_VALUE;
    }

}
