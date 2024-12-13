const orderModel = require('../../models/orderProductModel')

const orderController =async(request,response)=>{
    try {
        const current_user = request.userId
        
        const orderList = await orderModel.find({ userId : current_user}).sort({createdAt :-1})

        response.status(200).json({
            data : orderList,
            message : "Order List",
            success : true,
            error : false
        })

    } catch (error) {
        response.status(500).json({
            message:error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports=orderController