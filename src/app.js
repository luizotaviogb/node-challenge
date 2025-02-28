const express = require('express');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);

connectDB();

module.exports = app;
