import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity()
export class Translator{

@PrimaryGeneratedColumn()
id:number

@Column()
name:string

@Column()
brithday:string

@Column()
biography: string;


@OneToMany(()=>Book, book=> book.writer)
books:Book[];
}