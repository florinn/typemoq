import * as _ from "lodash";
import * as common from "../Common/_all";
import * as error from "../Error/_all";
import * as proxy from "../Proxy/_all";

export class Times {

    private static NO_MATCHING_CALLS_EXACTLY_N_TIMES = "expected invocation of <%= i %> exactly <%= min %> times, invoked <%= c %> times";
    private static NO_MATCHING_CALLS_AT_LEAST_N_TIMES = "expected invocation of <%= i %> at least <%= min %> times, invoked <%= c %> times";
    private static NO_MATCHING_CALLS_AT_MOST_N_TIMES = "expected invocation of <%= i %> at most <%= max %> times, invoked <%= c %> times";

    private _lastCallCount: number;
    private _failMessage: (...data: any[]) => string;

    private constructor(
        private _condition: common.IFunc2<number, boolean>,
        public readonly min: number,
        public readonly max: number,
        failMessage: string) {
        this._failMessage = _.template(failMessage);
    }

    failMessage(call: proxy.ICallContext) {
        return this._failMessage({ i: call, min: this.min, max: this.max, c: this._lastCallCount });
    }

    verify(callCount: number): boolean {
        this._lastCallCount = callCount;
        return this._condition(callCount);
    }

    private static checkArg(n: number, target: string) {
        if (n < 0)
            throw new error.MockException(error.MockExceptionReason.InvalidArg,
                undefined, `${target} argument cannot be a negative number`);
    }

    static exactly(n: number): Times {
        Times.checkArg(n, "'Times.exactly'");
        return new Times(c => c === n, n, n, Times.NO_MATCHING_CALLS_EXACTLY_N_TIMES);
    }

    static atLeast(n: number): Times {
        Times.checkArg(n, "'Times.atLeast'");
        return new Times(c => c >= n, n, 255, Times.NO_MATCHING_CALLS_AT_LEAST_N_TIMES);
    }

    static atMost(n: number): Times {
        Times.checkArg(n, "'Times.atMost'");
        return new Times(c => c >= 0 && c <= n, 0, n, Times.NO_MATCHING_CALLS_AT_MOST_N_TIMES);
    }

    static never(): Times {
        return Times.exactly(0);
    }

    static once(): Times {
        return Times.exactly(1);
    }

    static atLeastOnce(): Times {
        return Times.atLeast(1);
    }

    static atMostOnce(): Times {
        return Times.atMost(1);
    }

    toString(): string {
        let res = "";
        if (this.min === this.max) {
            if (this.min === 0) {
                res = "never";
            } else if (this.min === 1) {
                res = "once";
            } else {
                res = `${this.min} times`;
            }
        } else {
            if (this.min === 0 && this.max !== 255)
                res = `at most ${this.max} times`;
            else
                res = `at least ${this.min} times`;
        }
        return res;
    }

}
