const usermodel =require("../model/schema.js");
const emailValidator =require("email-validator");
const bcrypt = require("bcrypt");


const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);
    
  
    /// every field is required
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Every field is required"
      });
    }
  

    const validEmail = emailValidator.validate(email);
    if (!validEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address 📩"
      });
    }
  
    try {
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "password and confirm Password does not match ❌"
        });
      }
  
      const userInfo = new usermodel(req.body);
  
      const result = await userInfo.save();
      return res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      /// send the message of the email is not unique.
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: `Account already exist with the provided email ${email} 😒`
        });
      }
  
      return res.status(400).json({
        message: error.message
      });
    }
  };


   // singin
   const  signin = async(req,res,next)=>{
    const{email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"email and password are required"
        });
    }
    try {
      
      const user = await  usermodel
      .findOne({email})
      .select("+password");

      if(!user || !( bcrypt.compare(password,user.password))){
       return res.status(400).json({
           success:false,
           message:"invalid  password"
       });
      }
            const token=user.JwtToken()
            user.password=undefined;

            const cookieOption={
           maxAge: 24*60*60*1000,
           httpOnly:true
            };
            res.cookie("token",token,cookieOption);
            res.status(200).json({
              success:true,
              data:user
            });
       
    } catch (error) {
       return res.status(400).json({
        success:false,
        message:"error data"
       })
    }  
    };
     
   const getUser =async(req,res,next)=>{
    const userId= req.user.id;

    try {
      const user = await usermodel.findById(userId);
      return res.status(200).json({
        success:true,
        data:user
      })
    } catch (error) {
       return res.status(400).json({
        success:false,
       message:error.message
       });
    }
   };

     const logout= async(req,res,next)=>{
try {
    const cookieOption ={
      expires:new Date(),
    };
      res.cookie("token",null,cookieOption);
      return res.status(200).json({
        success:true,
       message:"logout successfully"
       });

} catch (error) {
   return res.status(400).json({
        success:false,
       message:error.message
       });
}
     }   
  module.exports={
    signup,
    signin,
    getUser,
    logout

  }