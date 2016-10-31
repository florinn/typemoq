import * as common from "../Common/_all";

export interface IUsingResult {
    with(action: common.IAction): void;
}