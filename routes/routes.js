const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const donationController = require("../controllers/donations");
const requestController = require("../controllers/requests");
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
		res.render("fortunefolks", { isauth: isauth, user: user });
	} else {
		res.render("fortunefolks", { isauth: isauth });
	}
});

// Donation Related Routes
router.get("/donations", isloggedin, donationController.getDonations);
router.post("/donations", isloggedin, donationController.findNearbyDonations);
router.post("/donations/add", isloggedin, donationController.addDonation);
router.get("/donations/add", isloggedin, (req, res) => {
	res.render("donationForm");
});
router.get("/donations/del/:id", isloggedin, donationController.deleteDonation);

// Requests related Routes
router.get("/requests", isloggedin, requestController.getRequests);
router.post("/requests/add", isloggedin, requestController.addRequest);
router.get("/requests/add", isloggedin, (req, res) => {
	res.render("requestForm");
});
router.get("/requests/del/:id", isloggedin, requestController.deleteRequest);

//////////////////////////////////////////
/////// User  Authentication Routes ///////
////////////////////////////////////////
router.get("/dashboard", isloggedin, async (req, res) => {
	const user = (await req.user)[0];
	res.render("dash", {
		user: user,
		donations: await donationController.getDonationsByUser(req, res),
		requests: await requestController.getRequestsByUser(req, res),
	});
});

router.get("/register", (req, res) => {
	res.render("register", { error: "" });
});

router.post("/register", userController.register);

router.get("/login", (req, res) => {
	res.render("joinUs");
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

router.post("/profile/update", isloggedin, userController.update);

////////////////////////////////////////
/////////// Extra   Route ///////////
////////////////////////////////////////

router.get("/faq", (req, res) => {
	res.render("FAQ");
});

router.get("/donate/money", (req, res) => {
	res.render("moneyDonation");
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
