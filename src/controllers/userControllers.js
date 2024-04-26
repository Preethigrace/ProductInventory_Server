const express = require('express');
const UserModel = require('../models/UserModel');
const LoginModel = require('../models/LoginModel')
const _constants = require('../utils/constants');
const Mapper = require('../db/baseRepo');
const getNextSequenceValue = require('../SequenceModel/SequenceNumber');

//const {_constants,sequences,sequenceModelName} =
var passwordHash = require('password-hash');
const models = {
    UserModel,
    LoginModel
}
const mapper = new Mapper(models)


exports.createUser = async(req,res)=>{
    const {firstName,lastName,emailID,password,mobileNumber} = req.body

    if (req.body == undefined ||req.body == null ||Object.keys(req.
        body).length < 1) {
        res.json({
          type: false,
          code: 'S000',
          message: 'body required'
        })
        return
      }
      let requiredParams = {
        firstName:1,
        lastName:1,
        emailID:1,
        password:1,
        mobileNumber:1
      }
      for(let requestKey in requiredParams){
        if(
            req.body[requestKey] == null ||
            req.body[requestKey] == undefined ||
            req.body[requestKey].length<1
        ){
            res.json({
                type:false,
                code :'S002',
                msg: 'Invalid Parameters, ' + requestKey + 'must not be empty'
            })
            return
        }
      }
    try{
        let obj = {
            emailID:emailID
        }
    const userDataDetails = await mapper.FindOne('UserModel',obj)
    
    if(userDataDetails){
        return res.status(202).json({ error: 'Already Exists' })
    }
    else{
        // //userID sequence
        const userID = await getNextSequenceValue(_constants.sequenceModels.userSequenceModel, _constants.sequences.userSequence)
        const password = req.body.password
         //passowrd hashing using password-hash
         const hashedPassword = passwordHash.generate(password);
         
        const userDetailsObj = {
            userID: userID,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            emailID:req.body.emailID,
            password:hashedPassword,
            mobileNumber:req.body.mobileNumber,
            bussinnessType:req.body.bussinnessType,
            bussinessName:req.body.bussinessName,
            addressLine1:req.body.addressLine1,
            addressLine2:req.body.addressLine2
        }
        const loginDetailsObj = {
            userID:userID,
            emailID:req.body.emailID,
            password:hashedPassword,
            mobileNumber:req.body.mobileNumber
        }
        const userDetails = await mapper.create('UserModel',userDetailsObj)
        
        const loginDetails = await mapper.create('LoginModel',loginDetailsObj)

        if(userDetails){
            res.status(_constants.serverResponseCodes.Success).json({
                type:true,
                data:userDetails, 
                data1:loginDetails
            })
        }
        else{
            res.status(_constants.serverResponseCodes.NoData).json({
                type:false,
                msg:'No data found'
            })
        }
    }
}catch(error){
    console.log(error);
    res.status(_constants.serverResponseCodes.Error).json({
        type:false,
        msg:'Internal Server Error'
    })
}
}