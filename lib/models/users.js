var mongoose = require("../db/database");
var Schema = mongoose.Schema;

var usersSchema  = new Schema({
  email: {type: String, required: true, index: { unique: true}},
  password: {type: String, required: true},
  type: String,
  create_date: { type: Date, default: Date.now },
  active: Boolean
});

module.exports = mongoose.model('Users', usersSchema);
