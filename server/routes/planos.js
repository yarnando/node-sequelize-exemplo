  
const verifyJWT = require('../middlewares/verifyJWT');

const express = require('express');
const router = express.Router();

const planosController = require('../controllers/planos');

router.post('/criarPlano', planosController.create);
router.post('/listarPlanos', planosController.list);
router.post('/criarCliente/:id', verifyJWT, planosController.createCustomer);
router.get('/buscarCliente/:id', verifyJWT, planosController.getCustomer);
router.get('/buscarCartoesCliente/:id', verifyJWT, planosController.getCustomerCards);
router.get('/buscarCartao/:id', verifyJWT, planosController.getCard);
router.post('/criarCartao/:id', verifyJWT, planosController.createCard);
router.post('/assinarPlano', verifyJWT, planosController.subscribe);
router.post('/listarAssinaturas', verifyJWT, planosController.listSubscriptions);
router.get('/buscarAssinatura/:id', verifyJWT, planosController.getSubscription);
router.post('/validaAssinatura', verifyJWT, planosController.validateSubscription);
router.post('/atualizarAssinatura', verifyJWT, planosController.updateSubscription);
router.post('/listarTransacoesDaAssinatura', verifyJWT, planosController.listSubscriptionTransactions);
router.post('/cancelarAssinatura',verifyJWT, planosController.cancelSubscription);

module.exports = router;