var mongoose = require("../db/database");
var Schema = mongoose.Schema;

var scenarioSchema  = new Schema({
  scenario: Schema.Types.Mixed,
  author: String,
  create_date: { type: Date, default: Date.now },
  mod_date: { type: Date },
  mod_by: String,
  active: Boolean
});

module.exports = mongoose.model('Scenario', scenarioSchema);
