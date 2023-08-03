const Usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("token", token);
      return res.json({ message: "unauthirastion : invalid token " });
    }

    const decodedtoken = await jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decodedtoken);

    const user = await Usermodel.findById(decodedtoken.user);
    if (!user) {
      return res.json({ message: "unauthirastion : invalid token" });
    }
    // Store the user object in the request for other routes to access
    req.user = user;

    next();

  } catch (error) {
    // return res.json({ message: "server error" });
    console.log(error);
  }
};

module.exports = authmiddleware;
