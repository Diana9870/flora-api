const express = require('express');

const ctrlWrapper = require('../helpers/ctrlWrapper');
const validateBody = require('../middlewares/validateBody');
const isValidId = require('../middlewares/isValidId');
const upload = require('../middlewares/upload');

const {
  bouquetAddSchema,
  bouquetUpdateSchema,
  updateFavoriteSchema,
} = require('../schemas/bouquetsSchemas');

const {
  getAllBouquets,
  getBouquetById,
  createBouquet,
  updateBouquetById,
  deleteBouquetById,
  updateFavorite,
  updatePhoto,
} = require('../controllers/bouquetsControllers');

const router = express.Router();

router.get('/', ctrlWrapper(getAllBouquets));

router.get('/:id', isValidId, ctrlWrapper(getBouquetById));

router.post('/', validateBody(bouquetAddSchema), ctrlWrapper(createBouquet));

router.put(
  '/:id',
  isValidId,
  validateBody(bouquetUpdateSchema),
  ctrlWrapper(updateBouquetById)
);

router.delete('/:id', isValidId, ctrlWrapper(deleteBouquetById));

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(updateFavorite)
);

router.patch(
  '/:id/photo',
  isValidId,
  upload.single('photo'),
  ctrlWrapper(updatePhoto)
);

module.exports = router;
