import dishesService from '../services/dishes.js';

const controller = {
  getAllDishes: async (req, res) => {
    try {
      const orders = await dishesService.getAllDishes();
      res.json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  addNewDishes: async (req, res) => {
    try {
      const { name, price, time, image } = req.body;
      await dishesService.addNewDishes(name, price, time, image);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  addDishToOrder: async (req, res) => {
    try {
      const { idOrder, idDishes } = req.body;
      const result = await dishesService.addDishToOrder(idOrder, idDishes);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  deleteDishes: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await dishesService.deleteDishes(id);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  removeDishFromOrder: async (req, res) => {
    try {
      const { idOrder, idDishes } = req.params;
      const result = await dishesService.removeDishFromOrder(idOrder, idDishes);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateDishes: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, price, time, image } = req.body;
      const result = await dishesService.updateDishes(
        name,
        price,
        time,
        image,
        id
      );
      res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default controller;
