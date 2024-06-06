import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from './database/databas.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './books/entities/book.entity';
@Module({
  imports: [BooksModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Book],
    synchronize: true,
  })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


