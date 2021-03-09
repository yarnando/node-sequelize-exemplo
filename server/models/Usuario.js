const Sequelize = require('sequelize');
const database = require('../db');
 
const Usuario = database.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING
    },
    password_reset_token: {
        type: Sequelize.STRING
    },
    password_reset_expires: {
        type: Sequelize.DATE
    },
})
 
module.exports = Usuario;