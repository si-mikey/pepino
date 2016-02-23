var Knex = require("../db/database.js");
var _ = require("lodash");
var Scenarios = {};

Scenarios.save = function(so, cb){
  var loop = 1;
  _.each(so, function(v, k){
    if(so['step_type_' + loop] !== undefined){
      .log(so['step_type_' + loop]);
    }
    loop = loop + 1;
    console.log(loop);
  });

};






module.exports = Scenarios;
