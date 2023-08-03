const express = require("express");
const router = express.Router();
const controllers = require("../controllers/functions");
const authmiddleware = require("../middleware/authmiddleware");


router.post("/add",authmiddleware, controllers.addpost);
router.get("/add", authmiddleware, controllers.findposts);
router.delete("/delete/:id",authmiddleware, controllers.deletepost);
router.get("/update/:id",authmiddleware, controllers.findposttoupdate);
router.put("/update/:id",authmiddleware, controllers.updatepost);


module.exports = router;