const User = require("../models/user");
const bcrypt = require("bcryptjs");

//User registration

exports.register = async (req, res) => {
  // console.log(req.body);
  //checking if an user already exists with this particular email
  const tempUser = await User.findOne({ email: req.body.email });
  if (tempUser) {
    //If a user exists simply return with a 409 status.
    return res.status(409).json({
      message: "Email already in use",
    });
  }

  //checking if an user already exists with this particular mobileNo
  const tempUser2 = await User.findOne({ mobileNo: req.body.mobileNo });
  if (tempUser2) {
    //If a user exists simply return with a 409 status.
    return res.status(409).json({
      message: "Mobile Number already in use",
    });
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
    res.redirect("/login");
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err,
    });
  }
};
