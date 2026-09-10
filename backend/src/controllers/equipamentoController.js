const equipamentoService = require('../services/equipamentoService');

async function criar(req, res) {
  try {
    const equipamento = await equipamentoService.criarEquipamento(req.body);
    res.status(201).json(equipamento);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

async function listar(req, res) {
  try {
    const equipamentos = await equipamentoService.listarEquipamentos();
    res.status(200).json(equipamentos);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const equipamento = await equipamentoService.buscarEquipamentoPorId(req.params.id);
    res.status(200).json(equipamento);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const equipamento = await equipamentoService.atualizarEquipamento(req.params.id, req.body);
    res.status(200).json(equipamento);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

async function alterarStatus(req, res) {
  try {
    const equipamento = await equipamentoService.alterarStatus(req.params.id, req.body.status);
    res.status(200).json(equipamento);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

async function excluir(req, res) {
  try {
    await equipamentoService.excluirEquipamento(req.params.id);
    res.status(204).send();
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  alterarStatus,
  excluir,
};