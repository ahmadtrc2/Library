import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Writer } from '../writer/entities/writer.entity';
import { winstonConfig } from '../winstone.config';
import { WinstonModule } from 'nest-winston';

@Module({

  imports:[TypeOrmModule.forFeature([Book,Writer]),
  WinstonModule.forRoot(winstonConfig),],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
 
