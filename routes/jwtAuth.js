const express=  require("express");
const authRouter = express.Router();
const {signup, signin, getUser, logout} = require("../controller/authcontroller");
const jwthAuth = require("../middleware/jwtAuth");




authRouter.post('/signup', signup); 
authRouter.post("/signin",signin)
authRouter.get("/getUser", jwthAuth,getUser);
authRouter.get("/logout",jwthAuth,logout);







module.exports = authRouter;