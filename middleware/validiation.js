const Joi = require("joi");

let methods = ["body", "params"];

const schema = {
  body: Joi.object({
    FristName: Joi.string().alphanum().min(3).max(30).required(),
    LastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    rePassword: Joi.ref("password"),
    phone: Joi.string().min(11).max(11).required(),
    address:Joi.string(),
    age:Joi.number().min(16)
    
  }),
  params: Joi.object({
    id: Joi.string().min(4).max(4),
  }),
};

module.exports.userValidation = (req, res, next) => {
  let msgArrays = [];
  methods.map((key) => {
    let { error } = schema[key].validate(req[key], { abortEarly: false });
    if (error) {
      error.details.map((msg) => {
        msgArrays.push(msg.message);
      });
    }
  });
  if (msgArrays.length > 0) {
    res.json(msgArrays);
  } else {
    next();
  }
};

const schemaLogin = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  params: Joi.object({
    id: Joi.string().min(4).max(4),
  }),
};

module.exports.userValidationLogin = (req, res, next) => {
  let msgArrays = [];
  methods.map((key) => {
    let { error } = schemaLogin[key].validate(req[key], { abortEarly: false });
    if (error) {
      error.details.map((msg) => {
        msgArrays.push(msg.message);
      });
    }
  });
  if (msgArrays.length > 0) {
    res.json(msgArrays);
  } else {
    next();
  }
};
