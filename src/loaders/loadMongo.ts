import getLogger from "../utlis/logger";
const mongoose = require("mongoose");
const logger = getLogger("[MONGOOSE LOADER]");

const loadMongo = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((res) => {
      console.log(res.connection.readyState);
      logger.info("connected to mongo");
    })
    .catch((err) => {
      logger.error("ERROR connecting to mongo", err);
      throw new Error("Error connecting to mongo");
    });
};

export default loadMongo;
