const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const mongoose = require('mongoose');
const helper = require('./test_helper')
const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('cleared');
}, 1000000);

describe('invalid users can not be added', () => {
test('username must be at least 3 characters long', async () => {
    const invalidUser = {
        'username': 'ab',
        'name': 'should not be added',
        'password': 'test'
    }
    await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

    const usersAtEnd = await helper.usersInDb
    
    expect(usersAtEnd).toHaveLength(0)
    expect(usersAtEnd).not.toContain(invalidUser.username)
    
})
test('password must be at least 3 characters long', async () => {
    const invalidUser = {
        'username': 'validUserName',
        'name': 'should not be added',
        'password': 'ab'
    }
    await api
    .post('/api/users')
    .send(invalidUser)
    .expect(400)

    const usersAtEnd = await helper.usersInDb
    
    expect(usersAtEnd).toHaveLength(0)
    expect(usersAtEnd).not.toContain(invalidUser.username)
    
})
})

afterAll(async () => {
    await mongoose.connection.close();
  });