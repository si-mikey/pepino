var Scenario = require('../models/scenarios.js');
var s = new Scenario;
var scenarioController = {};

scenarioController.save = function(data, callback){
  s.scenario = data.scenario;
  s.author = data.author;
  s.create_date = new Date;
  s.mod_date = new Date;
  s.mod_by = data.mod_by;
  s.active = data.status;
  s.save(callback);
};

module.exports = scenarioController;
