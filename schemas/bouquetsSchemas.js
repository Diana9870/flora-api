const Joi = require('joi');

// Used for POST /api/bouquets
// photoURL is intentionally excluded — it is generated server-side
// (gravatar on create, or the dedicated photo-upload endpoint later).
const bouquetAddSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(1000).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().max(50),
  favorite: Joi.boolean(),
});

// Used for PUT /api/bouquets/:id
// Every field is optional, but at least one must be present —
// an empty body must fail validation (400), per the acceptance criteria.
const bouquetUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(1000),
  price: Joi.number().positive(),
  category: Joi.string().max(50),
  favorite: Joi.boolean(),
}).min(1);

// Used for PATCH /api/bouquets/:id/favorite
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  bouquetAddSchema,
  bouquetUpdateSchema,
  updateFavoriteSchema,
};
