import http from 'http';
import assert from 'assert';
import './index';


//Test currently fails because webpack is compiling on run
describe('test that the server is running', () => {
  it('should return 200', done => {
    http.get('http://127.0.0.1:3000', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
