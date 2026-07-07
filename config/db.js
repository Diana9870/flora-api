const { Sequelize } = require('sequelize');

const { DATABASE_URL, DB_SSL } = process.env;

if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL environment variable');
  process.exit(1);
}

// Cloud providers like Render require SSL with a self-signed cert.
// Set DB_SSL=false in .env if you point this at a local Postgres instead.
const useSSL = DB_SSL !== 'false';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  logging: false,
  dialectOptions: useSSL
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB };
