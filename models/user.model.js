const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


module.exports = mongoose.model('User', userSchema);