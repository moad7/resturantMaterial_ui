import express from 'express';
import orderController from '../controller/order.js';

const router = express.Router();

router.get('/', orderController.getAllOrdres);
router.get('/getAllOrdersWithDetails', orderController.getAllOrdersWithDetails);

router.post('/addOrder', orderController.addOrder);

router.post('/addOrderDetails', orderController.addOrder_details);

router.post('/addWaiterOrders', orderController.addWaiter_orders);

router.get('/getOrderDetails', orderController.getAllOrder_details);

router.get('/getWaiterOrders', orderController.getAllWaiter_orders);

router.delete('/deleteOrder/:id', orderController.deleteOrder);

router.get('/mostOrderedDishes', orderController.getMostOrderedDishes);

router.get('/db', orderController.getDailyRevenue);

export default router;
