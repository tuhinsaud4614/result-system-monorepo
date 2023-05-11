import _ from "lodash";

/**
 * If the NODE_ENV environment variable is set to 'development', then return true, otherwise return
 * false.
 * @returns A boolean value.
 */
export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * If the NODE_ENV environment variable is set to `'production'`, then return true, otherwise return
 * false.
 * @returns A boolean value.
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

/**
 * The function checks if the first character of a given string is a vowel.
 * @param {string} value - The input string that we want to check if its first character is a vowel or
 * not.
 * @returns The function `isVowel` returns a boolean value indicating whether the first character of
 * the input string is a vowel or not.
 */
export function isVowel(value: string) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  const firstChar = value.charAt(0).toLowerCase();

  return vowels.has(firstChar);
}

/**
 * This function checks if an input object has all the specified keys.
 * @param {unknown} data - The data parameter is of type unknown, which means it can be any type of
 * value. However, the function checks if it is an object before proceeding with further checks.
 * @param keys - `keys` is an array of property keys of type `T`. The `isObjectWithKeys` function
 * checks if the `data` parameter is an object that has all the properties specified in the `keys`
 * array. If `data` has all the properties specified in `keys`, the function returns
 * @returns a boolean value. It returns `true` if the `data` parameter is an object that has all the
 * keys specified in the `keys` parameter, and `false` otherwise.
 */
export function isObjectWithKeys<T extends object>(
  data: unknown,
  keys: readonly (keyof T)[],
): data is T {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  return keys.every((key) => _.has(data, key));
}
