var Scenario = require('../models/scenarios.js');
var s = new Scenario;
var scenarioController = {};

scenarioController.save = function(data){
  s.scenario = data.scenario;
  s.author = data.author;
  s.create_date = new Date;
  s.mod_date = new Date;
  s.mod_by = data.mod_by;
  s.active = data.status
  s.save(function(result){
    if(result !== null){
      return true;
    }
    else{
      console.log('Scenario save error: ' + result);
      return false;
    }
  });
};

module.exports = scenarioController;
