import "reflect-metadata";
import { DataSource } from "typeorm";
import { entities } from "../entity";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as any || 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === "true",
  logging: process.env.DB_LOGGING === "true",
  entities,
  migrations: [],
  subscribers: [],
});

export const initializeDB = () => {
  return new Promise(async (res, rej) => {
    AppDataSource.initialize()
      .then(async () => {
        // AppDataSource.synchronize(true)
        res(true);
      })
      .catch(async (error) => {
        if (error.code === 'ER_BAD_DB_ERROR') {
          console.log('Database does not exist, please run `CREATE DATABASE truecaller;` in my MySql cmdline`')
        }
        rej(error);
      });
  });
};
