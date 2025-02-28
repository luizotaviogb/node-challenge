const Product = require('../models/Product');

const createProduct = async (name, value, code) => {
  const product = new Product({ name, value, code });
  await product.save();
  return product;
};

const getAllProducts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  return {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      limit,
    },
  };
};

const getProductById = async (id) => {
  const product = await Product.findOne({ code: id });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};
