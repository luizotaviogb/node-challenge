const Product = require('../models/Product');
const { buildProductQuery } = require('../utils/queryBuilder');

/**
 * Saves a new product to the database.
 * @param {string} name - The name of the product.
 * @param {number} value - The value (price) of the product.
 * @param {string} code - The unique code of the product.
 * @returns {Object} - The saved product object.
 */
const save = async (name, value, code) => {
  const product = new Product({ name, value, code });
  await product.save();
  return product;
};

/**
 * Retrieves a paginated list of products based on filters.
 * @param {number} [page=1] - The current page number (default: 1).
 * @param {number} [pageSize=10] - The number of products per page (default: 10).
 * @param {Object} [filters={}] - Filters to apply to the product query.
 * @returns {Object} - An object containing the list of products and pagination details.
 */
const getAll = async (page = 1, pageSize = 10, filters = {}) => {
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

/**
 * Retrieves a product by its unique code.
 * @param {string} id - The unique code of the product.
 * @returns {Object} - The product object.
 * @throws {Error} - Throws an error if the product is not found.
 */
const getByCode = async (id) => {
  const product = await Product.findOne({ code: id });
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

module.exports = {
  save,
  getAll,
  getByCode,
};
