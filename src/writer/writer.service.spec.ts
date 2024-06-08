import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../books/entities/book.entity';
import { CreateWriterDto } from './dto/create-writer.dto';
import { Writer } from './entities/writer.entity';
import { WriterModule } from './writer.module';
import { WriterService } from './writer.service';

describe('WriterService', () => {
  let service: WriterService;
  let writerRepository: Repository<Writer>;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      imports: [WriterModule,
        TypeOrmModule.forFeature([WriterModule]),
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
    writerDto.id=13
    writerDto.name=`sadegh hedayat`
    writerDto.brithday=`1332/08/23`
    writerDto.biography="bacheye khobi bod"
    // writerDto.books=[books[0]]
  
    
    const result =await service.create(writerDto);
    console.log("+-+-+-++-+-+-+-+-+-+-+\\\\\\\\\\\\\\\\\\-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-result",result)

    expect(result.id).toBe(13);
    expect(result.name).toBe('sadegh hedayat');
    expect(result.brithday).toBe('1332/08/23');
    expect(result.biography).toBe('bacheye khobi bod');

  });

  it('we create fake data for writers  ', () => {
    let i=0
    let writerDto = new CreateWriterDto();

    while(i<10){
      writerDto.id=i
      writerDto.name=`WriterName${i}`
      writerDto.brithday=`${i}/${i}/13${(i*10)+25}`
      writerDto.biography=`WriterBigraphy ${i}`
      service.create(writerDto)
      i++
    }
    expect(i).toBe(10);
  });

  // it('should create a writer with books', async () => {


  //   const writer = writerRepository.create({
  //     name: 'John Doe',
  //     brithday: '1990-01-01',
  //     biography: 'An amazing writer',
  //     books: [
  //       {
  //         name: 'Book 1',
  //         releaseDate: '2020-01-01',
  //         availableQuantity: 5,
  //       },
  //       {
  //         name: 'Book 2',
  //         releaseDate: '2021-01-01',
  //         availableQuantity: 3,
  //       },
  //     ],
  //   });

  //   await writerRepository.save(writer);
  //   const writers = await writerRepository.find({ relations: ['books'] });

  //   expect(writers.length).toBeGreaterThan(0);
  //   expect(writers[0].books.length).toBe(2);
  // });

  it('should be find all records', () => {
    let find = service.findAll()

    expect(find).not.toBe(null);
  });

  it('should be find one by id', async() => {
    const id=13
    let findById =await service.findById(id)
    
    expect(findById).toEqual({ id: 13, name: 'sadegh hedayat',
    biography: "bacheye khobi bod",
     brithday: "1332/08/23",})
  });

  it('should be find one by Name', async() => {

    let findByName =await service.findByName("sadegh hedayat")

    expect(findByName).toEqual({ id: 13, name: 'sadegh hedayat',
      biography: "bacheye khobi bod",
       brithday: "1332/08/23",})

  });

  it('should be update by Name', async() => {
    
    service.update("sadegh hedayat",{name:"Simin daneshvar"})
    expect(service.findByName("Simin daneshvar")).not.toBe(null);
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

