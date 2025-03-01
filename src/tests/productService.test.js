const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const mongoose = require('mongoose');

jest.mock('../models/Product');

jest.mock('../middlewares/authMiddleware', () => (req, res, next) => {
  req.user = { id: '123', role: 'user' };
  next();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Product Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /products', () => {
    it('should return all products with pagination', async () => {
      const mockProducts = [
        { name: 'Laptop', value: 1200, code: 'LP123' },
        { name: 'Mouse', value: 20, code: 'MO456' },
      ];

      const mockFind = {
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockProducts),
      };
      Product.find.mockReturnValue(mockFind);

      Product.countDocuments.mockResolvedValue(2);

      const response = await request(app)
        .get('/products')
        .query({ page: 1, pageSize: 10 });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'Products retrieved successfully',
        data: {
          products: mockProducts,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalProducts: 2,
            pageSize: 10,
          },
        },
      });

      expect(Product.find).toHaveBeenCalledWith({});
      expect(mockFind.skip).toHaveBeenCalledWith(0);
      expect(mockFind.limit).toHaveBeenCalledWith(10);
      expect(Product.countDocuments).toHaveBeenCalledWith({});
    });
  });

  describe('POST /products', () => {
    it('should create a new product', async () => {
      const mockProduct = {
        name: 'Laptop',
        value: 1200,
        code: 'LP123',
        save: jest.fn().mockResolvedValue({
          name: 'Laptop',
          value: 1200,
          code: 'LP123',
        }),
      };
      Product.mockImplementation(() => mockProduct);

      const response = await request(app)
        .post('/products')
        .send({ name: 'Laptop', value: 1200, code: 'LP123' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        success: true,
        message: 'Product created successfully',
        data: {
          name: 'Laptop',
          value: 1200,
          code: 'LP123',
        },
      });

      expect(mockProduct.save).toHaveBeenCalled();
    });

    it('should return 500 if saving fails', async () => {
      const mockProduct = {
        name: 'Laptop',
        value: 1200,
        code: 'LP123',
        save: jest.fn().mockRejectedValue(new Error('Database error')),
      };
      Product.mockImplementation(() => mockProduct);

      const response = await request(app)
        .post('/products')
        .send({ name: 'Laptop', value: 1200, code: 'LP123' });

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        success: false,
        message: 'Error saving product',
        error: 'Database error',
      });
    });
  });

  describe('GET /products/:id', () => {
    it('should return a product by its code', async () => {
      const mockProduct = { name: 'Laptop', value: 1200, code: 'LP123' };
      Product.findOne.mockResolvedValue(mockProduct);

      const response = await request(app).get('/products/LP123');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: 'Product retrieved successfully',
        data: mockProduct,
      });
    });

    it('should return 404 if the product is not found', async () => {
      Product.findOne.mockResolvedValue(null);

      const response = await request(app).get('/products/INVALID_CODE');

      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        success: false,
        message: 'Product not found',
      });
    });
  });
});
