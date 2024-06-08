import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTranslatorDto } from './dto/create-translator.dto';
import { UpdateTranslatorDto } from './dto/update-translator.dto';
import { Translator } from './entities/translator.entity';

@Injectable()
export class TranslatorService {

  constructor(
    @InjectRepository(Translator)
    private translatorRepository: Repository<Translator>,
    // @InjectRepository(Book)
    // private booksRepository: Repository<Book>,
  ) {}



  async create(createTranslatorDto: CreateTranslatorDto):Promise<Translator> {
    const translator = new Translator();

    translator.id=createTranslatorDto.id;
    translator.name=createTranslatorDto.name;
    translator.brithday=createTranslatorDto.brithday;
    translator.biography=createTranslatorDto.biography;
    // writer.books[1i]=createWriterDto.books
    return await this.translatorRepository.save(translator);
  }

  async findAll() {
    
    return await this.translatorRepository.find();
  }

  async findById(id: number):Promise<any> {
    let translator 
    translator =await this.translatorRepository.findOneBy({id})
    return this.translatorRepository.findOneBy({id});
  }

  async findByName(name: string): Promise<any>  {
    let translator = await this.translatorRepository.findOneBy({name});
  return translator;

}


async update(IdOrName: any, updateBookDto: any) {
  let book: Translator | undefined;
  let bookId: number ;

  if (typeof IdOrName === 'number') {
    bookId = IdOrName;
  } else if (typeof IdOrName === 'string') {
    const bookByName = await this.translatorRepository.findOne({ where: { name: IdOrName } });
    if (bookByName) {
      bookId = bookByName.id;
    }
  }

  if (!bookId) {
    console.log("Book not found");
    return null; // Return null or handle the error as needed
  }



  await this.translatorRepository.update(bookId, updateBookDto);

  return this.translatorRepository.findOne({ where: { id: bookId } });
}
async remove(id: number) {
  await this.translatorRepository.delete(id);
}
}
