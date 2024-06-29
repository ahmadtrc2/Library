import { Injectable, Logger } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { getRepositoryToken, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Writer } from '../writer/entities/writer.entity';
import { async } from 'rxjs';
import { transport } from 'winston';
@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    // private writerRepository: Repository<Writer>,
    @InjectRepository(Writer)
    private writerRepository: Repository<Writer>,
    

  ) {}
  
  
  async create(createBookDto: CreateBookDto):Promise<Book> {
    const book = new Book();


    book.id=createBookDto.id;
    book.name=createBookDto.name;
    book.releaseDate=createBookDto.releaseDate;
    book.availableQuantity=createBookDto.availableQuantity;
    this.logger.log(`Creating a new book: ${JSON.stringify(createBookDto)}`);
    return await this.booksRepository.save(book);
  }

  async findAll() {
    
    return await this.booksRepository.find();
  }

  async findById(id: number):Promise<Book> {
    let book 
    book =await this.booksRepository.findOneBy({id})
    return this.booksRepository.findOneBy({id});
  }

    async findByName(name: string): Promise<Book[]>  {
      let book = await this.booksRepository.find({where:{name}});
      // console.log("=========================book=====================================", book);
    return book;

  }

  async update(IdOrName: any, updateBookDto: any) {
    this.logger.log(`Updating book: ${IdOrName} with data: ${JSON.stringify(updateBookDto)}`);
    let book: Book | undefined;
    let bookId: number ;
  
    if (typeof IdOrName === 'number') {
      bookId = IdOrName;
    } else if (typeof IdOrName === 'string') {
      const bookByName = await this.booksRepository.findOne({ where: { name: IdOrName } });
      //اینحا بایدد تغیییر کنه اگه چندتا کتاب بایه اشم وجود داشته باشه بدون اهمیت به مابقی اولین کتاب رو تغییر میده و باید از آ دی استفاذه بشه
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
    this.logger.log(`Removing book with id: ${id}`);
    await this.booksRepository.delete(id);
  }

  async asignById(bookId:number,writerId:number){
    const book = await this.booksRepository.findOne({ where: { id: bookId }, relations: ['writer'] });
    const writer = await this.writerRepository.findOne({ where: { id: writerId }, relations: ['books']});

    if (!book || !writer) {
          // console.log("==============================================================Book or Writer not found",bookId,writerId)

      throw new Error('Book or Writer not found');
    }
    // console.log("==============================================================writer.books",writer.books)

    book.writer = writer;
    if (!writer.books) {
      writer.books = [];
    }

    writer.books.push(book)
    await this.writerRepository.save(writer);
    return this.booksRepository.save(book);

  }

  async findByDate(date1:Date, date2:Date):Promise<Book[]>{
    const query = this.booksRepository
    .createQueryBuilder("book")
    .orderBy("releaseDate", "ASC")
    if (date2) {
      query.where("book.releaseDate BETWEEN :date1 AND :date2", { date1, date2 });
    } else {
      query.where("book.releaseDate = :date1", { date1 });
    }
    return await query.getMany();

  }

  async findRelation(): Promise<Book[]> {  
    const query = this.booksRepository
    .createQueryBuilder("book")
    .leftJoinAndSelect("book.writer", "writer")
    .where("book.writer IS NOT NULL")
    return await query.getMany();

  }

  async findFirstBook():Promise<Book>{
    const query = this.booksRepository

    .createQueryBuilder('book')
    .orderBy('book.id', 'ASC')
    .limit(1)
    return await query.getOne();
    
  }

  async findMiddleBook():Promise<Book>{
    const totalBooks = await this.booksRepository.count();
    const middleIndex = Math.floor(totalBooks / 2);

    const query = this.booksRepository
    .createQueryBuilder('book')
    .orderBy('book.id','ASC')
    .skip(middleIndex-1)
    .limit(1)
    return await query.getOne();

  
  }

  async findSecondLastBook(): Promise<Book> {
    const query = this.booksRepository
    .createQueryBuilder('book')
      .orderBy('book.id', 'DESC')
      .skip(1)
      .take(1) 
      return await query.getOne();

  }

  async availableQuantity(nameOrId: any, number: number){
    this.logger.log(`book Quantity changing : ${nameOrId} with number: ${JSON.stringify(number)}`);
    let book: Book  ;
    let books: Book[]
    if (typeof nameOrId === 'string') {
      books = await this.findByName(nameOrId);
      if(books.length>1){
        this.logger.log(`you have to send just id there is more than a book by this name : ${JSON.stringify(books)}`);
        return console.log("you have to send just id there is more than a book by this name")
      }
      book =books[0]
    } else if (typeof nameOrId === 'number') {
      book = await this.findById(nameOrId);
    }
  
    if (!book) {
      console.log("Book not find");
      return null; 
    }
  
    let newAvailableQuantity = book.availableQuantity - number;
    await this.update(nameOrId, { availableQuantity: newAvailableQuantity });
  
    // console.log("=========================availableQuantity=====================================");
  }
  

}
