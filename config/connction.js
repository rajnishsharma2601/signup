 const mongoose = require('mongoose');
const usermodel = require('../model/schema');
 const mondodb_url=
   process.env.MONGO_DB ||"mongodb://localhost:27017/RSVP";
// process.env.MONGO_DB="mongodb+srv://kumarrajnish2601:rajnish2601@cluster0.0m5ib32.mongodb.net/school?retryWrites=true&w=majority&appName=Cluster0"

 // mongodb dtatabase connection
 const  databaseconnect =() =>{
    mongoose.connect(mondodb_url)
    .then((conn)=>{console.log(`conected db:${conn.connection.host}`)})
    .catch((err)=>{console.log("error db",err);
    })
 }
   
 // connection
 databaseconnect();

module.exports = databaseconnect;
