const express = require('express');
const router = express.Router();
const equipamentoController = require('../controllers/equipamentoController');

router.get('/', equipamentoController.listar);
router.get('/:id', equipamentoController.buscarPorId);
router.post('/', equipamentoController.criar);
router.put('/:id', equipamentoController.atualizar);
router.patch('/:id/status', equipamentoController.alterarStatus);
router.delete('/:id', equipamentoController.excluir);

module.exports = router;