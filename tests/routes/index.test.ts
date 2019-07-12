import request from 'supertest';
import server from '../../src';

describe('app', () => {
  it('should get message for GET /api', done => {
    return request(server)
      .get('/api')
      .expect(200, done);
  });
});
