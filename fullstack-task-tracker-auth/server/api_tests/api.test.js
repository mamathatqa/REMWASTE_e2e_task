const request = require('supertest');
const baseURL = 'http://localhost:4000';
const { getAuthToken } = require('../utils/auth');
const testData = require('../fixtures/testData.json');

describe('API tests', () => {
  let authToken;
  let createdTaskId;

  beforeAll(async () => {
    token = await getAuthToken();  // Reuse token in all tests
  });

  testData.login.forEach(({ scenario, username, password, expectedStatus, expectedMessage, hasToken }) => {  
    test(`login ${scenario} `, async () => {   
      const response =  await request(baseURL)
        .post('/login')
        .send({ username: username, password: password });

      expect(response.statusCode).toBe(expectedStatus);
      
      if (expectedMessage) {
        expect(response.body).toHaveProperty('message', expectedMessage);
      }

      if (hasToken) {
        expect(response.body).toHaveProperty('token');
      }
    });
  });

  test('Create task without title', async () => {
    const task = testData.task.create
    const response = await request(baseURL)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ title: "" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Title is required');
  });

  test('Create task without valid token', async () => {
    const task = testData.task.create
    const response = await request(baseURL)
      .post('/tasks')
      .set('Authorization', `Bearer dfkjshkjfhdhskjfdkjs`)
      .set('Content-Type', 'application/json')
      .send({ title: "testwithouttoken" });

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  test('Create task with title', async () => {
    const task = testData.task.create
    const response = await request(baseURL)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ title: task });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTaskId = response.body.id;
    expect(response.body.title).toBe(task);
  });

  test('Edit task with invalid id', async () => {
    const task = 'tets'
    const createdTaskId = 0
    const response = await request(baseURL)
      .put(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ title: task });
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Task not found');
  });

  test('Edit task with id', async () => {
    const task = testData.task.edit
    const response = await request(baseURL)
      .put(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send({ title: task });
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(createdTaskId);
    expect(response.body.title).toBe(task);
  });

  test('delete task with no valid token', async () => {
    const task = testData.task.edit
    const response = await request(baseURL)
      .delete(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer jdhfjhdkjshflks`)
      .set('Content-Type', 'application/json')
            
      expect(response.statusCode).toBe(403);
      expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  test('delete task with no valid taskid', async () => {
    const task = testData.task.edit
    const response = await request(baseURL)
      .delete(`/tasks/0`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
            
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message', 'Task not found');
  });

  test('delete task with id', async () => {
    const task = testData.task.edit
    const response = await request(baseURL)
      .delete(`/tasks/${createdTaskId}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Task deleted');
  });

});
