const express = require('express');

const app = express();

app.use(express.json());

const equipamentoRoutes = require('./routes/equipamentoRoutes');

app.use('/api/equipamentos', equipamentoRoutes);

module.exports = app;