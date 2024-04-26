const express = require('express');
const Mapper = require('../db/baseRepo');
const _constants = require('../utils/constants');
const loginModel = require('../models/LoginModel');
const userModel = require('../models/UserModel');
const passwordHash = require('password-hash')
const secretKey = 'productinventory';
const Constants = require('../utils/constants')

const aes256 = require('aes256');
const models = {
    loginModel,
    userModel
}
const mapper = new Mapper(models)

//const getNextSequenceValue = require('../constants');
//const {sequences,sequenceModelName} =require('../utils/Constants')

exports.createLoginUser = async(req,res)=>{
console.log("login")


    const {emailID,password}  =req.body;
    try{
    if (req.body && Object.keys(req.body).length < 1) {
        res.status(_constants.serverResponseCodes.Invalid_Parameters).json({
            type: false,
            code: "S002",
            data: "Body should not be Empty"
        });
        return;
    }
    const user = await mapper.aggregate('loginModel',[
        {$match:{emailID:emailID}}
    ])
   

    const userDetails = user[0]
    if (!userDetails) {
        return res.status(401).json({ error: 'User Not Found' })
      }
      
      const encryptedData = userDetails.password
      
      const isPasswordCorrect = passwordHash.verify(password, encryptedData);
      if(!isPasswordCorrect){
        res.status(_constants.serverResponseCodes.Invalid_Parameters).json({
          type:false,
    
          data:'Password Mismatch'
        })
      }
      const expiresIn = 60 * 60 * 24 // 1 day
      const user2 = {
        userId : userDetails.UserID,
        emailID: userDetails.emailID,
        mobileNumber:userDetails.mobileNumber

      }// Sample user data
      
      
      const token1 = jwt.sign(user2, secretKey, { expiresIn: expiresIn }) // Create the token with the user data
      res.status(_constants.serverResponseCodes.Success).json({
        type: true,
        msg: 'Login Successfully',
        data: {
          EmailID: user2.emailID,
          MobileNumber: user2.mobileNumber
        },
        'x-fiftyaccess-token': token1
      })
    } catch (error) {
      console.log(error)
      res.status(_constants.serverResponseCodes.Error).json({
        type:false,
        error: 'Internal server error'
      })
    }
  }
  exports.forgotPassword = async(req,res)=>{
    console.log('forgot password api')

    const {emailID} = req.body
    try{
      if (!Constants.emailRegex.test(emailID)) {
        res.status(_constants.serverResponseCodes.Invalid_Parameters).json({
          type: false,
          code:'S002',
          msg:'Invalid emailID'
        })
      }
      
      const userObj = {"emailID":emailID}
      const userDetails = await mapper.FindOne('loginModel',userObj)
      
      if(!userDetails){
        return res.status(_constants.serverResponseCodes.NoData).json({
          type: true,
          code: 'N001',
          msg: `User does not exist with ${emailID}`
      });
      }
     
      const password = req.body.password
   
      const hashedPassword = passwordHash.generate(password);
      
            const userIDValue = userDetails.userID.toString();
          
      const verifyEmail = await mapper.update('loginModel',{userID:userIDValue,password:hashedPassword})
            console.log('345',verifyEmail)

            if (verifyEmail) {
              res.status(_constants.serverResponseCodes.Success).json({
                type:true,
                code:'S000',
                msg:"Password Successfully Updated"
              })

            }
    }catch(error){
      res.status(_constants.serverResponseCodes.Error).json({
        type:false,
        code:'E001',
        data:error
      })
return
    }
  }