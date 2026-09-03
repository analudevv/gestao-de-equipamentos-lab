const express = require('express');

const app = express();

app.use(express.json());

// As rotas serão registradas aqui conforme cada entidade for implementada.
// Exemplo (ainda não criado):
// const equipamentoRoutes = require('./routes/equipamentoRoutes');
// app.use('/api/equipamentos', equipamentoRoutes);

module.exports = app;