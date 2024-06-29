import * as winston from 'winston';

export const winstonConfig = {
  level: 'debug', // اضافه کردن سطح لاگ
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
      ),
    }),
    new winston.transports.File({
      filename: 'application.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
};
