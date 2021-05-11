  
const express = require('express');
const router = express.Router();

const produtosController = require('../controllers/produtos');

router.get('/:id', produtosController.readOne);
router.get('/', produtosController.readAll);
router.post('/', produtosController.create);
router.put('/:id', produtosController.update);
router.delete('/:id', produtosController.delete);

module.exports = router;