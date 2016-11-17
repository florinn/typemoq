import * as common from "../Common/_all";
import { MockBehavior } from "./MockBehavior";
import { IMock } from "./IMock";
import { MockFactory } from "../MockFactory";

export class Mock {

    static ofInstance<U>(targetInstance: U, behavior = MockBehavior.Loose): IMock<U> {
        let mock = MockFactory.createMockFromInstance(targetInstance, behavior);
        return mock;
    }

    static ofType<U>(targetConstructor?: common.CtorWithArgs<U>, behavior = MockBehavior.Loose, ...targetConstructorArgs: any[]): IMock<U> {
        let mock: IMock<U> = Mock.ofType2(targetConstructor, targetConstructorArgs, behavior);
        return mock;
    }

    static ofType2<U>(targetConstructor: common.CtorWithArgs<U>, targetConstructorArgs: any[], behavior = MockBehavior.Loose): IMock<U> {
        let mock: IMock<U> = MockFactory.createMockFromType(targetConstructor, behavior, targetConstructorArgs);
        return mock;
    }

}