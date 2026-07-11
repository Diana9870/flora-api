const express = require('express');

const ctrlWrapper = require('../helpers/ctrlWrapper');
const validateBody = require('../middlewares/validateBody');

const { subscriberAddSchema } = require('../schemas/subscribersSchemas');
const { createSubscriber } = require('../controllers/subscribersControllers');

const router = express.Router();

router.post(
  '/',
  validateBody(subscriberAddSchema),
  ctrlWrapper(createSubscriber)
);

module.exports = router;
