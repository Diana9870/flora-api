const ordersServices = require('../services/ordersServices');

async function createOrder(req, res) {
  const order = await ordersServices.addOrder(req.body);

  res.status(201).json(order);
}

module.exports = {
  createOrder,
};
