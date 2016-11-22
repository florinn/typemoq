import * as _ from "lodash";
import { ICallContext } from "./ICallContext";

export class MethodInvocation implements ICallContext {
    returnValue: any;

    constructor(private _property: MethodInfo, private _args?: IArguments) {
    }

    get args(): IArguments { return this._args || <any>{ length: 0, callee: null }; }
    set args(value: IArguments) { this._args = value; }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        this.returnValue = this._property.toFunc.apply(this._property.obj, this._args);
    }
}

export class ValueGetterInvocation implements ICallContext {
    returnValue: any;

    constructor(private _property: PropertyInfo, value: any) {
        this.returnValue = value;
    }

    get args(): IArguments {
        let args: any[] = [];
        Object.defineProperty(args, "callee",
            { configurable: false, enumerable: true, writable: false, value: null });
        return <any>args;
    }
    set args(value: IArguments) { }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        this.returnValue = (<any>this._property.obj)[this._property.name];
    }
}

export class ValueSetterInvocation implements ICallContext {
    returnValue: any;

    constructor(private _property: PropertyInfo, private _args: IArguments) {
    }

    get args(): IArguments { return this._args; }
    set args(value: IArguments) { this._args = value; }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        (<any>this._property.obj)[this._property.name] = this._args[0];
        this.returnValue = (<any>this._property.obj)[this._property.name];
    }
}

export class MethodGetterInvocation implements ICallContext {
    returnValue: any;

    constructor(private _property: PropertyInfo, private _getter: () => any) {
    }

    get args(): IArguments {
        let args: any[] = [];
        Object.defineProperty(args, "callee",
            { configurable: false, enumerable: true, writable: false, value: null });
        return <any>args;
    }
    set args(value: IArguments) { }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        this.returnValue = (<any>this._property.obj)[this._property.name];
    }
}

export class MethodSetterInvocation implements ICallContext {
    returnValue: any;

    constructor(private _property: PropertyInfo, private _setter: (v: any) => void, private _args: IArguments) {
    }

    get args(): IArguments { return this._args; }
    set args(value: IArguments) { this._args = value; }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        (<any>this._property.obj)[this._property.name] = this._args[0];
        this.returnValue = (<any>this._property.obj)[this._property.name];
    }
}

export class MethodInfo implements IPropertyInfo {
    constructor(public obj: any, public name: string, public desc?: PropertyDescriptor) {
    }
    get toFunc(): Function {
        let func: Function;
        if (_.isFunction(this.obj))
            func = <Function>this.obj;
        else
            func = <Function>this.obj[this.name];
        return func;
    }
}

export class PropertyInfo implements IPropertyInfo {
    constructor(public obj: Object, public name: string, public desc?: PropertyDescriptor) {
    }
}

export interface IPropertyInfo {
    obj: Object;
    name: string;
    desc?: PropertyDescriptor;
}