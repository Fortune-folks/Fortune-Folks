const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const donationController = require("../controllers/donations");
const passport = require("passport");
const initializePassport = require("./passport-config");
initializePassport(passport);

////////////////////////////////////////
/////////// Main  Route ///////////
////////////////////////////////////////

router.get("/", async (req, res) => {
  const isauth = req.isAuthenticated();
  if (isauth) {
    //IDK why but it returns an array
    const user = (await req.user)[0];
    res.render("index", { isauth: isauth, user: user });
  } else {
    res.render("index", { isauth: isauth });
  }
});

router.get("/donate", isloggedin, donationController.getrequests);
router.post("/donate", isloggedin, donationController.addDonation);
router.get("/donationlist", isloggedin, donationController.getDonations);
router.post("/donationlist", isloggedin, donationController.addrequest);

//////////////////////////////////////////
/////// User  Authentication Routes ///////
////////////////////////////////////////

router.get("/register", (req, res) => {
  res.render("register", { error: "" });
});

router.post("/register", userController.register);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
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

/////////////////////////////////////////
////////// Custom Middlewares ///////////
/////////////////////////////////////////
function isloggedin(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/login");
  }
}

module.exports = router;
