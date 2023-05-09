import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";
import swaggerUI from "swagger-ui-express";

import {
  API_ROUTE,
  errorHandler,
  notFoundHandler,
} from "@result-system/backend/utility";

import routes from "./routes";
import swaggerJson from "./swagger.json";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use("/" + API_ROUTE.assets, express.static(path.join(__dirname, "assets")));

app.use(API_ROUTE.v1, routes);

app.use(`${API_ROUTE.v1}/docs`, swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.get(`${API_ROUTE.v1}/docs.json`, (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
