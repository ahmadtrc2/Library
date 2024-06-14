import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';


@ApiTags('users')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.booksService.findById(+id);
  }

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.booksService.findByName(name);
  }


  @Patch(':IdOrName')
  update(@Param('IdOrName') IdOrName: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(IdOrName, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
