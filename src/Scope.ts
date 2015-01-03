/// <reference path='_all.ts' />

module TypeMoq {

    export class Scope implements api.IUsingResult {

        constructor(private _args: IGlobalMock<any>[]) {
        }

        static using(...args: IGlobalMock<any>[]): api.IUsingResult {
            var scope = new Scope(args);
            return scope;
        }

        with(action: IAction): void {
            var initial: Array<Object> = [];
            try {
                _.each(this._args, a => {
                    if (!_.isUndefined(a.container[a.name])) {
                        try {
                            initial[a.name] = a.container[a.name];
                            //TODO: return a new mock every time with same interceptor as the one used by mock passed in as arg to using 
                            //      (to support different ctor arguments)
                            if (a.isFunction)
                                a.container[a.name] = a.mock.object;
                            else
                                a.container[a.name] = () => a.mock.object;
                        } catch (e) {
                            console.log(e);
                        }
                    }
                });

                action.apply(this, this._args);

            } finally {
                _.each(this._args, a => {
                    if (!_.isUndefined(a.mock.instance)) {
                        a.container[a.name] = initial[a.name];
                    }
                });
            }
        }
    }

} 