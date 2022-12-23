const { userValidation, userValidationLogin } = require('../middleware/validiation')
const { signup, signin, emailVerfiyed  } = require('../services/user.service')
const router = require('express').Router()
router.post('/signup',userValidation,signup)
router.post('/signin',userValidationLogin,signin)
router.get('/verfiy/:token',emailVerfiyed)
module.exports=router