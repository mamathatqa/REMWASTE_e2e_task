const request = require('supertest');
const testData = require('../fixtures/testData.json'); // adjust path if needed

const baseURL = 'http://localhost:4000';

async function getAuthToken() {
  const response = await request(baseURL)
    .post('/login')
    .send({
      username: testData.validLogin.username,
      password: testData.validLogin.password,
    });

  if (response.statusCode !== 200 || !response.body.token) {
    throw new Error('Failed to get auth token');
  }

  return response.body.token;
}

module.exports = { getAuthToken };
