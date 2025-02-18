import orderDB from '../db/order.js';

const service = {
  getAllOrdres: async () => {
    const [data] = await orderDB.getAllOrdres();
    return data;
  },
  getAllOrdersWithDetails: async () => {
    const [data] = await orderDB.getAllOrdersWithDetails();
    return data;
  },
  getAllOrder_details: async () => {
    const [data] = await orderDB.getAllOrder_details();
    return data;
  },
  getAllWaiter_orders: async () => {
    const [data] = await orderDB.getAllWaiter_orders();
    return data;
  },

  getMostOrderedDishes: async () => {
    const dishes = await orderDB.getMostOrderedDishes();
    return dishes;
  },
  getDailyRevenue: async () => {
    const revenue = await orderDB.getDailyRevenue();
    return revenue;
  },

  addOrder: async (count) => {
    const orderId = await orderDB.addOrder(count);
    return orderId;
  },

  addOrder_details: async (idOrder, idDishes) => {
    if (!Array.isArray(idDishes)) {
      throw new Error('dishIds must be an array');
    }

    if (idDishes.length === 0) {
      throw new Error('dishIds array is empty');
    }
    try {
      const queries = idDishes.map((dishId) => {
        return orderDB.addOrder_details(idOrder, dishId);
      });
      await Promise.all(queries);
    } catch (error) {
      throw new Error('Failed to add order details');
    }
  },

  addWaiter_orders: async (idWaiters, idOrder) => {
    const [data] = await orderDB.addWaiter_orders(idWaiters, idOrder);
    return data;
  },

  deleteOrder: async (idOrder) => {
    try {
      await orderDB.deleteOrderDetails(idOrder);
      await orderDB.deleteOrder(idOrder);
    } catch (error) {
      throw new Error('Failed to delete order and its details');
    }
  },
};

export default service;
