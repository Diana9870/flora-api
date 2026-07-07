const { sequelize } = require('../config/db');
const Bouquet = require('./Bouquet');

// A single-model project has no associations yet, but this file is the
// place to add them (e.g. Bouquet.belongsTo(User)) as the project grows.

module.exports = { sequelize, Bouquet };
