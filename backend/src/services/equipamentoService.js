const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarEquipamento(dados) {
  const { nome, tipo, status } = dados;

  if (!nome || !tipo) {
    const erro = new Error('Nome e tipo são obrigatórios.');
    erro.status = 400;
    throw erro;
  }

  return prisma.equipamento.create({
    data: { nome, tipo, status },
  });
}

async function listarEquipamentos() {
  return prisma.equipamento.findMany();
}

async function buscarEquipamentoPorId(id) {
  const equipamento = await prisma.equipamento.findUnique({
    where: { id: Number(id) },
  });

  if (!equipamento) {
    const erro = new Error('Equipamento não encontrado.');
    erro.status = 404;
    throw erro;
  }

  return equipamento;
}

async function atualizarEquipamento(id, dados) {
  await buscarEquipamentoPorId(id); // garante que existe (senão já lança 404)

  const { nome, tipo, status } = dados;

  return prisma.equipamento.update({
    where: { id: Number(id) },
    data: { nome, tipo, status },
  });
}

async function alterarStatus(id, novoStatus) {
  await buscarEquipamentoPorId(id);

  if (!['DISPONIVEL', 'MANUTENCAO'].includes(novoStatus)) {
    const erro = new Error('Status inválido. Use DISPONIVEL ou MANUTENCAO.');
    erro.status = 400;
    throw erro;
  }

  return prisma.equipamento.update({
    where: { id: Number(id) },
    data: { status: novoStatus },
  });
}

async function excluirEquipamento(id) {
  await buscarEquipamentoPorId(id);

  return prisma.equipamento.delete({
    where: { id: Number(id) },
  });
}

module.exports = {
  criarEquipamento,
  listarEquipamentos,
  buscarEquipamentoPorId,
  atualizarEquipamento,
  alterarStatus,
  excluirEquipamento,
};