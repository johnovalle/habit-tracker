const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'habit',
  },
});

module.exports = knex;
