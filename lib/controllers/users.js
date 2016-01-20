var Users  = require('../models/users.js');
var usersController = {};

usersController.save = function(data, cb){
  var s = new Scenario;
  u.create_date = new Date;
  u.active = data.active;
  u.save(cb);
};

usersController.model = Users;

module.exports = usersController;
