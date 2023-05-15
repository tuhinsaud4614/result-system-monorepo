import * as yup from "yup";

const envSchema = yup.object({
  POSTGRES_HOST: yup.string().required(),
  POSTGRES_PORT: yup.string(),
  POSTGRES_USER: yup.string().required(),
  POSTGRES_PASSWORD: yup.string().required(),
  POSTGRES_DB: yup.string().required(),
  DATABASE_URL: yup.string().required(),
  APP_VERSION: yup.string().optional(),
  ACCESS_TOKEN_SECRET_KEY: yup.string().required(),
  REFRESH_TOKEN_SECRET_KEY: yup.string().required(),
  ACCESS_TOKEN_EXPIRES: yup.string().required(),
  REFRESH_TOKEN_EXPIRES: yup.string().required(),
  REDIS_HOST: yup.string().required(),
  REDIS_PORT: yup.string().required(),
  HOST: yup.string().required(),
  PORT: yup.string().required(),
  CLINT_URL: yup.string(),
});

const environment = envSchema.validateSync(process.env);
export default environment;
