namespace TypeMoqIntern {

    export class Utils {

        static getUUID() {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        static functionName(fun) {
            var ret = fun.toString();
            ret = ret.substr('function '.length);
            ret = ret.substr(0, ret.indexOf('('));
            return ret;
        }

        static conthunktor<U>(ctor: CtorWithArgs<U>, args: any[]): U {
            return (() => {
                var Temp = () => { }, inst, ret;
                Temp.prototype = ctor.prototype;
                inst = new Temp();
                if (_.isFunction(ctor))
                    ret = ctor.apply(inst, args);
                return _.isObject(ret) ? ret : inst;
            })();
        }
    }

}