var config = require('../../config/config.js');
var env_prod = (process.env.ENV === 'prod') ? true : false;
var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.db,
      debug: env_prod 
    }
});

if(typeof knex === 'function')
  console.log('Connected to the database');

module.exports = knex;
