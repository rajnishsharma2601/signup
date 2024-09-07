const JWT = require("jsonwebtoken");
    const jwtAuth=(req,res,next)=>{
        const token=(req.cookies && req.cookies.token)||null;
     
        if(!token){
        return res.status(400).json({
     success:false,
     Message:"not authorized"
        })
        };
        try {
         const playload =JWT.verify(token,process.env.SECRET);
         req.user= {id:playload.id, email:playload.email}
        } catch (error) {
         return res.status(400).json({
             success:false,
             Message:error.Message
                })
        }
next();

};


module.exports= jwtAuth;