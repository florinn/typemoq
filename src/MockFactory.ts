import * as all from "./_all";
import { Mock } from "./Mock";

export class MockFactory {

    static createMockFromInstance<U>(targetInstance: U, behavior: all.MockBehavior): all.IMock<U> {
        let mock: Mock<U> = new Mock(targetInstance, false, behavior);
        return mock;
    }

    static createMockFromGlobalInstance<U>(targetInstance: U, behavior: all.MockBehavior): all.IMock<U> {
        let mock: Mock<U> = new Mock(targetInstance, true, behavior);
        return mock;
    }

    static createMockFromType<U>(targetConstructor: all.CtorWithArgs<U>, behavior: all.MockBehavior, targetConstructorArgs: any[]): all.IMock<U> {
        let targetInstance: U = all.Utils.conthunktor(targetConstructor, targetConstructorArgs);
        let mock: Mock<U> = new Mock(targetInstance, false, behavior);
        return mock;
    }

}