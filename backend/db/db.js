import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = {
  connect: async function () {
    this.connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
  },
  query: async function (queryStr, argsArr) {
    return this.connection.query(queryStr, argsArr);
  },
};

export default db;
