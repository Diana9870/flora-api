const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Bestseller = sequelize.define(
  'Bestseller',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Number of times the bouquet was sold — this is what actually makes it
    // a "bestseller" and lets the list be ranked by real popularity instead
    // of just insertion order.
    salesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: 'bestsellers',
    timestamps: true,
  }
);

module.exports = Bestseller;
