const userModel = require("../model/user.model");
const {
	success,
	failed,
	successWithToken,
} = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

const userController = {
	// get all user
	getUser: (req, res) => {
		userModel
			.selectAll()
			.then((result) => {
				success(res, result, "success", "get all user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get all user failed");
			});
	},

	// get detail user
	getDetailUser: (req, res) => {
		const id_user = req.params.id_user;
		userModel
			.selectDetail(id_user)
			.then((result) => {
				success(res, result, "success", "get user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get user failed");
			});
	},

	// search by skill
	getSkill: (req, res) => {
		const query = req.query;
		const skill = query.skill;
		const sortOrd = query.sortOrd || "asc";
		const page = parseInt(query.page) || 1;
		const limit = parseInt(query.limit) || 2;
		const offset = (page - 1) * limit;

		const data = {
			skill: skill,
			sortOrd: sortOrd,
			page: page,
			limit: limit,
			offset: offset,
		};

		userModel
			.selectSkill(data)
			.then((result) => {
				success(res, result, "success", "get data success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get data failed");
			});
	},

	// search by names
	getName: (req, res) => {
		const query = req.query;
		const names = req.params.names;
		const sortOrd = query.sortOrd || "asc";
		const page = parseInt(query.page) || 1;
		const limit = parseInt(query.limit) || 2;
		const offset = (page - 1) * limit;

		const data = {
			names: names,
			sortOrd: sortOrd,
			page: page,
			limit: limit,
			offset: offset,
		};

		userModel
			.selectName(data)
			.then((result) => {
				success(res, result, "success", "get data success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get data failed");
			});
	},

	// register user
	registerUser: (req, res) => {
		try {
			const id_user = uuidv4();
			const { names, email, password, phone } = req.body;

			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					failed(res, err.message, "failed", "fail hash password");
				}

				const data = {
					id_user: id_user,
					names,
					email,
					password: hash,
					phone,
					profile_pic: "avatar.png",
					levels: 1,
				};

				userModel.checkEmail(email).then((result) => {
					if (result.rowCount == 0) {
						userModel
							.registerUser(data)
							.then((result) => {
								success(res, result, "success", "Akun berhasil dibuat");
							})
							.catch((error) => {
								failed(res, error.message, "failed", "Gagal membuat akun");
							});
					}

					if (result.rowCount > 0) {
						failed(res, null, "failed", "Email telah terdaftar");
					}
				});
			});
		} catch (error) {
			failed(res, error.message, "failed", " internal server error");
		}
	},

	// Login user
	loginUser: (req, res) => {
		const { email, password } = req.body;

		userModel
			.checkEmail(email)
			.then((result) => {
				const user = result.rows[0];
				if (result.rowCount > 0) {
					bcrypt.compare(password, user.password).then(async (result) => {
						if (result) {
							const token = await jwtToken({
								email: user.email,
							});
							success(res, { token, data: user }, "success", "login success");
						} else {
							// ketika pass salah
							failed(res, null, "failed", "email atau password salah");
						}
					});
				} else {
					// ketika username salah
					failed(res, null, "failed", "email atau password salah");
				}
			})
			.catch((err) => {
				failed(res, err.message, "failed", "internal server error");
			});
	},

	// update user
	updateUser: (req, res) => {
		const id_user = req.params.id_user;
		const body = req.body;

		const data = {
			names: body.names,
			jobdesk: body.jobdesk,
			domisili: body.domisili,
			tempatkerja: body.tempatkerja,
			bio: body.bio,
			skill: body.skill,
			id_user,
		};

		userModel
			.updateUser(data)
			.then((result) => {
				success(res, result, "success", "update data success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "update data failed");
			});
	},

	// update password
	updatePassword: (req, res) => {
		const { email, password } = req.body;
		bcrypt.hash(password, 10, (err, hash) => {
			if (err) {
				failed(res, err.message, "failed", "fail hash password");
			}

			const data = {
				email,
				password: hash,
			};

			userModel
				.updatePasswordUser(data)
				.then((result) => {
					success(res, result, "success", "update password success");
				})
				.catch((error) => {
					failed(res, error.message, "failed", "update password failed");
				});
		});
	},

	// update profile picture
	updateProfileImage: (req, res) => {
		const id_user = req.params.id_user;
		const profile_pic = req.file.filename;

		const data = {
			id_user,
			profile_pic,
		};

		userModel
			.updateProfileImage(data)
			.then((result) => {
				success(res, result, "success", "update image success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "update image failed");
			});
	},

	deleteUser: (req, res) => {
		const id_user = req.params.id_user;
		userModel
			.destroy(id_user)
			.then((result) => {
				success(res, result, "success", "delete user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "delete user failed");
			});
	},

	// insert portfolio
	insertPortfolio: (req, res) => {
		const body = req.body;
		const data = {
			iduser: body.iduser,
			title: body.title,
			repository: body.repository,
			portfolio_type: body.portfolio_type,
			images: req.file ? req.file.filename : null,
		};

		userModel
			.insertPortfolio(data)
			.then((result) => {
				success(res, result, "success", "insert portfolio user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "insert portfolio user failed");
			});
	},

	// get portfolio
	getPortfolio: (req, res) => {
		const { iduser } = req.params;

		userModel
			.getPortfolio(iduser)
			.then((result) => {
				success(res, result, "success", "get portfolio user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get portfolio user failed");
			});
	},

	// delete porto
	deletePorto: (req, res) => {
		const { id_portfolio } = req.params;

		userModel
			.deletePorto(id_portfolio)
			.then((result) => {
				success(res, result, "success", "delete portfolio user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "delete portfolio user failed");
			});
	},

	// insert experience
	insertExp: (req, res) => {
		const body = req.body;
		const data = {
			iduser: body.iduser,
			posisi: body.posisi,
			perusahaan: body.perusahaan,
			datefrom: body.datefrom,
			descriptions: body.descriptions,
		};

		userModel
			.insertExp(data)
			.then((result) => {
				success(res, result, "success", "insert user experience success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "insert user experience failed");
			});
	},

	// get experience
	getExp: (req, res) => {
		const { iduser } = req.params;

		userModel
			.getExperience(iduser)
			.then((result) => {
				success(res, result, "success", "get user experience success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get user experience failed");
			});
	},

	// delete experience
	deleteExp: (req, res) => {
		const { id_experience } = req.params;

		userModel
			.deleteExp(id_experience)
			.then((result) => {
				success(res, result, "success", "delete user experience success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "delete user experience failed");
			});
	},
};

module.exports = userController;
