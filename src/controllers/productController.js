const Product = require('../models/Product');
const { sendResponse } = require('../utils/responseUtils');

const createProduct = async (req, res) => {
  const { name, value, code } = req.body;
  try {
    const product = new Product({ name, value, code });
    await product.save();
    sendResponse(res, 201, true, 'Product created successfully', product);
  } catch (error) {
    console.error('Error saving product:', error);
    sendResponse(res, 500, false, 'Error saving product', null, error.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);

    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    const paginationData = {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        limit,
      },
    };

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
    const product = await Product.findOne({ code: id });
    if (!product) {
      return sendResponse(res, 404, false, 'Product not found');
    }
    sendResponse(res, 200, true, 'Product retrieved successfully', product);
  } catch (error) {
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
