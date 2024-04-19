const mongoose = require('mongoose');

const ProuctSchema = new mongoose.Schema({
    productID: {type:String},
    productType:{type:String},
    productName:{type:String},
    

})