var mongoose = require("../db/database");
var Schema = mongoose.Schema;

var usersSchema  = new Schema({
  email: {type: String, required: true, index: { unique: true }},
  first_name: String,
  last_name: { type: String, default: 'n/a' },
  password: { type: String, required: true },
  type: String,
  create_date: { type: Date, default: Date.now },
  active: Boolean
});

module.exports = mongoose.model('Users', usersSchema);
