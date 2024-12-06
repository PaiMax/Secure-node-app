const request = require('supertest');
const app = require('../notes'); // Adjust the path to your app file


describe('POST /login', () => {
  it('should return an error if the username is not provided', async () => {
    const res = await request(app)
      .post('/api/login') // Adjust route if necessary
      .send({}); // No 'name' field in the body

    expect(res.statusCode).toBe(400); // Or whatever error status you want
    expect(res.text).toBe('please provide the username');
  });

  it('should return a token if the username is provided', async () => {
    const username = 'testUser';
    
    const res = await request(app)
      .post('/api/login') // Adjust route if necessary
      .send({ name: username });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token'); // Check if token exists
    expect(typeof res.body.token).toBe('string'); // Check if it's a string (JWT token format)
  });
});
