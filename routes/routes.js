const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const donations=require("../models/donations");
const donationController = require("../controllers/donations");
const passport = require("passport");
const initializePassport = require("../passport-config");
const user = require("../models/user");
const address = require("../models/address");
initializePassport(passport);

////////////////////////////////////////
/////////// Main  Route ///////////
////////////////////////////////////////

router.get("/", async (req, res) => {
	const isauth = req.isAuthenticated();

	if (isauth) {
		//IDK why but it returns an array
		const user = await req.user;
		res.render("index", { isauth: isauth, user: user[0] });
	} else {
		res.render("index", { isauth: isauth });
	}
});

router.get("/donate", isloggedin, (req, res) => {
	res.render("donate");
});

router.post("/donate", isloggedin, donationController.addDonation);

router.get('/donationlist',isloggedin,async(req,res)=>{
	const data=await donations.find();
	data.sort((a,b)=>{return a.createdOn<b.createdOn})
	// TO-DO
	// Should implement more optimal solution for this loop as this increases loading time of page when DB is large.
	for(let i=0;i<data.length;i++){
		let temp= await user.findById(data[i].userId);
		let temp2=await address.findById(data[i].pickAddress);
		data[i]['firstname']=temp.firstName;
		data[i]['lastname']=temp.lastName;
		data[i]['mobileno']=temp.mobileNo;
		data[i]['time']=date_and_time(Math.floor((Date.now()-data[i].createdOn)/1000));
		data[i]["address"]=temp2.addressLine1+" "+temp2.addressLine2+" "+temp2.city;
		data[i]["location"]=temp2.location.coordinates[0]+","+temp2.location.coordinates[1];

	}
res.render('donationlist',{data:data});
});

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
function date_and_time(up){
if(up<=59){
	return "Less than 1 Minute";
}
else if(up>=60 && up<3600){
	return Math.floor(up/60)+"M ";
}
else if(up>=3600 && up<86400){
	return Math.floor(up/3600)+"H "+Math.floor((up%3600)/60)+"M ";
}
else{
	return "More than 24hours";
}
}
module.exports = router;
