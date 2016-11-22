import * as _ from "lodash";
import * as common from "../Common/_all";
import { MockBehavior } from "./MockBehavior";
import { IMock } from "./IMock";
import { StaticMock } from "../StaticMock";
import { IGlobalMock } from "./IGlobalMock";
import { GlobalMock as GMock, GlobalType } from "../GlobalMock";
import { DynamicMock } from "../DynamicMock";

export class GlobalMockApi {

    static ofInstance<U>(targetInstance: U, globalName?: string, container: Object = window, behavior = MockBehavior.Loose): IGlobalMock<U> {
        let mock = StaticMock.ofGlobalInstance(targetInstance, behavior);
        let type = _.isFunction(targetInstance) ? GlobalType.Function : GlobalType.Value;
        return new GMock(mock, globalName, type, container);
    }

    static ofType<U>(targetConstructor: common.Ctor<U>, container: Object = window, behavior = MockBehavior.Loose): IGlobalMock<U> {
        let targetInstance = new targetConstructor();
        let mock: IMock<U> = StaticMock.ofInstance(targetInstance, behavior);
        return new GMock(mock, undefined, GlobalType.Class, container);
    }

    static ofType2<U>(globalName: string, container: Object = window, behavior = MockBehavior.Loose): IGlobalMock<U> {
        let mock: IMock<U> = DynamicMock.ofType<U>(globalName, behavior);
        return new GMock(mock, undefined, GlobalType.Class, container);
    }

}