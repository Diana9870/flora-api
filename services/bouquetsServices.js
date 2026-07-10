const { Bouquet } = require('../models');
const generatePhotoURL = require('../helpers/generatePhotoURL');

async function listBouquets({ page, limit, category } = {}) {
  const where = {};
  if (category) {
    where.category = category;
  }

  // Pagination is optional: GET /api/bouquets with no query params
  // simply returns every bouquet, per the acceptance criteria.
  const options = { where, order: [['id', 'ASC']] };

  if (page && limit) {
    options.limit = Number(limit);
    options.offset = (Number(page) - 1) * Number(limit);
  }

  const { rows, count } = await Bouquet.findAndCountAll(options);

  return { bouquets: rows, total: count };
}

function getBouquetById(id) {
  return Bouquet.findByPk(id);
}

function addBouquet(data) {
  return Bouquet.create({
    ...data,
    photoURL: data.photoURL || generatePhotoURL(data.title),
  });
}

async function updateBouquetById(id, data) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return null;
  }

  return bouquet.update(data);
}

async function deleteBouquetById(id) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return null;
  }

  await bouquet.destroy();
  return bouquet;
}

async function updateFavoriteById(id, favorite) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return null;
  }

  return bouquet.update({ favorite });
}

async function updatePhotoById(id, photoURL) {
  const bouquet = await Bouquet.findByPk(id);

  if (!bouquet) {
    return null;
  }

  return bouquet.update({ photoURL });
}

module.exports = {
  listBouquets,
  getBouquetById,
  addBouquet,
  updateBouquetById,
  deleteBouquetById,
  updateFavoriteById,
  updatePhotoById,
};
