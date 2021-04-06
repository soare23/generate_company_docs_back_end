const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extraSetup');
require('dotenv/config');

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);

const modelDefiners = [
  require('../models/User'),
  require('../models/ActivityCodes'),
  require('../models/CompanyCapital'),
  require('../models/CompanyInfo'),
  require('../models/Contact'),
  require('../models/HeadQuarter'),
  require('../models/PersonsInCompany'),
  // Add more models here...
  // require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
