import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
    id:number
    
    @ApiProperty()
    name: string;
    

    @ApiProperty()
    @IsOptional()
    writer:string;

    @ApiProperty()
    @IsOptional()
    translator:string;
    

    @ApiProperty()
    releaseDate:Date;
    
    @ApiProperty()
    availableQuantity:number;
  BookDto: any;
    

}
