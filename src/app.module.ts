import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/entities/book.entity';
import { WriterModule } from './writer/writer.module';
import { TranslatorModule } from './translator/translator.module';
import { Writer } from './writer/entities/writer.entity';
import { Translator } from './translator/entities/translator.entity';
import { winstonConfig } from './winstone.config';
import { WinstonModule } from 'nest-winston';
@Module({
  imports: [BooksModule,WinstonModule.forRoot(winstonConfig),
     TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [Book,Writer,Translator],
    synchronize: true,
  }), WriterModule, TranslatorModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


