const path = require('path');
const fs = require('fs/promises');
const HttpError = require('../helpers/HttpError');
const bouquetsServices = require('../services/bouquetsServices');

const photosDir = path.join(__dirname, '..', 'public', 'photos');

async function getAllBouquets(req, res) {
  const { page, limit, category } = req.query;

  const { bouquets, total } = await bouquetsServices.listBouquets({
    page,
    limit,
    category,
  });

  res.status(200).json({ bouquets, total });
}

async function getBouquetById(req, res, next) {
  const { id } = req.params;

  const bouquet = await bouquetsServices.getBouquetById(id);

  if (!bouquet) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(bouquet);
}

async function createBouquet(req, res) {
  const bouquet = await bouquetsServices.addBouquet(req.body);

  res.status(201).json(bouquet);
}

async function updateBouquetById(req, res, next) {
  const { id } = req.params;

  const bouquet = await bouquetsServices.updateBouquetById(id, req.body);

  if (!bouquet) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(bouquet);
}

async function deleteBouquetById(req, res, next) {
  const { id } = req.params;

  const bouquet = await bouquetsServices.deleteBouquetById(id);

  if (!bouquet) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(bouquet);
}

async function updateFavorite(req, res, next) {
  const { id } = req.params;
  const { favorite } = req.body;

  const bouquet = await bouquetsServices.updateFavoriteById(id, favorite);

  if (!bouquet) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(bouquet);
}

async function updatePhoto(req, res, next) {
  const { id } = req.params;

  if (!req.file) {
    return next(HttpError(400, 'Photo file is required'));
  }

  const existing = await bouquetsServices.getBouquetById(id);

  if (!existing) {
    await fs.unlink(req.file.path);
    return next(HttpError(404, 'Not found'));
  }

  // Move the file from /temp (where multer initially wrote it) into the
  // permanent /public/photos folder, keeping the unique name multer gave it.
  const finalPath = path.join(photosDir, req.file.filename);
  await fs.rename(req.file.path, finalPath);

  const photoURL = `${req.protocol}://${req.get('host')}/photos/${req.file.filename}`;

  const bouquet = await bouquetsServices.updatePhotoById(id, photoURL);

  res.status(200).json(bouquet);
}

module.exports = {
  getAllBouquets,
  getBouquetById,
  createBouquet,
  updateBouquetById,
  deleteBouquetById,
  updateFavorite,
  updatePhoto,
};
