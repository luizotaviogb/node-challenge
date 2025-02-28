const express = require('express');
const productController = require('../controllers/productController');
const validateRequiredFields = require('../middlewares/requestsMiddleware');

const router = express.Router();

router.get('/', productController.getAll);
router.get('/:id', productController.getByCode);
router.post(
  '/',
  validateRequiredFields(['name', 'value', 'code']),
  productController.save,
);

module.exports = router;
