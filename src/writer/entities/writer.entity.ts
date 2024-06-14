import { Book } from "../../books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Writer{

@PrimaryGeneratedColumn()
id:number

@Column()
name:string


@Column()
brithday:string

@Column()
biography: string;


@OneToMany(() => Book, book => book.writer,)
books: Book[];
  writer: Book;
}

