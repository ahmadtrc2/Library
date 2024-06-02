import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { async } from 'rxjs';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create book', async() => {
    let BookDto

    BookDto.id=13
    BookDto.name=`blackswan`
    BookDto.writer=`nima yooshij`
    BookDto.releaseDate=`1359/11/10`
    BookDto.availableQuantity=54
    
    const result =await service.create(BookDto);

    expect(result).toBeDefined();
    expect(result.id).toBe(13);
    expect(result.name).toBe('blacksvan');
    expect(result.writer).toBe('nima yooshij');
    expect(result.releaseDate).toBe('1359/11/10');
    expect(result.availableQuantity).toBe(54);
  });

  it('we create book for sample', () => {
    let i=0
    let BookDto
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

  it('should be find one by id', () => {
    let findById = service.findById(1)

    expect(findById.id).toBe(1);
  });

  

  it('should be find one by Name', () => {
    let findByName = service.findByName(1)

    expect(findByName.name).toBe("blackswan");
  });



});
