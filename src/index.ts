require("source-map-support").install();
import { config } from "dotenv";
config();

import * as express from "express";
import getLogger from "./utlis/logger";
import apiRouter from "./routes";
import { json } from "body-parser";
import { ValidationError } from "express-validation";
import { PORT as port } from "./constants";
import loaders from "./loaders";
const logger = getLogger("startup");
const mongoose = require("mongoose");

const serverStatus = () => {
  return {
    state: "up",
    dbState: mongoose.STATES[mongoose.connection.readyState],
  };
};

//  Plug into middleware.
const getApp = async () => {
  await loaders.loadMongo();
  const app = express();
  app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    next();
  });
  app.use(json());
  app.use(apiRouter);
  app.use(
    "/uptime",
    require("express-healthcheck")({
      healthy: serverStatus,
    })
  );
  app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err.details);
    }

    return res.status(500).json(err);
  });

  app.use((req, res) => {
    return res.status(404).json({ message: "not found" });
  });

  app.listen(port, () => {
    logger.info(`listening on port ${port}`);
  });
};

getApp();
