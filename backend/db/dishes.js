import db from './db.js';
const dishesDB = {
  getAllDishes: async () => {
    return await db.query('select * from resturant.dishes');
  },
  addNewDishes: async (name, price, time, image) => {
    try {
      return await db.query(
        'INSERT INTO resturant.dishes (name,price,time,image) VALUES (?,?,?,?);',
        [name, price, time, image]
      );
    } catch (error) {
      throw new Error('Failed to add dish');
    }
  },
  addDishToOrder: async (idOrder, idDishes) => {
    try {
      return await db.query(
        'INSERT INTO order_details (idOrder, idDishes) VALUES (?, ?)',
        [idOrder, idDishes]
      );
    } catch (error) {
      throw new Error('Failed to add dish to order');
    }
  },
  deleteDishes: async (id) => {
    try {
      return await db.query(
        'DELETE FROM `resturant`.`dishes` WHERE (`idDishes` = ?);',
        [id]
      );
    } catch (error) {
      throw new Error('Failed to delete dish');
    }
  },
  removeDishFromOrder: async (idOrder, idDishes) => {
    try {
      return await db.query(
        'DELETE FROM order_details WHERE idOrder = ? AND idDishes = ?',
        [idOrder, idDishes]
      );
    } catch (error) {
      throw new Error('Failed to remove dish from order');
    }
  },
  updateDishes: async (name, price, time, image, id) => {
    try {
      const result = await db.query(
        'UPDATE `resturant`.`dishes` SET `name` = ?, `price` = ?, `time` = ?, `image` = ? WHERE `idDishes` = ?;',
        [name, price, time, image, id]
      );

      return result; // Log to check structure
    } catch (error) {
      console.error('Database Update Error:', error);
      throw new Error('Failed to update dish: ' + error.message);
    }
  },
};

export default dishesDB;
