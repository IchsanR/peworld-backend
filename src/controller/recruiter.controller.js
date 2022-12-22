const recruiterModel = require("../model/recruiter.model");
const {
	success,
	failed,
	successWithToken,
} = require("../helper/file.response");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");
const cloudinary = require("../helper/cloudinary");

const recruiterController = {
	// get all user
	getRecruiter: (req, res) => {
		recruiterModel
			.selectAll()
			.then((result) => {
				success(res, result, "success", "get all user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get all user failed");
			});
	},

	// get detail user
	getDetailRecruiter: (req, res) => {
		const id_recruiter = req.params.id_recruiter;
		recruiterModel
			.selectDetail(id_recruiter)
			.then((result) => {
				success(res, result, "success", "get user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "get user failed");
			});
	},

	// register recruiter
	registerRecruiter: (req, res) => {
		try {
			const id_recruiter = uuidv4();
			const { names, email, perusahaan, jabatan, phone, password } = req.body;

			bcrypt.hash(password, 10, async (err, hash) => {
				if (err) {
					failed(res, err.message, "failed", "fail hash password");
				}
				const profile_pic = req.file
					? await cloudinary.uploader.upload(req.file.path)
					: {
							secure_url:
								"https://res.cloudinary.com/dhm4yjouq/image/upload/v1667923907/cld-sample.jpg",
							public_id: "",
					  };

				const data = {
					id_recruiter: id_recruiter,
					names,
					email,
					perusahaan,
					jabatan,
					phone,
					password: hash,
					profile_pic: `${profile_pic.secure_url}|&&|${profile_pic.public_id}`,
					levels: 0,
				};

				recruiterModel.checkEmail(email).then((result) => {
					if (result.rowCount == 0) {
						recruiterModel
							.registerRecruiter(data)
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
	loginRecruiter: (req, res) => {
		const { email, password } = req.body;

		recruiterModel
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
	updateRecuiter: (req, res) => {
		const id_recruiter = req.params.id_recruiter;
		const body = req.body;

		const data = {
			perusahaan: body.perusahaan,
			bidang: body.bidang,
			kota: body.kota,
			bio: body.bio,
			email: body.email,
			instagram: body.instagram,
			phone: body.phone,
			linkedin: body.linkedin,
			id_recruiter,
		};

		recruiterModel
			.updateRecruiter(data)
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

			recruiterModel
				.updatePasswordRecruiter(data)
				.then((result) => {
					success(res, result, "success", "update password success");
				})
				.catch((error) => {
					failed(res, error.message, "failed", "update password failed");
				});
		});
	},

	// update profile picture
	updateProfileImage: async (req, res) => {
		const id_recruiter = req.params.id_recruiter;
		const profile_pic = await cloudinary.uploader.upload(req.file.path);

		const data = {
			id_recruiter,
			profile_pic: `${profile_pic.secure_url}|&&|${profile_pic.public_id}`,
		};

		recruiterModel
			.updateRecruiterImage(data)
			.then((result) => {
				success(res, result, "success", "update image success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "update image failed");
			});
	},

	deleteRecruiter: (req, res) => {
		const id_recruiter = req.params.id_recruiter;
		recruiterModel
			.destroy(id_recruiter)
			.then((result) => {
				success(res, result, "success", "delete user success");
			})
			.catch((error) => {
				failed(res, error.message, "failed", "delete user failed");
			});
	},
};

module.exports = recruiterController;
