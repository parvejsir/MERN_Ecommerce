const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { name, email, password,profilePic,role} = req.body;

     const userExist =await userModel.findOne({email})
     if(userExist){
        throw new Error("Already user exist.")
     }
    if (!email) {
      throw new Error("Please provide email");
    }
      if (!password) {
        throw new Error("Please provide password");
      }
      if (!name) {
        throw new Error("Please provide name");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      if (!hashPassword) {
        throw new Error("Something is wrong!");
      }

      const payload = {
        ...req.body,
        role : "GENERAL",
        password: hashPassword,
      }

      const userData = new userModel(payload);
      const saveUser = await userData.save();

      res.status(201).json({
        data: saveUser,
        success: true,
        error: false,
        message: "User Created Successfully",
      });
    }
   catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
