const express = require("express");
const router = express.Router();
const { register,login,logout, loggedIn } = require("../controller/userController.js");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/loggedIn" , loggedIn)

module.exports = router;

