const { signup } = require('../Controllers/AuthController');
const { signupValidation }= require('../Middlewares/AuthValidation');
const { login } = require('../Controllers/AuthController');
const { loginValidation }= require('../Middlewares/AuthValidation');

const router= require('express').Router();

router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);
module.exports=router;
