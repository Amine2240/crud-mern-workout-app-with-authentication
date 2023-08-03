const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const workoutroutes = require("./routes/workout");
const userroutes = require("./routes/user");
// const Usermodel = require("./models/usermodel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();
const cookieparser = require("cookie-parser");
app.use(cookieparser());

mongoose
  .connect(
    `mongodb+srv://kadoumamine:${process.env.DB_PASSWORD}@cluster0.afd6kpg.mongodb.net/test?retryWrites=true&w=majority`
  )
  .then(console.log("connected to db"))
  .catch((err) => console.log(err));

app.use("/", userroutes);
app.use("/", workoutroutes);

//sign in

app.listen(5000, () => {
  console.log("connected to server");
});
