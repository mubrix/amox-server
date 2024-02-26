const {Sequelize} = require('sequelize');
require ("dotenv").config();

console.log( process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = sequelize;