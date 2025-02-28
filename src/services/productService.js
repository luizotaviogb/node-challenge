const Product = require('../models/Product');
const { buildProductQuery } = require('../utils/queryBuilder');

const createProduct = async (name, value, code) => {
  const product = new Product({ name, value, code });
  await product.save();
  return product;
};

const getAllProducts = async (page = 1, pageSize = 10, filters = {}) => {
  const skip = (page - 1) * pageSize;
  const query = buildProductQuery(filters);
  const products = await Product.find(query).skip(skip).limit(pageSize);
  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / pageSize);

  return {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      pageSize,
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
