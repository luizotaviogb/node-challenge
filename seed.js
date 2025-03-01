const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Product = require('./src/models/Product');
const User = require('./src/models/User');

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

    await User.deleteMany({ login: 'admin' });

    await Product.insertMany(products);
    console.info(`${productCount} products inserted.`);

    const adminUser = {
      login: 'admin',
      password: 'admin',
    };
    await User.create(adminUser);

    await mongoose.connection.close();
    console.info('Connection closed and admin user created.');
  } catch (error) {
    console.error('Error inserting seeds', error);
  }
};

const quantity = parseInt(process.argv[2]);
seedDatabase(quantity);
