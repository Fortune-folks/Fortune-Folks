const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const OTP = require("../models/otp");
const User = require("../models/user");

/*
    Send OTP to a particular number
*/
exports.send_otp = async (mobileNo) => {
	//Generating a random 6 digit random OTP
	const ranOTP = Math.floor(100000 + Math.random() * 900000);
	const ttx = 5 * 60 * 1000; // time to expire is 5 minutes

	//Creating a new OTP model
	const otp = new OTP({
		mobileNo: "+91" + mobileNo,
		otp: ranOTP,
		createdOn: Date.now(),
		expiresOn: Date.now() + ttx,
	});
	try {
		//Sending SMS to client
		result = await client.messages.create({
			body: "Your verification code is :" + ranOTP,
			from: "+12702296922",
			to: otp.mobileNo,
		});

		//Delete any past otp data with this number
		await OTP.deleteMany({ mobileNo: mobileNo });

		//Saving new OTP in database
		const savedOTP = otp.save();

		// res.status(200).json({
		// 	message: "Otp Sended successfully",
		// 	response: result,
		// 	sended: await savedOTP,
		// });
	} catch (err) {
		console.log(err);
	}
};

//Verifies the OTP and
exports.verify_otp = async (mobileNo, enteredOTP) => {
	try {
		console.log(mobileNo);
		const otp = await OTP.findOne({
			mobileNo: "+91" + mobileNo,
			otp: enteredOTP,
		});
		console.log(otp);
		if (otp) {
			const currTime = Date.now();
			const expiryTime = new Date(otp.expiresOn).getTime();
			//Find and update user verfication status with this mobileNo
			const result = await User.findOneAndUpdate(
				{ mobileNo: req.body.mobileNo },
				{ verified: true },
				{ useFindAndModify: false }
			);
			console.log(result);
			if (result != null) {
				return true;
			} else {
				return false;
			}
		}
		return true;
	} catch (err) {
		return false;
	}
};
