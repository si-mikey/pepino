var Knex = require('../db/database.js');
var Users = {};

Users.findByLogin = function(email, password, cb){
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


module.exports = Users;
