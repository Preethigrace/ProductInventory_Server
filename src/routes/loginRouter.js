const express = require('express');

const loginUser = require('../controllers/loginController');

const router = express.Router();
 
router.post('/loginUser',loginUser.createLoginUser);
router.post('/forgotpassword',loginUser.forgotPassword);
module.exports = router;