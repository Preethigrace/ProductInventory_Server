const express = require("express");
const  app = express();
const db = require('../src/db/db');
const userRouter = require('./routes/UserRoute');
const userLoginRouter = require('./routes/loginRouter');
// require("./routes/UserRoute")(app);
//const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false
}));

 app.listen(db.PORT,()=>{
        console.log('Server is Connected',db.PORT);
    })
    
//register api
// app.post("/userRegister",async(req,res)=>{
//     try{
//         //get all the data from body
//         //const{firstName,lastName,mobileNumber,emailID,password,confirmPassword}=req.body;
//         //all the data should exists
//         // if(!(firstName && lastName && mobileNumber && emailID && password && confirmPassword)){
//         //     res.status(400).send('enter all fields are required')
//         // }
//         const data ={
//             userName: req.body.userName,
//             password:req.body.password

//         }
//         const userDetails = await UserModel.create(data);
//         console.log(userDetails);


//     }catch(error){
//         console.log(error);

//     }
// });

app.use('/api/user', userRouter);
app.use('/api/loginUser',userLoginRouter);