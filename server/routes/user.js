const express = require("express");
const router = express.Router();
const controllers = require("../controllers/functions");

router.post("/signin", controllers.signinfunction);
router.post("/login", controllers.loginfunction);
router.post("/logout", controllers.logoutfunction);
router.get("/loggedin", controllers.isloggedfunction);

module.exports = router;
