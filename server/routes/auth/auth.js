const express = require('express');
const router = express.Router();


const localAuth = require('../../auth/local');
const authHelpers = require('../../auth/_helpers');

router.post('/register', (req, res, next) => {
  return authHelpers.createUser(req)
    .then((user) => {
      return localAuth.encodeToken(user[0]);
    })
    .then((token) => {
      res.status(200).json({
        status: 'success',
        token
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: err
      });
    });
});

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  return authHelpers.getUser(username)
    .then(response => {
      authHelpers.comparePass(password, response.password_digest);
      return response;
    })
    .then(response => localAuth.encodeToken(response))
    .then(token => {
      res.status(200).json({
        status: 'success',
        token
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        status: 'error'
      });
    });
});

module.exports = router;
