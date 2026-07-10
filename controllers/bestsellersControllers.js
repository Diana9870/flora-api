const path = require('path');
const fs = require('fs/promises');
const HttpError = require('../helpers/HttpError');
const bestsellersServices = require('../services/bestsellersServices');

const photosDir = path.join(__dirname, '..', 'public', 'photos');

async function getAllBestsellers(req, res) {
  const { page, limit, category } = req.query;

  const { bestsellers, total } = await bestsellersServices.listBestsellers({
    page,
    limit,
    category,
  });

  res.status(200).json({ bestsellers, total });
}

async function getBestsellerById(req, res, next) {
  const { id } = req.params;

  const bestseller = await bestsellersServices.getBestsellerById(id);

  if (!bestseller) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(bestseller);
}

async function createBestseller(req, res) {
  const bestseller = await bestsellersServices.addBestseller(req.body);

  res.status(201).json(bestseller);
}

async function updateBestsellerById(req, res, next) {
  const { id } = req.params;

  const bestseller = await bestsellersServices.updateBestsellerById(
    id,
    req.body
  );

  if (!bestseller) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(bestseller);
}

async function deleteBestsellerById(req, res, next) {
  const { id } = req.params;

  const bestseller = await bestsellersServices.deleteBestsellerById(id);

  if (!bestseller) {
    return next(HttpError(404, 'Not found'));
  }

  res.status(200).json(bestseller);
}

async function updatePhoto(req, res, next) {
  const { id } = req.params;

  if (!req.file) {
    return next(HttpError(400, 'Photo file is required'));
  }

  const existing = await bestsellersServices.getBestsellerById(id);

  if (!existing) {
    await fs.unlink(req.file.path);
    return next(HttpError(404, 'Not found'));
  }

  // Move the file from /temp (where multer initially wrote it) into the
  // permanent /public/photos folder, keeping the unique name multer gave it.
  const finalPath = path.join(photosDir, req.file.filename);
  await fs.rename(req.file.path, finalPath);

  const photoURL = `${req.protocol}://${req.get('host')}/photos/${req.file.filename}`;

  const bestseller = await bestsellersServices.updatePhotoById(id, photoURL);

  res.status(200).json(bestseller);
}

module.exports = {
  getAllBestsellers,
  getBestsellerById,
  createBestseller,
  updateBestsellerById,
  deleteBestsellerById,
  updatePhoto,
};
