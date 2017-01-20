import * as _ from "lodash";
import { CtorWithArgs } from "./Ctor";

export class Utils {

    static functionName(fun: Object): string {
        let res: string;
        if ((<any>fun).name) {
            res = (<any>fun).name;
        } else {
            let repr = fun.toString();
            repr = repr.substr('function '.length);
            res = repr.substr(0, repr.indexOf('('));
        }
        return res;
    }

    static objectName(obj: Object): string {
        let res = Utils.functionName(obj.constructor);
        return res;
    }

    static argsName(args: IArguments): string {
        let res = _.join(args);
        return res;
    }

    static conthunktor<U>(ctor: CtorWithArgs<U>, args: any[]): U {
        let ret: U = new ctor(...args);
        return ret;
    }
}