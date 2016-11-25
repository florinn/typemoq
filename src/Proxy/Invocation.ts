import * as _ from "lodash";
import * as common from "../Common/_all";
import { ICallContext } from "./ICallContext";

export class MethodInvocation implements ICallContext {
    returnValue: any;

    constructor(
        private readonly _property: MethodInfo, 
        private _args?: IArguments) {
    }

    get args(): IArguments { return this._args || <any>{ length: 0, callee: null }; }
    set args(value: IArguments) { this._args = value; }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        this.returnValue = this._property.toFunc.apply(this._property.obj, this._args);
    }

    toString(): string {
        let res = `${this.property}(${common.Utils.argsName(this.args)})`;
        return res;
    }
}

export class ValueGetterInvocation implements ICallContext {
    returnValue: any;

    constructor(
        private readonly _property: PropertyInfo, 
        readonly value: any) {
        
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

    toString(): string {
        let res = `${this.property}`;
        return res;
    }
}

export class ValueSetterInvocation implements ICallContext {
    returnValue: any;

    constructor(
        private readonly _property: PropertyInfo, 
        private _args: IArguments) {
    }

    get args(): IArguments { return this._args; }
    set args(value: IArguments) { this._args = value; }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        (<any>this._property.obj)[this._property.name] = this._args[0];
        this.returnValue = (<any>this._property.obj)[this._property.name];
    }

    toString(): string {
        let res = `${this.property} = ${common.Utils.argsName(this.args[0])}`;
        return res;
    }
}

export class MethodGetterInvocation implements ICallContext {
    returnValue: any;

    constructor(
        private readonly _property: PropertyInfo, 
        private readonly _getter: () => any) {
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

    toString(): string {
        let res = `${this.property}`;
        return res;
    }
}

export class MethodSetterInvocation implements ICallContext {
    returnValue: any;

    constructor(
        private readonly _property: PropertyInfo, 
        private readonly _setter: (v: any) => void, 
        private _args: IArguments) {
    }

    get args(): IArguments { return this._args; }
    set args(value: IArguments) { this._args = value; }

    get property(): PropertyInfo { return this._property; }

    invokeBase(): void {
        (<any>this._property.obj)[this._property.name] = this._args[0];
        this.returnValue = (<any>this._property.obj)[this._property.name];
    }

    toString(): string {
        let res = `${this.property}(${common.Utils.argsName(this.args[0])})`;
        return res;
    }
}

export class MethodInfo implements IPropertyInfo {
    constructor(
        public readonly obj: any, 
        public readonly name: string, 
        public readonly desc?: PropertyDescriptor) {
    }

    get toFunc(): Function {
        let func: Function;
        if (_.isFunction(this.obj))
            func = <Function>this.obj;
        else
            func = <Function>this.obj[this.name];
        return func;
    }

    toString(): string {
        let objName = common.Utils.objectName(this.obj);
        let res = `${objName}.${this.name}`;
        return res;
    }
}

export class PropertyInfo implements IPropertyInfo {
    constructor(
        public readonly obj: Object, 
        public readonly name: string, 
        public readonly desc?: PropertyDescriptor) {
    }
    
    toString(): string {
        let objName = common.Utils.objectName(this.obj);
        let res = `${objName}.${this.name}`;
        return res;
    }
}

export interface IPropertyInfo {
    obj: Object;
    name: string;
    desc?: PropertyDescriptor;
}