const driverModel = require("../models/driver.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const appErorr = require("../utils/appErorr");
const catchAsyncErorr = require("../utils/catchAsyncErorr");

exports.signup =catchAsyncErorr(async (req, res,next) => {
  const {   FristName,
    LastName,
     email,
     password,
     age,
     phone,
     address } = req.body;
  const driver = await driverModel.findOne({ email });
  if (driver) {
   return next(new appErorr(`Email Aleardy Exist`,400))

  } else {
    bcrypt.hash(
      password,
      Number(process.env.ROUND),
      async function (err, hash) {
        await driverModel.insertMany({ FristName,
          LastName,
           email,
           password:hash,
           age,
           phone,address });
           return   res.json({ message: "Success Register",yourEmail:email,yourPassword:password});
      }
    );
  }
}) 
exports.signin =catchAsyncErorr(async (req, res,next) => {
  const { email, password } = req.body;
  const driver = await driverModel.findOne({ email });
  if (driver) {
    const match = await bcrypt.compare(password, driver.password);
    if (match) {
      var token = jwt.sign(
        { driverid: driver._id, name: driver.name },
        process.env.JWT_KEY
      );
      return    res.json({ message: "Success Login", token });
     
    } else {
      return  next(new appErorr(`In_valid account`,400))
    }
  } else {
    return  next(new appErorr(`In_valid account`,400))
  }
}) ;



