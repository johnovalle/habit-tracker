process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = require('should');

const localAuth = require('../../server/auth/local');

describe('auth :  local', () => {
  it('should return a token', (done) => {
    const results = localAuth.encodeToken({id: 1});
    should.exists(results);
    results.should.be.a.String();
    done();
  });
});

describe('decodeToken()', () => {
  it('should return a payload', (done) => {
    const token = localAuth.encodeToken({id: 1});
    should.exist(token);
    token.should.be.a.String();
    localAuth.decodeToken(token, (err, res) => {
      should.not.exist(err);
      res.subject.should.eql(1);
      done();
    });
  });
});
