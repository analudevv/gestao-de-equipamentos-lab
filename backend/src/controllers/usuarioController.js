const usuarioService = require('../services/usuarioService');

async function criar(req, res) {
  try {
    const usuario = await usuarioService.criarUsuario(req.body);
    res.status(201).json(usuario);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

async function listar(req, res) {
  try {
    const usuarios = await usuarioService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (erro) {
    res.status(500).json({ mensagem: erro.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const usuario = await usuarioService.buscarUsuarioPorId(req.params.id);
    res.status(200).json(usuario);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const usuario = await usuarioService.atualizarUsuario(req.params.id, req.body);
    res.status(200).json(usuario);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

async function excluir(req, res) {
  try {
    await usuarioService.excluirUsuario(req.params.id);
    res.status(204).send();
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

module.exports = { criar, listar, buscarPorId, atualizar, excluir };