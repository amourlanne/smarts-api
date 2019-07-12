import request from 'supertest';
import server from '../../src';

describe('app', () => {
  it('should get users for GET /api/users', done => {
    return request(server)
      .get('/api/users')
      .expect(200, done);
  });
});
