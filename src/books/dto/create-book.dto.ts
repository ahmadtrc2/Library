import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
    id:number
    
    name: string;
    
    @IsOptional()
    writer:string;

    
    @IsOptional()
    translator:string;
    
    releaseDate:string;
    
    availableQuantity:number;
    

}
