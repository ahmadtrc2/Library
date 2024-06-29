import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { getRepositoryToken, InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books.module';
import { CreateBookDto } from './dto/create-book.dto';
import { Repository } from 'typeorm';
import { Writer } from '../writer/entities/writer.entity';
import { faker } from '@faker-js/faker'

describe('BooksService', () => {
  let service: BooksService;
  let writerRepository: Repository<Writer>;

  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      imports: [BooksModule,TypeOrmModule.forFeature([Book,Writer]) ,TypeOrmModule.forRoot({
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
    
    BookDto.id=99999999
    BookDto.name=`blackswan`
    BookDto.writer=`nima yooshij`
    const date = new Date();
    
    BookDto.releaseDate=date
    // console.log("=======================datedate======================================",date)

    BookDto.availableQuantity=54
    const result =await service.create(BookDto);
    expect(result).toBeDefined();
    expect(result.id).toBe(99999999);
    expect(result.name).toBe('blackswan');
    
    expect(result.releaseDate).not.toBe(null);
    expect(result.availableQuantity).toBe(54);
  });
  //////////////////////////

  it(
    'we create fake data for book',
    async () => {
      let i = 0,
        j = 0;
      const BookDto = new CreateBookDto();
      while (j < 1000) {
        while (i < 1000) {
          BookDto.id = i + 1000 * j;
          BookDto.name = faker.person.lastName() + 'book';
          BookDto.writer = `writerName${i * 111}`;
          BookDto.releaseDate = faker.date.past();
          BookDto.availableQuantity = faker.number.int();
          await service.create(BookDto);
          i++;
        }
        i = 0;
        j++;
        await sleep(2000);
      }
      expect(j).toBe(100);
    },
    300000000 // Increase the timeout to 300 seconds
  );


  ////////////////////////////
  // it('we create fake data for book  ', async() => {
  //   let i=0,j=0
  //   let BookDto = new CreateBookDto();
  //   const randomName = faker.person.fullName();
  //   while(j<100){
  //    while(i<1000){
  //     BookDto.id=i+1000*j
  //     BookDto.name=faker.person.lastName()+"book";
  //     BookDto.writer=`writerName${i*111}`
  //     BookDto.releaseDate=faker.date.past()
  //     BookDto.availableQuantity=faker.number.int()
  //   // console.log("=============================================================",)

  //      await service.create(BookDto)
  //     i++
  //   }
  //   i=0
  //   j++
  //   await sleep(2000)}
  // expect(j).toBe(100);//must change to j
  // });

  it('should be find all records', () => {
    let find = service.findAll()

    expect(find).not.toBe(null);
  });

  it('should be find one by id', async() => {
    const id=99999999
    let findById =await service.findById(id)
    
    // expect(findById).toEqual({ id: 9999, name: 'blackswan',/* writer:`nima yooshij`,*/
    // releaseDate:`1359/11/10`,
    // availableQuantity:54})
  });

  

  it('should be find one by Name', async() => {

    let findByName =await service.findByName("blackswan")

  //   expect(findByName).toEqual({ id: 9999, name: 'blackswan',/* writer:`nima yooshij`,*/
  //   releaseDate:`1359/11/10`,
  //   availableQuantity:54})
  });

  it('should be update by Name', async() => {
    
    service.update("blackswan",{name:"1984"})
    expect(service.findByName("1984")).not.toBe(null);
  });
  
  it('should be update by Id', async() => {
    service.update(99999999,{availableQuantity:10})
    let book = await  service.findById(99999999)
    expect(book.availableQuantity).toEqual(10);
  });

  // it('should be delete', async() => {
  //   await service.remove(2);
  //   expect(await service.findById(2)).toBe(null);
  // });

  
  it("should be asign book to writer by ID",async()=>{
    service.asignById(2,3)
    let book =await service.findById(2)
    let writer =await writerRepository.findBy({})

  //  expect(book.writerId).toEqual(3)
    // expect(writer).toEqual(2)

  })

  it("should be asign book to writer by random",async()=>{

    for(let i =1; i<100;i++){
      for(let j =3; j>0;j--){
        service.asignById((i*3)-j,i)
      }
    }
    //  expect(book.writer).toEqual(3)
    //   expect(writer).toEqual(2)
  })
it("should find Books by date", async()=>{
  const date1 = faker.date.past();
  const date2 = faker.date.future();

  const books=await service.findByDate(date1 ,date2)
  // console.log("====================>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<========================",books)
  expect(books).not.toBe(null)
})

  it("should find relation",async()=>{
    service.findRelation()
    //  console.log("==============================================================service.findRelation()",await service.findRelation())
  })
  it("should find FIRSTbOOK",async()=>{
  expect(await service.findFirstBook()).not.toBe(null)
    
    // console.log("==============================================================findFirstBook()",await service.findFirstBook())
  })

  it("should find Middle Book",async()=>{
    expect(await service.findMiddleBook()).not.toBe(null)

    // console.log("==============================================================findMiddleBook()",await service.findMiddleBook())
  })

  it("should find findSecondLastBook Book",async()=>{
    expect(await service.findSecondLastBook()).not.toBe(null)
    
    // console.log("==============================================================findSecondLastBook()",await service.findSecondLastBook())
  })

  it("should change availableQuantity", async () => {
    let book = await service.findById(99999999);
  
  
    // console.log("=========================book=====================================", book);
  
    let availableBefore = book.availableQuantity;
    
    await service.availableQuantity('1984', 5);
    
    book = await service.findById(99999999);
    let availableNow = book.availableQuantity;
  
    // console.log("=========================availableQuantity=====================================", availableNow);
  
    expect(availableBefore - availableNow).toEqual(5);
  });
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});
