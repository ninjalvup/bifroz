const dotenv = require("dotenv");
dotenv.config();

process.env.TZ = 'Asia/Bangkok'

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN,

  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_DIARECT: process.env.DB_DIARECT,
  DB_PORT: process.env.DB_PORT,

  DB_USERNAME_TEST: process.env.DB_USERNAME_TEST,
  DB_PASSWORD_TEST: process.env.DB_PASSWORD_TEST,
  DB_DATABASE_TEST: process.env.DB_DATABASE_TEST,
  DB_HOST_TEST: process.env.DB_HOST_TEST,
  DB_DIARECT_TEST: process.env.DB_DIARECT_TEST,
  DB_PORT_TEST: process.env.DB_PORT_TEST,

  DB_USERNAME_PRODUCTION: process.env.DB_USERNAME_PRODUCTION,
  DB_PASSWORD_PRODUCTION: process.env.DB_PASSWORD_PRODUCTION,
  DB_DATABASE_PRODUCTION: process.env.DB_DATABASE_PRODUCTION,
  DB_HOST_PRODUCTION: process.env.DB_HOST_PRODUCTION,
  DB_DIARECT_PRODUCTION: process.env.DB_DIARECT_PRODUCTION,
  DB_PORT_PRODUCTION: process.env.DB_PORT_PRODUCTION,

  JWT_KEY: process.env.JWT_KEY,
  JWT_EXP: process.env.JWT_EXP,

  KEY: process.env.KEY,
  HASH: process.env.HASH,
  AGENT: process.env.AGENT,
};
