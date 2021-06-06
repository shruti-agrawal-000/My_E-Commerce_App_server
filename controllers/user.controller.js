const User = require("../models/user-model");
const jwt = require("jsonwebtokeN");
const bcrypt = require('bcryptjs');
const { response } = require("express");

// const hashPassword = async(user)=>{
// const hashedPassword = await bcrypt.hash(user.password,8)
// return hashedPassword;
// };


// generate token
const generateAuthToken = async(user)=>{
    console.log("user-",user);
    const x= user.id;
    console.log("id",x);
const token = await jwt.sign({_id:x.toString()},"newuser"); //jwt.verify method is used

return token;
};

//finding User

const findByCredentials = async(email,password,response)=>{
const user = await User.findOne({ email });
// console.log(user)
if(!user){
    console.log("ndjdjl");
    response.status(404).json({error:"Invalid User"})
}else{
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
         response.status(404).json({error:"Invalid User"});
    }else{
        return user;
    }
  
}


};


//signup
 exports.signup= async(request,response,next)=>{
    const { name,email,password} = request.body;
    console.log("body:",request.body);
    try {
        const  isUser = await User.findOne({email});
        if(isUser)
        {
            return response.status(400).json({error:"User Already Exist"})
        }
        const user = new User(request.body);
        console.log("user",user)
        const hashedPassword = await bcrypt.hash(user.password, 8);
        console.log("hashedpassword",hashedPassword)
        user.password= hashedPassword;
        await user.save();
        const token = await generateAuthToken(user);
        user.password = undefined;
        response.status(201).json({user,token})
    } catch (error) {
        console.log("error",error)
    //   return  response.status(500).json({error : "Something Went Wrong!!"});
    }

};

// signin 
exports.signin= async(request,response,next)=>{
const {email,password} = request.body;
try {
    const user = await findByCredentials(email,password,response);
    // console.log(user);
    if(user){
        const token = await generateAuthToken(user);
        // console.log(user);
        user.password = undefined;
         response.status(200).json({user,token})
    }
    
} catch (error) {
    console.log(error)
    // response.status(500).json({error:"Something Went Wrong!!"});
}
};

// module.exports={
//    hashPassword: hashPassword,
//    generateAuthToken: generateAuthToken,
//    findByCredentials:findByCredentials,
//    signin:signin,
//    signup:signup

// }