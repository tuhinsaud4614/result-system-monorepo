import { CODE } from "./constants";

export type Code = keyof typeof CODE;
export type CodeValue = (typeof CODE)[Code];
