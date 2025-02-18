import orderService from '../services/order.js';

const controller = {
  getAllOrdres: async (req, res) => {
    try {
      const orders = await orderService.getAllOrdres();
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getAllOrdersWithDetails: async (req, res) => {
    try {
      const orders = await orderService.getAllOrdersWithDetails();
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getAllOrder_details: async (req, res) => {
    try {
      const orders = await orderService.getAllOrder_details();
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getAllWaiter_orders: async (req, res) => {
    try {
      const orders = await orderService.getAllWaiter_orders();
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getDailyRevenue: async (req, res) => {
    try {
      const revenue = await orderService.getDailyRevenue();
      res.json(revenue);
    } catch (error) {
      console.error('Controller Error in getDailyRevenue:', error);
      res.status(500).json({ error: error.message });
    }
  },

  getMostOrderedDishes: async (req, res) => {
    try {
      const dishes = await orderService.getMostOrderedDishes();
      res.json(dishes);
    } catch (error) {
      console.error('Controller Error in getMostOrderedDishes:', error);
      res.status(500).json({ error: error.message });
    }
  },

  addOrder: async (req, res) => {
    try {
      const { count, idDishes, idWaiters } = req.body;
      const orderId = await orderService.addOrder(count);

      await orderService.addOrder_details(orderId, idDishes);

      if (idWaiters) {
        await orderService.addWaiter_orders(idWaiters, orderId);
      }
      return res.status(201).json({ orderId });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  addOrder_details: async (req, res) => {
    try {
      const { idOrder, idDishes } = req.body;
      const orderId = await orderService.addOrder_details(idOrder, idDishes);
      return res.json(orderId);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  addWaiter_orders: async (req, res) => {
    try {
      const { idOrder, idWaiters } = req.body;
      const orderId = await orderService.addWaiter_orders(idWaiters, idOrder);
      return res.json(orderId);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const idOrder = req.params.id;
      await orderService.deleteOrder(idOrder);
      res
        .status(200)
        .json({ message: 'Order and its details deleted successfully' });
    } catch (error) {
      console.error('Controller Error in deleteOrder:', error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default controller;
