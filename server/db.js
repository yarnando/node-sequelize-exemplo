const Sequelize = require('sequelize');
//no trabalho
// const sequelize = new Sequelize('crud', 'root', '123456', {dialect: 'mysql', host: 'localhost'});
//em casa com wampserver ativo
const sequelize = new Sequelize('crud', 'root', '', {dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;