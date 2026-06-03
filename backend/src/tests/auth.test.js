process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';

const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('auth routes', () => {
  it('registers a user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password@123',
      phone: '1234567890',
      dob: '1995-01-01'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user.email).toBe('test@example.com');
  });
});
