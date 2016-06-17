namespace TypeMoqIntern.Proxy {
    export class MethodInvocation implements ICallContext {
        returnValue: any;

        constructor(private _property: MethodInfo, private _args?: IArguments) {
        }

        get args(): IArguments { return this._args || { length: 0, callee: null }; }
        set args(value: IArguments) { this._args = value; }

        get property(): PropertyInfo { return this._property; }

        invokeBase(): void {
            this.returnValue = this._property.toFunc.apply(this._property.obj, this._args);
        }

    }

    export class GetterInvocation implements ICallContext {
        returnValue: any;

        constructor(private _property: PropertyInfo, value) {
            this.returnValue = value;
        }

        get args(): IArguments {
            let args = [];
            Object.defineProperty(args, "callee",
                { configurable: false, enumerable: true, writable: false, value: null });
            return <any>args;
        }
        set args(value: IArguments) { }

        get property(): PropertyInfo { return this._property; }

        invokeBase(): void {
        }

    }

    export class SetterInvocation implements ICallContext {
        returnValue: any;

        constructor(private _property: PropertyInfo, private _args: IArguments) {
        }

        get args(): IArguments { return this._args; }
        set args(value: IArguments) { this._args = value; }

        get property(): PropertyInfo { return this._property; }

        invokeBase(): void {
            this.returnValue = this._property.obj[this._property.name] = this._args[0];
        }

    }

    export class MethodInfo implements IPropertyInfo {
        constructor(public obj: Object, public name: string) {
        }
        get toFunc(): Function {
            let func: Function;
            if (_.isFunction(this.obj))
                func = <Function>this.obj;
            else
                func = this.obj[this.name];
            return func;
        }
    }

    export class PropertyInfo implements IPropertyInfo {
        constructor(public obj: Object, public name: string) {
        }
    }

    export interface IPropertyInfo {
        obj: Object;
        name: string;
    }
} 