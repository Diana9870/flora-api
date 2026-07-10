const express = require('express');
const bouquetsRouter = require('./bouquetsRouter');
const bestsellersRouter = require('./bestsellersRouter');
const feedbackRouter = require('./feedbackRouter');

const router = express.Router();

router.use('/bouquets', bouquetsRouter);
router.use('/bestsellers', bestsellersRouter);
router.use('/feedback', feedbackRouter);

module.exports = router;
