const Joi = require('joi');

// Used for POST /api/feedback
// avatarURL is intentionally excluded — it is generated server-side from
// the author's name, same convention used for Bouquet.photoURL.
const feedbackAddSchema = Joi.object({
  author: Joi.string().min(2).max(100).required(),
  text: Joi.string().min(2).max(1000).required(),
  rating: Joi.number().integer().min(1).max(5),
});

// Used for PUT /api/feedback/:id
// Every field is optional, but at least one must be present —
// an empty body must fail validation (400).
const feedbackUpdateSchema = Joi.object({
  author: Joi.string().min(2).max(100),
  text: Joi.string().min(2).max(1000),
  rating: Joi.number().integer().min(1).max(5),
}).min(1);

module.exports = {
  feedbackAddSchema,
  feedbackUpdateSchema,
};
