  
const verifyJWT = require('../middlewares/verifyJWT');

const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtos');

router.post('/', verifyJWT, produtosController.create);
router.put('/:id', verifyJWT, produtosController.update);
router.post('/vender', verifyJWT, produtosController.sell);
router.get('/em-estoque/', verifyJWT, produtosController.getProductsInStock);
router.get('/vendidos/', verifyJWT, produtosController.getProductsSoldOut);
router.get('/:id', verifyJWT, produtosController.readOne);
router.delete('/:id', verifyJWT, produtosController.delete);

module.exports = router;