const { number } = require("joi");
const mongoose = require("mongoose");

const schema = mongoose.Schema({
 
  FristName: String,
 LastName: String,
  email: String,
  password: String,
  age: Number,
  phone: String,
  NID:Number,
  address: String
});
module.exports = mongoose.model('driver', schema)