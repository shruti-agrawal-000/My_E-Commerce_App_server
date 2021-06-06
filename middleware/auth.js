const User  =  require("../models/user-model");
const jwt = require("jsonwebtoken");

const auth= async(request,response,next)=>{
try {
    const token = request.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "newuser");
    console.log(decoded);
    const user =  await User.findOne({_id:decoded._id})
    if(!user){
        response.status(401).json({error:"please Authenticate"});
    }
    request.token = token;
    request.user= user;
    next();

} catch (error) {
    console.log(error);
    // response.status(500).json({error:"Something Went Wrong"});
}

}

module.exports=auth;