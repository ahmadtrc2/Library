import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WriterService } from './writer.service';
import { CreateWriterDto } from './dto/create-writer.dto';
import { UpdateWriterDto } from './dto/update-writer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('writer')
export class WriterController {
  constructor(private readonly writerService: WriterService) {}

  @Post()
  // create(@Body() createWriterDto: CreateWriterDto) {
  //   return this.writerService.create(createWriterDto);
  // }

  @Get()
  findAll() {
    return this.writerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.writerService.findById(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWriterDto: UpdateWriterDto) {
  //   return this.writerService.update(+id, updateWriterDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.writerService.remove(+id);
  }
}
