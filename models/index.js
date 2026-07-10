const { sequelize } = require('../config/db');
const Bouquet = require('./Bouquet');
const Bestseller = require('./Bestseller');
const Feedback = require('./Feedback');

// No associations between these models yet — bestsellers and bouquets are
// independent collections (a bestseller is not a foreign-keyed row of
// bouquets) and feedback isn't tied to a specific bouquet in this version
// of the API. This is the place to add associations (e.g.
// Feedback.belongsTo(Bouquet)) if that changes later.

module.exports = { sequelize, Bouquet, Bestseller, Feedback };
