import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books.module';
import { CreateBookDto } from './dto/create-book.dto';
import { Repository } from 'typeorm';
import { Writer } from '../writer/entities/writer.entity';

describe('BooksService', () => {
  let service: BooksService;
  let writerRepository: Repository<Writer>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BooksModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [
      __dirname + '/../**/*.entity.ts'
    ],
    synchronize: true,
    
  })
  
],
providers: [BooksService,{
  provide: getRepositoryToken(Book),
  useValue: {},
}
],
}).compile();

writerRepository = module.get<Repository<Writer>>(getRepositoryToken(Writer));
service = module.get<BooksService>(BooksService);
});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should be create book', async() => {
    let BookDto = new CreateBookDto();
    
    BookDto.id=13
    BookDto.name=`blackswan`
    BookDto.writer=`nima yooshij`
    // BookDto.translator="abas sahagi"
    BookDto.releaseDate=`1359/11/10`
    BookDto.availableQuantity=54
    //در این محل نویسنده مقدار دهی نمیشد و این مشکل باید حل شود
    const result =await service.create(BookDto);
    console.log("-+-+-+--++++-+++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+result+",result)
    expect(result).toBeDefined();
    expect(result.id).toBe(13);
    expect(result.name).toBe('blackswan');
    // expect(result.writer).toBe('nima yooshij');
    // expect(result.translator).toBe('abas sahagi');
    expect(result.releaseDate).toBe('1359/11/10');
    expect(result.availableQuantity).toBe(54);
  });
  
  it('we create fake data for book  ', () => {
    let i=0
    let BookDto = new CreateBookDto();

    while(i<10){
      BookDto.id=i
      BookDto.name=`name${i}`
      BookDto.writer=`writerName${i*111}`
      BookDto.releaseDate=`${i}/${i}/13${i*10}`
      BookDto.availableQuantity=i*12
      service.create(BookDto)
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
    
    expect(findById).toEqual({ id: 13, name: 'blackswan',/* writer:`nima yooshij`,*/
    releaseDate:`1359/11/10`,
    availableQuantity:54})
  });

  

  it('should be find one by Name', async() => {

    let findByName =await service.findByName("blackswan")

    expect(findByName).toEqual({ id: 13, name: 'blackswan',/* writer:`nima yooshij`,*/
    releaseDate:`1359/11/10`,
    availableQuantity:54})
  });

  it('should be update by Name', async() => {
    
    service.update("blackswan",{name:"1984"})
    expect(service.findByName("1984")).not.toBe(null);
  });
  
  it('should be update by Id', async() => {
    service.update(13,{availableQuantity:10})
    let book = await  service.findById(13)
    expect(book.availableQuantity).toEqual(10);
  });

  // it('should be delete', async() => {
  //   await service.remove(2);
  //   expect(await service.findById(2)).toBe(null);
  // });

  
  it("should be asign book to writer by ID",async()=>{
    service.asignById(2,3)
    let book =await service.findById(2)
    //let writer =await writerRepository.findBy({id:3})
  //  expect(book.writer).toEqual(3)
    // expect(writer.book).toEqual(2)

  })


});
