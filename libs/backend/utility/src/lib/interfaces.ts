import { LeanPicture } from "@result-system/shared/utility";

import { UserRegistrationBody } from "./types";

// Auth
export interface UserCreateInput
  extends Omit<UserRegistrationBody, "confirmPassword"> {
  username: string;
  avatar?: LeanPicture;
}
