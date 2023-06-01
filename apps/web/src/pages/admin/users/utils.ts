import _ from "lodash";
import * as yup from "yup";

import {
  IMAGE_MIMES,
  generateNotImageErrorMessage,
  generateTooLargeFileErrorMessage,
  maxFileSize,
  registerInputSchema,
  updateUserInputSchema,
} from "@result-system/shared/utility";

const avatarSchema = yup.object({
  avatar: yup
    .mixed<File>()
    .nullable()
    .test(
      "fileSize",
      generateTooLargeFileErrorMessage("Avatar", `${5} Mb`),
      (value) => {
        if (!value) return true;
        return value.size <= maxFileSize(5);
      },
    )
    .test("fileFormat", generateNotImageErrorMessage("Avatar"), (value) => {
      if (!value) return true;
      return _.has(IMAGE_MIMES, value.type);
    }),
});

export const createUserSchema = registerInputSchema.concat(avatarSchema);
export const updateUserSchema = updateUserInputSchema.concat(avatarSchema);

export type CreateUserInput = yup.InferType<typeof createUserSchema>;
export type UpdateUserInput = yup.InferType<typeof updateUserSchema>;
