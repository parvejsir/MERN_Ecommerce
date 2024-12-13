async function userLogout(req,res){
    try {
        res.clearCookie("jwtToken")

        res.json({
            message:"Logged out Successfully",
            error:false,
            success:true,
            data:[]
        })
    } catch (error) {
        res.status(501).json({
            message: error.message || error,
            error: true,
            success: false,
          }); 
    }
}

module.exports=userLogout