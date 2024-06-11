import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { CreateWriterDto } from './dto/create-writer.dto';
import { Writer } from './entities/writer.entity';
import { WriterModule } from './writer.module';
import { WriterService } from './writer.service';
import { faker } from '@faker-js/faker'

describe('WriterService', () => {
  let service: WriterService;
  let writerRepository: Repository<Writer>;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      imports: [WriterModule,
        TypeOrmModule.forFeature([WriterModule,Book]),
        TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'database.sqlite',
        entities: [
          __dirname + '/../**/*.entity.ts'
        ],
        synchronize: true,
      })
      ],
      providers: [WriterService,{
        provide: getRepositoryToken(Writer),
        useValue: {},
      }],
    }).compile();

    service = module.get<WriterService>(WriterService);
    writerRepository = module.get<Repository<Writer>>(getRepositoryToken(Writer));
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create Writer', async() => {
    let writerDto = new CreateWriterDto();
   let books= await bookRepository.find()
   console.log("+-+-+-++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-books",books)
    writerDto.id=130
    writerDto.name=`sadegh hedayat`
    writerDto.brithday=`1332/08/23`
    writerDto.biography="bacheye khobi bod"
    // writerDto.books=[books[0]]
  
    
    const result =await service.create(writerDto);
    console.log("+-+-+-++-+-+-+-+-+-+-+\\\\\\\\\\\\\\\\\\-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-result",result)

    expect(result.id).toBe(130);
    expect(result.name).toBe('sadegh hedayat');
    expect(result.brithday).toBe('1332/08/23');
    expect(result.biography).toBe('bacheye khobi bod');

  });

  it('we create fake data for writers  ', () => {
    let i=0
    let writerDto = new CreateWriterDto();

    while(i<100){
      writerDto.id=i
      writerDto.name=faker.person.fullName()
      writerDto.brithday=faker.date.birthdate().toString()
      writerDto.biography=faker.person.bio()
      service.create(writerDto)
      i++
    }
    expect(i).toBe(100);
  });

  it('should be find all records', () => {
    let find = service.findAll()

    expect(find).not.toBe(null);
  });

  it('should be find one by id', async() => {
    const id=130
    let findById =await service.findById(id)
    
    expect(findById).toEqual({ id: 130, name: 'sadegh hedayat',
    biography: "bacheye khobi bod",
     brithday: "1332/08/23",})
  });

  it('should be find one by Name', async() => {

    let findByName =await service.findByName("sadegh hedayat")

    expect(findByName).toEqual({ id: 130, name: 'sadegh hedayat',
      biography: "bacheye khobi bod",
       brithday: "1332/08/23",})

  });

  it('should be update by Name', async() => {
    
    service.update("sadegh hedayat",{name:"Simin daneshvar"})
    expect(service.findByName("Simin daneshvar")).not.toBe(null);
  });
  it('should be update by Id', async() => {
    service.update(130,{biography:"esmi bood"})
    let book = await  service.findById(130)
    expect(book.biography).toEqual("esmi bood");
  });

  // it('should be delete', async() => {
  //   await service.remove(130);
  //   expect(await service.findById(130)).toBe(null);
  // });

  
});

