const Joi = require('joi');

// Used for POST /api/bestsellers
// photoURL is intentionally excluded — it is generated server-side
// (gravatar on create, or the dedicated photo-upload endpoint later),
// same convention as bouquetsSchemas.
const bestsellerAddSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(1000).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().max(50),
  salesCount: Joi.number().integer().min(0),
});

// Used for PUT /api/bestsellers/:id
// Every field is optional, but at least one must be present —
// an empty body must fail validation (400).
const bestsellerUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(1000),
  price: Joi.number().positive(),
  category: Joi.string().max(50),
  salesCount: Joi.number().integer().min(0),
}).min(1);

module.exports = {
  bestsellerAddSchema,
  bestsellerUpdateSchema,
};
