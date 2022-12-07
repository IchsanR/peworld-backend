const express = require("express");
const {
	getUser,
	getDetailUser,
	getName,
	getSkill,
	registerUser,
	loginUser,
	updateUser,
	updatePassword,
	updateProfileImage,
	deleteUser,
} = require("../controller/user.controller");
const jwtAuth = require("../middleware/jwtAuth");
const uploadUser = require("../middleware/uploadUser");

const userRouter = express.Router();

userRouter
	// get data
	.get("/user", getUser)
	.get("/user/:id_user", getDetailUser)
	.get("/user/search/:names", getName)
	.get("/user/skill/:skill", getSkill)
	// login register
	.post("/user/login", loginUser)
	.post("/user/register", registerUser)
	// update data
	.put("/user/:id_user", updateUser)
	.put("/user/password/:id_user", updatePassword)
	.put("/user/image/:id_user", uploadUser, updateProfileImage)
	// delete user
	.delete("/user/:id_user", deleteUser);

module.exports = userRouter;
