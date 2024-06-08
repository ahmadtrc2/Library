import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translator } from './entities/translator.entity';
import { TranslatorController } from './translator.controller';
import { TranslatorService } from './translator.service';

describe('TranslatorController', () => {
  let controller: TranslatorController;
  let service: TranslatorService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TranslatorController],
      providers: [TranslatorService,
        {
          provide: getRepositoryToken(Translator),
          useClass: Repository,
        },],
    }).compile();

    controller = module.get<TranslatorController>(TranslatorController);
    service = module.get<TranslatorService>(TranslatorService);
  });

  it('should be defined', () => {
   expect(controller).toBeDefined();
  });
});
