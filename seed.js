const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('./src/models/Product');
const connectDB = require('./src/config/db');

const generateFakeProduct = () => {
  return {
    name: faker.commerce.productName(),
    code: faker.string.alphanumeric(10),
    value: parseFloat(faker.commerce.price(10, 1000, 2)),
  };
};

const seedDatabase = async (quantity) => {
  try {
    await connectDB();

    const productCount = quantity || 20;
    const products = Array.from({ length: productCount }, generateFakeProduct);

    await Product.insertMany(products);
    console.log(`${productCount} inserted.`);

    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Err inserting seeds', error);
  }
};

const quantity = parseInt(process.argv[2]);
seedDatabase(quantity);
