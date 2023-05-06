import { z } from "zod";

const envSchema = z.object({
  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z.string(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
  APP_VERSION: z.string().optional(),
  ACCESS_TOKEN_SECRET_KEY: z.string().nonempty(),
  REFRESH_TOKEN_SECRET_KEY: z.string().nonempty(),
  ACCESS_TOKEN_EXPIRES: z.string().nonempty(),
  REFRESH_TOKEN_EXPIRES: z.string().nonempty(),
  REDIS_HOST: z.string().nonempty(),
  REDIS_PORT: z.string().nonempty(),
  HOST: z.string().nonempty(),
  PORT: z.string().nonempty(),
});

const environment = envSchema.parse(process.env);
export default environment;
