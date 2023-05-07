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
