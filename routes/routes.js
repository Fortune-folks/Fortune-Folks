const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const initializePassport = require("../passport-config");

initializePassport(passport);
////////////////////////////////////////
//////////// Main Routes////////////////
////////////////////////////////////////

router.get("/", (req, res) => {
  const isauth = req.isAuthenticated();
  res.render("index", { isauth: isauth,name:"Nitheesh" });
});

//////////////////////////////////////////
///////// User Related Routes////////////
////////////////////////////////////////

//User Registration
<<<<<<< HEAD
router.get("/register", (req, res) => {
	res.render("register", { error: "This is the error" });
=======
router.get("/register",isloggedin, (req, res) => {
  res.render("register");
>>>>>>> dc14858db8affd0183b4d22c359e62cd1cd383ae
});
router.post("/register",isloggedin, userController.register);

//User login
router.get("/login",isloggedin,(req, res) => {
  res.render("login");
});
router.post(
  "/login",isloggedin,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logOut();
  return res.redirect("/");
});

//User Dashboard Page
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

/////////////////////////////////////////

// to restrict loggedin users from accessing login/register pages 
function isloggedin(req,res,next){
  if(req.isAuthenticated()){
    return res.redirect('/');
  }
  next();
}

module.exports = router;
