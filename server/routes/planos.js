  
const express = require('express');
const router = express.Router();

const planosController = require('../controllers/planos');

router.post('/criarPlano', planosController.create);
router.post('/listarPlanos', planosController.list);
router.post('/criarCartao', planosController.createCard);
router.post('/assinarPlano', planosController.subscribe);

module.exports = router;