const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');

function encodeToken(user) {
  const payload = {
    expire: moment().add(14, 'days').unix(),
    created_at: moment().unix(),
    subject: user.id
  };

  return jwt.sign(payload, config.jwtSecret);
}

function decodeToken(token, callback) {
  const payload = jwt.verify(token, config.jwtSecret);
  const now = moment().unix();

  if (now > payload.expire) {
    callback('Token has expired.');
  } else {
    callback(null, payload);
  }
}

module.exports = {
  encodeToken,
  decodeToken
}
