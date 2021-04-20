  
const express = require('express');
const router = express.Router();

const planosController = require('../controllers/planos');

router.post('/criarPlano', planosController.create);
router.post('/listarPlanos', planosController.list);
router.post('/criarCartao', planosController.createCard);
router.post('/assinarPlano', planosController.subscribe);
router.post('/listarAssinaturas', planosController.listSubscriptions);
router.post('/atualizarAssinatura', planosController.updateSubscription);
router.post('/listarTransacoesDaAssinatura', planosController.listSubscriptionTransactions);
router.post('/cancelarAssinatura', planosController.cancelSubscription);

module.exports = router;