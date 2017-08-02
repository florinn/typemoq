import * as common from "../Common/_all";
import { MockBehavior } from "./MockBehavior";
import { IMock } from "./IMock";
import { StaticMock } from "../StaticMock";
import { DynamicMock } from "../DynamicMock";

export class MockApi {

    static ofInstance<U>(targetInstance: U, behavior = MockBehavior.Loose, shouldOverrideTarget = true): IMock<U> {
        const mock = StaticMock.ofInstance(targetInstance, behavior, shouldOverrideTarget);
        return mock;
    }

    static ofType<U>(targetConstructor?: common.CtorWithArgs<U>, behavior = MockBehavior.Loose, shouldOverrideTarget = true, ...targetConstructorArgs: any[]): IMock<U> {
        let mock: IMock<U>;
        if (targetConstructor)
            mock = MockApi.ofType2(targetConstructor, targetConstructorArgs, behavior, shouldOverrideTarget);
        else
            mock = DynamicMock.ofType<U>(undefined, behavior, shouldOverrideTarget);
        return mock;
    }

    static ofType2<U>(targetConstructor: common.CtorWithArgs<U>, targetConstructorArgs: any[], behavior = MockBehavior.Loose, shouldOverrideTarget = true): IMock<U> {
        const mock: IMock<U> = StaticMock.ofType(targetConstructor, behavior, shouldOverrideTarget, targetConstructorArgs);
        return mock;
    }

}