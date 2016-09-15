var Knex = require('../db/database.js');

module.exports.findByLogin = function(email, password, cb){
  Knex.select("*").from("users")
    .where({
        email: email,
        password: password
    })
    .then(cb)
    .catch(function(error){
      console.error(error);
    });

};

