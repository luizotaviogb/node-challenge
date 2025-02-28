const express = require('express');
const productController = require('../controllers/productController');
const validateRequiredFields = require('../middlewares/requestsMiddleware');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post(
  '/',
  validateRequiredFields(['name', 'value', 'code']),
  productController.createProduct,
);

module.exports = router;
