import WaitersDB from '../db/waiters.js';
const service = {
  getAllWaiters: async () => {
    const [data] = await WaitersDB.getAllWaiters();
    return data;
  },
  getMostSellingWaiters: async () => {
    const waiters = await WaitersDB.getMostSellingWaiters();
    return waiters;
  },

  addNewWaiters: async (name) => {
    const [data] = await WaitersDB.addNewWaiters(name);
    return data;
  },
  deleteWaiters: async (id) => {
    const [data] = await WaitersDB.deleteWaiters(id);
    return data;
  },
  updateWaiters: async (name, id) => {
    const [data, fields] = await WaitersDB.updateWaiters(name, id);
    return data;
  },
  updateWaiterOreder: async (idWaiters, idOrder) => {
    const [data] = await WaitersDB.updateWaiterOreder(idWaiters, idOrder);
    return data;
  },
  assignOrderToWaiter: async (waiterId, orderId) => {
    const [data, fields] = await WaitersDB.assignOrderToWaiter(
      waiterId,
      orderId
    );
    return data;
  },
};

export default service;
