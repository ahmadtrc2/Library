import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
@PrimaryGeneratedColumn()
id:number

@Column()
 public name:string;;

@Column()
 writer:string;

@Column()
 releaseDate:string;

@Column()
public availableQuantity:number;

}
