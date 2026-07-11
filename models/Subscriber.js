const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Matches the payload the footer's newsletter form already sends to
// POST /api/subscribers (see js/api.js -> subscribe / js/main.js ->
// handleSubscribe in the markup project): { email }.
const Subscriber = sequelize.define(
  'Subscriber',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // A person subscribing twice with the same email shouldn't create a
      // duplicate row — the service layer turns the resulting Sequelize
      // UniqueConstraintError into a friendly 409 response.
      unique: true,
    },
  },
  {
    tableName: 'subscribers',
    timestamps: true,
  }
);

module.exports = Subscriber;
