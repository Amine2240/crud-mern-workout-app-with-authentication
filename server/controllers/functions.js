const Workoutmodel = require("../models/workoutmodel");
const Usermodel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

const addpost = async (req, res) => {
  try {
    const posteditem = new Workoutmodel({
      ...req.body,
      user_id: req.user._id,
    });
    await posteditem.save();
    res.json(req.body);
  } catch (error) {
    res.json({ message: "error in posting" });
  }
};

const findposts = async (req, res) => {
  try {
    const workoutitems = await Workoutmodel.find({user_id : req.user._id});
    res.json(workoutitems);
  } catch (error) {
    res.json({ message: "error in finding" });
  }
};
const deletepost = async (req, res) => {
  try {
    const deleteditem = await Workoutmodel.findByIdAndDelete(req.params.id);
    if (!deleteditem) {
      return res.json({ message: "item not found" });
    }
    return res.json(deleteditem);
  } catch (error) {
    res.json({ message: "error in deleting" });
  }
};

const findposttoupdate = async (req, res) => {
  try {
    const itemtoupdate = await Workoutmodel.findById(req.params.id);
    res.json(itemtoupdate);
  } catch (error) {
    res.json({ message: "nout found" });
  }
};

const updatepost = async (req, res) => {
  try {
    const updateditem = await Workoutmodel.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      load: Number(req.body.load),
      nreps: Number(req.body.nreps),
    });
    if (!updateditem) {
      res.json("not found");
    }
    res.json(updateditem);
  } catch (error) {
    res.json("disable to update");
  }
};

const signinfunction = async (req, res) => {
  try {
    //validation
    if (!req.body.email || !req.body.password || !req.body.confirmpassword) {
      return res.json({ message: "please enter all required fields" });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.json({ message: "please confirm password" });
    }
    if (req.body.password.length < 6) {
      return res.json({ message: "password very short" });
    }
    const existinguser = await Usermodel.findOne({ email: req.body.email });
    if (existinguser) {
      return res.json({ message: "user already exists go log in" });
    }
    //hashing
    const salt = await bcrypt.genSalt();
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    const newuser = new Usermodel({
      email: req.body.email,
      password: hashedpassword,
      confirmpassword: hashedpassword,
    });

    await newuser.save();
    const token = jwt.sign(
      {
        user: newuser._id,
      },
      process.env.SECRET_KEY
    );
    res.cookie("token", token, { httpOnly: true }).send();

    // user login
  } catch (error) {
    console.log(error);
    res.json({ message: "error in sign in " });
  }
};

const loginfunction = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.confirmpassword) {
      return res.json({ message: "please enter the required fields" });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.json({ message: "please confirm password" });
    }
    if (req.body.password.length < 6) {
      return res.json({ message: "password very short" });
    }
    const existinguser = await Usermodel.findOne({ email: req.body.email });
    if (!existinguser) {
      return res.json({ message: "wrong email or password" });
    }
    const passwordcorrect = await bcrypt.compare(
      req.body.password,
      existinguser.password
    );
    if (!passwordcorrect) {
      return res.json({ message: "wrong password" });
    }
    const token = jwt.sign(
      {
        user: existinguser._id,
      },
      process.env.SECRET_KEY
    );
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.json({ message: error.message });
  }
};

const logoutfunction = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true }).send();
  } catch (error) {
    console.log(error);
    return res.json({ message: "error in logout" });
  }
};

const isloggedfunction = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json(false);
    }
    await jwt.verify(token, process.env.SECRET_KEY);
    return res.json(true);
  } catch (error) {
    return res.json(false);
  }
};

module.exports = {
  addpost,
  findposts,
  deletepost,
  findposttoupdate,
  updatepost,
  signinfunction,
  loginfunction,
  logoutfunction,
  isloggedfunction,
};
