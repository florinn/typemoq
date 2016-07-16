namespace TypeMoqIntern {

    export class Utils {

        static getUUID(): string {
            let d = new Date().getTime();
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        static functionName(fun: Object): string {
            let ret: string;
            if ((<any>fun).name) {
                ret = (<any>fun).name;
            } else {
                let repr = fun.toString();
                repr = repr.substr('function '.length);
                ret = repr.substr(0, repr.indexOf('('));
            }
            return ret;
        }

        static conthunktor<U>(ctor: CtorWithArgs<U>, args: any[]): U {
            return (() => {
                let Temp: any = () => { }, inst: any, ret: any;
                Temp.prototype = ctor.prototype;
                inst = new Temp();
                if (_.isFunction(ctor))
                    ret = ctor.apply(inst, args);
                return _.isObject(ret) ? ret : inst;
            })();
        }
    }

}