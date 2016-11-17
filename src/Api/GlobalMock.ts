import * as _ from "lodash";
import * as common from "../Common/_all";
import { IGlobalMock } from "./IGlobalMock";
import { GlobalMock as GMock, GlobalType } from "../GlobalMock";
import { MockBehavior } from "./MockBehavior";
import { MockFactory } from "../MockFactory";

export class GlobalMock {

    static ofInstance<U>(targetInstance: U, globalName?: string, container: Object = window, behavior = MockBehavior.Loose): IGlobalMock<U> {
        let mock = MockFactory.createMockFromGlobalInstance(targetInstance, behavior);
        let type = _.isFunction(targetInstance) ? GlobalType.Function : GlobalType.Value;
        return new GMock(mock, globalName, type, container);
    }

    static ofType<U>(targetConstructor: common.Ctor<U>, container: Object = window, behavior = MockBehavior.Loose): IGlobalMock<U> {
        let targetInstance = new targetConstructor();
        let mock = MockFactory.createMockFromInstance(targetInstance, behavior);
        return new GMock(mock, undefined, GlobalType.Class, container);
    }

}