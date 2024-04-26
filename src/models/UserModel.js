var mongoose = require('mongoose');
const Joi = require('joi')
//var Schema = mongoose.Schema

var userScehma = new mongoose.Schema({
    userID: {type:String,},
    firstName:{type:String},
    lastName:{type:String},
    mobileNumber:{type:Number},
    countryCode:{type:String},
    emailID:{type:String},
    password:{type:String},
    bussinessType:{type:String},
    bussinessName:{type:String},
    addressLine1:{type:String},
    addressLine2:{type:String},
    createdPersonID: { type: String }, //To keep track on Login details created PersonID
    updatedPersonID: { type: String }, //To keep track on Login details updated PersonID
    createdDate: { type: Date }, //To keep track on Login details created Date
    updatedDate: { type: Date } //To keep track on Login details updated Date
})
var UserModel = mongoose.model('userModel',userScehma);
module.exports = UserModel;                     