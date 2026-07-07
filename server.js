require('dotenv').config();

const app = require('./app');
const { sequelize, connectDB } = require('./config/db');

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();

  // No migrations yet at this stage of the project, so sync() creates the
  // "bouquets" table automatically if it doesn't already exist.
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
