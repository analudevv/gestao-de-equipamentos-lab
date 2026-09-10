const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function login(email, senha) {
  if (!email || !senha) {
    const erro = new Error('Email e senha são obrigatórios.');
    erro.status = 400;
    throw erro;
  }

  const usuario = await prisma.usuario.findUnique({ where: { email } });

  if (!usuario) {
    const erro = new Error('Credenciais inválidas.');
    erro.status = 401;
    throw erro;
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

  if (!senhaCorreta) {
    const erro = new Error('Credenciais inválidas.');
    erro.status = 401;
    throw erro;
  }

  const token = jwt.sign(
    { id: usuario.id, tipoUsuario: usuario.tipoUsuario },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipoUsuario: usuario.tipoUsuario,
    },
  };
}

module.exports = { login };