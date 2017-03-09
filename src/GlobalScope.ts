import * as _ from "lodash";
import * as all from "./_all";
import { GlobalType } from "./GlobalMock";

export class GlobalScope implements all.IUsingResult {

    constructor(private _args: all.IGlobalMock<any>[]) {
    }

    with(action: all.IAction): void {
        let initial: all.PropDescriptorMap = {};

        try {
            _.each(this._args, (a: all.IGlobalMock<any>) => {
                let containerProps = all.PropertyRetriever.getOwnAndPrototypeEnumerablesAndNonenumerables(a.container);
                let prop = _.find(containerProps, (p: { name: string; desc: all.PropDescriptor }) => p.name === a.name);

                if (prop) {

                    initial[a.name] = prop.desc;

                    let desc: all.PropDescriptor = {};

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
                            throw new all.MockException(
                                all.MockExceptionReason.UnknownGlobalType, a, `unknown global type: ${a.type}`);
                    }

                    try {
                        Object.defineProperty(a.container, a.name, desc);
                    } catch (e) {
                        console.log(`1: ${e}`);
                    }
                }
            });

            action.apply(this, this._args);

        } catch (e) {
            console.log(`2: ${e}`);
        } finally {
            _.each(this._args, (a: all.IGlobalMock<any>) => {
                    let desc: all.PropDescriptor = initial[a.name];

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
                            console.log(`3: ${e}`);
                        }
                    }
                });
        }
    }
}