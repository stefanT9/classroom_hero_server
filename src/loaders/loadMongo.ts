import getLogger from "../utlis/logger";
const mongoose = require("mongoose");
const logger = getLogger("[MONGOOSE LOADER]");

const loadMongo = async () => {
  const { MONGO_URL } = process.env;

  await mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((res) => {
      logger.info("connected to mongo");
    })
    .catch((err) => {
      logger.error("ERROR connecting to mongo", err);
      throw new Error("Error connecting to mongo");
    });
};

export default loadMongo;
