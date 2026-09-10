const express = require('express');

const app = express();

app.use(express.json());

const equipamentoRoutes = require('./routes/equipamentoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/equipamentos', equipamentoRoutes);

module.exports = app;