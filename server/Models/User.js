//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var User = new Schema({
  name: { type: String, required: true },
  uniqueId: { type: String, required: true, index: { unique: true } },
  isManager: { type: Boolean, default: false },
  isLogged: { type: Boolean, default: false },
  loggedAsManager: { type: Boolean, default: false },
}, { collection: 'users' });

module.exports = mongoose.model('User', User);