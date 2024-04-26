var mongoose = require('mongoose');
//var Schema = mongoose.Schema

var loginScehma = new mongoose.Schema({
    userID: {type:String,},
    firstName:{type:String,},
    lastName:{type:String},
    emailID:{type:String},
    password:{type:String},
    mobileNumber:{type:Number},
    countryCode:{type:String},
    createdPersonID: { type: String }, //To keep track on Login details created PersonID
    updatedPersonID: { type: String }, //To keep track on Login details updated PersonID
    createdDate: { type: Date }, //To keep track on Login details created Date
    updatedDate: { type: Date } //To keep track on Login details updated Date

})
var loginModel = mongoose.model('loginmodel',loginScehma)
module.exports =loginModel;