const UserModel = require("../../Database/Models/UserModel");
const SecurePassword = require("../../Utils/SecurePassword");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const LoginRoute = require("express").Router();

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

LoginRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //check for validity
  if (email && password) {
    try {

      const UserData = await UserModel.findOne({ email: email})
      if(UserData){
        if(await bcrypt.compare(password, UserData.password))
        {
            //generate token
            const token = await generateToken(UserData);
            return res.json({ success : true, token });
        }
        else
        return res.json({
            success : false,
            message : "Wrong password"
        })
      }
      else
      return res.json({
        success : false,
        message : "Email not found"
    })

      
      
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

module.exports = LoginRoute;
