import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { UserInterface } from "../interfaces/user.interface";
import { AppDataSource } from "../db";
import { compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Like } from "typeorm";
import { hash } from "bcrypt";
import { Contact } from "../entity/Contact";

const UserRepository = AppDataSource.getRepository(User);
const ContactRepository = AppDataSource.getRepository(Contact);

class UserController {
  public async createUser(req: Request, res: Response) {
    try {
      console.log('creating user')
      const duplicate = await UserRepository.find({
        where: {
          phone: req.body.phone
        }
      });
      if (duplicate[0]) {
        return res.status(409).send("Phone number already in use");
      }
      const userData: UserInterface = req.body;
      userData.password = await hash(req.body.password, 10)
      const user = new User(userData);
      await UserRepository.save(user);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  public async login(req: Request, res: Response) {
    try {
      const {email, phone, password} = req.body;
      let user: any = await UserRepository.findOne({
        where: {
          phone
        }
      });
      if (!user) {
        user = await UserRepository.findOne({
          where: {
            email
          }
        });
      }
      if (user && (await compare(password, user.password))) {
        const token = sign({ userId: user.id }, process.env.JWT_KEY, {
          expiresIn: "1h",
        });
        delete user.password;
        res.status(200).json({ token: token, user: user });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  public async authenticate(req: Request | any, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token not provided" });
    }
    try {
      const decoded: any = verify(token, process.env.JWT_KEY); // Verify the token using your secret key
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
  };

}
const userController = new UserController();
export default userController;
