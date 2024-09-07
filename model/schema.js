
const  mongoose =require('mongoose');
const  {sehema }= mongoose;
const JWT = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const  userschema = new mongoose.Schema({

   name: {
      type: String,
      require: [true, 'user name is Required'],
      minLength: [5, 'Name must be at least 5 characters'],
      maxLength: [50, 'Name must be less than 50 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'user email is required'],
      unique: true,
      lowercase: true,
      unique: [true, 'already registered'],
    },
    password: {
      type: String,
      select: false,
    },
 
},{timestamps:true});

userschema.methods={
  JwtToken(){
    return JWT.sign(
      {id:this._id,email:this.email},
      process.env. SECRET,
      {expiresIn:'24h'}
    )
  }
}

// bcrpt
userschema.pre('save',async function(next){
  if (!this.isModified('password')) 
     return next();
     this.password = await bcrypt.hash(this.password,10);
     return next();
  
})


const usermodel = mongoose.model("user",userschema)

module.exports= usermodel;