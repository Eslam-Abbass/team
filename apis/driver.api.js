const { userValidation, userValidationLogin } = require('../middleware/validiation')
const { signup, signin } = require('../services/driver.service')
const router = require('express').Router()
router.post('/signup',userValidation,signup)
router.post('/signin',userValidationLogin,signin)

module.exports=router