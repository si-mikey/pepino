var Users  = require('../models/users.js');
var usersController = {};

usersController.save = function(data, cb){
  var u = new Users;
  u.email = data.email;
  u.password = data.password;
  u.type = data.type
  u.create_date = new Date;
  u.active = data.active;
  u.save(cb);
};

usersController.model = Users;

module.exports = usersController;
