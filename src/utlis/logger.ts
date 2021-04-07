import { createLogger, transports, format } from "winston";
const { combine, timestamp, label, prettyPrint } = format;

const getLogger = (myLabel: string) => {
  const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: "./logs/combined.log" }),
      new transports.File({ filename: `./logs/${myLabel}.log` }),
    ],
    format: combine(label({ label: myLabel }), timestamp(), prettyPrint()),
  });
  return logger;
};

export default getLogger;
