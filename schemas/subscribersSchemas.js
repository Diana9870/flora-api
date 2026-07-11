const Joi = require('joi');

// Used for POST /api/subscribers
// Mirrors the footer "Subscribe for updates" form, which only collects
// an email address.
const subscriberAddSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  subscriberAddSchema,
};
