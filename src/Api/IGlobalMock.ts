import { IMock } from "./IMock";
import { GlobalType } from "../GlobalMock";

export interface IGlobalMock<T> extends IMock<T> {
    readonly mock: IMock<T>;
    readonly type: GlobalType;
    readonly container: Object;
}