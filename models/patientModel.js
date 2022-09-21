const mongoose = require("mongoose");
const { updateIfCurrentPlugin } = require('mongoose-update-if-current');

const patientSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		unique: [true, "Name Already Exists"],
	},
	age: {
		type: String,
		required: [true, "User age required"],
	},
	gender: {
		type: String,
		required: [true, "Gender can't be blank"],
	},
	phone: {
		type: String,
		min: [12, "Too Few. Not valid number. Eg. 081234567890"],
		max: [12, "Too long. Not valid number. Eg. 081234567890"],
		match: new RegExp('^08[0-9]{9,10}$', 'g'),
		required: [true, "User phone number required"],
		unique: [true, "Phone Number Already Exists"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		trim: true,
		lowercase: true,
		unique: [true, "Email Already Exists"],
	},
	address: {
		type: String,
		required: [true, "Address can't be blank"],
	},
	problem: {
		type: String,
		required: [true, "Problem can't be blank"],
	},
	allergy: {
		type: String,
		required: [true, "Allergy status can't be blank"],
	},
	prescription: {
		type: String,
	},
}, { version: true });

patientSchema.plugin(updateIfCurrentPlugin, { strategy: 'version' });

module.exports = mongoose.model("Patient", patientSchema, "Patients");
