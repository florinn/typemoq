import * as common from "../Common/_all";

export declare type PropKey = string | number | symbol;

export interface IProxyHandler<T> {
    getPrototypeOf? (target: T): Object | null;
    setPrototypeOf? (target: T, v: any): boolean;
    isExtensible? (target: T): boolean;
    preventExtensions? (target: T): boolean;
    getOwnPropertyDescriptor? (target: T, p: PropKey): common.PropDescriptor;
    has? (target: T, p: PropKey): boolean;
    get? (target: T, p: PropKey, receiver: any): any;
    set? (target: T, p: PropKey, value: any, receiver: any): boolean;
    deleteProperty? (target: T, p: PropKey): boolean;
    defineProperty? (target: T, p: PropKey, attributes: common.PropDescriptor): boolean;
    enumerate? (target: T): PropKey[];
    ownKeys? (target: T): PropKey[];
    apply? (target: T, thisArg: any, argArray?: any): any;
    construct? (target: T, argArray: any, newTarget?: any): Object
}