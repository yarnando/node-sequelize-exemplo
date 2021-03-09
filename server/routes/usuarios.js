  
const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');

router.post('/login', usuariosController.login);
router.post('/forgotpassword', usuariosController.forgotPassword);
router.post('/resetpassword', usuariosController.resetPassword);
router.get('/:id', usuariosController.readOne);
router.get('/', usuariosController.readAll);
router.post('/', usuariosController.create);
router.put('/:id', usuariosController.update);
router.delete('/:id', usuariosController.delete);

module.exports = router;