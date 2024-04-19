const mongoose = require('mongoose');
// const db = require('../db')
let ENV;
ENV = 'dev';
var PORT =3300;
exports.PORT = PORT;
var DB_URL;
if(ENV== 'dev'){
    DB_URL='mongodb://localhost:27017/ProductDB1'
}
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('mongoose connected')
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err))

var db = mongoose.connection
exports.db = db
exports.DB_URL = DB_URL
exports.ENV = ENV


