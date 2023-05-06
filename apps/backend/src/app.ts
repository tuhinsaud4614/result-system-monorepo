import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";
import swaggerUI from "swagger-ui-express";

import {
  API_START_ROUTE,
  errorHandler,
  notFoundHandler,
  swaggerSpec,
} from "@result-system/backend/utility";

import routes from "./routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(API_START_ROUTE.v1, routes);

app.use(
  `${API_START_ROUTE.v1}/docs`,
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec),
);
app.get(`${API_START_ROUTE.v1}/docs.json`, (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
