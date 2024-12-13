const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModel');
const jwt=require('jsonwebtoken')

async function userSignInController(req,res){
    try {
        const {email,password}=req.body
        if (!email) {
            throw new Error("Please provide email");
          }
        if (!password) {
              throw new Error("Please provide password");
            }
        
        const userExist =await userModel.findOne({email})
        if(!userExist){
               throw new Error("User Not Found")
            }  
        
        const checkPassword=await bcrypt.compare(password,userExist.password)
        

        if(checkPassword){
        const tokenData = {
          _id: userExist.id,
          email: userExist.email
        }
        const token =await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '3h' });
        
        const tokenOption ={
            httpOnly:true,
            secure:true
        }
        
         res.cookie("jwtToken",token,tokenOption).status(200).json({
            message:"Login Successfully",
            data:token,
            success:true,
            error : false
         })
        }else{
            throw new Error("Invalid Credential")
        }
       

    } catch (error) {
        res.status(501).json({
            message: error.message || error,
            error: true,
            success: false,
          }); 
    }
}

module.exports=userSignInController