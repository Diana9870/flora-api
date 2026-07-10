const express = require('express');

const ctrlWrapper = require('../helpers/ctrlWrapper');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const upload = require('../middlewares/upload');

const {
  bestsellerAddSchema,
  bestsellerUpdateSchema,
} = require('../schemas/bestsellersSchemas');

const {
  getAllBestsellers,
  getBestsellerById,
  createBestseller,
  updateBestsellerById,
  deleteBestsellerById,
  updatePhoto,
} = require('../controllers/bestsellersControllers');

const router = express.Router();

router.get('/', ctrlWrapper(getAllBestsellers));

router.get('/:id', isValidId, ctrlWrapper(getBestsellerById));

router.post(
  '/',
  validateBody(bestsellerAddSchema),
  ctrlWrapper(createBestseller)
);

router.put(
  '/:id',
  isValidId,
  validateBody(bestsellerUpdateSchema),
  ctrlWrapper(updateBestsellerById)
);

router.delete('/:id', isValidId, ctrlWrapper(deleteBestsellerById));

router.patch(
  '/:id/photo',
  isValidId,
  upload.single('photo'),
  ctrlWrapper(updatePhoto)
);

module.exports = router;
