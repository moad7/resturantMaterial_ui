import express from 'express';
import WaitersController from '../controller/waiters.js';

const router = express.Router();

router.get('/', WaitersController.getAllWaiters);

router.post('/addNewWaiters', WaitersController.addNewWaiters);

router.delete('/deleteWaitersById/:id', WaitersController.deleteWaiters);

router.put('/updateWaitersById/:id', WaitersController.updateWaiters);

router.put('/updateWaitersOrder', WaitersController.updateWaiterOreder);

router.get('/mostSellingWaiters', WaitersController.getMostSellingWaiters);

export default router;
