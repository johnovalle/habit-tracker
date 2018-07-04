const bcyrpt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      const salt = bcyrpt.genSaltSync();
      const hash = bcyrpt.hashSync('suzaku', salt);
      return Promise.join(
        knex('users').insert({
          username: 'kururugi',
          password_digest: hash
        })
      );
    });
};
