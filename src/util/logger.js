const winston = require("winston");
require("winston-daily-rotate-file");

const transport = new winston.transports.DailyRotateFile({
  dirname: "logs",
  filename: "%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

transport.on("rotate", function (oldFilename, newFilename) {
  // do something fun
});

const logFormat = winston.format.combine(
  //winston.format.colorize(),
  winston.format.timestamp({
    format: "YYYY-MM-DD hh:mm:ss",
  }),
  winston.format.align(),
  winston.format.printf(
    (info) =>
      `[${info.timestamp}] [${info.method}] ${info.level}: ${info.message}`
  )
);

module.exports = winston.createLogger({
  format: logFormat,
  transports: [new winston.transports.Console(), transport],
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exception.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

// logger.info("hello", { method: "world" });
// logger.error("Error message", { method: "world2" });
// logger.warn("Warning message", { method: "world3" });
