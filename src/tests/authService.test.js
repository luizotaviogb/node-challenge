const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils');
const mongoose = require('mongoose');

jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('../utils/jwtUtils');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/login', () => {
    it('should return a token if login and password are valid', async () => {
      const mockUser = {
        _id: '123',
        login: 'testuser',
        password: 'hashedpassword',
      };
      User.findOne.mockResolvedValue(mockUser);

      bcrypt.compare.mockResolvedValue(true);

      jwtUtils.generateToken.mockReturnValue('fakeToken');

      const response = await request(app)
        .post('/auth/login')
        .send({ login: 'testuser', password: 'password123' });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: 'Login successful',
        success: true,
        data: {
          token: 'fakeToken',
        },
      });

      expect(User.findOne).toHaveBeenCalledWith({ login: 'testuser' });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedpassword',
      );
      expect(jwtUtils.generateToken).toHaveBeenCalledWith('123');
    });

    it('should return 401 if login is invalid', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({ login: 'invaliduser', password: 'password123' });

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        message: 'Invalid credentials',
        success: false,
      });

      expect(User.findOne).toHaveBeenCalledWith({ login: 'invaliduser' });
    });

    it('should return 401 if password is invalid', async () => {
      const mockUser = {
        _id: '123',
        login: 'testuser',
        password: 'hashedpassword',
      };
      User.findOne.mockResolvedValue(mockUser);

      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post('/auth/login')
        .send({ login: 'testuser', password: 'wrongpassword' });

      expect(response.statusCode).toBe(401);
      expect(response.body).toEqual({
        message: 'Invalid credentials',
        success: false,
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        'wrongpassword',
        'hashedpassword',
      );
    });
  });

  describe('POST /auth/register', () => {
    it('should register a new user and return the login', async () => {
      const mockUser = {
        login: 'newuser',
        save: jest.fn().mockResolvedValue({ login: 'newuser' }),
      };
      User.mockImplementation(() => mockUser);

      const response = await request(app)
        .post('/auth/register')
        .send({ login: 'newuser', password: 'password123' });

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        data: { login: 'newuser' },
        message: 'User created successfully',
        success: true,
      });

      expect(User).toHaveBeenCalledWith({
        login: 'newuser',
        password: 'password123',
      });

      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should return 500 if registration fails', async () => {
      const mockUser = {
        login: 'newuser',
        save: jest.fn().mockRejectedValue(new Error('Database error')),
      };
      User.mockImplementation(() => mockUser);

      const response = await request(app)
        .post('/auth/register')
        .send({ login: 'newuser', password: 'password123' });

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({
        message: 'Database error',
        success: false,
        message: 'Error creating user',
        error: 'Database error',
      });
    });
  });
});
