import { Writer } from "../../writer/entities/writer.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Book {
@PrimaryGeneratedColumn()
id:number

@Column()
 public name:string;;
 
 @Column({ type: 'date' })
 releaseDate:Date;//change date type
 
 @Column()
 public availableQuantity:number;
 
@ManyToOne(() => Writer, (writer) => writer.books, /*{ nullable: true }*/)
 writer: Writer;

}
