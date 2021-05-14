  
const verifyJWT = require('../middlewares/verifyJWT');

const express = require('express');
const router = express.Router();

const planosController = require('../controllers/planos');

router.post('/criarPlano', planosController.create);
router.post('/listarPlanos', planosController.list);
router.post('/criarCartao', verifyJWT, planosController.createCard);
router.post('/assinarPlano', verifyJWT, planosController.subscribe);
router.post('/listarAssinaturas', verifyJWT, planosController.listSubscriptions);
router.post('/atualizarAssinatura', verifyJWT, planosController.updateSubscription);
router.post('/listarTransacoesDaAssinatura', verifyJWT, planosController.listSubscriptionTransactions);
router.post('/cancelarAssinatura',verifyJWT, planosController.cancelSubscription);

module.exports = router;