import { ContactInterface } from "./contact.interface";

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string;
    contacts: ContactInterface[];
    spam: boolean;
}
