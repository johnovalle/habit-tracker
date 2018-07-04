process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server');
const db = require('../../server/db');

describe('routes : auth', () => {
  beforeEach(() => {
    return db.migrate.rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
  });

  afterEach(() => {
    return db.migrate.rollback()
    .then(() => db.migrate.latest());
  });

  describe('POST /auth/register', () => {
    it('should register a new user', done => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'user',
        password: 'password'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.should.have.keys('status', 'token');
        res.body.status.should.eql('success');
        done();
      });
    });


    describe('POST /auth/login', () => {
      it('should login a user', (done) => {
        chai.request(server)
        .post('/auth/login')
        .send({
          username: 'kururugi',
          password: 'suzaku'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.redirects.length.should.eql(0);
          res.status.should.eql(200);
          res.type.should.eql('application/json');
          res.body.should.have.keys('status', 'token');
          res.body.status.should.eql('success');
          should.exist(res.body.token);
          done();
        });
      });

      it('should not login an unregistered user', (done) => {
        chai.request(server)
        .post('/auth/login')
        .send({
          username: 'kozuki',
          password: 'kallen'
        })
        .end((err, res) => {
          //should.exist(err);
          res.status.should.eql(500);
          res.type.should.eql('application/json');
          res.body.should.not.have.keys('status', 'token');
          res.body.status.should.eql('error');
          should.not.exist(res.body.token);
          done();
        });
      });

      it('should not login a user with the wrong password', (done) => {
        chai.request(server)
        .post('/auth/login')
        .send({
          username: 'kururugi',
          password: 'lelouche'
        })
        .end((err, res) => {
          //should.exist(err);
          res.status.should.eql(500);
          res.type.should.eql('application/json');
          res.body.should.not.have.keys('status', 'token');
          res.body.status.should.eql('error');
          should.not.exist(res.body.token);
          done();
        });
      });
    });
  });
});
