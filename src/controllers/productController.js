const productService = require('../services/productService');
const { sendResponse } = require('../utils/responseUtils');

const createProduct = async (req, res) => {
  const { name, value, code } = req.body;

  try {
    const product = await productService.createProduct(name, value, code);
    sendResponse(res, 201, true, 'Product created successfully', product);
  } catch (error) {
    console.error('Error saving product:', error);
    sendResponse(res, 500, false, 'Error saving product', null, error.message);
  }
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const paginationData = await productService.getAllProducts(page, limit);
    sendResponse(
      res,
      200,
      true,
      'Products retrieved successfully',
      paginationData,
    );
  } catch (error) {
    console.error('Error listing products:', error);
    sendResponse(
      res,
      500,
      false,
      'Error listing products',
      null,
      error.message,
    );
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productService.getProductById(id);
    sendResponse(res, 200, true, 'Product retrieved successfully', product);
  } catch (error) {
    if (error.message === 'Product not found') {
      return sendResponse(res, 404, false, error.message);
    }
    console.error('Error searching for product:', error);
    sendResponse(
      res,
      500,
      false,
      'Error searching for product',
      null,
      error.message,
    );
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
