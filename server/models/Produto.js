const Sequelize = require('sequelize');
const database = require('../db');
 
const Produto = database.define('produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario: {
        type: Sequelize.INTEGER,
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE
    },
    vendido: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    descricao: Sequelize.STRING
})
 
module.exports = Produto;