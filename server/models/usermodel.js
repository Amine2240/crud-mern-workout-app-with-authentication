const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

const Usermodel = mongoose.model("users", Userschema);
module.exports = Usermodel;
