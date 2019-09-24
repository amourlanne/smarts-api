import request from 'supertest';
import server from '../src';

describe('security.ts', () => {
  it('should redirect to /api for GET /', done => {
    return request(server)
      .get('/')
      .expect('Location', '/api')
      .expect(302, done);
  });
});
