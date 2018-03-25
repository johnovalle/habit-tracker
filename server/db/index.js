const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'habit',
  },
});

knex.on( 'query', function( queryData ) {
  console.log( queryData );
});

module.exports = knex;
