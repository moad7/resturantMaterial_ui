import db from './db.js';
const orderDB = {
  getAllOrdres: async () => {
    return await db.query('SELECT * FROM `resturant`.`order`;');
  },

  getOrderById: async (id) => {
    return await db.query(
      'SELECT * FROM `resturant`.`order` WHERE (`idOrder` = ?);',
      [id]
    );
  },
  getAllOrdersWithDetails: async () => {
    return await db.query(`
      SELECT 
        order.idOrder,
        order.count,
        order.date,
        order_details.idorder_details,
        dishes.idDishes,
        dishes.name AS dishName,
        dishes.price AS dishPrice,
        dishes.time AS dishTime,
        dishes.image AS dishImage,
        waiters.idWaiters,
        waiters.name AS waiterName
      FROM 
        resturant.order
      LEFT JOIN 
        resturant.order_details ON order.idOrder = order_details.idOrder
      LEFT JOIN 
        resturant.dishes ON order_details.idDishes = dishes.idDishes
      LEFT JOIN 
        resturant.waiter_orders ON order.idOrder = waiter_orders.idOrder
      LEFT JOIN 
        resturant.waiters ON waiter_orders.idWaiters = waiters.idWaiters;
    `);
  },
  updateOrder: async (name, id) => {
    return await db.query(
      'UPDATE `resturant`.`order` SET `name` = ? WHERE (`idWaiters` = ?);',
      [name, id]
    );
  },
  getAllOrder_details: async () => {
    return await db.query('SELECT * FROM `resturant`.`order_details`;');
  },

  getAllWaiter_orders: async () => {
    return await db.query('SELECT * FROM `resturant`.`waiter_orders`;');
  },

  getDailyRevenue: async () => {
    try {
      const [rows] = await db.query(
        `SELECT DATE(o.date) AS order_date, SUM(d.price) AS total_revenue
         FROM \`order\` o
         JOIN \`order_details\` od ON o.idOrder = od.idOrder
         JOIN \`dishes\` d ON od.idDishes = d.idDishes
         GROUP BY order_date
         ORDER BY total_revenue DESC;`
      );
      return rows;
    } catch (error) {
      throw new Error('Failed to get daily revenue');
    }
  },

  getMostOrderedDishes: async () => {
    try {
      const [rows] = await db.query(
        `SELECT d.idDishes, d.name, COUNT(od.idDishes) AS order_count
        FROM \`order_details\` od
        JOIN \`dishes\` d ON od.idDishes = d.idDishes
        GROUP BY od.idDishes
        ORDER BY order_count DESC;`
      );
      return rows;
    } catch (error) {
      throw new Error('Failed to get most ordered dishes');
    }
  },

  addOrder: async (count) => {
    try {
      const [result] = await db.query(
        'INSERT INTO `resturant`.`order` (`count`,`date`) VALUES (?,NOW());',
        [count]
      );
      return result.insertId;
    } catch (error) {
      throw new Error('Failed to add order');
    }
  },

  addOrder_details: async (idOrder, idDishes) => {
    try {
      return await db.query(
        'INSERT INTO `resturant`.`order_details` (`idOrder`, `idDishes`) VALUES (?, ?);',
        [idOrder, idDishes]
      );
    } catch (error) {
      throw new Error('Failed to add order details db');
    }
  },

  addWaiter_orders: async (idWaiters, idOrder) => {
    try {
      return await db.query(
        'INSERT INTO `resturant`.`waiter_orders` (`idWaiters`, `idOrder`) VALUES (?, ?);',
        [idWaiters, idOrder]
      );
    } catch (error) {
      throw new Error('Failed to add waiter');
    }
  },
  deleteOrderDetails: async (idOrder) => {
    try {
      const result = await db.query(
        'DELETE FROM `resturant`.`order_details` WHERE `idOrder` = ?;',
        [idOrder]
      );
      return result;
    } catch (error) {
      throw new Error('Failed to delete order details');
    }
  },

  deleteOrder: async (idOrder) => {
    try {
      const result = await db.query(
        'DELETE FROM `resturant`.`order` WHERE `idOrder` = ?;',
        [idOrder]
      );
      return result;
    } catch (error) {
      throw new Error('Failed to delete order');
    }
  },
};

export default orderDB;
