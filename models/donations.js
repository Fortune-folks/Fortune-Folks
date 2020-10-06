const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	pickAddress: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Address",
		required: true,
	},
	quanity: {
		type: Number,
		default: 1,
	},
	createdOn: {
		type: Date,
		default: Date.now,
	},
	description: {
		type: String,
	},
	isAvailable: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Donation", donationSchema);
