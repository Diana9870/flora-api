const express = require('express');
const bouquetsRouter = require('./bouquetsRouter');
const bestsellersRouter = require('./bestsellersRouter');
const feedbackRouter = require('./feedbackRouter');
const ordersRouter = require('./ordersRouter');
const subscribersRouter = require('./subscribersRouter');

const router = express.Router();

router.use('/bouquets', bouquetsRouter);
router.use('/bestsellers', bestsellersRouter);
router.use('/feedback', feedbackRouter);
router.use('/orders', ordersRouter);
router.use('/subscribers', subscribersRouter);

module.exports = router;
