const express =require('express');

const registerUser =require('../controllers/userControllers');

 const router = express.Router();

router.post('/registerUser',registerUser.createUser);

module.exports =router;


