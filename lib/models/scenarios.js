var Schema = require("../db/database").Schema;

var scenarioSchema = new Schema({
  name: String,
  author_id: String,
  create_date: { type: Date, default: Date.now },
  mod_date: { type: Date },
  active: Boolean
});
  
  
