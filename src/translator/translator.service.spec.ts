import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../books/entities/book.entity';
import { Repository } from 'typeorm';
import { Translator } from './entities/translator.entity';
import { TranslatorModule } from './translator.module';
import { TranslatorService } from './translator.service';
import { CreateTranslatorDto } from './dto/create-translator.dto';

describe('TranslatorService', () => {
  let service: TranslatorService;
  let translatorRepository: Repository<Translator>;
  let bookRepository: Repository<Book>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      imports: [TranslatorModule,
        TypeOrmModule.forFeature([TranslatorModule]),
        TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [
          __dirname + '/../**/*.entity.ts'
        ],
        synchronize: true,
      })
      ],

      providers: [TranslatorService,{
        provide: getRepositoryToken(Translator),
        useValue: {},}],
    }).compile();

    service = module.get<TranslatorService>(TranslatorService);
    translatorRepository = module.get<Repository<Translator>>(getRepositoryToken(Translator));
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create translator', async() => {
    let translatorDto = new CreateTranslatorDto();
   let books= await bookRepository.find()
   console.log("+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-books",books)
   translatorDto.id=13
   translatorDto.name=`karim oghlo`
   translatorDto.brithday=`1332/08/23`
   translatorDto.biography="bacheye khobi bod"
  
    
    const result =await service.create(translatorDto);
    console.log("+-+-+-++-+-+-+-+-+-+-+\\\\\\\\\\\\\\\\\\-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-result",result)

    expect(result.id).toBe(13);
    expect(result.name).toBe('karim oghlo');
    expect(result.brithday).toBe('1332/08/23');
    expect(result.biography).toBe('bacheye khobi bod');

  });

  it('we create fake data for translator  ', () => {
    let i=0
    let translatorDto = new CreateTranslatorDto();

    while(i<10){
      translatorDto.id=i
      translatorDto.name=`TranslatorName${i}`
      translatorDto.brithday=`${i}/${i}/13${(i*10)+15}`
      translatorDto.biography=`TranslatorBigraphy ${i}`
      service.create(translatorDto)
      i++
    }
    expect(i).toBe(10);
  });

  it('should be find all records', () => {
    let find = service.findAll()

    expect(find).not.toBe(null);
  });
  it('should be find one by id', async() => {
    const id=13
    let findById =await service.findById(id)
    
    expect(findById).toEqual({ id: 13, name: 'karim oghlo',
    biography: "bacheye khobi bod",
     brithday: "1332/08/23",})
  });

  it('should be find one by Name', async() => {

    let findByName =await service.findByName("karim oghlo")

    expect(findByName).toEqual({ id: 13, name: 'karim oghlo',
      biography: "bacheye khobi bod",
       brithday: "1332/08/23",})

  });

  it('should be update by Name', async() => {
    
    service.update("karim oghlo",{name:"zahra piri"})
    expect(service.findByName("zahra piri")).not.toBe(null);
  });
  it('should be update by Id', async() => {
    service.update(13,{biography:"esmi bood"})
    let book = await  service.findById(13)
    expect(book.biography).toEqual("esmi bood");
  });



  // it('should be delete', async() => {
  //   await service.remove(13);
  //   expect(await service.findById(13)).toBe(null);
  // });




});
