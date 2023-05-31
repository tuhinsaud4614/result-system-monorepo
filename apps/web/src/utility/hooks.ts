import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import { ErrorResponse, isObjectWithKeys } from "@result-system/shared/utility";

import { type AppDispatch, type RootState } from "../app/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * This TypeScript function takes an error object and returns a formatted error message or an array of
 * error messages.
 * @param {unknown} error - The `error` parameter is of type `unknown`, which means it can be any type
 * of value. It is used as input to format an error message.
 * @returns The function `useFormattedError` returns an array of error messages. If the `error`
 * parameter is falsy, the function returns undefined. If the `error` parameter is an object with keys
 * `code`, `message`, `success`, and `timeStamp`, the function returns the `paths` property of the
 * `error` object, or an array containing the `message` property of the
 */
export function useFormattedError(error: unknown) {
  if (!error) {
    return;
  }

  return isObjectWithKeys<ErrorResponse>(error, [
    "code",
    "message",
    "success",
    "timeStamp",
  ])
    ? error.paths || [error.message]
    : ["Something went wrong"];
}
