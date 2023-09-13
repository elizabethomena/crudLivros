const {DataTypes} = require('sequelize');
const db = require('../db/conn');

const Book = db.define('Book', {
    nomeL: {
        type:DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type:DataTypes.STRING,
        require: true
    },
    preco: {
        type:DataTypes.FLOAT,
        require: true
    },
    capaDura: {
        type:DataTypes.BOOLEAN,
    }
});

module.exports = Book