import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}
  
  create(createBookDto: CreateBookDto):Book {
    const book = new Book();

    book.id=createBookDto.id,
    book.name=createBookDto.name,
    book.writer=createBookDto.writer,
    book.releaseDate=createBookDto.releaseDate,
    book.availableQuantity=createBookDto.availableQuantity,
    console.log("-----------",book)
    return book;
  }

  findAll() {
    
    return this.booksRepository.find();
  }

  findById(id: number):any {
    return this.booksRepository.findOneBy({id});
  }

    async findByName(name: string): Promise<Book>  {
    return await this.booksRepository.findOne({where :{name}});

  }

  async update(IdOrName: number, updateBookDto: any) {
    let book: Book;
    if (typeof IdOrName === 'number') {
      book = await this.booksRepository.findOne({ where: { id: IdOrName } });
    } else if (typeof IdOrName === 'string') {
      book = await this.booksRepository.findOne({ where: { name: IdOrName } });
    }
  
    if (!book) {
      throw new Error('Book not found');
    }
  
    await this.booksRepository.update(book.id, updateBookDto);
    return this.booksRepository.findOne({ where: { id: book.id } });
  }
  

  async remove(id: number) {
    await this.booksRepository.delete(id);
  }
}
