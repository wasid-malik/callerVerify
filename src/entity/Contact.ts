import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ContactInterface } from "../interfaces/contact.interface";
import { User } from "./User";
 
@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  name: string;
 
  @Column()
  phone: string;

  @Column({
    default: false
  })
  spam: boolean;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  constructor(body: Partial<ContactInterface>) {
    if (!body) {
        return;
    }
    this.name = body.name;
    this.phone = body.phone;
    this.spam = false;
  }
}
