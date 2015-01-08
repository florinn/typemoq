/// <reference path='_all.ts' />

module TypeMoq {

    export class GlobalScope implements api.IUsingResult {

        constructor(private _args: IGlobalMock<any>[]) {
        }

        static using(...args: IGlobalMock<any>[]): api.IUsingResult {
            var scope = new GlobalScope(args);
            return scope;
        }

        with(action: IAction): void {
            var initial: Array<PropertyDescriptor> = [];

            try {
                _.each(this._args, a => {

                    var containerProps = PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(a.container);

                    if (!_.isUndefined(a.container[a.name])) {

                        try {
                            var prop = _.find(containerProps, p => p.name === a.name);
                            //initial[a.name] = { value: a.container[a.name], desc: prop.desc };
                            initial[a.name] = prop.desc;
                            //initial[a.name] = a.container[a.name];

                            var desc: PropertyDescriptor = {};

                            switch (a.type) {

                                case GlobalType.Class:
                                    //todo: return a new mock every time with same interceptor as the one used by mock passed in as arg to using 
                                    //      (to support different ctor arguments)
                                    desc.value = () => a.mock.object;
                                    break;

                                case GlobalType.Function:
                                    desc.value = a.mock.object;
                                    break;

                                case GlobalType.Value:
                                    desc.get = () => a.mock.object;
                                    break;

                                default:
                                    throw new error.MockException(error.MockExceptionReason.UnknownGlobalType,
                                        a, "UnknownGlobalType Exception", "unknown global type: " + a.type);
                            }

                            //if (_.isFunction(prop.desc.value)) {
                            //    desc.value = a.mock.object;
                            //}
                            //else {
                            //    desc.get = () => a.mock.object;
                            //}

                            Object.defineProperty(a.container, a.name, desc);

                        } catch (e) {
                            console.log(e);
                        }
                    }
                });

                action.apply(this, this._args);

            } finally {
                _.each(this._args, a => {
                    if (!_.isUndefined(a.mock.instance)) {
                        //a.container[a.name] = initial[a.name];

                        var desc: PropertyDescriptor = initial[a.name];

                        //var desc: PropertyDescriptor;

                        //if (_.isFunction(prop.desc.value)) {
                        //    desc = {
                        //        configurable: prop.desc.configurable,
                        //        enumerable: prop.desc.enumerable,
                        //        writable: prop.desc.writable,
                        //    };

                        //    desc.value = prop.desc.value;
                        //}
                        //else {
                        //    desc = {
                        //        configurable: prop.desc.configurable,
                        //        enumerable: prop.desc.enumerable,
                        //    };

                        //    desc.get = prop.desc.get;
                        //    desc.set = prop.desc.set;
                        //}

                        Object.defineProperty(a.container, a.name, desc);
                    }
                });
            }
        }
    }

} 