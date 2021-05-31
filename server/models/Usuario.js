const Sequelize = require('sequelize');
const database = require('../db');
 
const Usuario = database.define('usuario', {
    id_usuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_usuario_pagarme: {
        type: Sequelize.INTEGER
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
    data_expiracao_trial: {
        type: Sequelize.DATE
    },
    id_assinatura: {
        type: Sequelize.INTEGER
    },
})
 
module.exports = Usuario;