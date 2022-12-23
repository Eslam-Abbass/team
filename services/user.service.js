const userModel = require(".././models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { sendEmail } = require("../emails/user.email");
const catchAsyncErorr = require("../utils/catchAsyncErorr");
const appErorr = require("../utils/appErorr");

exports.signup =catchAsyncErorr(
  async (req, res,next) => {
    const {   FristName,
      LastName,
       email,
       password,
       age,
       phone,
       address } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return  next(new appErorr(`Email Aleardy Exist`,400))

    } else {
      bcrypt.hash(
        password,
        Number(process.env.ROUND),
        async function (err, hash) {
          await userModel.insertMany({ FristName,
            LastName,
             email,
             password:hash,
             age,
             phone,address });
          var token = jwt.sign({ email }, process.env.JWT_KEY2);
          sendEmail({ email, token, message: "Hello From Swvl Team!" });
          return  res.json({ message: "Success Register" });
        }
      );
    }
  }
) 

exports.signin =catchAsyncErorr(
  async (req, res,next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        var token = jwt.sign(
          { userid: user._id, name: user.name },
          process.env.JWT_KEY
        );
        if (user.emailConfirm == true) {
          
          return res.json({ message: "Success Login", token });
        } else {
          return next(new appErorr(`Verfiyed Email First!`,400))
         
        }
      } else {
        return next(new appErorr(`In_valid password`,400))
      }
    } else {
      return next(new appErorr(`In_valid account`,400))
    }
  }
) 

module.exports.emailVerfiyed = async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.JWT_KEY2, async (err, decoded) => {
    if (err) {
      console.log(err);
    } else {
      const user = await userModel.findOne({ email:decoded.email });
      if (user) {
        await userModel.findOneAndUpdate({ email:decoded.email }, { emailConfirm: true });
        return res.json({ message: "Email Verfiyed" });
      } else {
        return  res.json({ message: "User Not Found" });
      }
    }
  });
};
