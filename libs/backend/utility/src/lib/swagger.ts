import type { Options } from "swagger-jsdoc";
import swaggerJsdoc from "swagger-jsdoc";

import environment from "./environment";

const options: Options = {
  definition: {
    openApi: "3.0.0",
    info: {
      title: "Result System REST API",
      version: environment.APP_VERSION || "1.0",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts", "./src/schema/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
