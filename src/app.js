const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const slowDown = require('express-slow-down');

const app = express();

const swaggerOptions = {
  definition: require('./swagger/swagger.json'),
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 10,
  delayMs: () => 2000,
});

app.use(speedLimiter);

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);

connectDB();

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    success: false,
    message,
    error: err.name || 'Error',
  });
});

module.exports = app;
