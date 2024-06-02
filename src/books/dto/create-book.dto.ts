// import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateBookDto {
    id:number
    
    name: string;
    
    writer:string;
    
    releaseDate:string;
    
    availableQuantity:number;
    

}
