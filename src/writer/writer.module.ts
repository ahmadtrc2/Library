import { Module } from '@nestjs/common';
import { WriterService } from './writer.service';
import { WriterController } from './writer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Writer } from './entities/writer.entity';
import { Book } from '../books/entities/book.entity';

@Module({
  
  imports:[TypeOrmModule.forFeature([Writer,Book ])],
  controllers: [WriterController],
  providers: [WriterService]
})
export class WriterModule {}
