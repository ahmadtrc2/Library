import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
@PrimaryGeneratedColumn()
id:number

@Column()
public name:any;

@Column()
public writer:string;

@Column()
public releaseDate:string;

@Column()
public availableQuantity:number;

}
