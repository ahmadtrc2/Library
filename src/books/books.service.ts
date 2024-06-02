import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
@Injectable()
export class BooksService {
  
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
    
    return `This action returns all books`;
  }

  findById(id: number):any {
    return `This action returns a #${id} book`;
  }

    findByName(id: number):any {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
