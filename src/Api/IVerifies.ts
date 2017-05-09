import { Times } from "./Times";

export interface IVerifies {
    verifiable(times?: Times): void;
}
