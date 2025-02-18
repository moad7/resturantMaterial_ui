import WaitersService from '../services/waiters.js';

const controller = {
  getAllWaiters: async (req, res) => {
    try {
      const orders = await WaitersService.getAllWaiters();
      return res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  getMostSellingWaiters: async (req, res) => {
    try {
      const waiters = await WaitersService.getMostSellingWaiters();
      res.json(waiters);
    } catch (error) {
      console.error('Controller Error in getMostSellingWaiters:', error);
      res.status(500).json({ error: error.message });
    }
  },
  addNewWaiters: async (req, res) => {
    try {
      const { name } = req.body;
      const result = await WaitersService.addNewWaiters(name);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteWaiters: async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const result = await WaitersService.deleteWaiters(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateWaiters: async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const result = await WaitersService.updateWaiters(name, id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  updateWaiterOreder: async (req, res) => {
    try {
      const { idWaiters, idOrder } = req.body;
      const result = await WaitersService.updateWaiterOreder(
        idWaiters,
        idOrder
      );
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default controller;
