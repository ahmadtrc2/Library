import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
