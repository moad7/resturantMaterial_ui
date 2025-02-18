import express from 'express';
import dishesController from '../controller/dishes.js';

const router = express.Router();

router.get('/', dishesController.getAllDishes);

router.post('/addNewDishes', dishesController.addNewDishes);

router.post('/addDishToOrder', dishesController.addDishToOrder);

router.delete('/deleteDishesById/:id', dishesController.deleteDishes);
router.delete(
  '/removeDishFromOrder/:idOrder/:idDishes',
  dishesController.removeDishFromOrder
);

router.put('/updateDishesById/:id', dishesController.updateDishes);

export default router;
