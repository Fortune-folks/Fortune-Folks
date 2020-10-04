const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

////////////////////////////////////////
//////////// Main Routes////////////////
////////////////////////////////////////

router.get("/", (req, res) => {
	res.render("index");
});

//////////////////////////////////////////
///////// User Related Routes////////////
////////////////////////////////////////

//User Registration
router.get("/register", (req, res) => {
	res.render("register");
});
router.post("/register", userController.register);

//User login
router.get("/login", (req, res) => {
	res.render("/login");
});
router.post("/login", (req, res) => {
	console.log(req.body);
});

//User Dashboard Page
router.get("/dashboard", (req, res) => {
	res.render("dashboard");
});

/////////////////////////////////////////

module.exports = router;
