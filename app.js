 const express = require('express')
 const cookieParser =require("cookie-parser")
const app = express()

const authRouters = require('./routes/jwtAuth');
const  databases = require('./config/connction');

app.use(express.json()); 
app.use(cookieParser());

app.use("/",authRouters)

app.use('/',(req,res) =>{
    res.status(200).json({data:'jwth server'});
})
  
module.exports= app;  