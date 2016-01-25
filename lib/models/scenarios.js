var mongoose = require("../db/database");
var Schema = mongoose.Schema;

var scenarioSchema  = new Schema({
  scenario: {},
  author: String,
  create_date: { type: Date, default: Date.now },
  mod_date: { type: Date },
  mod_by: String,
  active: Boolean
},{
  toObject:{
    retainKeyOrder: true
  },
  toJSON: {
    retainKeyOrder: true
  }
});

module.exports = mongoose.model('Scenario', scenarioSchema);
