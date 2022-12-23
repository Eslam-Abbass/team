const mongoose = require("mongoose");

const schema = mongoose.Schema({
  
  FristName: String,
  LastName: String,
   email: String,
   password: String,
   age: Number,
   phone: String,
   address: String,
   emailConfirm:{type:Boolean,default:false},

});
module.exports = mongoose.model('user', schema)