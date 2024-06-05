import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from './database/databas.config';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [BooksModule, SequelizeModule.forRoot(dataBaseConfig)

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


