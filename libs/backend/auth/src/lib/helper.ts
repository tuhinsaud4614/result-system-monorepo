import { sign as jwtSign, verify as jwtVerify } from "jsonwebtoken";
import ms from "ms";

import {
  AuthenticationError,
  deserializeUserWithAvatar,
  environment,
  generateRedisKey,
  redisClient,
} from "@result-system/backend/utility";
import { UserWithAvatar } from "@result-system/shared/utility";

/**
 * This function generates a JWT token for a user with an optional refresh token and sets it in Redis
 * if specified.
 * @param {UserWithAvatar} user - The user parameter is an object of type UserWithAvatar, which likely
 * contains information about a user, including their ID, name, email, and possibly an avatar image.
 * @param {string} key - The key parameter is a string that represents the secret key used to sign the
 * JWT token. This key should be kept secret and not shared with anyone who should not have access to
 * it.
 * @param {string} expires - The `expires` parameter is a string that specifies the expiration time of
 * the JWT token. It can be a number of seconds or a string in a time format recognized by the `ms`
 * library. The `expiresIn` option of the `jwtSign` function uses this parameter to set the expiration
 * @param [settable=false] - The `settable` parameter is a boolean value that determines whether the
 * generated JWT token should be stored in Redis cache or not. If `settable` is set to `true`, the
 * token will be stored in Redis cache with an expiration time of `expires`.
 * @returns a JWT token generated using the `jwtSign` method from the `jsonwebtoken` library. If the
 * `settable` parameter is set to `true`, the function also sets the token in Redis with a key
 * generated using the `generateRedisKey` function and returns the token. If `settable` is `false`, the
 * function only returns the token.
 */
export async function generateJwtToken(
  user: UserWithAvatar,
  key: string,
  expires: string,
  settable = false,
) {
  const token = jwtSign({ ...user }, key, {
    expiresIn: expires,
  });

  const exp = isNaN(+expires) ? ms(expires) / 1000 : +expires;

  if (settable) {
    await redisClient.setex(
      generateRedisKey("REFRESH_TOKEN", user.id),
      exp,
      JSON.stringify(token),
    );
  }

  return token;
}

/**
 * This function generates JWT access and refresh tokens for a given user.
 * @param {UserWithAvatar} user - The `user` parameter is an object of type `UserWithAvatar`, which
 * likely contains information about a user, such as their ID, name, email, and possibly an avatar
 * image. This object is used to generate JWT tokens for the user.
 * @returns An object with two properties: `accessToken` and `refreshToken`, both of which are
 * generated using the `generateJwtToken` function with different parameters. The `accessToken` is
 * generated using the `ACCESS_TOKEN_SECRET_KEY` and `ACCESS_TOKEN_EXPIRES` values from the
 * `environment` object, while the `refreshToken` is generated using the `REFRESH_TOKEN_SECRET_KEY` and
 * `REF
 */
export async function generateJwtTokens(user: UserWithAvatar) {
  const accessToken = await generateJwtToken(
    user,
    environment.ACCESS_TOKEN_SECRET_KEY,
    environment.ACCESS_TOKEN_EXPIRES,
  );

  const refreshToken = await generateJwtToken(
    user,
    environment.REFRESH_TOKEN_SECRET_KEY,
    environment.REFRESH_TOKEN_EXPIRES,
    true,
  );

  return { accessToken, refreshToken } as const;
}

/**
 * This function verifies a JWT refresh token by decoding it, checking if it matches a stored value in
 * Redis, and returning the payload if it does, or throwing an error if it doesn't.
 * @param {string} token - The `token` parameter is a string representing a refresh token that needs to
 * be verified.
 * @returns If the `token` is valid and matches the one stored in Redis, the function will return the
 * `payload` object. If the `token` is invalid or does not match the one stored in Redis, the function
 * will throw an `AuthenticationError`.
 */
export async function verifyJwtRefreshToken(token: string) {
  const decoded = jwtVerify(token, environment.REFRESH_TOKEN_SECRET_KEY);
  const payload = deserializeUserWithAvatar(decoded);

  const refreshKey = generateRedisKey("REFRESH_TOKEN", payload.id);

  const value = await redisClient.get(refreshKey);
  if (value && token === JSON.parse(value)) {
    return payload;
  }

  await redisClient.del(refreshKey);
  throw new AuthenticationError();
}