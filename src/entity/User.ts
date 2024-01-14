import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserInterface } from "../interfaces/user.interface";
import { Contact } from "./Contact";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  // Establish a OneToMany relationship with Contact
  @OneToMany(() => Contact, (contact) => contact.user, { cascade: true })
  contacts: Contact[];

  @Column({
    default: false
  }) 
  spam: boolean;

  constructor(body: Partial<UserInterface>) {
      if (!body) {
        return;
      }
      this.name = body.name;
      this.email = body.email;
      this.password = body.password;
      this.phone = body.phone;
      this.contacts = (body.contacts || []).map((contactData: any) => new Contact(contactData));
  }
}
