const Joi = require('joi');

// Used for POST /api/orders
// Mirrors the "Order a Bouquet" modal form: name/phone/email are required
// inputs on the client, message is an optional textarea (often pre-filled
// with "I'd like to order '<title>' x<qty> ($<total>)." by the product
// modal, but free text either way).
const orderAddSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  phone: Joi.string()
    .pattern(/^\+?[\d\s()-]{7,20}$/)
    .required()
    .messages({
      'string.pattern.base': 'phone must be a valid phone number',
    }),
  email: Joi.string().email().required(),
  message: Joi.string().max(1000).allow('', null),
});

module.exports = {
  orderAddSchema,
};
