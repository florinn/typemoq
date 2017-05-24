import * as _ from "lodash";
import * as CircularJSON from "circular-json";
import { CtorWithArgs } from "./Ctor";
import { PropertyRetriever } from "./PropertyRetriever";
import { Match } from "../Match/Match";

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
        let argsArray: any[] = Array.prototype.slice.call(args);
        let sargs = argsArray.map((x: any) => {
            let res = "";
            if (Match.isMatcher(x))
                res = x.toString();
            else
                res = CircularJSON.stringify(x);
            return res;
        });
        let res = _.join(sargs);
        return res;
    }

    static conthunktor<U>(ctor: CtorWithArgs<U>, args: any[]): U {
        let ret: U = new ctor(...args);
        return ret;
    }

    static clone(target: Object, source: Object) {
        let sourceProps = PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(source);
        for (let p of sourceProps)
            Object.defineProperty(target, p.name, p.desc);
    }
}