const UserModel = require("../../Database/Models/UserModel");
const SecurePassword = require("../../Utils/SecurePassword");
const jwt = require('jsonwebtoken')

const SignupRoute = require("express").Router();

async function generateToken(userData){
    const payload = {
        username : userData.username,
        email : userData.email
    };
    const options = {
        expiresIn : '30d'
    }
    const token = await jwt.sign(payload, process.env.SECRET);
    return token;
}

SignupRoute.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  //check for validity
  if (username && email && password) {
    try {
      // secure password
      const securedPassword = await SecurePassword(password);

      //save data
      const UserData = new UserModel({
        username: username,
        email: email,
        password: securedPassword,
      });

      await UserData.save();

      const token =await generateToken(UserData)

      return res.json({
        success: true,
        message: "User SignedUp successfully",
        data: UserData,
        token : token
      });
    } catch (error) {
      if (error.code === 11000)
        return res.json({
          success: false,
          message: "Email exists",
        });

      console.log(error);
      return res.json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } else
    return res.json({
      success: false,
      message: "All informations required",
    });
});

module.exports = SignupRoute;
