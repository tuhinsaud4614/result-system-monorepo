import type {
  LeanPicture,
  RegisterInput,
  UpdateUserInput,
} from "@result-system/shared/utility";

// Auth
export interface UserCreateInput
  extends Omit<RegisterInput, "confirmPassword"> {
  username: string;
  avatar?: LeanPicture;
}

// User
export interface UserUpdateInputWithAvatar
  extends Omit<UpdateUserInput, "confirmPassword"> {
  avatar?: LeanPicture;
}
