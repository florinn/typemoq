import { IMock } from "./IMock";
import { Mock } from "./Mock";
import { GlobalType } from "./GlobalMock";

export interface IGlobalMock<T> extends IMock<T> {
    readonly mock: Mock<T>;
    readonly type: GlobalType;
    readonly container: Object;
}