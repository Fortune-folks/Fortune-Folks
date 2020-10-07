const Donation = require("../models/donations");
const User = require("../models/user");
const Address = require("../models/address");

exports.addDonation = async (req, res) => {
	//Getting the user who donated
	const user = (await req.user)[0];

	const address = new Address({
		addressLine1: req.body.addLine1,
		addressLine2: req.body.addLine2,
		city: req.body.city,
		location: {
			type: "Point",
			coordinates: [req.body.latitude, req.body.longitude],
		},
	});
	try {
		const savedAddr = await address.save();
		//Now creating the donation
		const donation = new Donation({
			userId: user._id,
			pickAddress: savedAddr._id,
			quantity: req.body.quantity,
			description: req.body.description,
		});
		const savedDon = await donation.save();
		//todo: Make an donation listing page and redirect there
		res.redirect("/");
	} catch (err) {
		console.log("Internal Server Error");
		//Redirect error page code goes here
	}
};
