import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Writer } from '../writer/entities/writer.entity';
@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    // private writerRepository: Repository<Writer>,
    // @InjectRepository(Writer)
    // private writerRepository: Repository<Writer>,

  ) {}
  
  async create(createBookDto: CreateBookDto):Promise<Book> {
    const book = new Book();

    book.id=createBookDto.id;
    book.name=createBookDto.name;
    // book.writer=createBookDto.writer;
    book.releaseDate=createBookDto.releaseDate;
    book.availableQuantity=createBookDto.availableQuantity;
    //console.log("-----------",book);
    return await this.booksRepository.save(book);
  }

  async findAll() {
    // console.log("+--+-+-+--+-+-+--+----+-+-+-+-+----+---+-find Alllllllll",await this.booksRepository.find())
    
    return await this.booksRepository.find();
  }

  async findById(id: number):Promise<any> {
    let book 
    book =await this.booksRepository.findOneBy({id})
    return this.booksRepository.findOneBy({id});
  }

    async findByName(name: string): Promise<any>  {
      let book = await this.booksRepository.findOneBy({name});
    return book;

  }

  async update(IdOrName: any, updateBookDto: any) {
    let book: Book | undefined;
    let bookId: number ;
  
    if (typeof IdOrName === 'number') {
      bookId = IdOrName;
    } else if (typeof IdOrName === 'string') {
      const bookByName = await this.booksRepository.findOne({ where: { name: IdOrName } });
      if (bookByName) {
        bookId = bookByName.id;
      }
    }
  
    if (!bookId) {
      console.log("Book not found");
      return null; // Return null or handle the error as needed
    }
  

  
    await this.booksRepository.update(bookId, updateBookDto);

    return this.booksRepository.findOne({ where: { id: bookId } });
  }

  async remove(id: number) {
    await this.booksRepository.delete(id);
  }

  async asignById(bookId:number,writerId:number){
    const book = await this.booksRepository.findOne({ where: { id: bookId } });
    // const writer = await this.writerRepository.findOne({ where: { id: writerId } });

    // if (!book || !writer) {
    //   throw new Error('Book or Writer not found');
    // }

    // book.writer = writer;
    return this.booksRepository.save(book);

  }

}
