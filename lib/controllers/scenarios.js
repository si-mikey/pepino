var Scenario = require('../models/scenarios.js');
var scenarioController = {};

scenarioController.save = function(data, callback){
  var s = new Scenario;
  s.scenario = data.scenario;
  s.author = data.author;
  s.create_date = new Date;
  s.mod_date = new Date;
  s.mod_by = data.mod_by;
  s.active = data.status;
  s.save(cb);
};

module.exports = scenarioController;
