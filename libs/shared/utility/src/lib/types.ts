import type { Picture, User, UserRole } from "@prisma/client";
import type { InferType } from "yup";

import { CODE, IMAGE_MIMES } from "./constants";
import {
  createClassInputSchema,
  idParamsSchema,
  loginInputSchema,
  offsetSchema,
  registerInputSchema,
  updateUserInputSchema,
} from "./schema";

/**
 * `200`: "OK"
 *
 * `201`: "CREATED"
 *
 * `204`: "No_CONTENT"
 *
 * `301`: "MOVED_PERMANENTLY"
 *
 * `400`: "BAD_REQUEST"
 *
 * `401`: "UNAUTHORIZED"
 *
 * `402`: "PAYMENT_REQUIRED"
 *
 * `403`: "FORBIDDEN"
 *
 * `404`: "NOT_FOUND"
 *
 * `409`: "CONFLICT"
 *
 * `415`: "UNSUPPORTED_MEDIA_TYPE"
 *
 * `422`: "BAD_USER_INPUT"
 *
 * `429`: "TOO_MANY_REQUESTS"
 *
 * `431`: "REQUEST_HEADER_FIELDS_TOO_LARGE"
 *
 * `500`: "INTERNAL_SERVER_ERROR"
 */
export type Code = keyof typeof CODE;
export type CodeValue = (typeof CODE)[Code];
export type IMAGE_MIME = keyof typeof IMAGE_MIMES;

/** It widens the type */
// eslint-disable-next-line @typescript-eslint/ban-types
export type Pretty<T extends {}> = {
  [K in keyof T]: T[K];
  // eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type Offset = InferType<typeof offsetSchema>;
export interface IOffsetPageInfo {
  hasNext: boolean;
  nextPage: number;
  previousPage: number;
  totalPages: number;
}
export interface ResultWithOffset<T> {
  data: T[];
  total: number;
  pageInfo?: IOffsetPageInfo;
}

export type IDParams = InferType<ReturnType<typeof idParamsSchema>>;

// Auth
export type RegisterInput = InferType<typeof registerInputSchema>;
export type LoginInput = InferType<typeof loginInputSchema>;
export type AuthorizedUser = LeanUser & {
  avatar: LeanPicture | null;
};

// User
export type UpdateUserInput = InferType<typeof updateUserInputSchema>;
export type NonAdminUserRole = Exclude<UserRole, "ADMIN">;
export type LeanUser = Omit<
  User,
  "password" | "classRoomId" | "createdAt" | "updatedAt"
>;
export type UserWithAvatar = User & { avatar: LeanPicture | null };
export type LeanUserWithAvatar = Pretty<
  Omit<User, "password" | "classRoomId"> & {
    avatar: LeanPicture | null;
  }
>;

// Class
export type CreateClassInput = InferType<typeof createClassInputSchema>;

// Picture
export type LeanPicture = Pick<Picture, "url" | "width" | "height">;
