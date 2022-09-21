const Patient = require("../models/patientModel");
const errorHandler = require('./errorController');


// Display All Patient Data
const patient_list = (req, res) => {
	Patient.find((err, data) => {
		if (!err) {
			if (!data) {
				res.status(404).json({
					message: "No Result Found",
				})
			} else {
				res.status(200).json({
					data: data,
					message: "Successfully Get All Data",
				})
			}
		}
	});
};

// Create New Patient
const patient_create_post = async (req, res) => {
	let patient = new Patient(req.body);
	patient
		.save()
		.then((data) => {
			res.status(200).json({
				data: data,
				message: "Successfully Create New Patient",
			})
		})
		.catch((err) => {
			if (err.code === 11000) {
				let data = errorHandler.duplicateKeyError(err, res);
				res.status(data.code).json({
					message: data.messages,
					fields: data.fields
				})
			}
		});
};

// Show a particular Patient Detail by Id
const patient_details = (req, res) => {
	Patient.findById(req.params.id, (err, data) => {
		if (!err) {
			if (!data) {
				res.status(404).json({
					message: "No Result Found",
				})
			} else {
				res.status(200).json({
					data: data,
					message: "Successfully Get Data By Id",
				})
			}
		}
	});
};

// Update Patient Detail by Id
const patient_update = (req, res) => {
	Patient.findOneAndUpdate({
			_id: req.params.id
		}, req.body, {
			new: true,
			upsert: true,
		})
		.then((update) => {
			if (update.__v === req.body.__v) {
				let patient = new Patient(update);
				patient
					.save()
					.then((data) => {
						res.status(200).json({
							data: data,
							message: "Successfully Update Patient",
						})
					})
					.catch((err) => {
						if (err.code === 11000) {
							let data = errorHandler.duplicateKeyError(err, res);
							res.status(data.code).json({
								message: data.messages,
								fields: data.fields
							})
						}
					});
			} else {
				res.status(412).json({
					message: "Precondition Failed",
				})
			}
		})
		.catch((err) => {
			res.status(422).json({
				message: err,
			})
		});
};

// Delete Patient Detail by Id
const patient_delete = (req, res) => {
	Patient.findById(req.params.id, (err, data) => {
		if (!err) {
			if (!data) {
				res.status(404).json({
					message: "No Result Found",
				})
			} else {
				Patient.findByIdAndRemove(req.params.id)
					.then(() => {
						res.status(200).json({
							message: "Successfully Delete Patient",
						})
					})
					.catch((err) => {
						res.status(400).json({
							message: "Patient delete failed",
						})
					});
			}
		}
	});
};

module.exports = {
	patient_list,
	patient_details,
	patient_create_post,
	patient_update,
	patient_delete,
};
