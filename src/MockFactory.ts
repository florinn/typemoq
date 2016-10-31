import * as all from "./_all";
import { Mock, MockBehavior } from "./Mock";

export class MockFactory {
    static createMockFromInstance<U>(targetInstance: U, behavior: MockBehavior): Mock<U> {
        let mock: Mock<U> = new Mock(targetInstance, false, behavior);
        return mock;
    }

    static createMockFromGlobalInstance<U>(targetInstance: U, behavior: MockBehavior): Mock<U> {
        let mock: Mock<U> = new Mock(targetInstance, true, behavior);
        return mock;
    }

    static createMockFromType<U>(targetConstructor: all.CtorWithArgs<U>, behavior: MockBehavior, targetConstructorArgs: any[]): Mock<U> {
        let targetInstance: U = all.Utils.conthunktor(targetConstructor, targetConstructorArgs);
        let mock: Mock<U> = new Mock(targetInstance, false, behavior);
        return mock;
    }
}