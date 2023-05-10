import type { LeanPicture, RegisterInput } from "@result-system/shared/utility";

// Auth
export interface UserCreateInput
  extends Omit<RegisterInput, "confirmPassword"> {
  username: string;
  avatar?: LeanPicture;
}
