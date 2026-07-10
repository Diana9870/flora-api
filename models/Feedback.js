const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Feedback = sequelize.define(
  'Feedback',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5,
      },
    },
    // Auto-generated identicon for the reviewer, same idea as
    // Bouquet.photoURL — keeps feedback cards from looking empty on the
    // frontend until/unless a real avatar is provided.
    avatarURL: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'feedbacks',
    timestamps: true,
  }
);

module.exports = Feedback;
