const app = require('../app');
const supertest = require('supertest');
const api = supertest(app);
const mongoose = require('mongoose');
const helper = require('./test_helper')
const User = require('../models/user');

beforeEach(async () => {
    await User.deleteMany({});
    console.log('cleared');
}, 1000000);

describe('valid users', () => {
    test('valid users can be added', async () => {
        const validUser = {
            'username': 'valid',
            'name': 'should be added',
            'password': 'valid'
        }
        await api
        .post('/api/users')
        .send(validUser)
        .expect(201)
    
        const usersAtEnd = await helper.usersInDb()
        
        expect(usersAtEnd).toHaveLength(1)
        expect(usersAtEnd[0].username).toContain(validUser.username)
        
    })
})

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

    const usersAtEnd = await helper.usersInDb()
    
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

    const usersAtEnd = await helper.usersInDb()
    
    expect(usersAtEnd).toHaveLength(0)
    expect(usersAtEnd).not.toContain(invalidUser.username)
    
})
})

afterAll(async () => {
    await mongoose.connection.close();
  });