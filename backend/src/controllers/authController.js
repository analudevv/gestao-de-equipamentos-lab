const authService = require('../services/authService');

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const resultado = await authService.login(email, senha);
    res.status(200).json(resultado);
  } catch (erro) {
    res.status(erro.status || 500).json({ mensagem: erro.message });
  }
}

module.exports = { login };