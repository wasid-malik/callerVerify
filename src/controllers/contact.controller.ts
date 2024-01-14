import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Contact } from "../entity/Contact";
import { User } from "../entity/User";
import { Like } from "typeorm";
import { getRandomContacts } from "../utils/contact-generator";

const ContactRepository = AppDataSource.getRepository(Contact);
const UserRepository = AppDataSource.getRepository(User);

class ContactController {
  public async markSpam(req: Request, res: Response) {
    try {
      const { phone } = req.body;

      if (phone) {
        const user = await UserRepository.findOne({
          where: {
            phone
          }
        });
        if (user) {
          user.spam = true;
          await UserRepository.save(user);
        }
        let matchingContacts = await ContactRepository.find({
          where: { phone: phone }
        });

        if (!matchingContacts || matchingContacts.length === 0) {
          // If no matching contacts found, create a new contact
          const newContact = ContactRepository.create({
            name: "unknown",
            phone: phone,
            spam: true
          });

          matchingContacts = [await ContactRepository.save(newContact)];
        }

        // Mark all matching contacts as spam
        matchingContacts.forEach(async (contact) => {
          contact.spam = true;
          await ContactRepository.save(contact);
        });

        res.status(200).json({ message: "Contacts marked as spam successfully" });
      } else {
        res.status(400).json({ error: "Invalid request body" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  
  public async search(req: Request, res: Response) {
    try {
      const { name, phone } = req.body;
      if (phone) {
        // Search by phone number
        const user: any = await UserRepository.findOne({
          where: {
            phone
          }
        });
        if (user) {
          delete user.password;
          res.status(200).json(user);
          return;
        } else {

          const matches = await ContactRepository.find({
            where: {
              phone
            }
          });
          res.status(200).json(matches);
          return;
        }
      }
      const matches = await ContactRepository.find({
        where: {
          name: name ? Like(`%${name}%`) : undefined,
        },
        order: {
          name: 'ASC'
        }
      });
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  public async generateRandom(req: Request, res: Response) {
    try {
      const {total} = req.body || req.query;
      if (total > 100) {
        return res.status(400).send({
          error: "Total should be less than or equal to 100"
        });
      }
      const contacts = getRandomContacts(+total);
      const contactList = await ContactRepository.create(contacts);
      await ContactRepository.save(contactList);
      res.status(200).send(contactList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
const contactController = new ContactController();
export default contactController;
