const Sequelize = require('sequelize');
const database = require('../database');

const Category = database.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;
