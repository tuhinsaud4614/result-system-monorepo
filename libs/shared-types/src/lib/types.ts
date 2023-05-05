import { CODE } from "@result-system/shared-utility";

export type Code = keyof typeof CODE;
export type CodeValue = (typeof CODE)[Code];
