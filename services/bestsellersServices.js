const { Bestseller } = require('../models');
const generatePhotoURL = require('../helpers/generatePhotoURL');

async function listBestsellers({ page, limit, category } = {}) {
  const where = {};
  if (category) {
    where.category = category;
  }

  // Ranked by salesCount by default — that's what makes the list a
  // "bestsellers" list rather than just another bouquets list. Pagination
  // is optional, same as bouquets: no query params returns everything.
  const options = {
    where,
    order: [
      ['salesCount', 'DESC'],
      ['id', 'ASC'],
    ],
  };

  if (page && limit) {
    options.limit = Number(limit);
    options.offset = (Number(page) - 1) * Number(limit);
  }

  const { rows, count } = await Bestseller.findAndCountAll(options);

  return { bestsellers: rows, total: count };
}

function getBestsellerById(id) {
  return Bestseller.findByPk(id);
}

function addBestseller(data) {
  return Bestseller.create({
    ...data,
    photoURL: data.photoURL || generatePhotoURL(data.title),
  });
}

async function updateBestsellerById(id, data) {
  const bestseller = await Bestseller.findByPk(id);

  if (!bestseller) {
    return null;
  }

  return bestseller.update(data);
}

async function deleteBestsellerById(id) {
  const bestseller = await Bestseller.findByPk(id);

  if (!bestseller) {
    return null;
  }

  await bestseller.destroy();
  return bestseller;
}

async function updatePhotoById(id, photoURL) {
  const bestseller = await Bestseller.findByPk(id);

  if (!bestseller) {
    return null;
  }

  return bestseller.update({ photoURL });
}

module.exports = {
  listBestsellers,
  getBestsellerById,
  addBestseller,
  updateBestsellerById,
  deleteBestsellerById,
  updatePhotoById,
};
