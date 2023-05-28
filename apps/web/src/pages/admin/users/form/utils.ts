import _ from "lodash";
import * as yup from "yup";

import {
  IMAGE_MIMES,
  generateNotImageErrorMessage,
  generateTooLargeFileErrorMessage,
  maxFileSize,
  registerInputSchema,
} from "@result-system/shared/utility";

export const createUserSchema = registerInputSchema.shape({
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

export type CreateUserInput = yup.InferType<typeof createUserSchema>;
