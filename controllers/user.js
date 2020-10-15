const User = require("../models/user");
const bcrypt = require("bcryptjs");

//User registration

exports.register = async (req, res) => {
	//checking if an user already exists with this particular email
	const tempUser = await User.findOne({ email: req.body.email });
	if (tempUser) {
		res.render("register", { error: "Email already used" });
		return;
	}
	//checking if an user already exists with this particular mobileNo
	const tempUser2 = await User.findOne({ mobileNo: req.body.mobileNo });
	if (tempUser2) {
		res.render("register", { error: "Mobile Number already used" });
		return;
	}
	try {
		//Generating a hash for the user password
		const saltRounds = 10;
		const hashPass = await bcrypt.hash(req.body.password, saltRounds);

		//Creating the user object
		const user = new User({
			firstName: req.body.fname,
			lastName: req.body.lname,
			password: hashPass,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			verified: false,
		});

		//Saving the user details in database
		const savedData = await user.save();
		res.redirect(200, "/login");
	} catch (err) {
		res.redirect("/error");
	}
};
