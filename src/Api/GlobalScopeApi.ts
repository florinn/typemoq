import * as all from "./_all";
import { IUsingResult } from "./IUsing";
import { GlobalScope as GScope } from "../GlobalScope";

export class GlobalScopeApi {

    static using(...args: all.IGlobalMock<any>[]): IUsingResult {
        let scope = new GScope(args);
        return scope;
    }

}