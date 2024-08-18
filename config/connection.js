// Purpose: Establish connection to the database using Sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize =
    process.env.DB_URI? new Sequelize(process.env.DB_URI) :
    new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_URL ?? 'localhost',
            dialect: 'postgres'
        },
    );

module.exports = sequelize;