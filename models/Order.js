const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Matches the payload the storefront's order modal already sends to
// POST /api/orders (see js/api.js -> createOrder / js/main.js ->
// handleOrderSubmit in the markup project): { name, phone, email, message }.
// The modal pre-fills "message" with the bouquet title/quantity/total when
// the order starts from a product card, so there's no separate bouquetId /
// quantity / price column here — it's a simple contact-style order.
const Order = sequelize.define(
  'Order',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'orders',
    timestamps: true,
  }
);

module.exports = Order;
