import bodyParser from 'body-parser';
import express from 'express';
import db from './db/db.js';
import dotenv from 'dotenv';
import orderRouter from './routers/order.js';
import dishesRouter from './routers/dishes.js';
import waitersRouter from './routers/waiters.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/order', orderRouter);
app.use('/dishes', dishesRouter);
app.use('/waiters', waitersRouter);

const PORT = process.env.PORT || 3000;
(async () => {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`Listning via port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
