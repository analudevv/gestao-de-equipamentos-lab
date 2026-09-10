const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const SELECT_SEM_SENHA = {
  id: true,
  nome: true,
  email: true,
  tipoUsuario: true,
  createdAt: true,
  updatedAt: true,
};

async function criarUsuario(dados) {
  const { nome, email, senha, tipoUsuario } = dados;

  if (!nome || !email || !senha || !tipoUsuario) {
    const erro = new Error('Nome, email, senha e tipoUsuario são obrigatórios.');
    erro.status = 400;
    throw erro;
  }

  if (!['ADMIN', 'PROFESSOR'].includes(tipoUsuario)) {
    const erro = new Error('tipoUsuario deve ser ADMIN ou PROFESSOR.');
    erro.status = 400;
    throw erro;
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  return prisma.usuario.create({
    data: { nome, email, senha: senhaHash, tipoUsuario },
    select: SELECT_SEM_SENHA,
  });
}

async function listarUsuarios() {
  return prisma.usuario.findMany({ select: SELECT_SEM_SENHA });
}

async function buscarUsuarioPorId(id) {
  const usuario = await prisma.usuario.findUnique({
    where: { id: Number(id) },
    select: SELECT_SEM_SENHA,
  });

  if (!usuario) {
    const erro = new Error('Usuário não encontrado.');
    erro.status = 404;
    throw erro;
  }

  return usuario;
}

async function atualizarUsuario(id, dados) {
  await buscarUsuarioPorId(id);

  const { nome, email, senha } = dados;
  const dataAtualizar = { nome, email };

  if (senha) {
    dataAtualizar.senha = await bcrypt.hash(senha, 10);
  }

  return prisma.usuario.update({
    where: { id: Number(id) },
    data: dataAtualizar,
    select: SELECT_SEM_SENHA,
  });
}

async function excluirUsuario(id) {
  await buscarUsuarioPorId(id);

  return prisma.usuario.delete({ where: { id: Number(id) } });
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario,
};