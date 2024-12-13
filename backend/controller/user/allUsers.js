const userModel=require('../../models/userModel')

async function allUsersController(req,res){
    try {
         
        const allUsers=await userModel.find()

        res.json({
            message:"ALL Users Details",
            error:false,
            success:true,
            data:allUsers
        })
    } catch (error) {
        res.status(501).json({
            message: error.message || error,
            error: true,
            success: false,
          }); 
    }
}
module.exports=allUsersController