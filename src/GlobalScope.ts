/// <reference path='_all.ts' />

namespace TypeMoqIntern {

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

                    if (!_.isUndefined(a.container[a.name])) {

                        var containerProps = PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(a.container);
                        var prop = _.find(containerProps, p => p.name === a.name);

                        initial[a.name] = prop.desc;

                        var desc: PropertyDescriptor = {};

                        switch (a.type) {

                            case GlobalType.Class:
                                //TODO: return a new mock every time with same interceptor as the one used by mock passed in as arg to 'using' 
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

                        try {
                            Object.defineProperty(a.container, a.name, desc);
                        } catch (e) {
                            console.log("1: " + e);
                        }
                    }
                });

                action.apply(this, this._args);

            } finally {
                _.each(this._args, a => {
                    if (!_.isUndefined(a.mock.instance)) {

                        var desc: PropertyDescriptor = initial[a.name];

                        if (desc) {

                            switch (a.type) {

                                case GlobalType.Class:
                                    break;

                                case GlobalType.Function:
                                    break;

                                case GlobalType.Value:
                                    desc.configurable = true;
                                    break;

                                default:
                            }

                            try {
                                Object.defineProperty(a.container, a.name, desc);
                            } catch (e) {
                                console.log("2: " + e);
                            }
                        }
                    }
                });
            }
        }
    }

} 