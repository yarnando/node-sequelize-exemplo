  
const verifyJWT = require('../verifyJWT');

const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtos');

router.get('/:id', verifyJWT, produtosController.readOne);
router.get('/', verifyJWT, produtosController.readAll);
router.post('/', verifyJWT, produtosController.create);
router.put('/:id', verifyJWT, produtosController.update);
router.delete('/:id', verifyJWT, produtosController.delete);

module.exports = router;