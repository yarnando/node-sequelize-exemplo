  
const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuarios');

router.post('/login', usuariosController.login);
router.post('/forgotpassword', usuariosController.forgotPassword);
router.post('/resetpassword', usuariosController.resetPassword);
router.get('/get/:id', usuariosController.readOne);
router.get('/getAll', usuariosController.readAll);
router.post('/create', usuariosController.create);
router.put('/updatePassword/:id', usuariosController.update);
router.delete('/delete/:id', usuariosController.delete);

module.exports = router;