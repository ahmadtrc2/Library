import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { TranslatorController } from './translator.controller';
import { Translator } from './entities/translator.entity';
import { Book } from '../books/entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Translator,Book ])],
  controllers: [TranslatorController],
  providers: [TranslatorService]
})
export class TranslatorModule {}
