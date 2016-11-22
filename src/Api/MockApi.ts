import * as common from "../Common/_all";
import { MockBehavior } from "./MockBehavior";
import { IMock } from "./IMock";
import { StaticMock } from "../StaticMock";
import { DynamicMock } from "../DynamicMock";

export class MockApi {

    static ofInstance<U>(targetInstance: U, behavior = MockBehavior.Loose): IMock<U> {
        let mock = StaticMock.ofInstance(targetInstance, behavior);
        return mock;
    }

    static ofType<U>(targetConstructor?: common.CtorWithArgs<U>, behavior = MockBehavior.Loose, ...targetConstructorArgs: any[]): IMock<U> {
        let mock: IMock<U>;
        if (targetConstructor)
            mock = MockApi.ofType2(targetConstructor, targetConstructorArgs, behavior);
        else
            mock = DynamicMock.ofType<U>(undefined, behavior);
        return mock;
    }

    static ofType2<U>(targetConstructor: common.CtorWithArgs<U>, targetConstructorArgs: any[], behavior = MockBehavior.Loose): IMock<U> {
        let mock: IMock<U> = StaticMock.ofType(targetConstructor, behavior, targetConstructorArgs);
        return mock;
    }

}