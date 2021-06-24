const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  firstName: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  trips: [{type: mongoose.Schema.Types.ObjectId, ref:'journeys'}]
});

module.exports = mongoose.model('users', userSchema);