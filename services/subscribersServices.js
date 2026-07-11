const { Subscriber } = require('../models');

function addSubscriber(data) {
  return Subscriber.create(data);
}

module.exports = {
  addSubscriber,
};
