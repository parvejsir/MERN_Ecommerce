const express=require('express')
const router=express.Router()
const userSignUpController =require('../controller/user/userSignUp')
const userSignInController =require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogeout = require('../controller/user/userLogeout')
const allUsersController = require('../controller/user/allUsers')
const updateUserController= require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/paymentController')
const webhooks = require('../controller/order/webhook')
const orderController = require('../controller/order/orderController')
const forgotPasswordController = require('../controller/user/forgotPasswordController');



//user router
router.post('/sign-up',userSignUpController)
router.post('/login',userSignInController)
router.get('/user-details',authToken,userDetailsController)
router.get("/logout",userLogeout)
router.post('/forgot-password/verify-email', forgotPasswordController.verifyEmail);
router.post('/forgot-password/reset-password', forgotPasswordController.resetPassword);

//admin panel router
router.get('/all-users',authToken,allUsersController)
router.post("/update-user",authToken,updateUserController)

//product router
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//cart router
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

//payment and order routes
router.post('/checkout',authToken,paymentController)
router.post('/Webhook',webhooks) //api/webhook
router.get('/order-list',authToken,orderController)

module.exports= router; 