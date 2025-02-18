import db from './db.js';
const waitersDB = {
  getAllWaiters: async () => {
    return await db.query('select * from resturant.waiters');
  },
  addNewWaiters: async (name) => {
    return await db.query('INSERT INTO resturant.waiters (name) VALUES (?);', [
      name,
    ]);
  },
  deleteWaiters: async (id) => {
    try {
      await db.query(
        'DELETE FROM `resturant`.`waiter_orders` WHERE `idWaiters` = ?;',
        [id]
      );
      await db.query(
        'DELETE FROM `resturant`.`waiters` WHERE `idWaiters` = ?;',
        [id]
      );
      return { message: 'Waiter and related records deleted successfully' };
    } catch (err) {
      throw err;
    }
  },
  updateWaiters: async (name, id) => {
    return await db.query(
      'UPDATE `resturant`.`waiters` SET `name` = ? WHERE (`idWaiters` = ?);',
      [name, id]
    );
  },
  updateWaiterOreder: async (idWaiters, idOrder) => {
    return await db.query(
      'UPDATE waiter_orders SET idWaiters = ? WHERE idOrder = ?',
      [idWaiters, idOrder]
    );
  },
  assignOrderToWaiter: async (waiterId, orderId) => {
    return await db.query(
      'INSERT INTO `resturant`.`waiter_orders` (idWaiters, idOrder) VALUES (?, ?);',
      [waiterId, orderId]
    );
  },

  getMostSellingWaiters: async () => {
    try {
      const [rows] = await db.query(
        `SELECT w.idWaiters, w.name, COUNT(wo.idOrder) AS order_count
         FROM \`waiter_orders\` wo
         JOIN \`waiters\` w ON wo.idWaiters = w.idWaiters
         GROUP BY wo.idWaiters
         ORDER BY order_count DESC;`
      );
      return rows;
    } catch (error) {
      throw new Error('Failed to get most selling waiters');
    }
  },
};

export default waitersDB;
