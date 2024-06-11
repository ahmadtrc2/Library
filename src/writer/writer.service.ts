import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { writer } from 'repl';
import { Book } from '../books/entities/book.entity';
import { Repository } from 'typeorm';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';
import { Writer } from './entities/writer.entity';

@Injectable()
export class WriterService {


  constructor(
    @InjectRepository(Writer)
    private writerRepository: Repository<Writer>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}
  
  async create(createWriterDto: CreateWriterDto):Promise<Writer> {
    const writer = new Writer();

    writer.id=createWriterDto.id;
    writer.name=createWriterDto.name;
    writer.brithday=createWriterDto.brithday;
    writer.biography=createWriterDto.biography;
    // writer.books[1i]=createWriterDto.books
    return await this.writerRepository.save(writer);
  }
  // async createWriter(writerData: Partial<Writer>): Promise<Writer> {
  //   const writer = this.writerRepository.create(writerData);
  //   return this.writerRepository.save(writer);
  // }

  async findAll() {
    
    return await this.writerRepository.find();
  }

  async findById(id: number):Promise<any> {
    let writer 
    writer =await this.writerRepository.findOneBy({id})
    return this.writerRepository.findOneBy({id});
  }

    async findByName(name: string): Promise<any>  {
      let writer = await this.writerRepository.findOneBy({name});
    return writer;

  }

  async update(IdOrName: any, updateBookDto: any) {
    let book: Writer | undefined;
    let bookId: number ;
  
    if (typeof IdOrName === 'number') {
      bookId = IdOrName;
    } else if (typeof IdOrName === 'string') {
      const bookByName = await this.writerRepository.findOne({ where: { name: IdOrName } });
      if (bookByName) {
        bookId = bookByName.id;
      }
    }
  
    if (!bookId) {
      console.log("Book not found");
      return null; // Return null or handle the error as needed
    }
  

    await this.writerRepository.update(bookId, updateBookDto);

    return this.writerRepository.findOne({ where: { id: bookId } });
  }

  async remove(id: number) {
    await this.writerRepository.delete(id);
  }
}
