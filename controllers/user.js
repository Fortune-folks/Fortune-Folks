const User = require("../models/user");
const bcrypt = require("bcryptjs");

//User registration

exports.register = async (req, res) => {
	// console.log(req.body);
	//checking if an user already exists with this particular email
	const tempUser = await User.findOne({ email: req.body.email });
	if (tempUser) {
		//If a user exists simply return with a 409 status.
		// return res.status(409).json({
		// 	message: "Email already in use",
		// });
		res.redirect(409, "/register", { error: "Email already used" });
	}

	//checking if an user already exists with this particular mobileNo
	const tempUser2 = await User.findOne({ mobileNo: req.body.mobileNo });
	if (tempUser2) {
		//If a user exists simply return with a 409 status.
		// return res.status(409).json({
		// 	message: "Mobile Number already in use",
		// });
		res.redirect(409, "/register", { error: "Phone Number already used" });
	}
	try {
		//Generating a hash for the user password
		const saltRounds = 10;
		const hashPass = await bcrypt.hash(req.body.password, saltRounds);

		//Creating the user object
		const user = new User({
			firstName: req.body.fname,
			lastName: req.body.lname,
			dob: req.body.dob,
			password: hashPass,
			email: req.body.email,
			mobileNo: req.body.mobileNo,
			verified: false,
		});

		//Saving the user details in database
		const savedData = await user.save();
<<<<<<< HEAD
		// res.status(200).json({
		// 	message: "Registered Succesfully",
		// 	user: savedData,
		// });
		res.redirect("/login");
=======
		res.redirect('/login');
>>>>>>> dc14858db8affd0183b4d22c359e62cd1cd383ae
	} catch (err) {
		res.redirect(500, "/error", { error: "Internal Server Error" });
	}
};
