var Scenario = require('../models/scenarios.js');
var scenarioController = {};

scenarioController.save = function(data, cb){
  var s = new Scenario;
  s.scenario_name = data.scenario_name;
  s.scenario_steps = data.scenario_steps;
  s.author = data.author;
  s.create_date = new Date;
  s.mod_date = new Date;
  s.mod_by = data.mod_by;
  s.active = data.active;
  s.save(cb);
};

scenarioController.model = Scenario;

module.exports = scenarioController;
