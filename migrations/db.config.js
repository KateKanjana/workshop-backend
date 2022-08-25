/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_DBUSER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    define: {
      underscored: true,
    },
  },
  production: {
    username: process.env.DB_DBUSER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    define: {
      underscored: true,
    },
  },
};
