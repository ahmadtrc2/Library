import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winstone.config';
import * as winston from 'winston';

/////////////////////////////

const logger = winston.createLogger({
  level: 'debug',
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
});

//////////////////////////
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
//Swagger config
  const config = new DocumentBuilder()
  .setTitle("Nest Api")
  .setDescription('the description of Api')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup('/',app,document)
// end of Swagger config
  await app.listen(3000);
}
bootstrap();
