var Knex = require("../db/database.js");
var _ = require("lodash");
var Scenarios = {};

Scenarios.save = function(so, cb){
  var loop = 1;
  var stepArray = [];
  _.each(so, function(v, k){
    if(so['step_type_' + loop] !== undefined){
      stepArray.push({
          type: so['step_type_' + loop],
          step: so['step_name_' + loop],
          scen_id: so['scen_id']
      })
    }
    loop = loop + 1;
  });
  Knex.insert(stepArray).into("steps")
  .then(cb)
  .catch(function(error){
    console.error(error);
  });

};






module.exports = Scenarios;
