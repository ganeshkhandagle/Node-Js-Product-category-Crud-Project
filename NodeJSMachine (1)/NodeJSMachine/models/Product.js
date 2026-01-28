const Sequelize = require('sequelize');
const database = require('../database');

const Product = database.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    // categoryId will be added automatically by the association
});

module.exports = Product;
