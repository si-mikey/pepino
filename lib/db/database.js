var config = require('../../config/config.js');
var env_prod = (process.env.ENV === 'prod') ? true : false;
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: config.server.host,
      user: config.server.user,
      password: config.server.password,
      database: config.server.db,
      debug: env_prod 
    }
});

if(typeof knex === 'function')
  console.log('Connected to the database');

module.exports = knex;
