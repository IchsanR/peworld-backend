const express = require("express");
const {
	getRecruiter,
	getDetailRecruiter,
	registerRecruiter,
	loginRecruiter,
	updateRecuiter,
	updateProfileImage,
	updatePassword,
	deleteRecruiter,
} = require("../controller/recruiter.controller");
const uploadRecruiter = require("../middleware/uploadRecruiter");

const recruiterRouter = express.Router();

recruiterRouter
	// get data
	.get("/recruiter", getRecruiter)
	.get("/recruiter/:id_recruiter", getDetailRecruiter)
	// login register
	.post("/recruiter/login", loginRecruiter)
	.post("/recruiter/register", registerRecruiter)
	// update data
	.put("/recruiter/:id_recruiter", updateRecuiter)
	.put("/recruiter/password/:id_recruiter", updatePassword)
	.put("/recruiter/image/:id_recruiter", uploadRecruiter, updateProfileImage)
	// delete user
	.delete("/recruiter/:id_recruiter", deleteRecruiter);

module.exports = recruiterRouter;
