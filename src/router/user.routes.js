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
	insertPortfolio,
	getPortfolio,
	deletePorto,
	insertExp,
	getExp,
	deleteExp,
} = require("../controller/user.controller");
const uploadUser = require("../middleware/uploadUser");
const uploadPortfolio = require("../middleware/uploadPortfolio");

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
	.delete("/user/:id_user", deleteUser)
	// portfolio
	.get("/user/porto/:iduser", getPortfolio)
	.post("/user/porto", uploadPortfolio, insertPortfolio)
	.delete("/user/porto/:id_portfolio", deletePorto)
	// experience
	.get("/user/exp/:iduser", getExp)
	.post("/user/exp", insertExp)
	.delete("/user/exp/:id_experience", deleteExp);

module.exports = userRouter;
