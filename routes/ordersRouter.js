const express = require('express');

const ctrlWrapper = require('../helpers/ctrlWrapper');
const validateBody = require('../middlewares/validateBody');

const { orderAddSchema } = require('../schemas/ordersSchemas');
const { createOrder } = require('../controllers/ordersControllers');

const router = express.Router();

router.post('/', validateBody(orderAddSchema), ctrlWrapper(createOrder));

module.exports = router;
