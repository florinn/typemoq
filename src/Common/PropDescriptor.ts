export interface PropDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get? (): any;
    set? (v: any): void;
}

export interface PropDescriptorMap {
    [s: string]: PropDescriptor;
}