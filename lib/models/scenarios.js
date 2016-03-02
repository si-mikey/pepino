var Knex = require("../db/database.js");
var _ = require("lodash");
var Scenarios = {};

Scenarios.saveSteps = function(so, cb){
  var loop = 1;
  var steps = [];
  _.each(so.scenario, function(v, k){
    if(so.scenario['step_type_' + loop] !== undefined){
      steps.push({
          type: so.scenario['step_type_' + loop],
          step: so.scenario['step_name_' + loop],
          scen_id: so.scenario['scen_id']
      })
    }
    loop = loop + 1;
  });
  Knex.insert(steps).into("steps")
  .asCallback(cb);
};

Scenarios.saveScenario = function(so, cb){
  Knex("scenarios").insert({
    scenario_name: so.scenario.scenario_name,
    scen_id: so.scenario.scen_id,
    author: so.user.id,
    active: so.scenario.active
  }).asCallback(cb);

};


module.exports = Scenarios;
