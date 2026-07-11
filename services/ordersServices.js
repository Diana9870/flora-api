const { Order } = require('../models');

function addOrder(data) {
  return Order.create(data);
}

module.exports = {
  addOrder,
};
